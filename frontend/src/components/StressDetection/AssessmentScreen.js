// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useStress } from '../../context/StressContext';
// import AudioUploader from './AudioUploader';

// const AssessmentScreen = () => {
//   const {
//     currentSession,
//     questions,
//     currentQuestion,
//     loading,
//     error,
//     responses,
//     startAssessment,
//     completeAssessment,
//     nextQuestion,
//     previousQuestion,
//     checkStatus
//   } = useStress();
  
//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initAssessment = async () => {
//       if (!currentSession) {
//         try {
//           await startAssessment();
//         } catch (err) {
//           console.error('Failed to start assessment:', err);
//         }
//       } else {
//         await checkStatus();
//       }
//     };

//     initAssessment();
//   }, [currentSession, startAssessment, checkStatus]);

//   // const handleUploadSuccess = () => {
//   //   console.log("Upload success handler called");
//   //   setUploadSuccess(true);
//   // };

//   // // Modified to use normal button click without disabled state
//   // const handleNextQuestion = () => {
//   //   nextQuestion();
//   //   setUploadSuccess(false);
//   // };



//   const handleUploadSuccess = () => {
//     console.log("Upload success handler called");
//     setUploadSuccess(true);
//     // You can keep this or remove it depending on your preference
//   };
  
//   const handleNextQuestion = () => {
//     console.log("Moving to next question");
//     nextQuestion();
//     setUploadSuccess(false);
//   };


//   const handlePreviousQuestion = () => {
//     previousQuestion();
//   };

//   const handleCompleteAssessment = async () => {
//     try {
//       const results = await completeAssessment();
//       navigate('/results', { state: { results } });
//     } catch (err) {
//       console.error('Failed to complete assessment:', err);
//     }
//   };

//   if (!questions || questions.length === 0) {
//     return (
//       <Container className="py-5">
//         <Card className="shadow">
//           <Card.Body className="p-4 text-center">
//             <h3>Loading assessment...</h3>
//           </Card.Body>
//         </Card>
//       </Container>
//     );
//   }

//   const question = questions[currentQuestion - 1];
//   const progress = (currentQuestion / 16) * 100;

//   return (
//     <Container className="py-5">
//       <Card className="shadow">
//         <Card.Header className="bg-primary text-white">
//           <h4 className="mb-0">Academic Stress Assessment</h4>
//         </Card.Header>
//         <Card.Body className="p-4">
//           {error && <Alert variant="danger">{error}</Alert>}
          
//           <div className="mb-3">
//             <ProgressBar now={progress} label={`${currentQuestion}/16`} className="mb-2" />
//             <small className="text-muted">Question {currentQuestion} of 16</small>
//           </div>
          
//           <Card className="mb-4">
//             <Card.Body>
//               <h5 className="mb-3">Question {currentQuestion}</h5>
//               <p className="fw-bold">{question.english}</p>
//               <p className="text-muted">{question.sinhala}</p>
//             </Card.Body>
//           </Card>
          
//           <AudioUploader 
//             questionNumber={currentQuestion}
//             onUploadStart={() => setUploading(true)}
//             onUploadSuccess={handleUploadSuccess}
//             onUploadError={() => setUploading(false)}
//             disabled={uploading || uploadSuccess}
//           />
          
//           {uploadSuccess && (
//             <Alert variant="success" className="mt-3">
//               Response uploaded successfully! You can proceed to the next question.
//             </Alert>
//           )}
          
//           <div className="d-flex justify-content-between mt-4">
//             <Button 
//               variant="outline-secondary" 
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 1 || uploading}
//             >
//               Previous
//             </Button>
            
//             {currentQuestion < 16 ? (
//               <Button 
//                 variant="primary" 
//                 onClick={handleNextQuestion}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button 
//                 variant="success" 
//                 onClick={handleCompleteAssessment}
//               >
//                 Complete Assessment
//               </Button>
//             )}
//           </div>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AssessmentScreen;


// import React, { useState, useEffect } from 'react';
// import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useStress } from '../../context/StressContext';
// import AudioUploader from './AudioUploader';

// const AssessmentScreen = () => {
//   const {
//     currentSession,
//     questions,
//     currentQuestion,
//     loading,
//     error,
//     responses,
//     startAssessment,
//     completeAssessment,
//     nextQuestion,
//     previousQuestion,
//     checkStatus
//   } = useStress();

