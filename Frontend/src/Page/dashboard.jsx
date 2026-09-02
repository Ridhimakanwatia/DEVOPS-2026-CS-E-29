import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar.jsx';
import StatCard from '../components/statcard.jsx';
import { useAuth } from '../context/Authcontext.jsx';
import { getDashboardSummary } from '../api/recommendApi';
import './dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardSummary()
      .then((data) => setSummary(data))
      .catch(() => setError('Could not load your dashboard data.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <header className="main-header">
          <div>
            <p className="eyebrow">This month</p>
            <h1>Hey, {user?.name || 'there'} 👋</h1>
          </div>
          <Link to="/recommender" className="btn-primary">+ New match</Link>
        </header>

        {loading && <p className="state-msg">Loading your dashboard…</p>}
        {error && <div className="error-banner">{error}</div>}

        {summary && (
          <>
            <section className="stat-grid">
              <StatCard label="Matches run" value={summary.matchesRun ?? 0} />
              <StatCard label="Saved picks" value={summary.savedPicks ?? 0} />
              <StatCard label="Last budget" value={summary.lastBudget ? `₹${summary.lastBudget.toLocaleString('en-IN')}` : '—'} />
              <StatCard label="Last use case" value={summary.lastUseCase ?? '—'} />
            </section>

            <section className="recent-section">
              <div className="recent-head">
                <h2>Recent matches</h2>
              </div>
              {summary.recentMatches?.length ? (
                summary.recentMatches.map((m, i) => (
                  <div className="match-row" key={i}>
                    <div>
                      <p className="match-name">{m.name}</p>
                      <p className="match-meta">{m.useCase} · ₹{m.price?.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="match-score">{m.score}%</span>
                  </div>
                ))
              ) : (
                <p className="state-msg">No matches yet — start your first one above.</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;