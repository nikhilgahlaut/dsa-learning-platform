import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import LoginForm from './Components/LoginForm';
import Register from './pages/Register';
import DSASheet from './Pages/DSASheet';
import Profile from './pages/Profile';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { isAuthenticated, logout } = useAuth();

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50">
        <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
        <main>
          <Routes>
            <Route path="/login" element={
              isAuthenticated ? 
                <Navigate to="/dsa" replace /> :
                <LoginForm />
            } />
            <Route path="/register" element={
              isAuthenticated ?
                <Navigate to="/dsa" replace /> :
                <Register />
            } />
            <Route path="/dsa" element={
              <ProtectedRoute>
                <DSASheet />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute>
                <div className="p-8">Leaderboard Coming Soon</div>
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <div className="p-8">
                <h1 className="text-3xl font-bold mb-4">About DSA Learning Sheet</h1>
                <p className="text-gray-600">
                  A comprehensive platform for learning Data Structures and Algorithms.
                </p>
              </div>
            } />
            <Route path="/" element={
              <Navigate to="/dsa" replace />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
