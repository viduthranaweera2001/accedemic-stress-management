import React, { useState } from 'react';
import { Container, Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

const AcademicStressForm = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const totalQuestions = 4;

  const questions = [
    "How are you feeling about your current academic workload?",
    "What specific aspects of your studies are causing you stress?",
    "How is your academic stress affecting your daily life?",
    "What coping mechanisms have you tried so far?"
  ];

  const handleSpeakClick = () => {
    setIsRecording(!isRecording);
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Container className="py-4">
          <Card className="shadow">
            <Card.Header className="bg-purple text-white" style={{ backgroundColor: '#8854D0' }}>
              <h2 className="mb-0">Academic Stress Assessment</h2>
            </Card.Header>

            <Card.Body>
              {/* Progress Section */}
              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className="progress" style={{ height: '8px', width: '60px' }}>
                    <div
                      className="progress-bar"
                      style={{
                        width: `${(currentQuestion / totalQuestions) * 100}%`,
                        backgroundColor: '#8854D0'
                      }}
                    ></div>
                  </div>
                  <small className="text-muted">
                    Question {currentQuestion} of {totalQuestions}
                  </small>
                </div>

                <h3>{questions[currentQuestion - 1]}</h3>
              </div>

              {/* Voice Recording Section */}
              <Card className="bg-light mb-4">
                <Card.Body className="text-center py-5">
                  <Button 
                    variant={isRecording ? "danger" : "primary"}
                    style={isRecording ? {} : { backgroundColor: '#8854D0', borderColor: '#8854D0' }}
                    className="rounded-circle p-3 mb-3"
                    onClick={handleSpeakClick}
                  >
                    <FontAwesomeIcon icon={faMicrophone} size="2x" />
                  </Button>
                  <div className="text-muted">
                    {isRecording ? "Recording... Click to stop" : "Press the button and speak your answer"}
                  </div>
                </Card.Body>
              </Card>

              {/* Response Display */}
              <Card className="bg-light mb-4">
                <Card.Body>
                  <p className="text-muted mb-0">Your response will appear here...</p>
                </Card.Body>
              </Card>

              {/* Analytics Section */}
              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <h5>Current Stress Level</h5>
                      <ProgressBar 
                        now={60} 
                        className="mb-2"
                        variant="custom-purple"
                        style={{ backgroundColor: '#E8E8E8' }}
                      />
                      <style type="text/css">
                        {`
                          .progress-bar-custom-purple {
                            background-color: #8854D0 !important;
                          }
                        `}
                      </style>
                      <small className="text-muted">Moderate Stress Level</small>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Body>
                      <h5>Suggested Actions</h5>
                      <ul className="list-unstyled">
                        <li className="mb-2">
                          <span className="me-2" style={{ color: '#8854D0' }}>•</span>
                          Schedule a counseling session
                        </li>
                        <li>
                          <span className="me-2" style={{ color: '#8854D0' }}>•</span>
                          Try breathing exercises
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Navigation Buttons */}
              <div className="d-flex justify-content-between">
                <Button 
                  variant="outline-secondary" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 1}
                >
                  Previous
                </Button>
                <Button 
                  style={{ backgroundColor: '#8854D0', borderColor: '#8854D0' }}
                  onClick={handleNext}
                  disabled={currentQuestion === totalQuestions}
                >
                  {currentQuestion === totalQuestions ? 'Submit' : 'Next'}
                </Button>
              </div>
            </Card.Body>

            <Card.Footer className="bg-white">
              <small className="text-muted">
                🔒 Your responses are encrypted and protected. Read our privacy policy
              </small>
            </Card.Footer>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AcademicStressForm;