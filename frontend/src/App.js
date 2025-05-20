import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { StressProvider } from './context/StressContext';

// Layout Components
import NavigationBar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Page Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import AssessmentScreen from './components/StressDetection/AssessmentScreen';
import ResultsScreen from './components/StressDetection/ResultsScreen';
import Game from "./components/Game/Game";
import VirtualAssistance from "./components/Assistance/VirtualAssistance";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <StressProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100">
            <NavigationBar />
            
            <main className="flex-grow-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/assessment" 
                  element={
                    <ProtectedRoute>
                      <AssessmentScreen />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/results" 
                  element={
                    <ProtectedRoute>
                      <ResultsScreen />
                    </ProtectedRoute>
                  } 
                />

                <Route
                    path="/game"
                    element={
                      <ProtectedRoute>
                        <Game />
                      </ProtectedRoute>
                    }
                />

                <Route
                    path="/assistance"
                    element={
                      <ProtectedRoute>
                        <VirtualAssistance />
                      </ProtectedRoute>
                    }
                />
                
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </StressProvider>
    </AuthProvider>
  );
}

export default App;