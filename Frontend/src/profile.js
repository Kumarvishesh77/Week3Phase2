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
    const logoutBtn = document.querySelector('.danger-btn'); // The first one is logout
    
    // Load User Data
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('userNameInput').value = user.username || "";
        document.getElementById('userEmail').innerText = user.email || "email@example.com";
        
        // Update Home link to Dashboard
        const homeLink = document.querySelector('.navigation a[href="index.html"]');
        if (homeLink) homeLink.href = 'afterlogin/dashboard.html';
    } else {
        // Not logged in, redirect to login
        // window.location.href = 'index.html';
    }

    // All editable inputs
    const inputs = document.querySelectorAll('.profile-wrapper input, .profile-wrapper select');

    // 1. Edit Profile Logic
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            inputs.forEach(input => input.disabled = false);
            editBtn.classList.add('hidden');
            editActions.classList.remove('hidden');
            document.getElementById('skillAdder').classList.remove('hidden');
        });
    }

    const exitEditMode = () => {
        inputs.forEach(input => input.disabled = true);
        if (editBtn) editBtn.classList.remove('hidden');
        if (editActions) editActions.classList.add('hidden');
        document.getElementById('skillAdder').classList.add('hidden');
    };

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert("Changes Saved Successfully!");
            exitEditMode();
        });
    }

    if (cancelBtn) cancelBtn.addEventListener('click', exitEditMode);

    // 2. Change Password Popup Logic
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

    // 3. Logout Logic
    if (logoutBtn && logoutBtn.innerText === 'Logout') {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Logged out successfully');
            window.location.href = 'index.html';
        });
    }

    // 4. Dark Mode Toggle Logic
    const toggleBtn = document.getElementById('darkModeToggle');
    const body = document.body;

    const updateThemeUI = (isDark) => {
        body.classList.toggle('dark-mode', isDark);
        if (toggleBtn) {
            toggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
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

// Skill management functions (Global for HTML onclick)
function addSkill() {
    const adder = document.getElementById('skillAdder');
    const editBtn = document.getElementById('editBtn');
    if (editBtn && editBtn.classList.contains('hidden')) {
        adder.classList.toggle('hidden');
    } else {
        alert("Please click 'Edit Profile' first.");
    }
}

function previewDP(e) {
    const reader = new FileReader();
    const dp = document.getElementById('dp');
    reader.onload = () => { if (dp) dp.src = reader.result; }
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
}

function addNewSkillRow() {
    const name = document.getElementById('newSkillName').value;
    const level = document.getElementById('newSkillLevel').value;
    if (!name) return alert("Please select or type a skill name.");

    const tbody = document.getElementById("skills");
    const row = `<tr>
        <td><strong>${name}</strong></td>
        <td><span class="badge">${level}</span></td>
        <td><button class="delete-skill-btn" onclick="this.closest('tr').remove()" style="background:transparent; border:none; cursor:pointer; font-size: 1.1em;">🗑️</button></td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
    document.getElementById('newSkillName').value = "";
}
