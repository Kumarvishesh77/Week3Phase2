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
        
        // Ensure getSkillSuggestions is available from skillRepository.js
        const matches = typeof getSkillSuggestions === 'function' ? getSkillSuggestions(value) : [];
        if (matches.length > 0) {
            matches.forEach(skillObj => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.innerHTML = `<span><strong>${skillObj.name}</strong></span><span style="font-size: 0.8em; opacity: 0.6; font-style: italic; margin-left: 10px;">${skillObj.domain}</span>`;
                div.style.display = 'flex';
                div.style.justifyContent = 'space-between';
                div.style.padding = '10px 15px';
                div.onclick = () => { 
                    skillInput.value = skillObj.name; 
                    suggestionsBox.style.display = 'none'; 
                };
                suggestionsBox.appendChild(div);
            });
            suggestionsBox.style.display = 'block';
        } else { suggestionsBox.style.display = 'none'; }
    });
}

/**
 * Initialize Assessment
 */
async function initAssessment() {
    const inputVal = skillInput.value.trim();
    if (!inputVal) return alert("Please enter or select a skill.");

    currentSkillName = inputVal;
    currentLevel = document.getElementById('level-select').value;
    
    selectionScreen.innerHTML = `<h2>SkillBridge AI generating technical questions for <strong>${currentSkillName}</strong>...</h2><div class="loader"></div>`;
    
    try {
        const response = await fetch('/api/ai/generate-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill: currentSkillName, level: currentLevel })
        });
        const result = await response.json();
        
        if (result.questions && result.questions.length > 0) {
            questions = result.questions;
            startAssessmentFlow();
        } else {
            throw new Error("Questions not generated");
        }
    } catch (error) {
        console.error("Init Error:", error);
        alert("Failed to connect to AI engine. Please try again.");
        location.reload();
    }
}

function startAssessmentFlow() {
    currentQuestionIndex = 0;
    userAnswers = [];
    timeLeft = 600; // 10 minutes
    
    selectionScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    
    document.getElementById('quiz-title').innerText = `Assessment: ${currentSkillName}`;
    document.getElementById('current-level-display').innerText = `${currentLevel} Level`;
    
    showQuestion();
    startTimer();
}

