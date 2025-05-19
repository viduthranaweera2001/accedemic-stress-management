// import React, { createContext, useState, useContext } from 'react';

// import { 
//   startAssessment as apiStartAssessment,
//   uploadAudioResponse as apiUploadResponse,
//   completeAssessment as apiCompleteAssessment,
//   getAssessmentStatus
// } from '../services/stress_service';

// const StressContext = createContext();

// export const StressProvider = ({ children }) => {
//   const [currentSession, setCurrentSession] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState(null);

//   const startAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiStartAssessment();
//       setCurrentSession(response.session_id);
//       setQuestions(response.questions);
//       setCurrentQuestion(1);
//       setResponses([]);
//       setResults(null);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to start assessment');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadResponse = async (questionNumber, audioFile) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
      
//       setResponses([...responses, { questionNumber, responseId: response.response_id }]);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to upload response');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completeAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiCompleteAssessment(currentSession);
//       setResults(response);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to complete assessment');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkStatus = async () => {
//     if (!currentSession) return null;
    
//     try {
//       const status = await getAssessmentStatus(currentSession);
//       return status;
//     } catch (err) {
//       console.error("Failed to check assessment status:", err);
//       return null;
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < 16) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const previousQuestion = () => {
//     if (currentQuestion > 1) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   return (
//     <StressContext.Provider
//       value={{
//         currentSession,
//         questions,
//         responses,
//         currentQuestion,
//         loading,
//         error,
//         results,
//         startAssessment,
//         uploadResponse,
//         completeAssessment,
//         checkStatus,
//         nextQuestion,
//         previousQuestion,
//       }}
//     >
//       {children}
//     </StressContext.Provider>
//   );
// };

// export const useStress = () => useContext(StressContext);

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// import React, { createContext, useState, useContext } from 'react';
// import { 
//   startAssessment as apiStartAssessment,
//   uploadAudioResponse as apiUploadResponse,
//   completeAssessment as apiCompleteAssessment,
//   getAssessmentStatus
// } from '../services/stress';

// const StressContext = createContext();

// export const StressProvider = ({ children }) => {
//   const [currentSession, setCurrentSession] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState(null);

//   const startAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiStartAssessment();
//       setCurrentSession(response.session_id);
//       setQuestions(response.questions);
//       setCurrentQuestion(1);
//       setResponses([]);
//       setResults(null);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to start assessment');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const uploadResponse = async (questionNumber, audioFile) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
      
//       setResponses([...responses, { questionNumber, responseId: response.response_id }]);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to upload response');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const completeAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiCompleteAssessment(currentSession);
//       setResults(response);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to complete assessment');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkStatus = async () => {
//     if (!currentSession) return null;
    
//     try {
//       const status = await getAssessmentStatus(currentSession);
//       return status;
//     } catch (err) {
//       console.error("Failed to check assessment status:", err);
//       return null;
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < 16) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const previousQuestion = () => {
//     if (currentQuestion > 1) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   return (
//     <StressContext.Provider
//       value={{
//         currentSession,
//         questions,
//         responses,
//         currentQuestion,
//         loading,
//         error,
//         results,
//         startAssessment,
//         uploadResponse,
//         completeAssessment,
//         checkStatus,
//         nextQuestion,
//         previousQuestion,
//       }}
//     >
//       {children}
//     </StressContext.Provider>
//   );
// };

// export const useStress = () => useContext(StressContext);

// ---------------------------------------------------------------
// ---------------------------------------------------------------


// import React, { createContext, useState, useContext } from 'react';
// import { 
//   startAssessment as apiStartAssessment,
//   uploadAudioResponse as apiUploadResponse,
//   completeAssessment as apiCompleteAssessment,
//   getAssessmentStatus
// } from '../services/stress';

// const StressContext = createContext();

// export const StressProvider = ({ children }) => {
//   const [currentSession, setCurrentSession] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState(null);

//   const startAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiStartAssessment();
//       setCurrentSession(response.session_id);
//       setQuestions(response.questions);
//       setCurrentQuestion(1);
//       setResponses([]);
//       setResults(null);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to start assessment');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const uploadResponse = async (questionNumber, audioFile) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
      
//   //     setResponses([...responses, { questionNumber, responseId: response.response_id }]);
      
//   //     // Add success property to response to satisfy the check in AudioUploader.js
//   //     return { ...response, success: true };
//   //   } catch (err) {
//   //     setError(err.response?.data?.detail || 'Failed to upload response');
//   //     throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   // const uploadResponse = async (questionNumber, audioFile) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
//   //     setResponses([...responses, { questionNumber, responseId: response.response_id }]);
      
//   //     // Add success property to response
//   //     return { ...response, success: true };
//   //   } catch (err) {
//   //     setError(err.response?.data?.detail || 'Failed to upload response');
//   //     throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   // const uploadResponse = async (questionNumber, audioFile) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
//   //     setResponses([...responses, { questionNumber, responseId: response.response_id }]);
      
//   //     // Add success property to response
//   //     return { ...response, success: true };
//   //   } catch (err) {
//   //     setError(err.response?.data?.detail || 'Failed to upload response');
//   //     throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const uploadResponse = async (questionNumber, audioFile) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
//   //     setResponses([...responses, { questionNumber, responseId: response.response_id }]);
      
//   //     // Add success property to response
//   //     return { ...response, success: true };
//   //   } catch (err) {
//   //     setError(err.response?.data?.detail || 'Failed to upload response');
//   //     throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   // const uploadResponse = async (questionNumber, audioFile) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     console.log(`Uploading file for question ${questionNumber}:`, audioFile.name);
      
//   //     const response = await apiUploadResponse(currentSession, questionNumber, audioFile);
      
//   //     console.log("Upload API response:", response);
      
//   //     setResponses([...responses, { questionNumber, responseId: response.response_id }]);
      
//   //     return { ...response, success: true };
//   //   } catch (err) {
//   //     console.error("Upload error in context:", err);
//   //     setError(err.response?.data?.detail || 'Failed to upload response');
//   //     throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   // const uploadResponse = async (questionNumber, audioFile) => {
//   //   try {
//   //     setLoading(true);
//   //     setError(null);
      
//   //     console.log(`Uploading file for question ${questionNumber}:`, audioFile.name);
      
//   //     // Create a new FormData instance to ensure proper format
//   //     const formData = new FormData();
//   //     formData.append('session_id', currentSession);
//   //     formData.append('question_number', questionNumber);
//   //     formData.append('audio_file', audioFile);
      
//   //     // Direct fetch implementation to bypass potential issues
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch('/api/stress/assessment/upload', {
//   //       method: 'POST',
//   //       body: formData,
//   //       headers: {
//   //         'Authorization': token ? `Bearer ${token}` : ''
//   //       }
//   //     });
      
//   //     if (!response.ok) {
//   //       throw new Error(`Upload failed with status: ${response.status}`);
//   //     }
      
//   //     const responseData = await response.json();
//   //     console.log("Upload API response:", responseData);
      
//   //     // Update responses state
//   //     setResponses([...responses, { 
//   //       questionNumber, 
//   //       responseId: responseData.response_id || 'temp-id' 
//   //     }]);
      
//   //     return { ...responseData, success: true };
//   //   } catch (err) {
//   //     console.error("Upload error in context:", err);
//   //     setError(err.message || 'Failed to upload response');
      
//   //     // For testing - force success even on error
//   //     // In production, you'd remove this and let the error propagate
//   //     setResponses([...responses, { 
//   //       questionNumber, 
//   //       responseId: `temp-id-${questionNumber}` 
//   //     }]);
//   //     return { success: true, response_id: `temp-id-${questionNumber}` };
      
//   //     // Uncomment this line to properly throw the error in production
//   //     // throw err;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };



//   const uploadResponse = async (questionNumber, audioFile) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log(`Uploading file for question ${questionNumber}:`, audioFile.name, "Size:", audioFile.size, "bytes");
      
//       // Create a new FormData instance
//       const formData = new FormData();
//       formData.append('session_id', currentSession);
//       formData.append('question_number', questionNumber);
//       formData.append('audio_file', audioFile);
      
//       // Direct fetch implementation
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/stress/assessment/upload', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : ''
//         }
//       });
      
//       if (!response.ok) {
//         const errorMessage = `Upload failed with status: ${response.status}`;
//         console.error(errorMessage);
//         throw new Error(errorMessage);
//       }
      
//       const responseData = await response.json();
//       console.log("Upload API response:", responseData);
      
//       // Update responses state
//       setResponses([...responses, { 
//         questionNumber, 
//         responseId: responseData.response_id || 'temp-id' 
//       }]);
      
//       return { ...responseData, success: true };
//     } catch (err) {
//       console.error("Upload error in context:", err);
//       setError(err.message || 'Failed to upload response');
      
//       // Re-throw the error with status code if it exists
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };


//   const completeAssessment = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await apiCompleteAssessment(currentSession);
//       setResults(response);
//       return response;
//     } catch (err) {
//       setError(err.response?.data?.detail || 'Failed to complete assessment');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkStatus = async () => {
//     if (!currentSession) return null;
    
//     try {
//       const status = await getAssessmentStatus(currentSession);
//       return status;
//     } catch (err) {
//       console.error("Failed to check assessment status:", err);
//       return null;
//     }
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < 16) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   };

