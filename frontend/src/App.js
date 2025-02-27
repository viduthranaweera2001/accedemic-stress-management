import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';

import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AcademicStressForm from "./pages/AcademicStressForm";
import Sidebar from "./components/Sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
      <Router>
        {/* Navigation Menu */}
        {/* <nav className="bg-blue-600 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-white text-xl font-bold">My App</div>
            <div className="space-x-4">
              <Link
                  to="/"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Home
              </Link>
              <Link
                  to="/gaming"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Gaming
              </Link>
              <Link
                  to="/chat"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Chat
              </Link>
              <Link
                  to="/profile"
                  className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              >
                Profile
              </Link>
            </div>
          </div>
        </nav> */}

        {/* Main Content with Sidebar */}
        <div className="d-flex">
        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stress-form" element={<AcademicStressForm />} />
          {/*<Route path="/gaming" element={<GamingZone />} />*/}
          {/*<Route path="/chat" element={<ChatPage />} />*/}
          {/*<Route path="/profile" element={<ProfilePage />} />*/}
          {/*<Route path="/login" element={<LoginPage />} />*/}
        </Routes>
        </div>
      </Router>
  );
}

export default App;
