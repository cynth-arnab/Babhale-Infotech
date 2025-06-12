
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');

// Handle Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      username: loginForm.username.value,
      password: loginForm.password.value
    })
  });
  const data = await res.json();
  messageDiv.textContent = data.message || 'Login error';
  if (res.ok) window.location.href = 'index.html';
});

// Handle Register
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('http://localhost:5000/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      username: registerForm.username.value,
      email: registerForm.email.value,
      password: registerForm.password.value
    })
  });
  const data = await res.json();
  messageDiv.textContent = data.message || 'Registration error';
});
