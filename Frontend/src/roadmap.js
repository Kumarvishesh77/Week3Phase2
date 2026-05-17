document.addEventListener('DOMContentLoaded', () => {
    console.log("[SkillBridge] Roadmap Module v3.0 Initializing...");

    const roadmapContent = document.getElementById('roadmap-content');
    const subtitle = document.getElementById('roadmap-subtitle');
    const progressBar = document.getElementById('progress-bar');
    const readinessPercent = document.getElementById('readiness-percent');
    const totalSkillsElem = document.getElementById('total-skills');
    const completedSkillsElem = document.getElementById('completed-skills');
    const remainingSkillsElem = document.getElementById('remaining-skills');
    const recommendationsBox = document.getElementById('recommendations-box');
    const recommendationsList = document.getElementById('recommendations-list');
    const loadingOverlay = document.getElementById('loading-overlay');
    const startNextBtn = document.getElementById('start-next-btn');

    const LEVEL_NAMES = ["Foundations", "Intermediate", "Advanced"];
    const LEVEL_MAP = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
    const REVERSE_LEVEL_MAP = ["Beginner", "Intermediate", "Advanced"];

    async function init() {
        showLoading(true);
        try {
            // 1. Fetch Profile and Database Assessments
            console.log("[SkillBridge] Fetching user context from database...");
            const response = await fetch('/api/profile/me');
            const result = await response.json();

            if (result.success && result.data) {
                const profile = result.data;
                const targetRole = profile.jobTitle || profile.targetRole;
                
                if (!targetRole) {
                    subtitle.innerHTML = `<span style="color: #ef4444; font-weight: 700;"><i class="fas fa-exclamation-circle"></i> Action Required:</span> Set a target career goal in your profile to generate a roadmap.`;
                    roadmapContent.innerHTML = `<div style="text-align:center; padding: 60px 20px;">
                        <i class="fas fa-user-tag" style="font-size: 4rem; color: var(--primary-btn); opacity: 0.3; margin-bottom: 20px;"></i>
                        <h3>Career Goal Not Found</h3>
                        <p>We need to know your target role to build a custom learning path.</p>
                        <button onclick="location.href='profile.html'" class="main-cta" style="margin-top: 20px;">Set My Career Goal</button>
                    </div>`;
                    showLoading(false);
                    return;
                }

                subtitle.innerText = `Strategic learning path to achieve your goal: ${targetRole}`;
                
                const requirements = roleRequirements[targetRole];
                if (!requirements) {
                    roadmapContent.innerHTML = `<div style="text-align:center; padding: 60px 20px;">
                        <h3>Roadmap Not Available</h3>
                        <p>Detailed requirements for <strong>${targetRole}</strong> are still being mapped by our experts.</p>
                    </div>`;
                    showLoading(false);
                    return;
                }

                // 2. Process and Render Roadmap
                generateRoadmap(profile, requirements);
            } else {
                console.error("[SkillBridge] Failed to load session.");
                window.location.href = 'index.html';
            }
        } catch (error) {
            console.error("[SkillBridge] Roadmap Init Error:", error);
            roadmapContent.innerHTML = `<p style="text-align:center; padding: 40px;">Connection error. Please refresh the page.</p>`;
        } finally {
            showLoading(false);
        }
    }

    function generateRoadmap(profile, requirements) {
        roadmapContent.innerHTML = '';
        
        // 1. Get user's current assessment levels from Database
        const userLevels = {};
        if (profile.assessments) {
            profile.assessments.forEach(ass => {
                if (ass.passed) {
                    const currentLvl = userLevels[ass.skill] || -1;
                    const assLvl = LEVEL_MAP[ass.level];
                    if (assLvl > currentLvl) {
                        userLevels[ass.skill] = assLvl;
                    }
                }
            });
        }

        // 2. Group Skills into Milestones
        const milestones = [
            { id: 0, name: "Foundations", skills: [], completed: false },
            { id: 1, name: "Intermediate", skills: [], completed: false },
            { id: 2, name: "Advanced", skills: [], completed: false }
        ];

        let totalTasks = 0;
        let completedTasks = 0;

        // Map every required skill's progression
        Object.entries(requirements).forEach(([skillName, targetLvlStr]) => {
            const targetLvl = LEVEL_MAP[targetLvlStr];
            const currentLvl = userLevels[skillName] !== undefined ? userLevels[skillName] : -1;

            for (let lvl = 0; lvl <= targetLvl; lvl++) {
                totalTasks++;
                let status = "Locked";
                
                if (lvl <= currentLvl) {
                    status = "Completed";
                    completedTasks++;
                } else if (lvl === currentLvl + 1) {
                    status = "Pending"; // Next logical step for this skill
                }

                const skillData = roadmapData[skillName] ? roadmapData[skillName][REVERSE_LEVEL_MAP[lvl]] : null;
                
                milestones[lvl].skills.push({
                    name: skillName,
                    level: REVERSE_LEVEL_MAP[lvl],
                    status: status,
                    estimated: skillData ? (skillData["Week 2"] ? "2 weeks" : "1 week") : "1 week",
                    icon: getSkillIcon(skillName),
                    topics: skillData ? skillData["Week 1"] : ["Core Fundamentals"]
                });
            }
        });

        // 3. Sequential Level Unlocking Logic
        // A skill is only unlocked if all foundations (Level 0) for ALL required skills are met? 
        // Or just foundations for that specific skill? 
        // User requested: "Unlock next level only after previous completion" -> usually means Milestone Levels.
        
        let prevMilestoneCompleted = true;
        milestones.forEach(m => {
            if (!prevMilestoneCompleted) {
                m.skills.forEach(s => {
                    if (s.status !== "Completed") s.status = "Locked";
                });
            }
            
            const allMilestoneFinished = m.skills.length > 0 && m.skills.every(s => s.status === "Completed");
            m.completed = allMilestoneFinished;
            m.isActive = !allMilestoneFinished && prevMilestoneCompleted;
            
            prevMilestoneCompleted = allMilestoneFinished;
        });

        // 4. Update UI Stats
        const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        setTimeout(() => {
            progressBar.style.width = `${percent}%`;
            readinessPercent.innerText = `${percent}%`;
        }, 300);
        
        totalSkillsElem.innerText = totalTasks;
        completedSkillsElem.innerText = completedTasks;
        remainingSkillsElem.innerText = totalTasks - completedTasks;

        // 5. Render Levels and Skills
        milestones.forEach(m => {
            if (m.skills.length === 0) return;

            const groupDiv = document.createElement('div');
            groupDiv.className = `level-group ${m.isActive ? 'active' : ''} ${m.completed ? 'completed' : ''}`;
            
            const iconClass = m.completed ? 'fa-check-circle' : (m.isActive ? 'fa-bolt' : 'fa-lock');
            
            groupDiv.innerHTML = `
                <div class="level-header">
                    <div class="level-marker"><i class="fas ${iconClass}"></i></div>
                    <div class="level-title">Milestone ${m.id + 1}: ${m.name}</div>
                </div>
                <div class="skills-list">
                    ${m.skills.map(s => `
                        <div class="skill-node ${s.status.toLowerCase()}">
                            <div class="skill-info">
                                <div class="skill-icon"><i class="${s.icon}"></i></div>
                                <div class="skill-details">
                                    <h3>${s.name} <span style="font-weight: 400; opacity: 0.6; font-size: 0.9rem;">(${s.level})</span></h3>
                                    <div class="skill-meta">
                                        <span class="status-badge status-${s.status.toLowerCase()}">${s.status}</span>
                                        <span><i class="far fa-clock"></i> ${s.estimated}</span>
                                    </div>
                                </div>
                            </div>
                            <button class="btn-action ${s.status === 'Locked' ? 'btn-locked' : 'btn-start'}" 
                                    ${s.status === 'Locked' ? 'disabled' : ''}
                                    onclick="startSkill('${s.name}', '${s.level}', ${JSON.stringify(s.topics).replace(/"/g, '&quot;')})">
                                ${s.status === 'Completed' ? 'Review' : (s.status === 'Locked' ? 'Locked' : 'Start Path')}
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            roadmapContent.appendChild(groupDiv);
        });

        // 6. Handle Action Section
        const nextSkill = findNextPending(milestones);
        if (nextSkill) {
            startNextBtn.onclick = () => startSkill(nextSkill.name, nextSkill.level, nextSkill.topics);
            startNextBtn.innerText = `Start ${nextSkill.name}`;
        } else if (completedTasks === totalTasks && totalTasks > 0) {
            startNextBtn.innerText = "Goal Achieved!";
            startNextBtn.disabled = true;
            startNextBtn.style.opacity = "0.6";
        } else {
            startNextBtn.onclick = () => location.href = 'assessment.html';
            startNextBtn.innerText = "Retake Assessments";
        }

        // 7. Recommendations
        updateRecommendations(nextSkill, milestones);
    }

    function findNextPending(milestones) {
        for (const m of milestones) {
            for (const s of m.skills) {
                if (s.status === "Pending") return s;
            }
        }
        return null;
    }

    function updateRecommendations(nextSkill, milestones) {
        recommendationsList.innerHTML = '';
        if (nextSkill) {
            recommendationsBox.style.display = 'block';
            const li = document.createElement('li');
            li.innerHTML = `<strong>Priority:</strong> Master <strong>${nextSkill.name}</strong> at the <strong>${nextSkill.level}</strong> level to progress through Milestone ${LEVEL_MAP[nextSkill.level] + 1}.`;
            recommendationsList.appendChild(li);

            const li2 = document.createElement('li');
            li2.innerText = `Completing foundations in this track will unlock advanced modules in System Design and Architecture.`;
            recommendationsList.appendChild(li2);
        } else {
            recommendationsBox.style.display = 'none';
        }
    }

    function getSkillIcon(name) {
        const n = name.toLowerCase();
        if (n.includes('java')) return 'fab fa-java';
        if (n.includes('sql') || n.includes('database')) return 'fas fa-database';
        if (n.includes('python')) return 'fab fa-python';
        if (n.includes('spring')) return 'fas fa-leaf';
        if (n.includes('rest') || n.includes('api')) return 'fas fa-network-wired';
        if (n.includes('microservice')) return 'fas fa-cubes';
        if (n.includes('design') || n.includes('system')) return 'fas fa-project-diagram';
        if (n.includes('html') || n.includes('css') || n.includes('js') || n.includes('react')) return 'fas fa-code';
        if (n.includes('m365') || n.includes('cloud')) return 'fas fa-cloud';
        if (n.includes('security')) return 'fas fa-shield-alt';
        return 'fas fa-graduation-cap';
    }

    window.startSkill = function(name, level, topics) {
        console.log(`[SkillBridge] Navigation to learning module: ${name} (${level})`);
        const topicList = topics.join('\n• ');
        alert(`🚀 Launching Learning Path for ${name} (${level})\n\nFocus Areas for this week:\n• ${topicList}\n\nHappy Learning!`);
    };

    function showLoading(show) {
        loadingOverlay.style.display = show ? 'flex' : 'none';
    }

    init();
});
