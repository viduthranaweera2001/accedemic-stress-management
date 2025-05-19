// import React, { useState, useEffect, useRef } from 'react';
// import { Button, Card } from 'react-bootstrap';
// import { useStress } from '../../context/StressContext';

// const AudioUploader = ({ questionNumber, onUploadStart, onUploadSuccess, onUploadError, disabled }) => {
//   const [file, setFile] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState(null); // null, 'success', or 'error'
//   const { uploadResponse } = useStress();
//   const audioRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);

//   // Reset state when question changes
//   useEffect(() => {
//     setFile(null);
//     setAudioUrl(null);
//     setRecording(false);
//     setUploadStatus(null);
    
//     // Reset file name display
//     const fileNameDisplay = document.getElementById('file-name-display');
//     if (fileNameDisplay) {
//       fileNameDisplay.textContent = "No file chosen";
//     }
    
//     // Clear any existing message
//     const messageContainer = document.getElementById('message-container');
//     if (messageContainer) {
//       messageContainer.innerHTML = '';
//     }
//   }, [questionNumber]);

//   // Function to handle file selection
//   const setupFileInput = () => {
//     try {
//       window.selectAudioFile = function(inputElement) {
//         if (inputElement.files && inputElement.files[0]) {
//           const selectedFile = inputElement.files[0];
//           console.log("File selected:", selectedFile);
          
//           setFile(selectedFile);
//           setUploadStatus(null);
          
//           // Update file name display
//           const fileNameDisplay = document.getElementById('file-name-display');
//           if (fileNameDisplay) {
//             fileNameDisplay.textContent = selectedFile.name;
//           }
          
//           try {
//             const url = URL.createObjectURL(selectedFile);
//             setAudioUrl(url);
//           } catch (error) {
//             console.error("Error creating audio URL:", error);
//           }
          
//           // Clear any existing message
//           const messageContainer = document.getElementById('message-container');
//           if (messageContainer) {
//             messageContainer.innerHTML = '';
//           }
//         }
//       };
      
//       // Insert HTML directly to bypass React abstractions
//       const container = document.getElementById('file-input-container');
//       if (container) {
//         container.innerHTML = '';
//         container.innerHTML = `
//           <input 
//             type="file" 
//             id="audio-file-input-${questionNumber}" 
//             accept=".wav,.mp3,audio/wav,audio/mpeg" 
//             style="display:none" 
//             onchange="window.selectAudioFile(this)" 
//           />
//           <button 
//             onclick="document.getElementById('audio-file-input-${questionNumber}').click()" 
//             class="btn btn-outline-secondary"
//             style="margin-right: 10px;"
//           >Choose File</button>
//           <span id="file-name-display">No file chosen</span>
//         `;
//       }
      
//       // Create message container if it doesn't exist
//       if (!document.getElementById('message-container')) {
//         const messageContainer = document.createElement('div');
//         messageContainer.id = 'message-container';
//         messageContainer.className = 'mt-3';
//         if (container && container.parentNode) {
//           container.parentNode.insertBefore(messageContainer, container.nextSibling);
//         }
//       }
//     } catch (error) {
//       console.error("Error setting up file input:", error);
//     }
//   };

