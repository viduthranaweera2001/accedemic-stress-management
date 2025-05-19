import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between">
          <div>
            <h5>Academic Stress Detection System</h5>
            <p className="text-muted">
              A comprehensive tool for assessing academic stress through voice and text analysis.
            </p>
          </div>
          
          <div>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/dashboard" className="text-white">Dashboard</a></li>
              <li><a href="/assessment" className="text-white">Take Assessment</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="my-4" />
        
        <div className="text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Academic Stress Detection System</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;