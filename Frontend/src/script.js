const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const mainContainer = document.querySelector('.maincontainer');
const startBtn = document.querySelector('.start');
const navLinks = document.querySelectorAll('.navigation a');

if (registerLink) registerLink.addEventListener('click', () => {
    wrapper.classList.add('active')
})

if (loginLink) loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
})

if (btnPopup) btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
    if (mainContainer) mainContainer.classList.add('hide');
})

if (iconClose) iconClose.addEventListener('click', () => {
    if (wrapper) wrapper.classList.remove('active-popup');
    if (mainContainer) mainContainer.classList.remove('hide');
})

// Functionality for "Get Started" button
if (startBtn) {
    startBtn.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
        if (mainContainer) mainContainer.classList.add('hide');
    });
}

// Functionality for "Home" navigation link
navLinks.forEach(link => {
    if (link.textContent.trim().toLowerCase() === 'home') {
        link.addEventListener('click', () => {
            wrapper.classList.remove('active-popup');
            if (mainContainer) mainContainer.classList.remove('hide');
        });
    }
});

// Dark Mode Toggle Logic
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

// --- BACKEND INTEGRATION ---

const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Login Successful!');
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = 'afterlogin/dashboard.html';
            } else {
                alert('Login Failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login');
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration Successful! Please login.');
                wrapper.classList.remove('active'); // Switch to login view
            } else {
                alert('Registration Failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration');
        }
    });
}
