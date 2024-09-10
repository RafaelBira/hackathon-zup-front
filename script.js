// const email = document.getElementById('email').value;
// const password = document.getElementById('pwd').value;
// const nameUser = document.getElementById('nome-user').value;
// const typeEnterprise = document.getElementById('type-empr').value;
// const descripyEnterprise = document.getElementById('descr-empr').value;
// const areasOfInterest = document.getElementById('interesse').value;
// const objectives = document.getElementById('obj').value;

const userRegister = {
    email: document.getElementById('email').value,
    password: document.getElementById('pwd').value,
    nameUser: document.getElementById('nome-user').value,
    typeEnterprise: document.getElementById('type-empr').value,
    descripyEnterprise: document.getElementById('descr-empr').value,
    areasOfInterest: document.getElementById('interesse').value,
    objectives: document.getElementById('obj').value,
};

async function loginGet(email) {
    const response = await fetch(`http://localhost:8000/login/${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        alert('Failed!');
    }
}

async function loginPost(event) {
    event.preventDefault();

    const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userRegister.email, password: userRegister.password }),
    });
    if (response.ok) {
        localStorage.setItem('isLoggedIn', true);
        window.location.href = 'main.html';
    } else {
        alert('Invalid credentials');
    }
}

async function loginDelete(email) {

    const response = await fetch(`http://localhost:8000/register/${email}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ email }),
    });

   await response.json();
    if (response.ok) {
        alert('Deleted successfully');
    } else {
        alert('Failed!');
    }
}

async function registerGet(email) {
        const response = await fetch(`http://localhost:8000/register/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            alert('Failed!');
        }
}

async function registerPost(event) {
    event.preventDefault();


    const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userRegister }),
    });

    if (response.ok) {
        alert('Registration successful, please login.');
        window.location.href = 'login.html';
    } else {
        alert('Registration failed');
    }
}

async function registerPut(email) {


    const response = await fetch(`http://localhost:8000/register/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userRegister }),
    });
    if (response.ok) {
        alert('Updated successfully, please login.');
        window.location.href = 'login.html';
    } else {
        alert('Update failed');
    }
}

async function registerDelete(email) {

        const response = await fetch(`http://localhost:8000/register/${email}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert('Deleted successfully');
        } else {
            alert('Failed!');
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
