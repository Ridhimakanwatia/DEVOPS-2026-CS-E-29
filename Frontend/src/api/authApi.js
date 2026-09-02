import api from './axios';

export async function signupUser({ name, email, password }) {
  const res = await api.post('/signup', { name, email, password });
  return res.data; // expected: { token, user }
}

export async function loginUser({ email, password }) {
  const res = await api.post('/login', { email, password });
  return res.data; // expected: { token, user }
}