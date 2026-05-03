/**
 * AI Question Generator Controller
 * Generates high-quality questions using Google Gemini AI with local fallback.
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const localQuestions = require("../data/localQuestions");

function handleFallback(skill, level, res, originalError) {
    console.error(`[AI CRITICAL ERROR] Failed to generate dynamic assessment for ${skill}. Reason: ${originalError}`);
    
    // Serve a single "AI Busy" message instead of unrelated stored questions
    const questions = [{
        id: 1,
        question: `The AI Engine is currently generating technical questions for ${skill}. If you see this, please try again in a few moments.`,
        options: ["Retry Assessment", "Check Connection", "Wait for AI", "Contact Support"],
        correctOptionIndex: 0,
        answer: "Retry Assessment"
    }];

    return res.status(200).json({
        skill,
        level,
        generatedAt: new Date().toISOString(),
        questions: questions,
        isFallback: true
    });
}

async function generateAssessment(req, res) {
    const { skill, level } = req.body;
    try {
        console.log(`[AI] Request: Skill=${skill}, Level=${level}`);

        if (!skill || !level) {
            return res.status(400).json({ message: "Skill and Level are required" });
        }

        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey || apiKey === "dummy_key") {
            return handleFallback(skill, level, res, "Missing API Key");
        }

        const genAIInstance = new GoogleGenerativeAI(apiKey);
        const counts = { 'Beginner': 10, 'Intermediate': 20, 'Advanced': 30 };
        const questionCount = counts[level] || 15;

        const prompt = `
            Task: Generate assessment questions STRICTLY based on the selected skill: "${skill}" and level: "${level}".
            
            Strict Requirements:
            1. Questions must ONLY relate to "${skill}" and its technical domain.
            2. Do NOT repeat generic or common questions that could apply to other skills.
            3. Ensure questions accurately test real knowledge of "${skill}" only.
            4. Count: Exactly ${questionCount} unique questions.
            
            Technical Diversity:
            - Practical scenarios specific to "${skill}".
            - Troubleshooting and error handling in "${skill}".
            - Deep-dive into specific tools/syntax of "${skill}".
            - If coding, include real code logic prediction.

            Format: Valid JSON ONLY.
            Structure: {"questions": [{"id": 1, "question": "...", "options": ["A", "B", "C", "D"], "correctOptionIndex": 0, "answer": "..."}]}
        `;

        const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
        let result;
        let lastError;

        for (const modelName of modelNames) {
            try {
                console.log(`[AI] Attempting ${skill} assessment with model: ${modelName}`);
                const model = genAIInstance.getGenerativeModel({ 
                    model: modelName,
                    generationConfig: { maxOutputTokens: 4096, temperature: 0.5 }
                });

                const aiPromise = model.generateContent(prompt);
                const timeoutPromise = new Promise((_, reject) => 
                    setTimeout(() => reject(new Error("AI Timeout")), 30000)
                );

                result = await Promise.race([aiPromise, timeoutPromise]);
                if (result) break;
            } catch (err) {
                console.warn(`[AI] Model ${modelName} failed for ${skill}: ${err.message}`);
                lastError = err;
            }
        }

        if (!result) throw lastError || new Error("All models failed");

        const response = await result.response;
        const responseText = response.text().trim();
        const cleanText = responseText.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
        const assessmentData = JSON.parse(cleanText);

        return res.status(200).json({
            skill,
            level,
            generatedAt: new Date().toISOString(),
            questions: assessmentData.questions
        });
    } catch (error) {
        console.error("[AI Error]:", error.message);
        return handleFallback(skill, level, res, error.message);
    }
}

async function generateGapAnalysis(req, res) {
    const { currentRole, targetRole, userSkills, userAssessments } = req.body;

    if (!targetRole) {
        return res.status(400).json({ success: false, message: "Target role is required." });
    }

    try {
        console.log(`[AI Gap Analysis] Request: TargetRole=${targetRole}`);
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey || apiKey === "dummy_key") throw new Error("Missing API Key");

        const genAIInstance = new GoogleGenerativeAI(apiKey);
        const passedAssessments = (userAssessments || []).filter(a => a.passed);
        
        const prompt = `
            You are an expert career counselor. Generate a precise Skill Gap Analysis focusing on PROGRESSION to reach the "${targetRole}".
            Input Data: User's Background: ${currentRole || 'Not specified'}, Target Role: ${targetRole}, Passed Assessments: ${JSON.stringify(passedAssessments)}, Profile Skills: ${JSON.stringify(userSkills || [])}

            Mandatory Logic:
            1. Identify core skills for "${targetRole}" across Beginner, Intermediate, and Advanced levels.
            2. Compare these against user's passed assessments.
            3. Classification: "Strength": Level cleared. "Needs Improvement": Lower level cleared, need NEXT level. "Missing Skill": Not yet assessed.
            
            Output Format:
            {
                "completedLevel": "Highest milestone reached",
                "nextLevelTarget": "Immediate next milestone",
                "strengths": [{"name": "Skill Name", "level": "Mastered", "target": "Required"}],
                "skillGaps": [{"name": "Skill Name", "level": "Current", "target": "Next", "type": "Needs Improvement"}],
                "keyAreasForImprovement": ["Point 1", "Point 2", "Point 3"],
                "improvementSummary": "Professional guidance summary."
            }
            Output strictly valid JSON.
        `;

        const modelNames = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
        let result;
        let lastError;

        for (const modelName of modelNames) {
            try {
                console.log(`[AI Gap Analysis] Attempting with model: ${modelName}`);
                const model = genAIInstance.getGenerativeModel({ model: modelName, generationConfig: { maxOutputTokens: 2048, temperature: 0.1 } });
                const aiPromise = model.generateContent(prompt);
                const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("AI Timeout")), 15000));
                result = await Promise.race([aiPromise, timeoutPromise]);
                if (result) break;
            } catch (err) { lastError = err; }
        }

        if (!result) throw lastError || new Error("Gap analysis failed");

        const response = await result.response;
        const responseText = response.text().trim();
        const cleanText = responseText.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
        const analysisData = JSON.parse(cleanText);

        return res.status(200).json({ success: true, data: analysisData });
    } catch (error) {
        console.error("[AI Gap Analysis Error]:", error.message);
        return handleGapAnalysisFallback(targetRole, userSkills, userAssessments, res);
    }
}

function handleGapAnalysisFallback(targetRole, userSkills, userAssessments, res) {
    const roleReqs = {
        "Frontend Developer": { "HTML": "Advanced", "CSS": "Advanced", "JavaScript": "Intermediate", "React": "Intermediate", "Git": "Beginner" },
        "Backend Developer": { "Python": "Advanced", "Node.js": "Intermediate", "SQL": "Intermediate", "Git": "Intermediate", "REST API": "Advanced" },
        "QA Engineer": { "Manual Testing": "Advanced", "Selenium": "Intermediate", "JavaScript": "Beginner", "SQL": "Beginner" }
    };
    
    let requirements = roleReqs[targetRole] || { "Technical Communication": "Intermediate", "Problem Solving": "Advanced" };
    const levels = ["None", "Beginner", "Intermediate", "Advanced"];
    const strengths = [];
    const skillGaps = [];
    const userSkillsMap = {};

    if (userSkills) userSkills.forEach(s => userSkillsMap[(s.name || s).toLowerCase()] = s.proficiency || "Intermediate");
    if (userAssessments) userAssessments.forEach(a => { if (a.passed) userSkillsMap[a.skill.toLowerCase()] = a.level; });

    for (const [reqSkill, reqLevel] of Object.entries(requirements)) {
        const userLevel = userSkillsMap[reqSkill.toLowerCase()] || "None";
        if (levels.indexOf(userLevel) >= levels.indexOf(reqLevel)) strengths.push({ name: reqSkill, level: userLevel, target: reqLevel });
        else skillGaps.push({ name: reqSkill, level: userLevel, target: reqLevel, type: userLevel === "None" ? "Missing Skill" : "Needs Improvement" });
    }

    return res.status(200).json({
        success: true,
        data: { 
            completedLevel: "Assessment Phase Active",
            nextLevelTarget: `Path to ${targetRole} Mastery`,
            strengths, 
            skillGaps, 
            keyAreasForImprovement: [`Master the core competencies required for ${targetRole}.`, "Complete technical assessments.", "Bridge theoretical knowledge gaps."],
            improvementSummary: `To reach the ${targetRole} level, leverage your strengths while closing identified gaps.`, 
            isFallback: true 
        }
    });
}

module.exports = { generateAssessment, generateGapAnalysis };
