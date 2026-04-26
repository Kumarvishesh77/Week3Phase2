const skillRegistry = [
    { name: "Microsoft 365", domain: "Cloud & Enterprise IT", aliases: ["M365", "Office 365", "O365", "Microsoft Office"] },
    { name: "Microsoft Intune", domain: "Cloud & Enterprise IT", aliases: ["Intune", "Endpoint Manager", "MDM"] },
    { name: "Active Directory", domain: "Infrastructure", aliases: ["AD", "Azure AD", "Entra ID"] },
    { name: "Java", domain: "Programming", aliases: ["Java Programming", "J2EE"] },
    { name: "JavaScript", domain: "Programming", aliases: ["JS", "ES6", "Node.js"] },
    { name: "Python", domain: "Programming", aliases: ["Py", "Django", "Flask"] },
    { name: "C#", domain: "Programming", aliases: ["CSharp", ".NET", "DotNet"] },
    { name: "HTML", domain: "Web Development", aliases: ["HTML5", "Web Markup"] },
    { name: "CSS", domain: "Web Development", aliases: ["CSS3", "SASS", "Flexbox"] },
    { name: "React", domain: "Web Development", aliases: ["ReactJS", "Frontend"] },
    { name: "AWS", domain: "Cloud Computing", aliases: ["Amazon Web Services", "EC2", "S3"] },
    { name: "Azure", domain: "Cloud Computing", aliases: ["Microsoft Azure", "Cloud"] },
    { name: "GCP", domain: "Cloud Computing", aliases: ["Google Cloud", "Google Cloud Platform"] },
    { name: "DevOps", domain: "DevOps & SRE", aliases: ["CI/CD", "Site Reliability"] },
    { name: "Docker", domain: "DevOps & SRE", aliases: ["Containers", "Containerization"] },
    { name: "Kubernetes", domain: "DevOps & SRE", aliases: ["K8s", "Orchestration"] },
    { name: "Networking", domain: "Infrastructure", aliases: ["TCP/IP", "Routing", "Switching"] },
    { name: "Cyber Security", domain: "Security", aliases: ["Cybersecurity", "InfoSec", "Ethical Hacking"] },
    { name: "SQL", domain: "Databases", aliases: ["MySQL", "PostgreSQL", "Database"] },
    { name: "Testing", domain: "Quality Assurance", aliases: ["QA", "Automation", "Selenium"] },
    { name: "Linux", domain: "Infrastructure", aliases: ["Ubuntu", "CentOS", "Bash"] },
    { name: "Machine Learning", domain: "Artificial Intelligence", aliases: ["ML", "Data Science"] }
];

// Helper to get matching skills for autocomplete
function getSkillSuggestions(query) {
    const q = query.toLowerCase();
    return skillRegistry.filter(s => 
        s.name.toLowerCase().includes(q) || 
        s.aliases.some(a => a.toLowerCase().includes(q))
    );
}

// Helper to resolve any input to the primary skill and domain
function resolveSkill(input) {
    const q = input.toLowerCase();
    return skillRegistry.find(s => 
        s.name.toLowerCase() === q || 
        s.aliases.some(a => a.toLowerCase() === q)
    );
}
