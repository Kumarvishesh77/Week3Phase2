document.addEventListener('DOMContentLoaded', () => {
    const profileWrapper = document.querySelector('.profile-wrapper');
    const passwordWrapper = document.querySelector('.wrapper');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const editActions = document.querySelector('.edit-actions');
    const changePassBtn = document.getElementById('changePassBtn');
    const iconClose = document.querySelector('.icon-close');
    const confirmPassBtn = document.querySelector('.form-box.login .btn');
    const logoutBtn = document.querySelector('.danger-btn');
    
    // --- Load User Data ---
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userNameInput').value = user.username || "";
        document.getElementById('userEmail').innerText = user.email || "email@example.com";
        
        const homeLink = document.querySelector('.navigation a[href="index.html"]');
        if (homeLink) homeLink.href = 'index.html';
    }

    // --- Load Professional Details ---
    const loadProfessionalDetails = () => {
        const details = JSON.parse(localStorage.getItem('professional_details') || '{}');
        if (details) {
            if (details.domain) document.getElementById('domainSelect').value = details.domain;
            if (details.currentRole) document.getElementById('jobRoleInput').value = details.currentRole;
            if (details.targetDomain) document.getElementById('targetDomainInput').value = details.targetDomain;
            if (details.targetRole) document.getElementById('targetRoleInput').value = details.targetRole;
        }
    };

    // --- Populate Domain Dropdown if empty ---
    const domainSelect = document.getElementById('domainSelect');
    if (domainSelect && domainSelect.options.length <= 1) {
        const domains = ["Cloud & Enterprise IT", "Infrastructure", "Programming", "Web Development", "DevOps & SRE", "Security", "Databases", "Artificial Intelligence"];
        domains.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.innerText = d;
            domainSelect.appendChild(opt);
        });
    }

    loadProfessionalDetails();

    // --- Load Saved Skills ---
    const loadSkills = () => {
        const skillsList = document.getElementById('user-skills-list');
        const savedSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
        
        if (skillsList) {
            skillsList.innerHTML = '';
            if (savedSkills.length === 0) {
                skillsList.innerHTML = '<li style="opacity: 0.5;">No skills added yet.</li>';
            } else {
                savedSkills.forEach((skill, index) => {
                    const li = document.createElement('li');
                    li.style.cssText = "background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255,255,255,0.1);";
                    li.innerHTML = `
                        <span><strong>${skill.name}</strong> &ndash; ${skill.level}</span>
                        <button onclick="deleteSkill(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer;"><i class="fas fa-trash"></i></button>
                    `;
                    skillsList.appendChild(li);
                });
            }
        }
    };

    loadSkills();

    // --- Skill Form Submission ---
    const skillForm = document.getElementById('skill-form');
    if (skillForm) {
        skillForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('skill-name').value.trim();
            const level = document.getElementById('skill-level').value;

            if (!name) return alert("Please enter a skill name.");
            if (!level) return alert("Please select a proficiency level.");

            const savedSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
            savedSkills.push({ name, level, addedAt: new Date().toISOString() });
            localStorage.setItem('user_skills', JSON.stringify(savedSkills));

            alert("Skill added successfully!");
            skillForm.reset();
            loadSkills();
        });
    }

    // --- Profile UI Logic ---
    const inputs = document.querySelectorAll('.profile-wrapper input, .profile-wrapper select');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            inputs.forEach(input => input.disabled = false);
            editBtn.classList.add('hidden');
            editActions.classList.remove('hidden');
        });
    }

    const exitEditMode = () => {
        inputs.forEach(input => input.disabled = true);
        if (editBtn) editBtn.classList.remove('hidden');
        if (editActions) editActions.classList.add('hidden');
    };

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            // Save Professional Details
            const details = {
                domain: document.getElementById('domainSelect').value,
                currentRole: document.getElementById('jobRoleInput').value,
                targetDomain: document.getElementById('targetDomainInput').value,
                targetRole: document.getElementById('targetRoleInput').value
            };
            
            localStorage.setItem('professional_details', JSON.stringify(details));
            // Also sync target role for dashboard
            localStorage.setItem('target_role', details.targetRole);
            
            alert("Changes Saved Successfully!");
            exitEditMode();
        });
    }

    if (cancelBtn) cancelBtn.addEventListener('click', exitEditMode);

    // --- Password & Logout & Theme (Existing) ---
    if (changePassBtn) {
        changePassBtn.addEventListener('click', () => {
            profileWrapper.classList.add('hide');
            passwordWrapper.classList.add('active-popup');
        });
    }

    const closePasswordPopup = () => {
        passwordWrapper.classList.remove('active-popup');
        profileWrapper.classList.remove('hide');
    };

    if (iconClose) iconClose.addEventListener('click', closePasswordPopup);

    if (confirmPassBtn) {
        confirmPassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Password changed successfully!");
            closePasswordPopup();
        });
    }

    if (logoutBtn && logoutBtn.innerText === 'Logout') {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Logged out successfully');
            window.location.href = 'index.html';
        });
    }

    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;
    const updateThemeUI = (isDark) => {
        body.classList.toggle('dark-mode', isDark);
        if (toggleBtn) toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    };
    const savedTheme = localStorage.getItem('theme');
    updateThemeUI(savedTheme === 'dark');
    if (toggleBtn) toggleBtn.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        const newTheme = !isDark;
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        updateThemeUI(newTheme);
    });
});

// Global functions
function deleteSkill(index) {
    const savedSkills = JSON.parse(localStorage.getItem('user_skills') || '[]');
    savedSkills.splice(index, 1);
    localStorage.setItem('user_skills', JSON.stringify(savedSkills));
    window.location.reload();
}

function previewDP(e) {
    const reader = new FileReader();
    const dp = document.getElementById('dp');
    reader.onload = () => { if (dp) dp.src = reader.result; }
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
}
