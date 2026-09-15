import { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar.jsx';
import MatchCard from '../components/Matchcard.jsx';
import { getMatchHistory } from '../api/recommendApi';
import './history.css';

function History() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getMatchHistory()
      .then((data) => setMatches(data.matches || []))
      .catch(() => setError('Could not load your match history.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main">
        <header className="main-header">
          <div>
            <p className="eyebrow">Saved &amp; past matches</p>
            <h1>History</h1>
          </div>
        </header>

        {loading && <p className="state-msg">Loading your history…</p>}
        {error && <div className="error-banner">{error}</div>}

        {!loading && !error && (
          matches.length === 0 ? (
            <p className="state-msg">
              No matches yet — head to "New match" to run your first one.
            </p>
          ) : (
            <section className="history-list">
              {matches.map((item, i) => (
                <MatchCard key={i} item={item} />
              ))}
            </section>
          )
        )}
      </main>
    </div>
  );
}

export default History;