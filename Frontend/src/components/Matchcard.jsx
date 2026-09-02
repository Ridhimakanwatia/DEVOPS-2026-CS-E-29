import './matchcard.css';

// Shows one recommended laptop/PC as a card, with its match score.
// Usage: <MatchCard item={{ name, price, matchScore, specs, blurb }} />
function MatchCard({ item }) {
  return (
    <div className="match-card">
      <div className="match-card-main">
        <h3>{item.name}</h3>
        <p className="match-price">₹{item.price?.toLocaleString('en-IN')}</p>
        {item.blurb && <p className="match-blurb">{item.blurb}</p>}
        {item.specs && (
          <ul className="match-specs">
            {Object.entries(item.specs).map(([key, value]) => (
              <li key={key}><span>{key}</span><span>{value}</span></li>
            ))}
          </ul>
        )}
      </div>
      <div className="match-score">{item.matchScore}%</div>
    </div>
  );
}

export default MatchCard;