function escapeHtml(text) {
    if (!text) return "";
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function showQuestion() {
    const q = questions[currentQuestionIndex];
    questionsContainer.innerHTML = '';
    
    const qDiv = document.createElement('div');
    qDiv.className = 'question-block';
    
    let codeHtml = '';
    if (q.type === 'code' && q.code) {
        codeHtml = `
            <pre style="background: #1e1e1e; color: #d4d4d4; padding: 15px; border-radius: 8px; overflow-x: auto; margin: 15px 0; border: 1px solid #333; font-family: 'Courier New', monospace; font-size: 0.9em; line-height: 1.4;"><code>${escapeHtml(q.code)}</code></pre>
        `;
    }

    let optionsHtml = '';
    if (q.type === 'written') {
        optionsHtml = `
            <textarea id="written-answer" placeholder="Type your technical explanation here..." 
                      style="width: 100%; height: 120px; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.05); color: white; border: 1px solid var(--glass-border); font-family: inherit; resize: vertical;"
                      oninput="handleOptionSelect()"></textarea>
        `;
    } else {
        optionsHtml = `
            <div class="options-list">
                ${q.options.map((opt) => `
                    <label style="display: block; background: rgba(255,255,255,0.03); margin: 8px 0; padding: 12px; border-radius: 10px; cursor: pointer; transition: 0.2s; border: 1px solid transparent;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='transparent'">
                        <input type="radio" name="q" value="${opt}" onchange="handleOptionSelect()" style="margin-right: 10px;"> ${escapeHtml(opt)}
                    </label>
                `).join('')}
            </div>
        `;
    }

    qDiv.innerHTML = `
        <p style="margin-bottom: 10px; opacity: 0.7; font-size: 0.9em;">Question ${currentQuestionIndex + 1} of ${questions.length}</p>
        <p style="font-size: 1.1em; line-height: 1.5; margin-bottom: 15px;"><strong>${escapeHtml(q.question)}</strong></p>
        ${codeHtml}
        ${optionsHtml}
        <div id="action-container" style="margin-top: 30px; display: flex; justify-content: flex-end; visibility: hidden;">
            ${currentQuestionIndex === questions.length - 1 
                ? `<button onclick="submitQuiz()" class="btn" style="background: var(--accent); padding: 12px 30px;">Submit Assessment</button>` 
                : `<button onclick="nextQuestion()" class="btn" style="padding: 12px 30px;">Next Question <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></button>`
            }
        </div>
    `;
    questionsContainer.appendChild(qDiv);
}

window.handleOptionSelect = () => {
    document.getElementById('action-container').style.visibility = 'visible';
};

function captureCurrentAnswer() {
    const q = questions[currentQuestionIndex];
    if (q.type === 'written') {
        const textarea = document.getElementById('written-answer');
        return textarea ? textarea.value.trim() : "";
    } else {
        const selected = document.querySelector('input[name="q"]:checked');
        return selected ? selected.value : "";
    }
}

function nextQuestion() {
    const answer = captureCurrentAnswer();
    if (!answer && questions[currentQuestionIndex].type !== 'written') return;
    userAnswers.push(answer);
    currentQuestionIndex++;
    showQuestion();
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    const update = () => {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        timerDisplay.innerText = `Time Remaining: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    update();
    timerInterval = setInterval(() => {
        timeLeft--;
        update();
        if (timeLeft <= 0) { clearInterval(timerInterval); submitQuiz(); }
    }, 1000);
}

async function submitQuiz() {
    const lastAnswer = captureCurrentAnswer();
    if (userAnswers.length < questions.length) userAnswers.push(lastAnswer);
    
    clearInterval(timerInterval);
    
    let correctCount = 0;
    let scorableCount = 0;

    questions.forEach((q, i) => {
        if (q.type !== 'written') {
            scorableCount++;
            if (userAnswers[i] === q.answer) correctCount++;
        } else {
            // For written, mark as "correct" if not empty for simple scoring
            if (userAnswers[i].length > 10) correctCount++;
            scorableCount++;
        }
    });
    
    const score = Math.round((correctCount / scorableCount) * 100);
    const passed = score >= 70;
    
    showResults(score, passed);
    await saveAssessmentToBackend(currentSkillName, currentLevel, score, passed);
}

function showResults(score, passed) {
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    const circularProgress = document.getElementById('circular-progress');
    const scoreValue = document.getElementById('score-value');
    const readinessLevel = document.getElementById('readiness-level');
    const guidanceText = document.getElementById('guidance-text');
    const insightList = document.getElementById('insight-list');

    scoreValue.innerText = `${score}%`;
    const deg = (score / 100) * 360;
    circularProgress.style.setProperty('--progress-deg', `${deg}deg`);
    circularProgress.style.setProperty('--progress-color', passed ? '#10b981' : '#ef4444');

    readinessLevel.innerHTML = `Skill Readiness: <span style="color: ${passed ? '#10b981' : '#ef4444'}">${passed ? 'VERIFIED' : 'NOT PASSED'}</span>`;
    
    guidanceText.innerText = passed 
        ? `Excellent! You have successfully verified your ${currentSkillName} skills at the ${currentLevel} level.`
        : `Assessment indicates that further development is needed in ${currentSkillName} to reach the ${currentLevel} milestone.`;

    insightList.innerHTML = '';
    const insights = passed 
        ? ["Technical Proficiency Confirmed", "Ready for more complex tasks", "Eligible for role-based verification"]
        : ["Review core architectural concepts", "Focus on technical best practices", "Retake assessment after more practice"];
    
    insights.forEach(text => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${text}`;
        insightList.appendChild(li);
    });
}

async function saveAssessmentToBackend(skill, level, score, passed) {
    try {
        await fetch('/api/profile/assessment/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ skill, level, score, passed })
        });
    } catch (error) { console.error("Save Error:", error); }
}
