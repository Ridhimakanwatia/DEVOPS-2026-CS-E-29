import { useState } from 'react';
import Sidebar from '../components/sidebar.jsx';
import MatchCard from '../components/Matchcard.jsx';
import { getRecommendations } from '../api/recommendApi';
import './recommender.css';

const BUDGET_OPTIONS = [
  { label: 'Up to ₹40k', value: 40000 },
  { label: 'Up to ₹60k', value: 60000 },
  { label: 'Up to ₹80k', value: 80000 },
  { label: 'Up to ₹1L', value: 100000 },
  { label: 'Up to ₹1.5L', value: 150000 },
  { label: '₹1.5L+', value: 999999 },
];
const USE_OPTIONS = [
  { label: 'Everyday & study', value: 'everyday' },
  { label: 'Office / business', value: 'office' },
  { label: 'Coding & development', value: 'coding' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Photo / video editing', value: 'editing' },
  { label: 'Heavy multitasking / AI-ML', value: 'heavy' },
];
const FORM_OPTIONS = [
  { label: 'Laptop', value: 'laptop' },
  { label: 'Desktop PC', value: 'desktop' },
  { label: 'Either works', value: 'either' },
];
const PORTABILITY_OPTIONS = [
  { label: 'Carrying it daily', value: 'high' },
  { label: 'Occasional travel', value: 'medium' },
  { label: "Stays on a desk", value: 'low' },
];
const OS_OPTIONS = [
  { label: 'Windows', value: 'windows' },
  { label: 'macOS', value: 'macos' },
  { label: 'No preference', value: 'none' },
];

function PillGroup({ options, value, onChange }) {
  return (
    <div className="pills">
      {options.map((opt) => (
        <button
          type="button"
          key={opt.value}
          className={`pill ${value === opt.value ? 'active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Recommender() {
  const [answers, setAnswers] = useState({ budget: null, use: null, form: null, portability: null, os: null });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function setField(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const allAnswered = Object.values(answers).every((v) => v !== null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!allAnswered) {
      setError('Answer all 5 questions before generating matches.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await getRecommendations(answers);
      setResults(data.results || []);
    } catch (err) {
      setError('Could not fetch matches. Try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <header className="main-header">
          <div>
            <p className="eyebrow">Requirement form</p>
            <h1>Find your machine</h1>
          </div>
        </header>

        <form className="req-form" onSubmit={handleSubmit}>
          <div className="req-field">
            <label>Budget ceiling (₹, India)</label>
            <PillGroup options={BUDGET_OPTIONS} value={answers.budget} onChange={(v) => setField('budget', v)} />
          </div>
          <div className="req-field">
            <label>Main use case</label>
            <PillGroup options={USE_OPTIONS} value={answers.use} onChange={(v) => setField('use', v)} />
          </div>
          <div className="req-field">
            <label>Laptop, desktop, or either?</label>
            <PillGroup options={FORM_OPTIONS} value={answers.form} onChange={(v) => setField('form', v)} />
          </div>
          <div className="req-field">
            <label>Portability</label>
            <PillGroup options={PORTABILITY_OPTIONS} value={answers.portability} onChange={(v) => setField('portability', v)} />
          </div>
          <div className="req-field">
            <label>OS preference</label>
            <PillGroup options={OS_OPTIONS} value={answers.os} onChange={(v) => setField('os', v)} />
          </div>

          {error && <div className="error-banner">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Matching…' : 'Generate matches'}
          </button>
        </form>

        {results && (
          <section className="results-section">
            <h2>Your matches</h2>
            {results.length === 0 ? (
              <p className="state-msg">No clean match found — try widening your budget or use case.</p>
            ) : (
              results.map((item, i) => <MatchCard key={i} item={item} />)
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Recommender;