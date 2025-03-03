class Auth {
    static async login(email, password) {
        try {
            const response = await fetch('/api/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (data.success) {
                window.location.href = '/pages/home.html';
            }
            return data;
        } catch (error) {
            console.error('Error during login:', error);
        }
    }

    static async register(fullName, email, password) {
        try {
            const response = await fetch('/api/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, password })
            });
            const data = await response.json();
            if (data.success) {
                window.location.href = '/pages/login.html';
            }
            return data;
        } catch (error) {
            console.error('Error during registration:', error);
        }
    }

    static async logout() {
        try {
            const response = await fetch('/api/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const resetPasswordForm = document.getElementById('resetPasswordForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            const response = await Auth.register(fullName, email, password);
            if (response.success) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await Auth.login(email, password);
            if (response.success) {
                alert('Login successful');
            } else {
                alert('Login failed');
            }
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            // Simulate API call for password reset
            setTimeout(() => {
                alert('Password reset link sent to your email');
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    // Update logout redirect
    document.getElementById('logoutBtn')?.addEventListener('click', async () => {
        const response = await Auth.logout();
        if (response.success) {
            window.location.href = '/pages/login.html';
        }
    });
});
