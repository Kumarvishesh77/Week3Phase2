function goDashboard() {
  window.location.href = "dashboard.html";
}

function goProfile() {
  window.location.href = "../profile.html";
}

function goAssessment() {
  // Assuming assessment.html is in the parent src folder based on earlier investigation
  window.location.href = "../assessment.html";
}

function goRoadmap() {
  window.location.href = "../roadmap.html";
}

function goGapAnalysis() {
  window.location.href = "../gap-analysis.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtns = document.querySelectorAll('.logout-btn, .logout');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.removeItem('user');
            alert('Logged out successfully');
            window.location.href = '../index.html';
        });
    });

    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
        const welcomeSpan = document.querySelector('.user-actions span');
        if (welcomeSpan) welcomeSpan.innerText = `Welcome, ${user.username}`;
    }
});
