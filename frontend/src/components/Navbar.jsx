import React from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Define the purple theme style
  const purpleStyle = {
    backgroundColor: '#8854D0',
    borderColor: '#8854D0'
  };

  return (
    <BootstrapNavbar 
      variant="dark" 
      className="px-4" 
      style={purpleStyle}
    >
      <Container fluid>
        <Nav className="ms-auto">
          <Nav.Link 
            className="text-white hover:bg-opacity-80" 
            onClick={() => navigate('/')}
          >
            Home
          </Nav.Link>
          <Nav.Link 
            className="text-white hover:bg-opacity-80" 
            onClick={() => navigate('/gaming')}
          >
            Gaming
          </Nav.Link>
          <Nav.Link 
            className="text-white hover:bg-opacity-80" 
            onClick={() => navigate('/chat')}
          >
            Chat
          </Nav.Link>
          <Nav.Link 
            className="text-white hover:bg-opacity-80" 
            onClick={() => navigate('/profile')}
          >
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;