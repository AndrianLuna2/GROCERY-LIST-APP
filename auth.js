document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const authHeading = document.getElementById('auth-heading');
    const submitBtn = document.getElementById('submit-btn');
    const toggleBtn = document.getElementById('toggle-btn');
    let isRegistering = false;

    // Load users and current user from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = localStorage.getItem('currentUser');

    // Check if a user is logged in
    if (currentUser) {
        window.location.href = 'grocerydashboard.html';
    }

    // Toggle between login and registration
    toggleBtn.addEventListener('click', () => {
        isRegistering = !isRegistering;
        if (isRegistering) {
            authHeading.textContent = 'Register';
            submitBtn.textContent = 'Register';
            toggleBtn.textContent = 'Login';
        } else {
            authHeading.textContent = 'Login';
            submitBtn.textContent = 'Login';
            toggleBtn.textContent = 'Register';
        }
        authForm.reset();
    });

    // Handle form submission
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Form submitted:', { username, password, isRegistering }); // Debug log

        if (isRegistering) {
            // Handle registration
            if (users.some(user => user.username === username)) {
                alert('User already exists');
            } else {
                users.push({ username, password });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful. Please log in.');
                // Switch back to login
                authHeading.textContent = 'Login';
                submitBtn.textContent = 'Login';
                toggleBtn.textContent = 'Register';
                isRegistering = false;
                authForm.reset();
            }
        } else {
            // Handle login
            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem('currentUser', username);
                window.location.href = 'grocerydashboard.html';
            } else {
                alert('Invalid credentials');
            }
        }
    });
});
