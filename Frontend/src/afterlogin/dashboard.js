function goDashboard() {
  window.location.href = "dashboard.html";
}

function goHome() {
  window.location.href = "../index.html";
}

function goProfile() {
  window.location.href = "../profile.html";
}

function goAssessment() {
  window.location.href = "../assessment.html";
}

function goRoadmap() {
  window.location.href = "../roadmap.html";
}

function goGapAnalysis() {
  window.location.href = "../gap-analysis.html";
}

document.addEventListener('DOMContentLoaded', () => {
    // Theme logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const updateThemeUI = (isDark) => {
        body.classList.toggle('dark-mode', isDark);
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    };

    const savedTheme = localStorage.getItem('theme');
    updateThemeUI(savedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.classList.contains('dark-mode');
            const newTheme = !isDark;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            updateThemeUI(newTheme);
        });
    }

    // Route Guard: Protect Dashboard
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = '../index.html';
        return;
    }

    // Logout logic
    const logoutBtns = document.querySelectorAll('.logout-btn, .logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Logged out successfully');
            window.location.href = '../index.html?logout=true';
        });
    });

    // Display username
    if (user && (user.username || user.fullname)) {
        const welcomeSpan = document.querySelector('.user-actions span');
        const displayName = user.fullname || user.username;
        if (welcomeSpan) welcomeSpan.innerText = `Welcome, ${displayName}`;
    }

    // Update Status Cards
    const results = JSON.parse(localStorage.getItem('assessment_results') || '{}');
    const profDetails = JSON.parse(localStorage.getItem('professional_details') || '{}');
    const targetRole = profDetails.targetRole || 'Not Selected';
    const skillsAssessed = Object.keys(results).length;
    
    // Logic for Profile Status
    const isProfileComplete = profDetails.domain && profDetails.currentRole && profDetails.targetRole;
    
    // Status Cards Selection
    const statusCards = document.querySelectorAll('.status-card');
    if (statusCards.length >= 3) {
        // Profile Status
        statusCards[0].querySelector('p').innerText = isProfileComplete ? 'Completed' : 'Incomplete';
        statusCards[0].querySelector('p').style.color = isProfileComplete ? '#10b981' : '#ef4444';
        
        // Skills Assessed
        statusCards[1].querySelector('p').innerText = `${skillsAssessed} Skills`;
        
        // Target Role
        statusCards[2].querySelector('p').innerText = targetRole;
    }
});