//   const previousQuestion = () => {
//     if (currentQuestion > 1) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   };

//   return (
//     <StressContext.Provider
//       value={{
//         currentSession,
//         questions,
//         responses,
//         currentQuestion,
//         loading,
//         error,
//         results,
//         startAssessment,
//         uploadResponse,
//         completeAssessment,
//         checkStatus,
//         nextQuestion,
//         previousQuestion,
//       }}
//     >
//       {children}
//     </StressContext.Provider>
//   );
// };

// export const useStress = () => useContext(StressContext);


import React, { createContext, useState, useContext } from 'react';
import {
  startAssessment as apiStartAssessment,
  uploadAudioResponse as apiUploadResponse,
  completeAssessment as apiCompleteAssessment,
  getAssessmentStatus
} from '../services/stress';

const StressContext = createContext();

export const StressProvider = ({ children }) => {
  const [currentSession, setCurrentSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const startAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiStartAssessment();
      setCurrentSession(response.session_id);
      localStorage.setItem('currentSession', response.session_id);
      setQuestions(response.questions);
      setCurrentQuestion(1);
      setResponses([]);
      setResults(null);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to start assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadResponse = async (questionNumber, audioFile) => {
    try {
      setLoading(true);
      setError(null);
      
      const sessionId = currentSession || localStorage.getItem('currentSession');
      if (!sessionId) {
        throw new Error('No active session found');
      }
      
      console.log(`Uploading file for question ${questionNumber}, session ${sessionId}:`, audioFile.name);
      
      const response = await apiUploadResponse(sessionId, questionNumber, audioFile);
      
      if (response && response.success) {
        // Update responses state
        const updatedResponses = [...responses];
        const existingIndex = updatedResponses.findIndex(r => r.questionNumber === questionNumber);
        
        if (existingIndex >= 0) {
          updatedResponses[existingIndex] = {
            questionNumber,
            responseId: response.response_id
          };
        } else {
          updatedResponses.push({
            questionNumber,
            responseId: response.response_id
          });
        }
        
        setResponses(updatedResponses);
        console.log(`Response saved for question ${questionNumber}`);
        return { ...response, success: true };
      } else {
        throw new Error('Upload failed - no success response');
      }
    } catch (err) {
      console.error(`Upload error for question ${questionNumber}:`, err);
      setError(err.message || 'Failed to upload response');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const completeAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      const sessionId = currentSession || localStorage.getItem('currentSession');
      const response = await apiCompleteAssessment(sessionId);
      setResults(response);
      return response;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to complete assessment');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    const sessionId = currentSession || localStorage.getItem('currentSession');
    if (!sessionId) return null;
    
    try {
      const status = await getAssessmentStatus(sessionId);
      return status;
    } catch (err) {
      console.error("Failed to check assessment status:", err);
      return null;
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < 16) {
      setCurrentQuestion(currentQuestion + 1);
      setError(null);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setError(null);
    }
  };

  const hasResponseForQuestion = (questionNumber) => {
    return responses.some(r => r.questionNumber === questionNumber);
  };

  return (
    <StressContext.Provider
      value={{
        currentSession,
        questions,
        responses,
        currentQuestion,
        loading,
        error,
        results,
        startAssessment,
        uploadResponse,
        completeAssessment,
        checkStatus,
        nextQuestion,
        previousQuestion,
        hasResponseForQuestion,
      }}
    >
      {children}
    </StressContext.Provider>
  );
};

export const useStress = () => useContext(StressContext);
