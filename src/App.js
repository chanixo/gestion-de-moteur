import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Entretien from './pages/Entretien';
import Vibration from './pages/Vibration';
import Revision from './pages/Revision';
import Pose from './pages/Pose';
import Depose from './pages/Depose';
import Magazine from './pages/Magazine';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider, useAuth } from './context/AuthContext';
import Entree from './pages/Entree'; 
import Sortie from './pages/Sortie'; 
import Maintenance from './pages/Maintenance';


const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ flexGrow: 1, padding: '16px' }}>
        <Routes>
          <Route path="/login" element={<Navigate to="/dashboard" />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/entretien" element={<Entretien />} />
          <Route path="/vibration" element={<Vibration />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/pose" element={<Pose />} />
          <Route path="/depose" element={<Depose />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/entree" element={<Entree />} />
          <Route path="/magazine/sortie" element={<Sortie />} />
          <Route path="/maintenance" element={<Maintenance />} />

        </Routes>
      </main>
    </div>
  ) : (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
