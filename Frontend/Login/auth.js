document.addEventListener('DOMContentLoaded', function () {
    // Handle registration
    document.getElementById('registration-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const user = {
            username: document.getElementById('register-username').value,
            email: document.getElementById('register-email').value,
            password: document.getElementById('register-password').value
        };

        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            return response.json();
        })
        .then(data => {
            alert('Registration successful');
            // Optionally redirect to login page or automatically log the user in
        })
        .catch(error => {
            alert(error.message);
        });
    });

    // Handle login
    document.getElementById('login-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
        })
        .then(response => {
            if (response.ok) {
                // Redirect to the Brewery page on successful login
                window.location.href = '../Brewery/brewery.html';
            } else {
                throw new Error('Login failed');
            }
        })
        .catch(error => {
            alert(error.message);
        });
    });
});
