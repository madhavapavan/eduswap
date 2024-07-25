import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import SettingsPage from './pages/SettingsPage';
import LogoutPage from './pages/LogoutPage';
import Explore from './pages/Explore';
import ProfilePage from './pages/ProfilePage';
import ProfileSetup from './pages/ProfileSetup'; // Import ProfileSetup

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<ProfilePage/>} />
            <Route path="/profilesetup" element={<ProfileSetup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
