import React from 'react';
import { Container, Card, Row, Col, Button, Badge } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ResultsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results;

  if (!results) {
    return (
      <Container className="py-5 text-center">
        <Card className="shadow">
          <Card.Body className="p-4">
            <h3>No results available</h3>
            <p>Please complete an assessment to see results.</p>
            <Button variant="primary" onClick={() => navigate('/assessment')}>
              Start Assessment
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const getStressLevelColor = (level) => {
    switch (level) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'info';
      case 'Minimal': return 'success';
      default: return 'secondary';
    }
  };

  const getStressLevelDescription = (level) => {
    switch (level) {
      case 'High':
        return 'You are experiencing high levels of academic stress. Consider seeking support from a counselor or mental health professional.';
      case 'Medium':
        return 'You are experiencing moderate levels of academic stress. Consider implementing stress management techniques and seeking support if needed.';
      case 'Low':
        return 'You are experiencing low levels of academic stress. Continue with healthy coping strategies to maintain balance.';
      case 'Minimal':
        return 'You are experiencing minimal academic stress. Keep up the good work and maintain your current strategies.';
      default:
        return 'Unable to determine stress level.';
    }
  };

  // Prepare emotion data for chart
  const emotionData = Object.entries(results.details.emotion_counts || {}).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count: value
  }));

  return (
    <Container className="py-5">
      <h2 className="mb-4">Assessment Results</h2>
      
      <Card className="shadow mb-4">
        <Card.Header className={`bg-${getStressLevelColor(results.final_stress_level)} text-white`}>
          <h3 className="mb-0">Your Stress Level</h3>
        </Card.Header>
        <Card.Body className="p-4">
          <Row>
            <Col md={8}>
              <h4 className="mb-3">
                <Badge bg={getStressLevelColor(results.final_stress_level)} className="p-2 fs-5">
                  {results.final_stress_level}
                </Badge>
              </h4>
              <p className="lead">{getStressLevelDescription(results.final_stress_level)}</p>
            </Col>
            <Col md={4} className="text-center">
              <div className={`border border-${getStressLevelColor(results.final_stress_level)} rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '150px', height: '150px', margin: '0 auto' }}>
                <h1 className="mb-0">{results.total_score || '—'}</h1>
              </div>
              <p className="mt-2 text-muted">Total Score</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Row>
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Header>
              <h4 className="mb-0">Analysis Components</h4>
            </Card.Header>
            <Card.Body>
              <p><strong>Text Analysis Score:</strong> <Badge bg={getStressLevelColor(results.text_stress_level)}>{results.text_stress_level}</Badge></p>
              <p><strong>Voice Analysis Score:</strong> <Badge bg={getStressLevelColor(results.voice_stress_level)}>{results.voice_stress_level}</Badge></p>
              <p><strong>Dominant Emotion:</strong> {results.dominant_emotion ? results.dominant_emotion.charAt(0).toUpperCase() + results.dominant_emotion.slice(1) : 'Not detected'}</p>
              <p><strong>Completed Questions:</strong> {results.completed_questions} of 16</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow mb-4">
            <Card.Header>
              <h4 className="mb-0">Emotional Analysis</h4>
            </Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={emotionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Card className="shadow mb-4">
        <Card.Header>
          <h4 className="mb-0">Recommendations</h4>
        </Card.Header>
        <Card.Body>
          <ul>
            {results.final_stress_level === 'High' && (
              <>
                <li>Consider speaking with a counselor or mental health professional.</li>
                <li>Practice regular relaxation techniques such as deep breathing or meditation.</li>
                <li>Break large tasks into smaller, manageable steps.</li>
                <li>Establish a regular sleep schedule and prioritize rest.</li>
                <li>Reach out to supportive friends, family, or academic advisors.</li>
              </>
            )}
            
            {results.final_stress_level === 'Medium' && (
              <>
                <li>Implement time management strategies to better organize your studies.</li>
                <li>Practice stress-reduction activities like exercise or mindfulness.</li>
                <li>Ensure you're taking regular breaks during study sessions.</li>
                <li>Connect with classmates for study groups and support.</li>
                <li>Maintain a balanced diet and regular physical activity.</li>
              </>
            )}
            
            {results.final_stress_level === 'Low' && (
              <>
                <li>Continue your current coping strategies as they appear effective.</li>
                <li>Maintain a healthy work-life balance.</li>
                <li>Check in with yourself regularly to monitor stress levels.</li>
                <li>Stay connected with your support network.</li>
                <li>Consider helping classmates who may be experiencing more stress.</li>
              </>
            )}
            
            {results.final_stress_level === 'Minimal' && (
              <>
                <li>Continue your effective stress management techniques.</li>
                <li>Share your strategies with others who might benefit.</li>
                <li>Maintain your current balance between academics and personal life.</li>
                <li>Consider new challenges that can help you grow without overwhelming you.</li>
                <li>Celebrate your success in managing academic pressure effectively.</li>
              </>
            )}
          </ul>
        </Card.Body>
      </Card>
      
      <div className="text-center mt-4">
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Return to Dashboard
        </Button>
      </div>
    </Container>
  );
};

export default ResultsScreen;