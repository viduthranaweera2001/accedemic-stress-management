// import api from './api';

// export const startAssessment = async () => {
//   const response = await api.post('/stress/assessment/start');
//   return response.data;
// };

// export const getQuestion = async (questionNumber) => {
//   const response = await api.get(`/stress/assessment/question/${questionNumber}`);
//   return response.data;
// };

// export const uploadAudioResponse = async (sessionId, questionNumber, audioFile) => {
//   const formData = new FormData();
//   formData.append('session_id', sessionId);
//   formData.append('question_number', questionNumber);
//   formData.append('audio_file', audioFile);
  
//   const response = await api.post('/stress/assessment/upload', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });
  
//   return response.data;
// };

// export const getAssessmentStatus = async (sessionId) => {
//   const response = await api.get(`/stress/assessment/status/${sessionId}`);
//   return response.data;
// };

// export const completeAssessment = async (sessionId) => {
//   const response = await api.post(`/stress/assessment/complete/${sessionId}`);
//   return response.data;
// };

// export const getAssessmentResults = async (sessionId) => {
//   const response = await api.get(`/stress/assessment/results/${sessionId}`);
//   return response.data;
// };


import api from './api';

export const startAssessment = async () => {
  const response = await api.post('/stress/assessment/start');
  return response.data;
};

export const getQuestion = async (questionNumber) => {
  const response = await api.get(`/stress/assessment/question/${questionNumber}`);
  return response.data;
};

export const uploadAudioResponse = async (sessionId, questionNumber, audioFile) => {
  const formData = new FormData();
  formData.append('session_id', sessionId);
  formData.append('question_number', questionNumber);
  formData.append('audio_file', audioFile);
  
  console.log(`Uploading to API - Session: ${sessionId}, Question: ${questionNumber}, File: ${audioFile.name}`);
  
  try {
    const response = await api.post('/stress/assessment/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30 second timeout for large files
    });
    
    return response.data;
  } catch (error) {
    console.error('API upload error:', error);
    // If the server returns success despite error status, handle it
    if (error.response && error.response.data) {
      return error.response.data;
    }
    throw error;
  }
};

export const getAssessmentStatus = async (sessionId) => {
  const response = await api.get(`/stress/assessment/status/${sessionId}`);
  return response.data;
};

export const completeAssessment = async (sessionId) => {
  const response = await api.post(`/stress/assessment/complete/${sessionId}`);
  return response.data;
};

export const getAssessmentResults = async (sessionId) => {
  const response = await api.get(`/stress/assessment/results/${sessionId}`);
  return response.data;
};