import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext.jsx';

// Wrap any page with this — if the user isn't logged in, they get sent to /login instead.
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;