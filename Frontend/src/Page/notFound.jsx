import { Link } from 'react-router-dom';
import './notFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <p className="notfound-eyebrow">Error</p>
        <h1>404</h1>
        <p className="notfound-sub">This page doesn't exist, or the link's out of date.</p>
        <Link to="/dashboard" className="btn-primary">Back to dashboard</Link>
      </div>
    </div>
  );
}

export default NotFound;