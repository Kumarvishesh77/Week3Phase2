/**
 * AI Question Generator Controller
 * Generates high-quality questions using Google Gemini AI with local fallback.
 */
const { GoogleGenerativeAI } = require("@google/generative-ai");
const localQuestions = require("../data/localQuestions");

/**
 * Utility to shuffle an array (Fisher-Yates)
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function handleFallback(skill, level, res, originalError) {
    console.warn(`[AI Fallback] Attempting fallback for ${skill} (${level}). Reason: ${originalError}`);
    
    const s = skill.toLowerCase();
    let questionsPool = [];
    let matchedCategory = "";

    // 1. GLOBAL Domain Mapping (Detect specific technical fields)
    if (s.includes("python") || s.includes("py")) matchedCategory = "Python";
    else if (s.includes("javascript") || s.includes("js") || s.includes("script") || s.includes("react") || s.includes("vue") || s.includes("angular")) matchedCategory = "JavaScript";
    else if (s.includes("java") && !s.includes("script")) matchedCategory = "Java";
    else if (s.includes("sql") || s.includes("database") || s.includes("db") || s.includes("mongo") || s.includes("postgres") || s.includes("oracle")) matchedCategory = "SQL";
    else if (s.includes("test") || s.includes("qa") || s.includes("automation") || s.includes("selenium") || s.includes("cypress")) matchedCategory = "Testing";
    else if (s.includes("web") || s.includes("html") || s.includes("css")) matchedCategory = "Web Development";
    else if (s.includes("infra") || s.includes("network") || s.includes("cloud") || s.includes("azure") || s.includes("aws") || s.includes("m365")) matchedCategory = "Cloud";

    // 2. Get primary questions from local bank
    if (matchedCategory && localQuestions[matchedCategory]) {
        questionsPool = localQuestions[matchedCategory][level] || localQuestions[matchedCategory]["Beginner"] || [];
    }

    // 3. Fallback to literal key match (e.g. if skill is "General")
    if (questionsPool.length === 0 && localQuestions[skill]) {
        questionsPool = localQuestions[skill][level] || localQuestions[skill]["Beginner"] || [];
    }

    // 4. Supplement to exactly 10 questions using level-appropriate General pool
    const generalPool = localQuestions["General"][level] || localQuestions["General"]["Beginner"] || [];
    let finalPool = shuffleArray(questionsPool);
    
    if (finalPool.length < 10) {
        console.log(`[AI Fallback] Supplementing ${10 - finalPool.length} questions from General pool for skill: ${skill}`);
        const shuffledGeneral = shuffleArray(generalPool);
        for (const q of shuffledGeneral) {
            if (finalPool.length >= 10) break;
            if (!finalPool.some(existing => existing.question === q.question)) {
                finalPool.push(q);
            }
        }
    }

    // 5. Final re-indexing for UI
    const selectedQuestions = finalPool.slice(0, 10).map((q, index) => ({
        ...q,
        id: index + 1
    }));

    if (selectedQuestions.length > 0) {
        return res.status(200).json({
            skill,
            level,
            generatedAt: new Date().toISOString(),
            questions: selectedQuestions,
            isFallback: true,
            errorNote: "AI Quota/Key Error. Showing technical assessment related to your domain."
        });
    }

    return res.status(500).json({ message: "Failed to generate assessment" });
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
        const questionCount = 10;

        let prompt = "";
        const attemptSeed = new Date().toISOString();
        if (level === "Advanced") {
            prompt = `
                Task: Generate Exactly ${questionCount} unique Advanced-level questions for skill: "${skill}" ONLY.
                Constraint: Every question must be related to "${skill}" and its ecosystem. Do NOT generate generic IT questions.
                Attempt ID: ${attemptSeed}
                
                Mandatory Question Mix (10 Questions Total):
                1. Code-Debugging (4): Provide technical code snippets with realistic bugs (logic, syntax, or architectural) SPECIFIC to "${skill}". Include a "code" field.
                2. Technical Written/Descriptive (3): Complex conceptual questions where the user must type a brief technical explanation about "${skill}". Use type: "written".
                3. Advanced MCQ (3): Deep-dive theoretical or architectural multiple-choice questions about "${skill}". Use type: "mcq".

                Format: Valid JSON ONLY.
                Structure: 
                {
                    "questions": [
                        {
                            "id": 1, 
                            "type": "code", 
                            "question": "Debug this ${skill} snippet...", 
                            "code": "...", 
                            "options": ["Fix A", "Fix B", "Fix C", "Fix D"], 
                            "answer": "Correct Fix Text"
                        }
                    ]
                }
                
                Requirements:
                - Difficulty: Strictly Advanced (Expert Level).
                - Domain focus: ONLY "${skill}".
            `;
        } else {
            prompt = `
                Task: Generate Exactly ${questionCount} unique assessment questions for skill: "${skill}" ONLY.
                Constraint: Questions must be related to "${skill}" only. Do NOT repeat generic questions.
                Attempt ID: ${attemptSeed}
                Requirements:
                1. Difficulty: ${level} strictly.
                2. Format: Standard MCQs with 4 options.
                3. Content: Must be technically accurate and specific to "${skill}".
                4. Randomness: Ensure a diverse range of sub-topics within "${skill}".

                Format: Valid JSON ONLY.
                Structure: {"questions": [{"id": 1, "type": "mcq", "question": "...", "options": ["A", "B", "C", "D"], "answer": "Correct Answer Text"}]}
            `;
        }

        const modelName = "gemini-1.5-flash";
        const model = genAIInstance.getGenerativeModel({ 
            model: modelName,
            generationConfig: { maxOutputTokens: 2500, temperature: 0.9 } // Increased temperature for higher variety
        });

        const aiPromise = model.generateContent(prompt);
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error("AI Timeout")), 15000)
        );

        const result = await Promise.race([aiPromise, timeoutPromise]);
        const response = await result.response;
        const responseText = response.text().trim();
        
        const cleanText = responseText.replace(/^```json\n?/, "").replace(/\n?```$/, "").trim();
        const assessmentData = JSON.parse(cleanText);

        if (!assessmentData.questions || assessmentData.questions.length === 0) {
            throw new Error("Empty questions returned from AI");
        }

        // Ensure exactly 10 questions and shuffle them
        let finalQuestions = shuffleArray(assessmentData.questions);
        
        // If AI returns fewer than 10, supplement from local bank as a safety net
        if (finalQuestions.length < 10) {
            console.log(`[AI] AI returned only ${finalQuestions.length} questions. Supplementing...`);
            const fallbackPool = localQuestions["General"][level] || localQuestions["General"]["Beginner"] || [];
            const shuffledFallback = shuffleArray(fallbackPool);
            for (const q of shuffledFallback) {
                if (finalQuestions.length >= 10) break;
                finalQuestions.push(q);
            }
        }

        finalQuestions = finalQuestions.slice(0, 10).map((q, i) => ({ ...q, id: i + 1 }));

        return res.status(200).json({
            skill,
            level,
            generatedAt: new Date().toISOString(),
            questions: finalQuestions
        });
    } catch (error) {
        console.error("[AI Error]:", error.message);
        return handleFallback(skill, level, res, error.message);
    }
}

async function generateGapAnalysis(req, res) {
    const { currentRole, targetRole, userSkills, userAssessments, company } = req.body;

    if (!targetRole) {
        return res.status(400).json({ success: false, message: "Target role is required." });
    }

    try {
        console.log(`[AI Gap Analysis] Request: TargetRole=${targetRole}, Company=${company || 'None'}`);
        const apiKey = process.env.GOOGLE_GENAI_API_KEY;
        if (!apiKey || apiKey === "dummy_key") throw new Error("Missing API Key");

        const genAIInstance = new GoogleGenerativeAI(apiKey);
        const passedAssessments = (userAssessments || []).filter(a => a.passed);
        
        const prompt = `
            You are an expert career counselor at ${company || 'SkillBridge'}. Generate a precise Skill Gap Analysis focusing on PROGRESSION to reach the "${targetRole}".
            Input Data: 
            - User's Background: ${currentRole || 'Not specified'}
            - Target Role: ${targetRole}
            - Current Company: ${company || 'General'}
            - Passed Assessments: ${JSON.stringify(passedAssessments)}
            - Profile Skills: ${JSON.stringify(userSkills || [])}

            Mandatory Logic:
            1. Identify core skills for "${targetRole}" across Beginner, Intermediate, and Advanced levels.
            2. If company is specified, prioritize skills relevant to that company's focus (e.g., TCS focuses on Java/SQL, Infosys on React/JS).
            3. Compare these against user's passed assessments.
            4. Classification: "Strength": Level cleared. "Needs Improvement": Lower level cleared, need NEXT level. "Missing Skill": Not yet assessed.
            
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
        const assessmentData = JSON.parse(cleanText);

        return res.status(200).json({ success: true, data: assessmentData });
    } catch (error) {
        console.error("[AI Gap Analysis Error]:", error.message);
        return handleGapAnalysisFallback(targetRole, userSkills, userAssessments, company, res);
    }
}

function handleGapAnalysisFallback(targetRole, userSkills, userAssessments, company, res) {
    const roleReqs = {
        "Frontend Developer": { "HTML": "Advanced", "CSS": "Advanced", "JavaScript": "Intermediate", "React": "Intermediate" },
        "Backend Developer": { "Python": "Advanced", "Node.js": "Intermediate", "SQL": "Advanced" },
        "Full Stack Developer": { "HTML": "Advanced", "JavaScript": "Advanced", "Node.js": "Intermediate", "CSS": "Intermediate" },
        "Java Developer": { "Java": "Advanced", "Spring Boot": "Intermediate", "SQL": "Intermediate" },
        "Data Analyst": { "SQL": "Advanced", "Excel": "Advanced", "Python": "Intermediate", "Power BI": "Intermediate" },
        "Data Scientist": { "Python": "Advanced", "Machine Learning": "Intermediate", "Statistics": "Advanced", "SQL": "Intermediate" },
        "Business Analyst": { "Requirement Analysis": "Advanced", "SQL": "Intermediate", "Excel": "Advanced", "Communication": "Advanced" },
        "Machine Learning Engineer": { "Python": "Advanced", "Machine Learning": "Advanced", "Statistics": "Intermediate", "PyTorch": "Intermediate" },
        "Network Engineer": { "Networking": "Advanced", "Security": "Intermediate", "Routing": "Advanced" },
        "Cloud Engineer": { "Cloud Computing": "Advanced", "Networking": "Intermediate", "Docker": "Intermediate", "Kubernetes": "Intermediate" },
        "Microsoft 365 Admin": { "Microsoft 365": "Advanced", "Networking": "Intermediate", "Security": "Intermediate" },
        "Intune Specialist": { "Intune": "Advanced", "Security": "Advanced", "Networking": "Intermediate" }
    };
    
    // Company Priorities
    const companyPriorities = {
        "TCS": ["Java", "Spring Boot", "SQL"],
        "Infosys": ["JavaScript", "React", "Angular"],
        "Wipro": ["Networking", "Security", "Cloud Computing"],
        "Accenture": ["System Design", "Microservices", "Cloud Architecture"]
    };

    let requirements = roleReqs[targetRole] || { "Technical Communication": "Intermediate", "Problem Solving": "Advanced" };
    const prioritizedSkills = companyPriorities[company] || [];

    const levels = ["None", "Beginner", "Intermediate", "Advanced"];
    const strengths = [];
    const skillGaps = [];
    const userSkillsMap = {};

    if (userSkills) userSkills.forEach(s => userSkillsMap[(s.name || s).toLowerCase()] = s.proficiency || "Intermediate");
    if (userAssessments) userAssessments.forEach(a => { if (a.passed) userSkillsMap[a.skill.toLowerCase()] = a.level; });

    for (const [reqSkill, reqLevel] of Object.entries(requirements)) {
        const userLevel = userSkillsMap[reqSkill.toLowerCase()] || "None";
        const isPriority = prioritizedSkills.includes(reqSkill);
        const effectiveReqLevel = isPriority ? "Advanced" : reqLevel;

        if (levels.indexOf(userLevel) >= levels.indexOf(effectiveReqLevel)) {
            strengths.push({ name: reqSkill, level: userLevel, target: effectiveReqLevel });
        } else {
            skillGaps.push({ 
                name: reqSkill, 
                level: userLevel, 
                target: effectiveReqLevel, 
                type: userLevel === "None" ? "Missing Skill" : "Needs Improvement",
                priority: isPriority ? "High (Company Priority)" : "Normal"
            });
        }
    }

    return res.status(200).json({
        success: true,
        data: { 
            completedLevel: strengths.length > 0 ? "Initial Core Validated" : "Assessment Phase Active",
            nextLevelTarget: `Achieve ${targetRole} Proficiency ${company ? `at ${company}` : ''}`,
            strengths, 
            skillGaps, 
            keyAreasForImprovement: [
                `Master the core technical requirements for ${targetRole}.`,
                ...prioritizedSkills.map(s => `Focus on ${s} to align with ${company} standards.`),
                "Complete verified technical assessments to validate your proficiency levels."
            ],
            improvementSummary: `To successfully transition to a ${targetRole} role${company ? ` within ${company}` : ''}, you should prioritize closing the identified gaps in ${skillGaps.slice(0,2).map(g => g.name).join(' and ')}. Your existing knowledge in ${strengths.slice(0,2).map(s => s.name).join(' and ')} provides a strong foundation.`, 
            isFallback: true 
        }
    });
}

module.exports = { generateAssessment, generateGapAnalysis };
