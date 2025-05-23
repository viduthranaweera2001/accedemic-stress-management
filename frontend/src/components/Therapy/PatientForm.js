import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';

// Add the keyframes for pulse animation
const pulseKeyframes = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.9; }
}
`;

// Helper to map stress and BPM to therapy time (8-20)
function suggestTherapyTime(stressLevel, bpm) {
  // Normalize stressLevel: 1-10
  const s = Math.min(Math.max(Number(stressLevel), 1), 10);

  // Normalize bpm: 65-90
  let b = Number(bpm);
  if (isNaN(b)) b = 65;
  b = Math.min(Math.max(b, 65), 90);

  // Stress factor: 0 (low) to 1 (high)
  const stressFactor = (s - 1) / 9;
  // BPM factor: 0 (65) to 1 (90)
  const bpmFactor = (b - 65) / 25;

  // Weighted average: stress 70%, bpm 30%
  const combined = 0.7 * stressFactor + 0.3 * bpmFactor;

  // Map to 8-20
  return Math.round(8 + combined * (20 - 8));
}

const PatientForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    pulseRate: '',
    bloodPressure: '',
    therapyTime: '',
    stressLevel: ''
  });

  const [connectionStatus, setConnectionStatus] = useState('Connecting...');
  const [isPulseLocked, setIsPulseLocked] = useState(false);

  // Prefill stressLevel from navigation state if available
  useEffect(() => {
    if (location.state && location.state.stressLevel) {
      setFormData(prev => ({
        ...prev,
        stressLevel: location.state.stressLevel
      }));
    }
  }, [location.state]);

  // Suggest therapy time whenever stressLevel or pulseRate changes
  useEffect(() => {
    if (formData.stressLevel) {
      setFormData(prev => ({
        ...prev,
        therapyTime: suggestTherapyTime(prev.stressLevel, prev.pulseRate)
      }));
    }
  }, [formData.stressLevel, formData.pulseRate]);

  const ESP32_IP = '192.168.8.2';

  const fetchBPM = async () => {
    if (isPulseLocked) {
      return;
    }
    try {
      const response = await fetch(`http://${ESP32_IP}/getBPM`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const bpm = await response.text();
        const bpmValue = parseInt(bpm);
        if (bpm && bpmValue > 0) {
          setFormData(prev => ({
            ...prev,
            pulseRate: bpm
          }));
          if (bpmValue >= 65 && bpmValue <= 90) {
            setIsPulseLocked(true);
            setConnectionStatus(`Locked at ${bpm} BPM (ideal range)`);
          } else {
            setConnectionStatus(`Connected (${bpm} BPM)`);
          }
        } else {
          setConnectionStatus('No valid pulse detected');
        }
      } else {
        setConnectionStatus('Error connecting to sensor');
      }
    } catch (error) {
      setConnectionStatus('Connection failed');
    }
  };

  useEffect(() => {
    // Add the pulse animation styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = pulseKeyframes;
    document.head.appendChild(styleElement);

    // Initial fetch and setup interval
    fetchBPM();
    const interval = setInterval(fetchBPM, 2000);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.head.removeChild(styleElement);
    };
  }, [isPulseLocked]);

  // Function to manually unlock the pulse reading
  const handleUnlockPulse = () => {
    setIsPulseLocked(false);
    setConnectionStatus('Reconnecting...');
    fetchBPM();
  };

  const validateForm = () => {
    // Now require gender and age as well
    const requiredFields = ['gender', 'age', 'therapyTime', 'stressLevel'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }
    return true;
  };

  const handleStartTherapy = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Save data to localStorage
    localStorage.setItem('patientData', JSON.stringify(formData));

    // Call onSubmit if provided
    if (onSubmit) {
      onSubmit(formData);
    }

    // Navigate to therapy session
    navigate("/therapysessions");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Heartbeat animation style
  const heartbeatStyle = {
    display: formData.pulseRate && parseInt(formData.pulseRate) > 40 ? 'block' : 'none',
    width: '30px',
    height: '30px',
    marginLeft: '10px',
    background: '#e74c3c',
    borderRadius: '50%',
    animation: `pulse ${formData.pulseRate ? (60 / parseInt(formData.pulseRate)) : 1}s infinite`
  };

  return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light py-5">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h2 className="mb-0">Patient Therapy Information</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleStartTherapy}>
                <div className="row g-3">

                  {/* Gender */}
                  <div className="col-md-6">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Age */}
                  <div className="col-md-6">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        id="age"
                        min="0"
                        max="120"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        required
                    />
                  </div>

                  {/* Pulse Rate */}
                  <div className="col-md-6">
                    <label htmlFor="pulseRate" className="form-label">
                      Pulse Rate (bpm)
                      <small className={`ms-2 ${
                          isPulseLocked ? 'text-success' :
                              connectionStatus.includes('Error') ||
                              connectionStatus.includes('failed') ?
                                  'text-danger' : 'text-info'
                      }`}>
                        ({connectionStatus})
                      </small>
                    </label>
                    <div className="d-flex align-items-center">
                      <input
                          type="text"
                          className="form-control"
                          id="pulseRate"
                          value={formData.pulseRate || "--"}
                          readOnly
                      />
                      <div style={heartbeatStyle}></div>
                      {isPulseLocked && (
                          <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary ms-2"
                              onClick={handleUnlockPulse}
                          >
                            Reset
                          </button>
                      )}
                    </div>
                  </div>
                  {/* Blood Pressure */}
                  <div className="col-md-6">
                    <label htmlFor="bloodPressure" className="form-label">Blood Pressure (optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bloodPressure"
                        placeholder="120/80"
                        value={formData.bloodPressure}
                        onChange={(e) => handleInputChange('bloodPressure', e.target.value)}
                    />
                  </div>

                  {/* Stress Level */}
                  <div className="col-md-6">
                    <label htmlFor="stressLevel" className="form-label">Stress Level (1-10)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stressLevel"
                        min="1"
                        max="10"
                        value={formData.stressLevel}
                        onChange={(e) => handleInputChange('stressLevel', e.target.value)}
                        required
                    />
                  </div>

                  {/* Therapy Time */}
                  <div className="col-md-6">
                    <label htmlFor="therapyTime" className="form-label">Time for Therapy (minutes)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="therapyTime"
                        min="8"
                        max="20"
                        value={formData.therapyTime}
                        onChange={(e) => handleInputChange('therapyTime', e.target.value)}
                        required
                    />
                  </div>

                </div>
                {/* Submit Button */}
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    Start Therapy Session
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-muted text-center">
              🔒 Your information is securely stored.
            </div>
          </div>
        </div>
      </div>
  );
};

export default PatientForm;
