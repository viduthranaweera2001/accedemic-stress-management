import React from 'react';
import Sidebar from "../components/Sidebar";


const Dashboard = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h4 className="mb-4">Dashboard</h4>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Welcome Back, Sarah!</h5>
            <p className="card-text text-muted">
              This is your personalized dashboard. You can add new widgets and customize 
              your view using the settings menu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;