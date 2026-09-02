import api from './axios';

export async function getRecommendations(answers) {
  // answers = { budget, use, form, portability, os }
  const res = await api.post('/recommend', answers);
  return res.data; // expected: { results: [ { name, price, matchScore, ... } ] }
}

export async function getDashboardSummary() {
  const res = await api.get('/dashboard');
  return res.data; // expected stats + recent matches
}