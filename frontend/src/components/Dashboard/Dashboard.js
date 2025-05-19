// import React from 'react';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Dashboard = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const handleStartAssessment = () => {
//     navigate('/assessment');
//   };

//   return (
//     <Container className="py-5">
//       <Row className="mb-4">
//         <Col>
//           <h1>Welcome, {user?.full_name || user?.username}</h1>
//           <p className="text-muted">
//             Track and manage your academic stress levels
//           </p>
//         </Col>
//       </Row>
      
//       <Row className="mb-4">
//         <Col md={8}>
//           <Card className="shadow mb-4">
//             <Card.Body className="p-4">
//               <h2 className="mb-3">Academic Stress Assessment</h2>
//               <p>
//                 This assessment helps identify your academic stress levels through 
//                 voice analysis and response content. The assessment consists of 16 
//                 questions about your academic experiences and feelings.
//               </p>
//               <p>
//                 For each question, you'll need to provide an audio response. 
//                 The system will analyze both what you say and how you say it to 
//                 determine your stress level.
//               </p>
//               <Button 
//                 variant="primary" 
//                 size="lg" 
//                 onClick={handleStartAssessment}
//                 className="mt-3"
//               >
//                 Start New Assessment
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
        
//         <Col md={4}>
//           <Card className="shadow mb-4">
//             <Card.Header className="bg-primary text-white">
//               <h4 className="mb-0">How It Works</h4>
//             </Card.Header>
//             <Card.Body>
//               <ol>
//                 <li className="mb-2">You'll be presented with 16 questions about academic stress.</li>
//                 <li className="mb-2">For each question, upload an audio response.</li>
//                 <li className="mb-2">Our system analyzes your voice for emotional cues.</li>
//                 <li className="mb-2">The system also analyzes what you said in your response.</li>
//                 <li className="mb-2">Both analyses are combined for a comprehensive stress assessment.</li>
//               </ol>
//             </Card.Body>
//           </Card>
          
//           <Card className="shadow">
//             <Card.Header className="bg-info text-white">
//               <h4 className="mb-0">Quick Tips</h4>
//             </Card.Header>
//             <Card.Body>
//               <ul>
//                 <li className="mb-2">Speak clearly in your natural voice.</li>
//                 <li className="mb-2">Record in a quiet environment.</li>
//                 <li className="mb-2">Answer questions honestly for the most accurate assessment.</li>
//                 <li className="mb-2">Use WAV or MP3 format for audio uploads.</li>
//               </ul>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getAssessmentResults } from '../../services/stress';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentAssessments, setRecentAssessments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // This would be replaced with real API call in production
    // This is just a placeholder to simulate recent assessments
    setLoading(true);
    setTimeout(() => {
      setRecentAssessments([
        { 
          id: 207, 
          date: new Date(2025, 4, 15).toLocaleDateString(), 
          stress_level: 'Medium',
          dominant_emotion: 'Angry'
        },
        { 
          id: 205, 
          date: new Date(2025, 4, 14).toLocaleDateString(), 
          stress_level: 'High',
          dominant_emotion: 'Sad'
        },
        { 
          id: 199, 
          date: new Date(2025, 4, 10).toLocaleDateString(), 
          stress_level: 'Low',
          dominant_emotion: 'Neutral'
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const handleViewResults = (assessmentId) => {
    // In a real implementation, we'd fetch results and navigate
    navigate('/results', { state: { id: assessmentId } });
  };

  const getStressLevelColor = (level) => {
    switch (level) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      case 'Minimal': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1>Welcome, {user?.full_name || user?.username}</h1>
          <p className="text-muted">
            Track and manage your academic stress levels
          </p>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={8}>
          <Card className="shadow mb-4">
            <Card.Body className="p-4">
              <h2 className="mb-3">Academic Stress Assessment</h2>
              <p>
                This assessment helps identify your academic stress levels through
                voice analysis and response content. The assessment consists of 16
                questions about your academic experiences and feelings.
              </p>
              <p>
                For each question, you'll need to provide an audio response.
                The system will analyze both what you say and how you say it to
                determine your stress level.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartAssessment}
                className="mt-3"
              >
                Start New Assessment
              </Button>
            </Card.Body>
          </Card>
          
          {/* New Card - Recent Assessment History */}
          <Card className="shadow">
            <Card.Header className="bg-secondary text-white">
              <h4 className="mb-0">Recent Assessment History</h4>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <p className="text-center">Loading recent assessments...</p>
              ) : recentAssessments.length > 0 ? (
                <div>
                  {recentAssessments.map((assessment) => (
                    <div key={assessment.id} className="border-bottom py-3">
                      <Row className="align-items-center">
                        <Col xs={4} md={2}>
                          <Badge 
                            bg={getStressLevelColor(assessment.stress_level)} 
                            className="px-3 py-2 w-100"
                          >
                            {assessment.stress_level}
                          </Badge>
                        </Col>
                        <Col xs={8} md={5}>
                          <strong>Date:</strong> {assessment.date}<br/>
                          <small className="text-muted">
                            Dominant emotion: {assessment.dominant_emotion}
                          </small>
                        </Col>
                        <Col xs={12} md={5} className="mt-2 mt-md-0 text-end">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => handleViewResults(assessment.id)}
                          >
                            View Details
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <div className="text-center mt-3">
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/assessment-history')}
                    >
                      View All Assessments
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>No assessment history yet.</p>
                  <p>Complete your first assessment to see results here.</p>
                  <Button 
                    variant="primary" 
                    onClick={handleStartAssessment}
                  >
                    Start First Assessment
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow mb-4">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">How It Works</h4>
            </Card.Header>
            <Card.Body>
              <ol>
                <li className="mb-2">You'll be presented with 16 questions about academic stress.</li>
                <li className="mb-2">For each question, upload an audio response.</li>
                <li className="mb-2">Our system analyzes your voice for emotional cues.</li>
                <li className="mb-2">The system also analyzes what you said in your response.</li>
                <li className="mb-2">Both analyses are combined for a comprehensive stress assessment.</li>
              </ol>
            </Card.Body>
          </Card>
          <Card className="shadow">
            <Card.Header className="bg-info text-white">
              <h4 className="mb-0">Quick Tips</h4>
            </Card.Header>
            <Card.Body>
              <ul>
                <li className="mb-2">Speak clearly in your natural voice.</li>
                <li className="mb-2">Record in a quiet environment.</li>
                <li className="mb-2">Answer questions honestly for the most accurate assessment.</li>
                <li className="mb-2">Use WAV or MP3 format for audio uploads.</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;