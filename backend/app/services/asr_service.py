# import os
# import torch
# from transformers import WhisperForConditionalGeneration, WhisperProcessor
# import librosa
# import time

# class ASRService:
#     def __init__(self):
#         model_dir = os.path.join(
#             os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
#             "models", 
#             "asr",
#             "whisper-small"
#         )
#         self.model_path = model_dir
#         self.model = None
#         self.processor = None
#         self.load_model()
    
#     def load_model(self):
#         """Load the pre-trained ASR model"""
#         max_retries = 3
#         for attempt in range(max_retries):
#             try:
#                 self.model = WhisperForConditionalGeneration.from_pretrained(self.model_path)
#                 self.processor = WhisperProcessor.from_pretrained(self.model_path)
#                 print("ASR model and processor loaded successfully")
#                 return
#             except Exception as e:
#                 print(f"Error loading ASR model (attempt {attempt+1}/{max_retries}): {e}")
#                 if attempt < max_retries - 1:
#                     time.sleep(2)  # Wait before retrying
#                 else:
#                     print("Failed to load ASR model after maximum retries")
            
#     def transcribe(self, audio_path):
#         """
#         Transcribe speech from audio file to text
        
#         Args:
#             audio_path: Path to audio file
            
#         Returns:
#             Dictionary containing transcription results
#         """
#         try:
#             if not self.model or not self.processor:
#                 return {"success": False, "error": "ASR model not loaded", "text": None}
            
#             # Check if file exists
#             if not os.path.exists(audio_path):
#                 return {"success": False, "error": f"Audio file not found: {audio_path}", "text": None}
            
#             # Load audio
#             try:
#                 audio, sr = librosa.load(audio_path, sr=16000)
#             except Exception as e:
#                 return {"success": False, "error": f"Failed to load audio file: {str(e)}", "text": None}
            
#             # Process audio
#             input_features = self.processor(audio, sampling_rate=16000, return_tensors="pt").input_features
            
#             # Generate transcription
#             with torch.no_grad():
#                 generated_ids = self.model.generate(input_features)
            
#             # Decode transcription
#             transcription = self.processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
            
#             if not transcription or transcription.strip() == "":
#                 return {"success": False, "error": "No speech detected or transcription failed", "text": ""}
            
#             return {
#                 "text": transcription,
#                 "success": True
#             }
            
#         except Exception as e:
#             return {
#                 "error": f"Transcription failed: {str(e)}",
#                 "success": False,
#                 "text": None
#             }


import os
import torch
from transformers import WhisperForConditionalGeneration, WhisperProcessor
import librosa
import time

class ASRService:
    def __init__(self):
        model_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "models",
            "asr",
            "whisper-small"
        )
        self.model_path = model_dir
        self.model = None
        self.processor = None
        self.load_model()
    
    def load_model(self):
        """Load the pre-trained ASR model"""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Load Whisper model with forced language support
                self.model = WhisperForConditionalGeneration.from_pretrained(self.model_path)
                self.processor = WhisperProcessor.from_pretrained(self.model_path)
                
                # Set model to evaluation mode
                self.model.eval()
                
                print("ASR model and processor loaded successfully")
                return
            except Exception as e:
                print(f"Error loading ASR model (attempt {attempt+1}/{max_retries}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2)
                else:
                    print("Failed to load ASR model after maximum retries")
    
    def transcribe(self, audio_path):
        """Transcribe speech from audio file to text"""
        try:
            if not self.model or not self.processor:
                return {"success": False, "error": "ASR model not loaded", "text": None}
            
            # Check if file exists
            if not os.path.exists(audio_path):
                return {"success": False, "error": f"Audio file not found: {audio_path}", "text": None}
            
            # Load audio with proper sample rate
            try:
                audio, sr = librosa.load(audio_path, sr=16000)
            except Exception as e:
                return {"success": False, "error": f"Failed to load audio file: {str(e)}", "text": None}
            
            # Process audio
            input_features = self.processor(
                audio, 
                sampling_rate=16000, 
                return_tensors="pt"
            ).input_features
            
            # Generate transcription with language hint
            with torch.no_grad():
                # Force Sinhala language detection
                forced_decoder_ids = self.processor.get_decoder_prompt_ids(
                    language="si",  # Sinhala language code
                    task="transcribe"
                )
                
                generated_ids = self.model.generate(
                    input_features,
                    forced_decoder_ids=forced_decoder_ids
                )
            
            # Decode transcription
            transcription = self.processor.batch_decode(
                generated_ids, 
                skip_special_tokens=True
            )[0]
            
            if not transcription or transcription.strip() == "":
                return {"success": False, "error": "No speech detected or transcription failed", "text": ""}
            
            return {
                "text": transcription,
                "success": True
            }
            
        except Exception as e:
            return {
                "error": f"Transcription failed: {str(e)}",
                "success": False,
                "text": None
            }