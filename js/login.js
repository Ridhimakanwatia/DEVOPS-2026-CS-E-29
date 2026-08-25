const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? 'Dark mode' : 'Light mode';
});

const togglePw = document.getElementById('togglePw');
const pwInput = document.getElementById('password');
togglePw.addEventListener('click', () => {
  const showing = pwInput.type === 'text';
  pwInput.type = showing ? 'password' : 'text';
  togglePw.textContent = showing ? 'Show' : 'Hide';
});

const form = document.getElementById('loginForm');
const errorBox = document.getElementById('error');
const emailInput = document.getElementById('email');

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const emailOk = isValidEmail(emailInput.value.trim());
  const pwOk = pwInput.value.length > 0;
  if(!emailOk || !pwOk){
    errorBox.style.display = 'block';
    return;
  }
  errorBox.style.display = 'none';
  const btn = document.getElementById('signin');
  btn.textContent = 'Checking...';
  setTimeout(() => { btn.textContent = 'Sign in →'; }, 900);
});

[emailInput, pwInput].forEach(el => {
  el.addEventListener('input', () => { errorBox.style.display = 'none'; });
});

