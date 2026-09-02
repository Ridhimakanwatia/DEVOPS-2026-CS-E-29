import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/Authcontext.jsx';
import './sidebar.css';

function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'New match', path: '/recommender' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-mark">S</span>
        <span>SpecMatch</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="avatar">{user?.name ? user.name[0].toUpperCase() : '?'}</div>
          <span className="user-name">{user?.name || 'Guest'}</span>
        </div>
        <button className="logout-btn" onClick={logout}>Log out</button>
      </div>
    </aside>
  );
}

export default Sidebar;