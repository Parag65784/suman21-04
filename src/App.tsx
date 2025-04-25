import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { GameDetails } from './pages/GameDetails';
import { Deposit } from './pages/Deposit';
import { Matches } from './pages/Matches';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { ResponsibleGaming } from './pages/ResponsibleGaming';
import { FairPlay } from './pages/FairPlay';
import { HowToPlay } from './pages/HowToPlay';
import { About } from './pages/About';
import { Highlights } from './pages/Highlights';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminRoute } from './components/AdminRoute';
import { ContactPage } from './pages/ContactPage';

function App() {
  return (
    <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="matches" element={<Matches />} />
              <Route path="how-to-play" element={<HowToPlay />} />
              <Route path="about" element={<About />} />
              <Route path="highlights" element={<Highlights />} />
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="responsible-gaming" element={<ResponsibleGaming />} />
              <Route path="fair-play" element={<FairPlay />} />
              <Route path="deposit" element={
                <ProtectedRoute>
                  <Deposit />
                </ProtectedRoute>
              } />
              <Route path="games/:id" element={
                <ProtectedRoute>
                  <GameDetails />
                </ProtectedRoute>
              } />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
            </Route>
          </Routes>
        </AuthProvider>
    </Router>
  );
}

export default App;