//   // Start Recording Function
//   const startRecording = async () => {
//     chunksRef.current = [];
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunksRef.current.push(e.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
//         const audioFile = new File([audioBlob], `question_${questionNumber}.wav`, { type: 'audio/wav' });
//         setFile(audioFile);
//         setUploadStatus(null);
        
//         try {
//           const url = URL.createObjectURL(audioBlob);
//           setAudioUrl(url);
//         } catch (error) {
//           console.error("Error creating audio URL:", error);
//         }
        
//         setRecording(false);
        
//         // Update file name display
//         const fileNameDisplay = document.getElementById('file-name-display');
//         if (fileNameDisplay) {
//           fileNameDisplay.textContent = audioFile.name;
//         }
        
//         // Clear any existing message
//         const messageContainer = document.getElementById('message-container');
//         if (messageContainer) {
//           messageContainer.innerHTML = '';
//         }
//       };

//       mediaRecorder.start();
//       setRecording(true);
//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//       alert('Could not access your microphone. Please check your browser permissions.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       mediaRecorderRef.current.stop();
//       mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
//     }
//   };

//   // Show a single success message
//   const showSuccessMessage = () => {
//     const messageContainer = document.getElementById('message-container');
//     if (messageContainer) {
//       messageContainer.innerHTML = '';
//       const successAlert = document.createElement('div');
//       successAlert.className = 'alert alert-success';
//       successAlert.textContent = 'Response uploaded successfully! You can proceed to the next question.';
//       messageContainer.appendChild(successAlert);
//     }
//   };

//   // Show a single error message
//   const showErrorMessage = (message = 'Upload failed. Please try again.') => {
//     const messageContainer = document.getElementById('message-container');
//     if (messageContainer) {
//       messageContainer.innerHTML = '';
//       const errorAlert = document.createElement('div');
//       errorAlert.className = 'alert alert-danger';
//       errorAlert.textContent = message;
//       messageContainer.appendChild(errorAlert);
//     }
//   };

//   // Direct API upload with fetch to bypass potential issues
//   const directUpload = async () => {
//     if (!file) return null;
    
//     console.log("Attempting direct upload:", file.name);
    
//     const formData = new FormData();
//     formData.append('session_id', localStorage.getItem('currentSession') || '');
//     formData.append('question_number', questionNumber);
//     formData.append('audio_file', file);
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('/api/stress/assessment/upload', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Authorization': token ? `Bearer ${token}` : ''
//         }
//       });
      
//       if (response.ok) {
//         const data = await response.json();
//         console.log("Direct upload successful:", data);
//         return { success: true };
//       } else {
//         console.error("Direct upload failed:", response.status);
//         // Force success for testing (remove in production)
//         return { success: true };
//       }
//     } catch (error) {
//       console.error("Direct upload error:", error);
//       // Force success for testing (remove in production)
//       return { success: true };
//     }
//   };

//   // Skip upload and continue to next question
//   const handleSkipUpload = () => {
//     console.log("Skipping upload and continuing to next question");
//     showSuccessMessage();
    
//     // Call success callback with a slight delay
//     setTimeout(() => {
//       onUploadSuccess && onUploadSuccess();
//     }, 100);
//   };

//   // Handle upload with multiple approaches
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select or record an audio file first");
//       return;
//     }

//     try {
//       setIsUploading(true);
//       onUploadStart && onUploadStart();
      
//       console.log("Starting upload process for file:", file.name);
      
//       // Try normal upload first
//       try {
//         const response = await uploadResponse(questionNumber, file);
//         console.log("Normal upload successful:", response);
        
//         setUploadStatus('success');
//         showSuccessMessage();
        
//         // Call success callback
//         setTimeout(() => {
//           onUploadSuccess && onUploadSuccess();
//         }, 1000);
//         return;
//       } catch (error) {
//         console.error("Normal upload failed:", error);
        
//         // Try direct upload as fallback
//         console.log("Trying direct upload...");
//         const directResponse = await directUpload();
        
//         if (directResponse && directResponse.success) {
//           console.log("Direct upload successful");
          
//           setUploadStatus('success');
//           showSuccessMessage();
          
//           // Call success callback
//           setTimeout(() => {
//             onUploadSuccess && onUploadSuccess();
//           }, 1000);
//           return;
//         }
        
//         throw error;
//       }
//     } catch (error) {
//       console.error("All upload attempts failed:", error);
      
//       setUploadStatus('error');
//       showErrorMessage('Upload failed. You can try a different file or click "Skip Upload & Continue".');
      
//       onUploadError && onUploadError();
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // Initialize file input container after component mounts
//   useEffect(() => {
//     setupFileInput();
//   }, []);

//   return (
//     <Card className="border-light shadow-sm">
//       <Card.Body>
//         <h5 className="mb-3">Record or Upload Audio Response</h5>
        
//         <div className="mb-4">
//           {!recording ? (
//             <Button
//               variant="outline-primary"
//               onClick={startRecording}
//               disabled={disabled || !!audioUrl}
//               className="me-2"
//             >
//               Start Recording
//             </Button>
//           ) : (
//             <Button
//               variant="danger"
//               onClick={stopRecording}
//             >
//               Stop Recording
//             </Button>
//           )}
//           <span className="ms-3 text-muted">
//             {recording && "Recording in progress..."}
//           </span>
//         </div>
        
//         <div className="mb-3">
//           <p className="mb-2">Or upload an audio file:</p>
          
//           {/* This div will contain our custom file input */}
//           <div id="file-input-container"></div>
          
//           <p className="text-muted mt-2">
//             Please upload your audio response in WAV or MP3 format.
//           </p>
//         </div>
        
//         {audioUrl && (
//           <div className="mb-3">
//             <p className="mb-2">Preview:</p>
//             <audio
//               ref={audioRef}
//               src={audioUrl}
//               controls
//               className="w-100"
//               onError={(e) => {
//                 console.error("Audio element error:", e);
//                 setAudioUrl(null);
//               }}
//             />
//           </div>
//         )}
        
//         {/* Message container for success/error messages */}
//         <div id="message-container" className="mt-3"></div>
        
//         <div className="d-flex mt-3">
//           {/* Skip Upload button for emergencies */}
//           {file && (
//             <Button
//               variant="outline-secondary"
//               onClick={handleSkipUpload}
//               className="me-2"
//             >
//               Skip Upload & Continue
//             </Button>
//           )}
          
//           <Button
//             variant="primary"
//             onClick={handleUpload}
//             disabled={!file || disabled || recording || isUploading}
//           >
//             {isUploading ? "Uploading..." : "Upload Response"}
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AudioUploader;


// import React, { useState, useEffect, useRef } from 'react';
// import { Button, Card, Alert } from 'react-bootstrap';
// import { useStress } from '../../context/StressContext';

// const AudioUploader = ({ questionNumber, onUploadStart, onUploadSuccess, onUploadError, disabled }) => {
//   const [file, setFile] = useState(null);
//   const [recording, setRecording] = useState(false);
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState('');
//   const { uploadResponse } = useStress();
//   const audioRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const chunksRef = useRef([]);
//   const fileInputRef = useRef(null);

//   // Reset state when question changes
//   useEffect(() => {
//     setFile(null);
//     setAudioUrl(null);
//     setRecording(false);
//     setUploadStatus(null);
//     setUploadMessage('');
//     setIsUploading(false);
    
//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   }, [questionNumber]);

//   // Handle file selection
//   const handleFileSelect = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       console.log(`File selected for question ${questionNumber}:`, selectedFile.name);
//       setFile(selectedFile);
//       setUploadStatus(null);
//       setUploadMessage('');
      
//       try {
//         const url = URL.createObjectURL(selectedFile);
//         setAudioUrl(url);
//       } catch (error) {
//         console.error("Error creating audio URL:", error);
//       }
//     }
//   };

//   // Start Recording Function
//   const startRecording = async () => {
//     chunksRef.current = [];
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
      
//       mediaRecorder.ondataavailable = (e) => {
//         if (e.data.size > 0) {
//           chunksRef.current.push(e.data);
//         }
//       };
      
//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
//         const audioFile = new File([audioBlob], `question_${questionNumber}.wav`, { type: 'audio/wav' });
//         setFile(audioFile);
//         setUploadStatus(null);
//         setUploadMessage('');
        
//         try {
//           const url = URL.createObjectURL(audioBlob);
//           setAudioUrl(url);
//         } catch (error) {
//           console.error("Error creating audio URL:", error);
//         }
        
//         setRecording(false);
//       };
      
//       mediaRecorder.start();
//       setRecording(true);
//     } catch (err) {
//       console.error('Error accessing microphone:', err);
//       alert('Could not access your microphone. Please check your browser permissions.');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       mediaRecorderRef.current.stop();
//       mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
//     }
//   };

//   // Handle upload with proper error handling
//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select or record an audio file first");
//       return;
//     }

//     try {
//       setIsUploading(true);
//       onUploadStart && onUploadStart();
      
//       console.log(`Starting upload for question ${questionNumber}:`, file.name);
      
//       const response = await uploadResponse(questionNumber, file);
      
//       if (response && response.success) {
//         console.log(`Upload successful for question ${questionNumber}`);
//         setUploadStatus('success');
//         setUploadMessage('Response uploaded successfully! You can proceed to the next question.');
        
//         // Call success callback
//         setTimeout(() => {
//           onUploadSuccess && onUploadSuccess();
//         }, 500);
//       } else {
//         throw new Error('Upload failed - no success response');
//       }
//     } catch (error) {
//       console.error(`Upload failed for question ${questionNumber}:`, error);
//       setUploadStatus('error');
//       setUploadMessage('Upload failed. Please try again.');
//       onUploadError && onUploadError();
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Card className="border-light shadow-sm">
//       <Card.Body>
//         <h5 className="mb-3">Record or Upload Audio Response</h5>
        
//         <div className="mb-4">
//           {!recording ? (
//             <Button
//               variant="outline-primary"
//               onClick={startRecording}
//               disabled={disabled || !!audioUrl}
//               className="me-2"
//             >
//               Start Recording
//             </Button>
//           ) : (
//             <Button
//               variant="danger"
//               onClick={stopRecording}
//             >
//               Stop Recording
//             </Button>
//           )}
//           <span className="ms-3 text-muted">
//             {recording && "Recording in progress..."}
//           </span>
//         </div>
        
//         <div className="mb-3">
//           <p className="mb-2">Or upload an audio file:</p>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept=".wav,.mp3,audio/wav,audio/mpeg"
//             onChange={handleFileSelect}
//             className="form-control"
//             disabled={disabled || recording}
//           />
//           <p className="text-muted mt-2">
//             Please upload your audio response in WAV or MP3 format.
//           </p>
//         </div>
        
//         {audioUrl && (
//           <div className="mb-3">
//             <p className="mb-2">Preview:</p>
//             <audio
//               ref={audioRef}
//               src={audioUrl}
//               controls
//               className="w-100"
//               onError={(e) => {
//                 console.error("Audio element error:", e);
//                 setAudioUrl(null);
//               }}
//             />
//           </div>
//         )}
        
//         {uploadMessage && (
//           <Alert variant={uploadStatus === 'success' ? 'success' : 'danger'} className="mt-3">
//             {uploadMessage}
//           </Alert>
//         )}
        
//         <div className="d-flex mt-3">
//           <Button
//             variant="primary"
//             onClick={handleUpload}
//             disabled={!file || disabled || recording || isUploading}
//           >
//             {isUploading ? "Uploading..." : "Upload Response"}
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default AudioUploader;
// ---------------1111111111111111111------------------------------


import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Alert } from 'react-bootstrap';
import { useStress } from '../../context/StressContext';

const AudioUploader = ({ questionNumber, onUploadStart, onUploadSuccess, onUploadError, disabled }) => {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  
  // Remove the duplicate success message display by not showing it at the component level
  // We'll rely on the parent component's success alert instead
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { uploadResponse } = useStress();

  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const fileInputRef = useRef(null);

  // Reset state when question changes
  useEffect(() => {
    setFile(null);
    setAudioUrl(null);
    setRecording(false);
    setUploadStatus(null);
    setUploadMessage('');
    setIsUploading(false);
    setShowSuccessMessage(false); // Reset success message visibility
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [questionNumber]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log(`File selected for question ${questionNumber}:`, selectedFile.name);
      setFile(selectedFile);
      setUploadStatus(null);
      setUploadMessage('');
      setShowSuccessMessage(false); // Reset success message when new file selected
      
      try {
        const url = URL.createObjectURL(selectedFile);
        setAudioUrl(url);
      } catch (error) {
        console.error("Error creating audio URL:", error);
      }
    }
  };

  // Start Recording Function
  const startRecording = async () => {
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], `question_${questionNumber}.wav`, { type: 'audio/wav' });

        setFile(audioFile);
        setUploadStatus(null);
        setUploadMessage('');
        setShowSuccessMessage(false); // Reset success message when recording stopped
        
        try {
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
        } catch (error) {
          console.error("Error creating audio URL:", error);
        }

        setRecording(false);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access your microphone. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Handle upload with proper error handling
  const handleUpload = async () => {
    if (!file) {
      alert("Please select or record an audio file first");
      return;
    }

    try {
      setIsUploading(true);
      onUploadStart && onUploadStart();

      console.log(`Starting upload for question ${questionNumber}:`, file.name);

      const response = await uploadResponse(questionNumber, file);

      if (response && response.success) {
        console.log(`Upload successful for question ${questionNumber}`);
        setUploadStatus('success');
        // We set the message, but we won't display it directly in this component
        setUploadMessage('Response uploaded successfully! You can proceed to the next question.');
        // Call success callback, parent component will show the success message
        setTimeout(() => {
          onUploadSuccess && onUploadSuccess();
        }, 500);
      } else {
        throw new Error('Upload failed - no success response');
      }
    } catch (error) {
      console.error(`Upload failed for question ${questionNumber}:`, error);
      setUploadStatus('error');
      setUploadMessage('Upload failed. Please try again.');
      onUploadError && onUploadError();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="border-light shadow-sm">
      <Card.Body>
        <h5 className="mb-3">Record or Upload Audio Response</h5>
        <div className="mb-4">
          {!recording ? (
            <Button
              variant="outline-primary"
              onClick={startRecording}
              disabled={disabled || !!audioUrl}
              className="me-2"
            >
              Start Recording
            </Button>
          ) : (
            <Button
              variant="danger"
              onClick={stopRecording}
            >
              Stop Recording
            </Button>
          )}
          <span className="ms-3 text-muted">
            {recording && "Recording in progress..."}
          </span>
        </div>
        <div className="mb-3">
          <p className="mb-2">Or upload an audio file:</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".wav,.mp3,audio/wav,audio/mpeg"
            onChange={handleFileSelect}
            className="form-control"
            disabled={disabled || recording}
          />
          <p className="text-muted mt-2">
            Please upload your audio response in WAV or MP3 format.
          </p>
        </div>
        {audioUrl && (
          <div className="mb-3">
            <p className="mb-2">Preview:</p>
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="w-100"
              onError={(e) => {
                console.error("Audio element error:", e);
                setAudioUrl(null);
              }}
            />
          </div>
        )}
        
        {/* Only show error messages here, not success messages (which come from parent) */}
        {uploadStatus === 'error' && uploadMessage && (
          <Alert variant="danger" className="mt-3">
            {uploadMessage}
          </Alert>
        )}
        
        {/* Remove the standalone success message that was displayed here */}
        
        <div className="d-flex mt-3">
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!file || disabled || recording || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Response"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AudioUploader;