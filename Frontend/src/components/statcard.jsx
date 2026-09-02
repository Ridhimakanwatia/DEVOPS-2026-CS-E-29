import './statcard.css';

// A small reusable card for showing one number with a label.
// Usage: <StatCard label="Matches run" value="3" />
function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}

export default StatCard;
