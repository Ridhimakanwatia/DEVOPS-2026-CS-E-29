import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext.jsx';

import Login from './Page/login.jsx';
import Signup from './Page/signup.jsx';
import Dashboard from './Page/dashboard.jsx';
import Recommender from './Page/recommender.jsx';
import NotFound from './Page/notFound.jsx';

import ProtectedRoute from './components/protectdroute.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommender"
          element={
            <ProtectedRoute>
              <Recommender />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;