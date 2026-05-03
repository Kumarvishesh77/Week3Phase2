// Assessment State
let currentSkillName = "";
let currentLevel = "";
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 0;
let currentAssessmentId = null; // To track the DB record

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
    'Intermediate': { count: 20, time: 1200 },
    'Advanced': { count: 30, time: 2400 }
};

/**
 * Initialize Assessment by calling Backend AI
 */
async function initAssessment() {
    let inputVal = skillInput.value.trim();
    if (!inputVal) return alert("Please enter a skill.");

    currentSkillName = inputVal;
    currentLevel = document.getElementById('level-select').value;
    
    // SHOW LOADING SCREEN IMMEDIATELY
    selectionScreen.innerHTML = `
        <div style="text-align: left; max-width: 800px; margin: 0 auto; background: #ffffff10; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.3); backdrop-filter: blur(20px);">
            <!-- Enterprise Header -->
            <div style="background: var(--accent); padding: 20px 30px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2 style="color: white; margin: 0; font-size: 1.4em; letter-spacing: 0.5px;">Technical Competency Evaluation</h2>
                    <div style="color: rgba(255,255,255,0.8); font-size: 0.85em; margin-top: 4px;">Assessment ID: SB-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                </div>
                <div style="background: rgba(255,255,255,0.2); color: white; padding: 6px 12px; border-radius: 4px; font-size: 0.8em; font-weight: 600; text-transform: uppercase;">
                    <i class="fas fa-shield-alt"></i> Secure Session
                </div>
            </div>

            <div style="padding: 40px;">
                <div style="margin-bottom: 30px;">
                    <h3 style="margin: 0 0 10px 0; font-size: 1.2em; color: var(--accent);">Subject: ${currentSkillName}</h3>
                    <p style="margin: 0; opacity: 0.7; font-size: 0.95em;">Level: ${currentLevel} Proficiency</p>
                </div>

                <!-- Assessment Parameters Grid -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); margin-bottom: 35px;">
                    <div style="background: rgba(255,255,255,0.02); padding: 15px; text-align: center;">
                        <div style="font-size: 0.7em; opacity: 0.5; text-transform: uppercase; margin-bottom: 5px;">Items</div>
                        <div style="font-weight: 600;">${LEVEL_CONFIG[currentLevel].count} MCQs</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); padding: 15px; text-align: center;">
                        <div style="font-size: 0.7em; opacity: 0.5; text-transform: uppercase; margin-bottom: 5px;">Time Limit</div>
                        <div style="font-weight: 600;">${LEVEL_CONFIG[currentLevel].time / 60} Mins</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); padding: 15px; text-align: center;">
                        <div style="font-size: 0.7em; opacity: 0.5; text-transform: uppercase; margin-bottom: 5px;">Max Score</div>
                        <div style="font-weight: 600;">100</div>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); padding: 15px; text-align: center;">
                        <div style="font-size: 0.7em; opacity: 0.5; text-transform: uppercase; margin-bottom: 5px;">Passing Score</div>
                        <div style="font-weight: 600;">70</div>
                    </div>
                </div>

                <div id="loading-status" style="text-align: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 30px;">
                    <div class="loader" style="margin: 0 auto; width: 30px; height: 30px; border-width: 3px;"></div>
                    <p id="dynamic-loading-text" style="opacity: 0.6; margin-top: 15px; font-size: 0.85em; letter-spacing: 0.5px;">Initializing secure examination environment...</p>
                </div>
            </div>
        </div>
    `;

    // 1. Record the start in Database (Non-blocking)
    fetch('/api/profile/assessment/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill: currentSkillName, level: currentLevel })
    }).then(res => res.json()).then(data => {
        if (data.success) currentAssessmentId = data.assessmentId;
    }).catch(e => console.error("DB Error:", e));


    // Dynamic loading messages
    const loadingTexts = [
        "Analyzing technical competencies...",
        "Curating high-impact industry questions...",
        "Validating assessment framework...",
        "Synchronizing with AI Engine...",
        "Almost ready - preparing your environment..."
    ];
    let textIdx = 0;
    const loadingInterval = setInterval(() => {
        const p = document.getElementById('dynamic-loading-text');
        if (p) {
            p.innerText = loadingTexts[textIdx % loadingTexts.length];
            textIdx++;
        }
    }, 3000);
    
    try {
        const response = await fetch('/api/ai/generate-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill: currentSkillName, level: currentLevel })
        });

        clearInterval(loadingInterval);

        if (!response.ok) {
            const errorData = await response.json();
            // Propagate the details if available so the catch block can see "Quota"
            const fullErrorMsg = errorData.details ? `${errorData.message}: ${errorData.details}` : (errorData.message || "Failed to generate assessment");
            throw new Error(fullErrorMsg);
        }

        const data = await response.json();
        questions = data.questions;
        startAssessmentFlow();
    } catch (error) {
        console.error("Assessment Generation Error:", error);
        
        // Fallback Logic
        console.log("Attempting fallback to local quiz data...");
        const resolved = typeof resolveSkill === 'function' ? resolveSkill(currentSkillName) : null;
        if (resolved && typeof domainQuizData !== 'undefined' && domainQuizData[resolved.domain] && domainQuizData[resolved.domain][currentLevel]) {
            questions = domainQuizData[resolved.domain][currentLevel];
            if (questions && questions.length > 0) {
                console.log("Fallback successful.");
                alert("AI Engine is currently busy (Quota reached). Loading standard assessment for " + currentSkillName + ".");
                startAssessmentFlow();
                return;
            }
        }

        const cleanMsg = error.message.includes("Quota") ? "AI Quota Exceeded. Please try again later or use a different API key." : error.message;
        alert("Error: " + cleanMsg);
        location.reload(); // Reset the UI
    }
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

    const scoreValue = document.getElementById('score-value');
    const circularProgress = document.getElementById('circular-progress');
    const readinessLevel = document.getElementById('readiness-level');
    const guidanceText = document.getElementById('guidance-text');
    const insightList = document.getElementById('insight-list');

    // Update Score and Circle
    scoreValue.innerText = `${score}%`;
    const degree = (score / 100) * 360;
    
    let levelMaturity = "Beginner";
    let color = "#3b82f6";
    let isPassed = score >= 70;

    if (score >= 85) {
        levelMaturity = "Advanced";
        color = "#10b981";
    } else if (score >= 70) {
        levelMaturity = "Intermediate";
        color = "#3b82f6";
    } else {
        levelMaturity = "Beginner";
        color = "#f59e0b";
    }

    circularProgress.style.setProperty('--progress-color', color);
    circularProgress.style.setProperty('--progress-deg', `${degree}deg`);
    
    // Progression UI Logic
    let progressionHtml = "";
    if (isPassed) {
        const nextLevel = currentLevel === 'Beginner' ? 'Intermediate' : currentLevel === 'Intermediate' ? 'Advanced' : 'None';
        proginessTitle = `<h3 style="color: #10b981; margin-bottom: 10px;">${currentLevel} Level Completed!</h3>`;
        readinessLevel.innerHTML = `${proginessTitle} Readiness: ${levelMaturity}`;
        
        if (nextLevel !== 'None') {
            progressionHtml = `
                <div style="margin-top: 25px; padding: 20px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <p style="margin-bottom: 15px; font-weight: 500;">Ready to level up? Start your <strong>${nextLevel}</strong> assessment.</p>
                    <div style="display: flex; gap: 10px; justify-content: center;">
                        <button onclick="startNextLevel('${nextLevel}')" class="btn" style="background: var(--accent); padding: 10px 20px;">Proceed to ${nextLevel}</button>
                        <button onclick="location.href='gap-analysis.html'" class="btn" style="background: transparent; border: 1px solid var(--accent); color: var(--accent); padding: 10px 20px;">View Gap Analysis</button>
                    </div>
                </div>
            `;
        } else {
            progressionHtml = `<p style="margin-top: 20px; color: #10b981; font-weight: 600;">Congratulations! You have mastered the Advanced level.</p>
                               <button onclick="location.href='gap-analysis.html'" class="btn" style="margin-top: 15px;">View Career Roadmap</button>`;
        }
        guidanceText.innerText = `Excellent! You have successfully cleared the ${currentLevel} level. Your profile has been updated.`;
    } else {
        readinessLevel.innerText = `Current Proficiency: ${levelMaturity}`;
        progressionHtml = `
            <div style="margin-top: 20px;">
                <button onclick="location.reload()" class="btn" style="background: var(--accent);">Retake ${currentLevel} Assessment</button>
                <p style="margin-top: 15px; font-size: 0.9em; opacity: 0.8;">A score of 70% is required to unlock the next level.</p>
            </div>
        `;
        guidanceText.innerText = "You haven't reached the passing threshold yet. Review the key areas below and try again.";
    }

    // Insert progression actions
    const actionArea = document.getElementById('progression-actions') || document.createElement('div');
    actionArea.id = 'progression-actions';
    actionArea.innerHTML = progressionHtml;
    guidanceText.parentNode.insertBefore(actionArea, guidanceText.nextSibling);

    // Generate Insights
    const insights = [
        `Competency in ${currentSkillName} ${currentLevel} fundamentals.`,
        `Successful validation of technical workflows for this level.`,
        `Identified path for progression to ${currentLevel === 'Advanced' ? 'Expert' : 'the next'} stage.`
    ];
    
    insightList.innerHTML = '';
    insights.forEach(insight => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${insight}`;
        insightList.appendChild(li);
    });

    saveAssessmentToBackend(currentSkillName, currentLevel, score, isPassed);
}

window.startNextLevel = (level) => {
    document.getElementById('level-select').value = level;
    initAssessment();
};

async function saveAssessmentToBackend(skill, level, score, passed) {
    try {
        const response = await fetch('/api/profile/assessment/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill, level, score, passed, assessmentId: currentAssessmentId })
        });
        const result = await response.json();
        console.log("Assessment saved:", result);
    } catch (error) {
        console.error("Failed to save assessment:", error);
    }
}
