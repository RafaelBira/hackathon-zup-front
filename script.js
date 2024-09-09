
async function login(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'main.html';
    } else {
        alert('Invalid credentials');
    }
}

async function register(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('pwd').value;
    const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
        alert('Registration successful, please login.');
        window.location.href = 'login.html';
    } else {
        alert('Registration failed');
    }
}

async function getCourses() {
    const response = await fetch('http://localhost:8000/courses/');
    if (response.ok) {
        const data = await response.json();
        const coursesList = document.getElementById('courses-list');
        data.courses.forEach(course => {
            const item = document.createElement('li');
            item.className = 'list-group-item';
            item.textContent = `${course.name}: ${course.description} - ${course.link}`;
            coursesList.appendChild(item);
        });
    }
}

if (window.location.pathname.endsWith('main.html')) {
    getCourses();
}