//   const [uploading, setUploading] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [localError, setLocalError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initAssessment = async () => {
//       if (!currentSession) {
//         try {
//           await startAssessment();
//         } catch (err) {
//           console.error('Failed to start assessment:', err);
//           setLocalError('Failed to start assessment. Please try again.');
//         }
//       } else {
//         await checkStatus();
//       }
//     };
//     initAssessment();
//   }, [currentSession, startAssessment, checkStatus]);

//   // Reset upload success when question changes
//   useEffect(() => {
//     setUploadSuccess(false);
//     setLocalError('');
//   }, [currentQuestion]);

//   const handleUploadStart = () => {
//     console.log(`Upload started for question ${currentQuestion}`);
//     setUploading(true);
//     setLocalError('');
//   };

//   const handleUploadSuccess = () => {
//     console.log(`Upload successful for question ${currentQuestion}`);
//     setUploadSuccess(true);
//     setUploading(false);
//   };

//   const handleUploadError = () => {
//     console.log(`Upload failed for question ${currentQuestion}`);
//     setUploading(false);
//     setLocalError('Upload failed. Please try again.');
//   };

//   const handleNextQuestion = () => {
//     console.log(`Moving from question ${currentQuestion} to ${currentQuestion + 1}`);
//     nextQuestion();
//   };

//   const handlePreviousQuestion = () => {
//     previousQuestion();
//   };

//   const handleCompleteAssessment = async () => {
//     try {
//       const results = await completeAssessment();
//       navigate('/results', { state: { results } });
//     } catch (err) {
//       console.error('Failed to complete assessment:', err);
//       setLocalError('Failed to complete assessment. Please try again.');
//     }
//   };

//   if (!questions || questions.length === 0) {
//     return (
//       <Container className="py-5">
//         <Card className="shadow">
//           <Card.Body className="p-4 text-center">
//             <h3>Loading assessment...</h3>
//           </Card.Body>
//         </Card>
//       </Container>
//     );
//   }

//   const question = questions[currentQuestion - 1];
//   const progress = (currentQuestion / 16) * 100;

//   return (
//     <Container className="py-5">
//       <Card className="shadow">
//         <Card.Header className="bg-primary text-white">
//           <h4 className="mb-0">Academic Stress Assessment</h4>
//         </Card.Header>
//         <Card.Body className="p-4">
//           {(error || localError) && (
//             <Alert variant="danger" dismissible onClose={() => setLocalError('')}>
//               {error || localError}
//             </Alert>
//           )}

//           <div className="mb-3">
//             <ProgressBar now={progress} label={`${currentQuestion}/16`} className="mb-2" />
//             <small className="text-muted">Question {currentQuestion} of 16</small>
//           </div>

//           <Card className="mb-4">
//             <Card.Body>
//               <h5 className="mb-3">Question {currentQuestion}</h5>
//               <p className="fw-bold">{question.english}</p>
//               <p className="text-muted">{question.sinhala}</p>
//             </Card.Body>
//           </Card>

//           <AudioUploader
//             questionNumber={currentQuestion}
//             onUploadStart={handleUploadStart}
//             onUploadSuccess={handleUploadSuccess}
//             onUploadError={handleUploadError}
//             disabled={uploading}
//           />

//           {uploadSuccess && (
//             <Alert variant="success" className="mt-3">
//               Response uploaded successfully! You can proceed to the next question.
//             </Alert>
//           )}

//           <div className="d-flex justify-content-between mt-4">
//             <Button
//               variant="outline-secondary"
//               onClick={handlePreviousQuestion}
//               disabled={currentQuestion === 1 || uploading}
//             >
//               Previous
//             </Button>

//             {currentQuestion < 16 ? (
//               <Button
//                 variant="primary"
//                 onClick={handleNextQuestion}
//                 disabled={!uploadSuccess && !responses.some(r => r.questionNumber === currentQuestion)}
//               >
//                 Next
//               </Button>
//             ) : (
//               <Button
//                 variant="success"
//                 onClick={handleCompleteAssessment}
//                 disabled={!uploadSuccess && !responses.some(r => r.questionNumber === currentQuestion)}
//               >
//                 Complete Assessment
//               </Button>
//             )}
//           </div>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AssessmentScreen;
// -------------------111111111111111111---------------------------------



