// Assessment State
let currentSkillName = "";
let currentLevel = "";
let selectedQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timerInterval = null;
let timeLeft = 1200; // 20 mins

const selectionScreen = document.getElementById('selection-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const timerDisplay = document.getElementById('timer');
const questionsContainer = document.getElementById('questions-container');
const skillInput = document.getElementById('skill-input');
const suggestionsBox = document.getElementById('skill-suggestions');

/**
 * Autocomplete Logic
 */
if (skillInput) {
    skillInput.addEventListener('input', () => {
        const value = skillInput.value.trim();
        suggestionsBox.innerHTML = '';
        if (!value) { suggestionsBox.style.display = 'none'; return; }
        const matches = getSkillSuggestions(value);
        if (matches.length > 0) {
            matches.forEach(skillObj => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `<strong>${skillObj.name}</strong>`;
                div.onclick = () => { skillInput.value = skillObj.name; suggestionsBox.style.display = 'none'; };
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else { suggestionsBox.style.display = 'none'; }
    });
}

/**
 * Initialize Assessment Flow
 */
async function initAssessment() {
    let inputVal = skillInput.value.trim();
    if (!inputVal) return alert("Please enter a skill.");

    currentSkillName = inputVal;
    currentLevel = document.getElementById('level-select').value;
    
    selectionScreen.innerHTML = '<h2>Preparing your custom assessment...</h2><div class="loader"></div>';

    try {
        const response = await fetch('/api/ai/generate-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill: currentSkillName, level: currentLevel })
        });
        
        const data = await response.json();
        if (response.ok) {
            selectedQuestions = data.questions;
            startAssessmentFlow();
        } else {
            alert("Error: " + data.message);
            location.reload();
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("Could not connect to the assessment engine.");
        location.reload();
    }
}

function startAssessmentFlow() {
    currentQuestionIndex = 0;
    userAnswers = new Array(selectedQuestions.length).fill(null);
    timeLeft = 1200; // Reset to 20 mins
    
    selectionScreen.style.display = 'none';
    resultScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    
    document.getElementById('quiz-title').innerText = `Skill Assessment: ${currentSkillName}`;
    document.getElementById('current-level-display').innerText = `${currentLevel} Level`;
    
    showQuestion();
    startTimer();
}

/**
 * Question Engine
 */
function showQuestion() {
    const q = selectedQuestions[currentQuestionIndex];
    questionsContainer.innerHTML = '';
    
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    qDiv.innerHTML = `
        <p style="margin-bottom: 10px; opacity: 0.7;">Question ${currentQuestionIndex + 1} of ${selectedQuestions.length}</p>
        <p><strong>${q.question}</strong></p>
        <div class="options-list">
            ${q.options.map((opt, oi) => `
                <label>
                    <input type="radio" name="q" value="${opt}"> ${opt}
                </label>
            `).join('')}
        </div>
        <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
            ${currentQuestionIndex === selectedQuestions.length - 1 
                ? `<button onclick="submitQuiz()" class="btn" style="background: var(--accent);">Submit Assessment</button>` 
                : `<button onclick="nextQuestion()" class="btn">Next Question</button>`
            }
        </div>
    `;
    questionsContainer.appendChild(qDiv);
}

function nextQuestion() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (!selected) return alert("Please select an answer to proceed.");
    
    userAnswers[currentQuestionIndex] = selected.value;
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
            alert("Time's up! Auto-submitting...");
            submitQuiz();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    timerDisplay.innerText = `Time: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function submitQuiz() {
    const selected = document.querySelector('input[name="q"]:checked');
    if (selected) userAnswers[currentQuestionIndex] = selected.value;

    clearInterval(timerInterval);
    
    let correctCount = 0;
    selectedQuestions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) correctCount++;
    });

    const scorePercent = Math.round((correctCount / selectedQuestions.length) * 100);
    showResults(scorePercent);
}

function showResults(score) {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    const scoreDisplay = document.getElementById('score-display');
    const resultMsg = document.getElementById('result-message');
    const resultActions = document.getElementById('result-actions');
    scoreDisplay.innerText = `${score}%`;
    resultActions.innerHTML = '';
    
    saveResult(currentSkillName, currentLevel, score);
    
    const passThreshold = 70;
    if (score >= passThreshold) {
        resultMsg.innerText = `Assessment Complete: You passed with ${score}%. Skill level verified.`;
        addButton(resultActions, "Back to Dashboard", () => location.href = 'afterlogin/dashboard.html');
    } else {
        resultMsg.innerText = `Assessment Failed (${score}%). 70% required to pass.`;
        addButton(resultActions, "Retake Assessment", () => initAssessment());
    }
}

function addButton(container, text, onClick) {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.innerText = text;
    btn.onclick = onClick;
    btn.style.margin = "0 10px";
    container.appendChild(btn);
}

function saveResult(skill, level, score) {
    const results = JSON.parse(localStorage.getItem('assessment_results') || '{}');
    if (!results[skill]) { results[skill] = { currentLevel: level, history: [] }; }
    if (score >= 70) {
        const lvls = ["Beginner", "Intermediate", "Advanced"];
        const curIdx = lvls.indexOf(results[skill].currentLevel || "None");
        const newIdx = lvls.indexOf(level);
        if (newIdx >= curIdx) results[skill].currentLevel = level;
    }
    results[skill].history.push({ level, score, date: new Date().toISOString(), timeTaken: 1200 - timeLeft });
    localStorage.setItem('assessment_results', JSON.stringify(results));
}
