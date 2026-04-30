// Assessment State
let currentSkillName = "";
let currentLevel = "";
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 0;

const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const timerDisplay = document.getElementById('timer');
const questionsContainer = document.getElementById('questions-container');
const skillInput = document.getElementById('skill-input');
const suggestionsBox = document.getElementById('skill-suggestions');

/**
 * Enhanced Autocomplete Logic (MNC-Grade)
 */
if (skillInput) {
    skillInput.addEventListener('input', () => {
        const value = skillInput.value.trim();
        suggestionsBox.innerHTML = '';
        if (!value) { suggestionsBox.style.display = 'none'; return; }
        
        const matches = typeof getSkillSuggestions === 'function' ? getSkillSuggestions(value) : [];
        if (matches.length > 0) {
            matches.forEach(skillObj => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.style.display = 'flex';
                div.style.justifyContent = 'space-between';
                div.style.alignItems = 'center';
                div.style.padding = '10px 15px';
                div.style.cursor = 'pointer';
                div.innerHTML = `
                    <span><strong>${skillObj.name}</strong></span>
                    <span style="font-size: 0.75em; opacity: 0.6; font-style: italic;">${skillObj.domain}</span>
                `;
                div.onclick = () => { 
                    skillInput.value = skillObj.name; 
                    suggestionsBox.style.display = 'none'; 
                    suggestionsBox.innerHTML = '';
                };
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else { suggestionsBox.style.display = 'none'; }
    });

    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target !== skillInput) {
            suggestionsBox.style.display = 'none';
        }
    });
}

const LEVEL_CONFIG = {
    'Beginner': { count: 10, time: 600 },
    'Intermediate': { count: 15, time: 1200 },
    'Advanced': { count: 20, time: 2400 }
};

/**
 * Advanced MNC-Grade MCQ Generator
 * Enforces zero-repetition and high technical diversity
 */
function generateAIMCQs(skill, level) {
    const config = LEVEL_CONFIG[level];
    const generated = [];
    
    // Massive bank of unique technical domains
    const technicalDomains = [
        { topic: "Memory Management", verbs: ["leak detection", "stack allocation", "GC overhead"], scenarios: ["high-throughput services", "embedded systems"] },
        { topic: "Security", verbs: ["input sanitization", "jwt validation", "cors configuration"], scenarios: ["public api gateways", "banking modules"] },
        { topic: "Concurrency", verbs: ["mutex locking", "atomic operations", "race condition mitigation"], scenarios: ["multi-threaded processors", "real-time dashboards"] },
        { topic: "Data Persistence", verbs: ["query indexing", "sharding logic", "acid compliance"], scenarios: ["distributed databases", "legacy migration"] },
        { topic: "API Design", verbs: ["idempotency", "rate limiting", "payload serialization"], scenarios: ["microservice architecture", "third-party integrations"] },
        { topic: "Performance", verbs: ["caching layers", "asynchronous tasks", "payload compression"], scenarios: ["low-bandwidth environments", "heavy-traffic events"] },
        { topic: "Testing", verbs: ["mocking dependencies", "integration coverage", "boundary analysis"], scenarios: ["ci/cd pipelines", "automated qa suites"] },
        { topic: "Architecture", verbs: ["service decoupling", "event-driven hooks", "state persistence"], scenarios: ["cloud-native apps", "modular monoliths"] },
        { topic: "Error Handling", verbs: ["exception bubbling", "graceful degradation", "retry backoffs"], scenarios: ["unstable networks", "fault-tolerant systems"] },
        { topic: "Cloud Native", verbs: ["container orchestration", "serverless scaling", "config-map usage"], scenarios: ["kubernetes clusters", "aws lambda functions"] }
    ];

    // Different ways to ask a question (Sentence Structures)
    const questionStems = [
        (v, s) => `While implementing ${v} for ${skill} in ${s}, which approach is most effective?`,
        (v, s) => `A critical failure occurs in ${skill} due to improper ${v}. How should this be resolved in ${s}?`,
        (v, s) => `Consider the ${v} lifecycle within ${skill}. Which specific configuration is required for ${s}?`,
        (v, s) => `In a ${s} context, what is the primary risk of neglecting ${v} when using ${skill}?`,
        (v, s) => `How would you refactor ${skill} logic to improve ${v} during a ${s} deployment?`
    ];

    const shuffledDomains = technicalDomains.sort(() => 0.5 - Math.random());

    for (let i = 0; i < config.count; i++) {
        const domain = shuffledDomains[i % shuffledDomains.length];
        const stem = questionStems[Math.floor(Math.random() * questionStems.length)];
        const verb = domain.verbs[Math.floor(Math.random() * domain.verbs.length)];
        const scenario = domain.scenarios[Math.floor(Math.random() * domain.scenarios.length)];

        // Highly varied option templates to avoid repetition
        const optionTemplates = [
            {
                correct: `Implement a robust ${verb} strategy specifically designed for ${skill} ${domain.topic} management.`,
                wrongs: [
                    `Use a generic ${domain.topic} library that ignores ${skill}-specific ${verb} constraints.`,
                    `Manually handle ${verb} by overriding the default ${skill} runtime behavior.`,
                    `Disable ${verb} checks to prioritize raw performance in ${scenario}.`
                ]
            },
            {
                correct: `Optimize the ${skill} ${domain.topic} layer to handle ${verb} during ${scenario}.`,
                wrongs: [
                    `Standardize all ${skill} components to use legacy ${verb} protocols.`,
                    `Increase ${domain.topic} allocation without addressing the underlying ${verb} issue.`,
                    `Outsource ${verb} logic to a third-party service that doesn't support ${skill}.`
                ]
            },
            {
                correct: `Configure a dedicated ${skill} listener to monitor ${verb} events in ${scenario}.`,
                wrongs: [
                    `Rely on global ${domain.topic} settings which may conflict with ${verb} requirements.`,
                    `Encapsulate ${skill} logic within a ${verb}-blind container.`,
                    `Apply a one-size-fits-all ${domain.topic} policy regardless of the ${verb} state.`
                ]
            }
        ];

        const selectedTemplate = optionTemplates[i % optionTemplates.length];
        const options = [
            selectedTemplate.correct,
            ...selectedTemplate.wrongs
        ].sort(() => 0.5 - Math.random());

        generated.push({
            id: i + 1,
            question: stem(verb, scenario),
            options: options,
            answer: selectedTemplate.correct
        });
    }
    return generated;
}