import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStress } from '../../context/StressContext';
import AudioUploader from './AudioUploader';

// Add this CSS block at the top of your file
// This ensures the styles are encapsulated within this component
const questionStyles = {
  questionText: {
    fontSize: '1.5rem',   // Increased font size
    fontWeight: 'bold',    // Make it bold for better visibility
    marginBottom: '0.75rem' // Add some spacing below
  },
  sinhalaText: {
    fontSize: '1.4rem',   // Slightly smaller than English but still larger than default
    color: '#505050'       // Darker than the default text-muted
  }
};

const AssessmentScreen = () => {
  const {
    currentSession,
    questions,
    currentQuestion,
    loading,
    error,
    responses,
    startAssessment,
    completeAssessment,
    nextQuestion,
    previousQuestion,
    checkStatus
  } = useStress();

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [localError, setLocalError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const initAssessment = async () => {
      if (!currentSession) {
        try {
          await startAssessment();
        } catch (err) {
          console.error('Failed to start assessment:', err);
          setLocalError('Failed to start assessment. Please try again.');
        }
      } else {
        await checkStatus();
      }
    };

    initAssessment();
  }, [currentSession, startAssessment, checkStatus]);

  // Reset upload success when question changes
  useEffect(() => {
    setUploadSuccess(false);
    setLocalError('');
  }, [currentQuestion]);

  const handleUploadStart = () => {
    console.log(`Upload started for question ${currentQuestion}`);
    setUploading(true);
    setLocalError('');
  };

  const handleUploadSuccess = () => {
    console.log(`Upload successful for question ${currentQuestion}`);
    setUploadSuccess(true);
    setUploading(false);
  };

  const handleUploadError = () => {
    console.log(`Upload failed for question ${currentQuestion}`);
    setUploading(false);
    setLocalError('Upload failed. Please try again.');
  };

  const handleNextQuestion = () => {
    console.log(`Moving from question ${currentQuestion} to ${currentQuestion + 1}`);
    nextQuestion();
  };

  const handlePreviousQuestion = () => {
    previousQuestion();
  };

  const handleCompleteAssessment = async () => {
    try {
      const results = await completeAssessment();
      navigate('/results', { state: { results } });
    } catch (err) {
      console.error('Failed to complete assessment:', err);
      setLocalError('Failed to complete assessment. Please try again.');
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <Container className="py-5">
        <Card className="shadow">
          <Card.Body className="p-4 text-center">
            <h3>Loading assessment...</h3>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const question = questions[currentQuestion - 1];
  const progress = (currentQuestion / 16) * 100;

  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">Academic Stress Assessment</h4>
        </Card.Header>
        <Card.Body className="p-4">
          {(error || localError) && (
            <Alert variant="danger" dismissible onClose={() => setLocalError('')}>
              {error || localError}
            </Alert>
          )}
          <div className="mb-3">
            <ProgressBar now={progress} label={`${currentQuestion}/16`} className="mb-2" />
            <small className="text-muted">Question {currentQuestion} of 16</small>
          </div>
          <Card className="mb-4">
            <Card.Body>
              <h5 className="mb-3">Question {currentQuestion}</h5>
              {/* Apply new styles to question text */}
              <p style={questionStyles.questionText}>{question.english}</p>
              <p style={questionStyles.sinhalaText}>{question.sinhala}</p>
            </Card.Body>
          </Card>

          <AudioUploader
            questionNumber={currentQuestion}
            onUploadStart={handleUploadStart}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            disabled={uploading}
          />

          {uploadSuccess && (
            <Alert variant="success" className="mt-3">
              Response uploaded successfully! You can proceed to the next question.
            </Alert>
          )}

          <div className="d-flex justify-content-between mt-4">
            <Button
              variant="outline-secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 1 || uploading}
            >
              Previous
            </Button>
            {currentQuestion < 16 ? (
              <Button
                variant="primary"
                onClick={handleNextQuestion}
                disabled={!uploadSuccess && !responses.some(r => r.questionNumber === currentQuestion)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={handleCompleteAssessment}
                disabled={!uploadSuccess && !responses.some(r => r.questionNumber === currentQuestion)}
              >
                Complete Assessment
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AssessmentScreen;