/**
 * AI Question Generator Controller
 * Generates fresh questions at runtime based on Skill and Level.
 */

const generateQuestions = (skill, level) => {
    // This is a Synthetic AI Generator
    // It creates questions by combining skill-specific concepts with difficulty-appropriate stems.
    
    const questions = [];
    
    // Concept patterns for different domains (Internal Knowledge Base)
    const skillPatterns = {
        "Microsoft 365": ["License Management", "Teams Collaboration", "Exchange Online", "SharePoint Permissions", "OneDrive Sync", "M365 Admin Center", "Security & Compliance", "SSPR", "Entra ID", "Group Policies"],
        "Intune": ["Compliance Policies", "Configuration Profiles", "App Protection", "Enrollment", "Autopilot", "MAM vs MDM", "Device Security", "Conditional Access", "Remote Wipe", "Company Portal"],
        "Java": ["JVM Architecture", "Multithreading", "Spring Boot", "Garbage Collection", "Inheritance", "Interfaces", "Generics", "Streams API", "Exception Handling", "Maven/Gradle"],
        "Networking": ["OSI Model", "TCP/IP", "Subnetting", "Routing Protocols", "Firewalls", "VPN Tunnels", "DNS Resolution", "DHCP Scopes", "Load Balancing", "VLANs"],
        "JavaScript": ["DOM", "Async/Await", "Promises", "Closures", "Hoisting", "React Hooks", "Event Loop", "Prototypes", "ES6 Modules", "Fetch API"]
    };

    // Level-based question stems
    const stems = {
        "Beginner": [
            "What is the primary purpose of {concept}?",
            "Which of the following is a basic characteristic of {concept}?",
            "Where would you typically configure {concept}?",
            "What does {concept} stand for in this context?",
            "Identify the correct definition of {concept}."
        ],
        "Intermediate": [
            "In a real-world scenario, how would you optimize {concept}?",
            "Which configuration is required to enable {concept} for a remote team?",
            "What happens if {concept} is misconfigured during a sync operation?",
            "Compare {concept} with its traditional alternative. What is the key advantage?",
            "Select the best practice for implementing {concept}."
        ],
        "Advanced": [
            "Architecturally, how does {concept} handle high-availability failures?",
            "Troubleshoot a scenario where {concept} fails due to a token mismatch.",
            "Analyze the impact of {concept} on multi-tenant isolation.",
            "Design a solution where {concept} integrates with a legacy API.",
            "What is the underlying mechanism used by {concept} to prevent deadlocks?"
        ]
    };

    const concepts = skillPatterns[skill] || ["System Architecture", "Performance", "Security", "Scalability", "Reliability", "Optimization", "Testing", "Maintenance", "Cloud Integration", "Data Flow"];

    for (let i = 0; i < 20; i++) {
        const concept = concepts[i % concepts.length];
        const stem = stems[level][Math.floor(Math.random() * stems[level].length)];
        const questionText = stem.replace("{concept}", `${skill} ${concept}`);
        
        // Generate random but plausible looking options
        const options = [
            `Implement ${concept} using standard protocols.`,
            `Configure ${skill} to prioritize ${concept}.`,
            `Disable ${concept} to improve overall latency.`,
            `Monitor ${concept} through the global dashboard.`
        ];
        
        // Shuffle options and pick a "correct" one index
        const correctIndex = Math.floor(Math.random() * 4);
        // In a real AI, the text would be meaningful. Here we simulate the structure.
        
        questions.push({
            id: i + 1,
            question: questionText,
            options: options,
            correctOptionIndex: correctIndex,
            answer: options[correctIndex] // for scoring
        });
    }

    return questions;
};

async function generateAssessment(req, res) {
    try {
        const { skill, level } = req.body;
        if (!skill || !level) {
            return res.status(400).json({ message: "Skill and Level are required" });
        }

        // Simulate AI thinking time
        const questions = generateQuestions(skill, level);

        return res.status(200).json({
            skill,
            level,
            generatedAt: new Date().toISOString(),
            questions: questions
        });
    } catch (error) {
        console.error("AI Generation Error:", error);
        return res.status(500).json({ message: "Internal AI Engine error" });
    }
}

module.exports = { generateAssessment };
