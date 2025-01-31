import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh', padding: '20px' }}>
      <h3 className="mb-4">
        <span 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
          className="text-white text-decoration-none"
        >
          StressGuard
        </span>
      </h3>
      
      {/* User Profile */}
      <div className="d-flex align-items-center mb-4">
        <div 
          className="rounded-circle bg-primary" 
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
        <div>
          <div>Sarah Johnson</div>
          <small className="text-muted">Student</small>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <Nav className="flex-column">
        <Nav.Link 
          className="text-white" 
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </Nav.Link>
        <Nav.Link 
          className="text-white"
          onClick={() => navigate('/stress-form')}
        >
          Voice Assessment
        </Nav.Link>
        <Nav.Link 
          className="text-white"
          
        >
          Progress Tracking
        </Nav.Link>
        <Nav.Link 
          className="text-white"
          
        >
          Resources
        </Nav.Link>
        <Nav.Link 
          className="text-white"
          
        >
          Settings
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;