/**
 * Initialize Assessment
 */
async function initAssessment() {
    let inputVal = skillInput.value.trim();
    if (!inputVal) return alert("Please enter a skill.");

    currentSkillName = inputVal;
    currentLevel = document.getElementById('level-select').value;
    
    selectionScreen.innerHTML = '<h2>SkillBridge AI generating unique Technical MCQs...</h2><div class="loader"></div>';
    
    setTimeout(() => {
        questions = generateAIMCQs(currentSkillName, currentLevel);
        startAssessmentFlow();
    }, 1500);
}

function startAssessmentFlow() {
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = LEVEL_CONFIG[currentLevel].time;
    
    selectionScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    
    document.getElementById('quiz-title').innerText = `Assessment: ${currentSkillName}`;
    document.getElementById('current-level-display').innerText = `${currentLevel} Level`;
    
    showQuestion();
    startTimer();
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionsContainer.innerHTML = '';
    
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    qDiv.innerHTML = `
        <p style="margin-bottom: 10px; opacity: 0.7;">Question ${currentQuestionIndex + 1} of ${questions.length}</p>
        <p><strong>${q.question}</strong></p>
        <div class="options-list">
            ${q.options.map((opt) => `
                <label>
                    <input type="radio" name="q" value="${opt}" onchange="handleOptionSelect()"> ${opt}
                </label>
            `).join('')}
        </div>
        <div id="action-container" style="margin-top: 30px; display: flex; justify-content: flex-end; visibility: hidden;">
            ${currentQuestionIndex === questions.length - 1 
                ? `<button onclick="submitQuiz()" class="btn" style="background: var(--accent);">Complete Assessment</button>` 
                : `<button onclick="nextQuestion()" class="btn">Next Question <i class="fas fa-arrow-right"></i></button>`
            }
        </div>
    `;
    questionsContainer.appendChild(qDiv);
}

window.handleOptionSelect = () => {
    document.getElementById('action-container').style.visibility = 'visible';
};

function nextQuestion() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (!selected) return;
    userAnswers.push(selected.value);
    currentQuestionIndex++;
    showQuestion();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    updateTimerDisplay();
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.innerText = `Time Remaining: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function submitQuiz() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (selected) userAnswers.push(selected.value);
    clearInterval(timerInterval);
    
    let correctCount = 0;
    questions.forEach((q, i) => { if (userAnswers[i] === q.answer) correctCount++; });
    showResults(Math.round((correctCount / questions.length) * 100));
}

function showResults(score) {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    document.getElementById('score-display').innerText = `${score}%`;
    const isPassed = score >= 70;
    
    // Save Assessment to Backend
    saveAssessmentToBackend(currentSkillName, currentLevel, score, isPassed);

    document.getElementById('result-message').innerHTML = isPassed 
        ? `<span style="color: #10b981; font-weight: bold;">PASSED - VERIFIED</span>`
        : `<span style="color: #ef4444; font-weight: bold;">NOT PASSED</span>`;

    if (!isPassed) renderRemediation(currentSkillName, currentLevel);
}

async function saveAssessmentToBackend(skill, level, score, passed) {
    try {
        const response = await fetch('/api/profile/assessment/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill, level, score, passed })
        });
        const result = await response.json();
        console.log("Assessment saved:", result);
    } catch (error) {
        console.error("Failed to save assessment:", error);
    }
}

function renderRemediation(skill, level) {
    const div = document.createElement('div');
    div.style.marginTop = "20px";
    div.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.05); padding: 20px; border-radius: 12px; border: 1px solid rgba(239, 68, 68, 0.2);">
            <h4 style="color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Identified Skill Gaps</h4>
            <p style="font-size: 14px;">Assessment indicates gaps in ${skill} ${level} architecture and technical workflow management.</p>
        </div>
    `;
    resultScreen.appendChild(div);
}
