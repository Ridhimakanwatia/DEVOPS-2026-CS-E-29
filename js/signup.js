const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  root.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.textContent = isDark ? 'Dark mode' : 'Light mode';
});

document.querySelectorAll('.toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const showing = input.type === 'text';
    input.type = showing ? 'password' : 'text';
    btn.textContent = showing ? 'Show' : 'Hide';
  });
});

const form = document.getElementById('signupForm');
const errorBox = document.getElementById('error');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const termsInput = document.getElementById('terms');

function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function clearInvalid(){
  [nameInput, emailInput, pwInput, confirmInput].forEach(el => el.classList.remove('invalid'));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearInvalid();

  let ok = true;
  if(nameInput.value.trim().length < 2){ nameInput.classList.add('invalid'); ok = false; }
  if(!isValidEmail(emailInput.value.trim())){ emailInput.classList.add('invalid'); ok = false; }
  if(pwInput.value.length < 8){ pwInput.classList.add('invalid'); ok = false; }
  if(confirmInput.value !== pwInput.value || confirmInput.value.length === 0){ confirmInput.classList.add('invalid'); ok = false; }
  if(!termsInput.checked){ ok = false; }

  if(!ok){
    errorBox.style.display = 'block';
    return;
  }

  errorBox.style.display = 'none';
  const btn = document.getElementById('createBtn');
  btn.textContent = 'Creating...';
  setTimeout(() => { btn.textContent = 'Create account →'; }, 900);
});

[nameInput, emailInput, pwInput, confirmInput].forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('invalid');
    errorBox.style.display = 'none';
  });
});