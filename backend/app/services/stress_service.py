# import os
# import uuid
# import aiofiles
# from fastapi import UploadFile, BackgroundTasks
# from sqlalchemy.orm import Session
# import json
# from collections import Counter
# from datetime import datetime

# from app.db.models import AssessmentSession, User, EmotionEnum, StressLevelEnum, LikertLevelEnum, QuestionResponse
# from app.services.audio_processor import AudioProcessor
# from app.services.asr_service import ASRService
# from app.services.text_classifier import LikertClassifier

# class StressService:
#     def __init__(self):
#         self.audio_processor = AudioProcessor()
#         self.asr_service = ASRService()
#         self.text_classifier = LikertClassifier()
#         self.upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
        
#         # Create upload directory if it doesn't exist
#         os.makedirs(self.upload_dir, exist_ok=True)
        
#         # List of questions in English and Sinhala
#         self.questions = [
#             {
#                 "english": "How often do you lose interest in subjects during your university academic period?",
#                 "sinhala": "ඔබට විශ්වවිද්‍යාල අධ්‍යයන කාලය තුළ විෂයන් කෙරෙහි උනන්දුව අඩුවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How long have you been experiencing difficulty remembering what you have learned?",
#                 "sinhala": "ඔබ ඉගෙන ගත් දේවල් මතක තබා ගැනීමේ අපහසුතාව කොපමණ කාලයක් තිස්සේ දැනෙනවාද?"
#             },
#             {
#                 "english": "To what extent do you feel that your academic skills are not adequate for the expected level of the degree?",
#                 "sinhala": "ඔබේ අධ්‍යයන කුසලතා උපාධියේ අපේක්ෂිත මට්ටමට ප්‍රමාණවත් නොවන බව කොතරම් දුරට දැනෙනවාද?"
#             },
#             {
#                 "english": "How many times do you feel unprepared for exams despite studying?",
#                 "sinhala": "පාඩම් කළත් විභාගයට සූදානම් නැති බව කොපමණ වාර ගණනක් දැනෙනවාද?"
#             },
#             {
#                 "english": "How long have you felt that the syllabus is severe/excessive for you?",
#                 "sinhala": "විෂය නිර්දේශය ඔබට බරපතල/අධික බව කොපමණ කාලයක් තිස්සේ දැනෙනවාද?"
#             },
#             {
#                 "english": "How many times do you find it difficult to understand study notes and lectures?",
#                 "sinhala": "අධ්‍යයන සටහන් හා දේශන තේරුම් ගැනීමට අපහසු වන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times do you experience difficulties/hardships in completing assignments?",
#                 "sinhala": "පැවරුම් සම්පූර්ණ කිරීමේදී අපහසුතා/දුෂ්කරතා ඇතිවන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "To what extent do you experience difficulties/hardships when giving lectures/presentations in front of others?",
#                 "sinhala": "අන් අය ඉදිරියේ දේශන/ඉදිරිපත් කිරීම් සිදු කිරීමේදී ඔබට අපහසුතා/දුෂ්කරතා ඇතිවන තරම කොපමණද?"
#             },
#             {
#                 "english": "How many times do you worry about results after exams are over?",
#                 "sinhala": "විභාග අවසන් වූ පසු ප්‍රතිඵල ගැන ඔබ කනස්සල්ලට පත්වන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times do you find it difficult to understand and keep up with the pace of lecturers' teaching?",
#                 "sinhala": "කථිකාචාර්යවරුන්ගේ ඉගැන්වීම් වේගවත් හා අවබෝධ කර ගැනීමට අපහසු වන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times do uncomfortable/problematic situations arise with friends or teachers?",
#                 "sinhala": "යාළුවන් හෝ ගුරුවරුන් සමඟ අමනාප/ගැටලුකාරී තත්ත්වයන් ඇතිවන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times do you feel pressure about the high expectations of teachers or parents?",
#                 "sinhala": "ගුරුවරු හෝ දෙමව්පියන්ගේ ඉහළ බලාපොරොත්තු ගැන පීඩනයක් දැනෙන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times do you feel that the support from friends in group work is inadequate?",
#                 "sinhala": "කණ්ඩායම් වැඩවලදී යාළුවන්ගෙන් ලැබෙන සහයෝගය මදි බව දැනෙන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times is it difficult to focus on lessons due to family responsibilities and job duties?",
#                 "sinhala": "පවුලේ වගකීම් හා රැකියා කටයුතු නිසා පාඩම් වලට අවධානය යොමු කිරීමට අපහසු වන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times does alcohol/cigarette use increase during exam and evaluation periods?",
#                 "sinhala": "විභාග හා ඇගයීම් කාලවලදී මත්පැන්/දුම්වැටි භාවිතය වැඩිවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times do superstitions/silly beliefs increase during exam periods?",
#                 "sinhala": "විභාග කාලවලදී අන්ධ විශ්වාස/බොළඳ විශ්වාස වැඩිවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             }
#         ]
    
#     async def start_assessment_session(self, user: User, db: Session):
#         """Start a new assessment session for a user"""
#         # Create a new session record
#         new_session = AssessmentSession(
#             user_id=user.id,
#             start_time=datetime.now()
#         )
        
#         db.add(new_session)
#         db.commit()
#         db.refresh(new_session)
        
#         return {
#             "session_id": new_session.id,
#             "questions": self.questions
#         }
    
#     async def get_question(self, question_number: int):
#         """Get a specific question by number"""
#         if question_number < 1 or question_number > len(self.questions):
#             return None
        
#         return self.questions[question_number - 1]
    
#     async def upload_audio_response(self, file: UploadFile, session_id: int, question_number: int, 
#                                     background_tasks: BackgroundTasks, user: User, db: Session):
#         """
#         Process uploaded audio file for a specific question
        
#         Args:
#             file: Uploaded audio file
#             session_id: Assessment session ID
#             question_number: Question number (1-16)
#             background_tasks: FastAPI background tasks
#             user: Current user
#             db: Database session
            
#         Returns:
#             Dictionary with processing results
#         """
#         try:
#             # Create unique filename
#             file_extension = os.path.splitext(file.filename)[1]
#             unique_filename = f"{session_id}_{question_number}_{uuid.uuid4()}{file_extension}"
#             file_path = os.path.join(self.upload_dir, unique_filename)
            
#             # Save uploaded file
#             async with aiofiles.open(file_path, 'wb') as out_file:
#                 content = await file.read()
#                 await out_file.write(content)
            
#             # Create response record in database
#             response = QuestionResponse(
#                 session_id=session_id,
#                 question_number=question_number,
#                 audio_file_path=file_path,
#                 created_at=datetime.now()
#             )
            
#             db.add(response)
#             db.commit()
#             db.refresh(response)
            
#             # Process the audio file in the background
#             background_tasks.add_task(
#                 self.process_audio_file, 
#                 file_path, 
#                 session_id, 
#                 question_number,
#                 response.id, 
#                 db
#             )
            
#             return {
#                 "success": True, 
#                 "response_id": response.id,
#                 "file_path": file_path
#             }
            
#         except Exception as e:
#             return {"success": False, "error": f"Upload failed: {str(e)}"}
    
#     async def process_audio_file(self, file_path: str, session_id: int, question_number: int, response_id: int, db: Session):
#         """
#         Process uploaded audio file for both text and emotion analysis
        
#         Args:
#             file_path: Path to audio file
#             session_id: Assessment session ID
#             question_number: Question number
#             response_id: Response record ID
#             db: Database session
#         """
#         try:
#             # 1. Process audio for emotion detection
#             emotion_result = self.audio_processor.predict_stress(file_path, extract_probs=True)
            
#             # 2. Process audio for text transcription (ASR)
#             asr_result = self.asr_service.transcribe(file_path)
            
#             # 3. Initialize variables
#             likert_level = None
#             text_stress_level = None
#             text_confidence = None
#             likert_score = None
            
#             # 4. If transcription successful, process for Likert classification
#             if asr_result["success"] and asr_result.get("text"):
#                 text_result = self.text_classifier.classify_text(asr_result["text"])
                
#                 if text_result["success"]:
#                     likert_level = text_result["likert_level"]
#                     text_stress_level = text_result["stress_level"]
#                     text_confidence = text_result["confidence"]
#                     likert_score = text_result["likert_score"]
            
#             # 5. Update database record with results
#             response = db.query(QuestionResponse).filter(QuestionResponse.id == response_id).first()
#             if response:
#                 if emotion_result["success"]:
#                     response.detected_emotion = emotion_result["emotion"]
#                     response.emotion_confidence = emotion_result["confidence"]
                
#                 if asr_result["success"]:
#                     response.transcribed_text = asr_result["text"]
                    
#                 if likert_level:
#                     response.likert_level = likert_level
#                     response.score = likert_score
                
#                 db.commit()
            
#         except Exception as e:
#             print(f"Error processing audio file: {e}")
    
#     async def calculate_final_results(self, session_id: int, db: Session):
#         """
#         Calculate final stress assessment results for a completed session
        
#         Args:
#             session_id: Assessment session ID
#             db: Database session
            
#         Returns:
#             Dictionary with final results
#         """
#         try:
#             # 1. Get all responses for this session
#             responses = db.query(QuestionResponse).filter(
#                 QuestionResponse.session_id == session_id
#             ).all()
            
#             if not responses:
#                 return {"success": False, "error": "No responses found for this session"}
            
#             # 2. Calculate text-based stress level
#             total_score = sum(r.score for r in responses if r.score is not None)
#             num_scored = sum(1 for r in responses if r.score is not None)
            
#             if num_scored > 0:
#                 average_score = total_score / num_scored
                
#                 # Scale up to match expected range if not all questions answered
#                 scaled_total = int(average_score * 16)
                
#                 # Apply scoring thresholds
#                 if scaled_total >= 64:
#                     text_stress_level = "High"
#                 elif scaled_total >= 48:
#                     text_stress_level = "Medium"
#                 elif scaled_total >= 32:
#                     text_stress_level = "Low"
#                 else:
#                     text_stress_level = "Minimal"
#             else:
#                 text_stress_level = None
#                 average_score = None
#                 scaled_total = None
            
#             # 3. Calculate voice-based stress level
#             emotions = [r.detected_emotion for r in responses if r.detected_emotion is not None]
#             emotion_counts = {}
#             dominant_emotion = None
            
#             if emotions:
#                 # Count frequency of each emotion
#                 emotion_counts = Counter(emotions)
                
#                 # Get most common emotion
#                 dominant_emotion, _ = emotion_counts.most_common(1)[0]
                
#                 # Map to stress level
#                 emotion_to_stress = {
#                     'angry': 'High',
#                     'sad': 'Medium',
#                     'neutral': 'Low',
#                     'happy': 'Minimal'
#                 }
                
#                 voice_stress_level = emotion_to_stress.get(dominant_emotion, "Medium")
#             else:
#                 voice_stress_level = None
            
#             # 4. Apply integration rules to determine final stress level
#             if text_stress_level and voice_stress_level:
#                 final_stress_level = self._integrate_stress_levels(
#                     text_stress_level, 
#                     voice_stress_level,
#                     total_score if num_scored > 0 else 0,
#                     dominant_emotion
#                 )
#             elif text_stress_level:
#                 final_stress_level = text_stress_level
#             elif voice_stress_level:
#                 final_stress_level = voice_stress_level
#             else:
#                 final_stress_level = "Medium"  # Default
            
#             # 5. Update session record with results
#             session = db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
#             if session:
#                 session.final_stress_level = final_stress_level
#                 session.text_stress_level = text_stress_level
#                 session.voice_stress_level = voice_stress_level
#                 session.total_score = total_score if num_scored > 0 else None
#                 session.end_time = datetime.now()
#                 db.commit()
            
#             # 6. Prepare detailed response
#             return {
#                 "success": True,
#                 "final_stress_level": final_stress_level,
#                 "text_stress_level": text_stress_level,
#                 "voice_stress_level": voice_stress_level,
#                 "total_score": total_score if num_scored > 0 else None,
#                 "dominant_emotion": dominant_emotion,
#                 "completed_questions": len(responses),
#                 "details": {
#                     "emotion_counts": dict(emotion_counts),
#                     "average_score": average_score,
#                     "responses": [
#                         {
#                             "question_number": r.question_number,
#                             "emotion": r.detected_emotion,
#                             "likert_level": r.likert_level,
#                             "score": r.score
#                         } for r in responses
#                     ]
#                 }
#             }
            
#         except Exception as e:
#             return {"success": False, "error": f"Error calculating results: {str(e)}"}
    
#     def _integrate_stress_levels(self, text_stress, voice_stress, total_score, dominant_emotion):
#         """
#         Apply rules to integrate text-based and voice-based stress assessments
        
#         Args:
#             text_stress: Text-based stress level
#             voice_stress: Voice-based stress level
#             total_score: Total Likert score
#             dominant_emotion: Dominant emotion detected
            
#         Returns:
#             Final integrated stress level
#         """
#         # Rule 1: Both agree
#         if text_stress == voice_stress:
#             return text_stress
            
#         # Rule 2: Differ by one level, take higher
#         stress_levels = ["Minimal", "Low", "Medium", "High"]
#         text_idx = stress_levels.index(text_stress)
#         voice_idx = stress_levels.index(voice_stress)
        
#         if abs(text_idx - voice_idx) == 1:
#             return stress_levels[max(text_idx, voice_idx)]
            
#         # Rule 3: Academic performance questions show high stress
#         if total_score > 56 and voice_stress in ["Low", "Minimal"]:
#             return text_stress
            
#         # Rule 4: Voice shows anger
#         if dominant_emotion == "angry" and voice_stress == "High" and text_stress in ["Medium", "Low"]:
#             return voice_stress
            
#         # Rule 5: Weighted average
#         weights = {"Minimal": 1, "Low": 2, "Medium": 3, "High": 4}
#         weighted_score = (weights[text_stress] * 0.6) + (weights[voice_stress] * 0.4)
        
#         if weighted_score < 1.5:
#             return "Minimal"
#         elif weighted_score < 2.5:
#             return "Low"
#         elif weighted_score < 3.5:
#             return "Medium"
#         else:
#             return "High"
            
#     async def get_assessment_status(self, session_id: int, db: Session):
#         """Get the current status of an assessment session"""
#         try:
#             # Check if session exists
#             session = db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
#             if not session:
#                 return {"success": False, "error": "Assessment session not found"}
                
#             # Get responses
#             responses = db.query(QuestionResponse).filter(QuestionResponse.session_id == session_id).all()
            
#             # Get answered question numbers
#             completed_questions = [r.question_number for r in responses]
            
#             return {
#                 "success": True,
#                 "session_id": session_id,
#                 "status": "completed" if session.end_time else "in-progress",
#                 "completed_questions": completed_questions,
#                 "total_questions": len(self.questions)
#             }
            
#         except Exception as e:
#             return {"success": False, "error": f"Error getting assessment status: {str(e)}"}


import os
import uuid
import aiofiles
from fastapi import UploadFile, BackgroundTasks
from sqlalchemy.orm import Session
import json
from collections import Counter
from datetime import datetime

from app.db.models import AssessmentSession, User, EmotionEnum, StressLevelEnum, LikertLevelEnum, QuestionResponse
from app.services.audio_processor import AudioProcessor
from app.services.asr_service import ASRService
from app.services.text_classifier import LikertClassifier

class StressService:
    def __init__(self):
        self.audio_processor = AudioProcessor()
        self.asr_service = ASRService()
        self.text_classifier = LikertClassifier()
        self.upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
        
        # Create upload directory if it doesn't exist
        os.makedirs(self.upload_dir, exist_ok=True)
        
        # List of questions in English and Sinhala
        self.questions = [
            {
                "english": "How often do you lose interest in subjects during your university academic period?",
                "sinhala": "ඔබට විශ්වවිද්‍යාල අධ්‍යයන කාලය තුළ විෂයන් කෙරෙහි උනන්දුව අඩුවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
            },
            {
                "english": "How long have you been experiencing difficulty remembering what you have learned?",
                "sinhala": "ඔබ ඉගෙන ගත් දේවල් මතක තබා ගැනීමේ අපහසුතාව කොපමණ කාලයක් තිස්සේ දැනෙනවාද?"
            },
            {
                "english": "To what extent do you feel that your academic skills are not adequate for the expected level of the degree?",
                "sinhala": "ඔබේ අධ්‍යයන කුසලතා උපාධියේ අපේක්ෂිත මට්ටමට ප්‍රමාණවත් නොවන බව කොතරම් දුරට දැනෙනවාද?"
            },
            {
                "english": "How many times do you feel unprepared for exams despite studying?",
                "sinhala": "පාඩම් කළත් විභාගයට සූදානම් නැති බව කොපමණ වාර ගණනක් දැනෙනවාද?"
            },
            {
                "english": "How long have you felt that the syllabus is severe/excessive for you?",
                "sinhala": "විෂය නිර්දේශය ඔබට බරපතල/අධික බව කොපමණ කාලයක් තිස්සේ දැනෙනවාද?"
            },
            {
                "english": "How many times do you find it difficult to understand study notes and lectures?",
                "sinhala": "අධ්‍යයන සටහන් හා දේශන තේරුම් ගැනීමට අපහසු වන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
            },
            {
                "english": "How many times do you experience difficulties/hardships in completing assignments?",
                "sinhala": "පැවරුම් සම්පූර්ණ කිරීමේදී අපහසුතා/දුෂ්කරතා ඇතිවන වාර ගණන කොපමණද?"
            },
            {
                "english": "To what extent do you experience difficulties/hardships when giving lectures/presentations in front of others?",
                "sinhala": "අන් අය ඉදිරියේ දේශන/ඉදිරිපත් කිරීම් සිදු කිරීමේදී ඔබට අපහසුතා/දුෂ්කරතා ඇතිවන තරම කොපමණද?"
            },
            {
                "english": "How many times do you worry about results after exams are over?",
                "sinhala": "විභාග අවසන් වූ පසු ප්‍රතිඵල ගැන ඔබ කනස්සල්ලට පත්වන වාර ගණන කොපමණද?"
            },
            {
                "english": "How many times do you find it difficult to understand and keep up with the pace of lecturers' teaching?",
                "sinhala": "කථිකාචාර්යවරුන්ගේ ඉගැන්වීම් වේගවත් හා අවබෝධ කර ගැනීමට අපහසු වන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
            },
            {
                "english": "How many times do uncomfortable/problematic situations arise with friends or teachers?",
                "sinhala": "යාළුවන් හෝ ගුරුවරුන් සමඟ අමනාප/ගැටලුකාරී තත්ත්වයන් ඇතිවන වාර ගණන කොපමණද?"
            },
            {
                "english": "How many times do you feel pressure about the high expectations of teachers or parents?",
                "sinhala": "ගුරුවරු හෝ දෙමව්පියන්ගේ ඉහළ බලාපොරොත්තු ගැන පීඩනයක් දැනෙන වාර ගණන කොපමණද?"
            },
            {
                "english": "How many times do you feel that the support from friends in group work is inadequate?",
                "sinhala": "කණ්ඩායම් වැඩවලදී යාළුවන්ගෙන් ලැබෙන සහයෝගය මදි බව දැනෙන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
            },
            {
                "english": "How many times is it difficult to focus on lessons due to family responsibilities and job duties?",
                "sinhala": "පවුලේ වගකීම් හා රැකියා කටයුතු නිසා පාඩම් වලට අවධානය යොමු කිරීමට අපහසු වන වාර ගණන කොපමණද?"
            },
            {
                "english": "How many times does alcohol/cigarette use increase during exam and evaluation periods?",
                "sinhala": "විභාග හා ඇගයීම් කාලවලදී මත්පැන්/දුම්වැටි භාවිතය වැඩිවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
            },
            {
                "english": "How many times do superstitions/silly beliefs increase during exam periods?",
                "sinhala": "විභාග කාලවලදී අන්ධ විශ්වාස/බොළඳ විශ්වාස වැඩිවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
            }
        ]
    
    async def start_assessment_session(self, user: User, db: Session):
        """Start a new assessment session for a user"""
        # Create a new session record
        new_session = AssessmentSession(
            user_id=user.id,
            start_time=datetime.now()
        )
        
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        
        return {
            "session_id": new_session.id,
            "questions": self.questions
        }
    
    async def get_question(self, question_number: int):
        """Get a specific question by number"""
        if question_number < 1 or question_number > len(self.questions):
            return None
        
        return self.questions[question_number - 1]
    
    async def upload_audio_response(self, file: UploadFile, session_id: int, question_number: int, 
                                    background_tasks: BackgroundTasks, user: User, db: Session):
        """
        Process uploaded audio file for a specific question
        
        Args:
            file: Uploaded audio file
            session_id: Assessment session ID
            question_number: Question number (1-16)
            background_tasks: FastAPI background tasks
            user: Current user
            db: Database session
            
        Returns:
            Dictionary with processing results
        """
        try:
            # Create unique filename
            file_extension = os.path.splitext(file.filename)[1]
            unique_filename = f"{session_id}_{question_number}_{uuid.uuid4()}{file_extension}"
            file_path = os.path.join(self.upload_dir, unique_filename)
            
            # Save uploaded file
            async with aiofiles.open(file_path, 'wb') as out_file:
                content = await file.read()
                await out_file.write(content)
            
            # Create response record in database
            response = QuestionResponse(
                session_id=session_id,
                question_number=question_number,
                audio_file_path=file_path,
                created_at=datetime.now()
            )
            
            db.add(response)
            db.commit()
            db.refresh(response)
            
            # Process the audio file in the background
            background_tasks.add_task(
                self.process_audio_file, 
                file_path, 
                session_id, 
                question_number,
                response.id, 
                db
            )
            
            return {
                "success": True, 
                "response_id": response.id,
                "file_path": file_path
            }
            
        except Exception as e:
            return {"success": False, "error": f"Upload failed: {str(e)}"}
    
    async def process_audio_file(self, file_path: str, session_id: int, question_number: int, response_id: int, db: Session):
        """Process uploaded audio file for both text and emotion analysis"""
        try:
            print(f"Processing audio file: {file_path}")
            
            # 1. Process audio for emotion detection
            emotion_result = self.audio_processor.predict_stress(file_path, extract_probs=True)
            print(f"Emotion result: {emotion_result}")
            
            # 2. Process audio for text transcription (ASR)
            asr_result = self.asr_service.transcribe(file_path)
            print(f"ASR result: {asr_result}")
            
            # 3. Initialize variables
            likert_level = None
            text_stress_level = None
            text_confidence = None
            likert_score = None
            
            # 4. If transcription successful, process for Likert classification
            if asr_result["success"] and asr_result.get("text"):
                text_result = self.text_classifier.classify_text(asr_result["text"])
                print(f"Text classification result: {text_result}")
                
                if text_result["success"]:
                    likert_level = text_result["likert_level"]
                    text_stress_level = text_result["stress_level"]
                    text_confidence = text_result["confidence"]
                    likert_score = text_result["likert_score"]
            
            # 5. Update database record with results
            response = db.query(QuestionResponse).filter(QuestionResponse.id == response_id).first()
            if response:
                # Always update what we have, even if some analysis failed
                if asr_result["success"]:
                    response.transcribed_text = asr_result["text"]
                
                if emotion_result.get("success", False):
                    response.detected_emotion = emotion_result.get("emotion")
                    response.emotion_confidence = emotion_result.get("confidence")
                
                if likert_level:
                    response.likert_level = likert_level
                    response.score = likert_score
                
                db.commit()
                print(f"Updated response {response_id} in database")
            
        except Exception as e:
            print(f"Error processing audio file: {e}")
            import traceback
            traceback.print_exc()
    
    async def calculate_final_results(self, session_id: int, db: Session):
        """
        Calculate final stress assessment results for a completed session
        
        Args:
            session_id: Assessment session ID
            db: Database session
            
        Returns:
            Dictionary with final results
        """
        try:
            # 1. Get all responses for this session
            responses = db.query(QuestionResponse).filter(
                QuestionResponse.session_id == session_id
            ).all()
            
            if not responses:
                return {"success": False, "error": "No responses found for this session"}
            
            # 2. Calculate text-based stress level
            total_score = sum(r.score for r in responses if r.score is not None)
            num_scored = sum(1 for r in responses if r.score is not None)
            
            if num_scored > 0:
                average_score = total_score / num_scored
                
                # Scale up to match expected range if not all questions answered
                scaled_total = int(average_score * 16)
                
                # Apply scoring thresholds
                if scaled_total >= 64:
                    text_stress_level = "High"
                elif scaled_total >= 48:
                    text_stress_level = "Medium"
                elif scaled_total >= 32:
                    text_stress_level = "Low"
                else:
                    text_stress_level = "Minimal"
            else:
                text_stress_level = None
                average_score = None
                scaled_total = None
            
            # 3. Calculate voice-based stress level
            emotions = [r.detected_emotion for r in responses if r.detected_emotion is not None]
            emotion_counts = {}
            dominant_emotion = None
            
            if emotions:
                # Count frequency of each emotion
                emotion_counts = Counter(emotions)
                
                # Get most common emotion
                dominant_emotion, _ = emotion_counts.most_common(1)[0]
                
                # Map to stress level
                emotion_to_stress = {
                    'angry': 'High',
                    'sad': 'Medium',
                    'neutral': 'Low',
                    'happy': 'Minimal'
                }
                
                voice_stress_level = emotion_to_stress.get(dominant_emotion, "Medium")
            else:
                voice_stress_level = None
            
            # 4. Apply integration rules to determine final stress level
            if text_stress_level and voice_stress_level:
                final_stress_level = self._integrate_stress_levels(
                    text_stress_level, 
                    voice_stress_level,
                    total_score if num_scored > 0 else 0,
                    dominant_emotion
                )
            elif text_stress_level:
                final_stress_level = text_stress_level
            elif voice_stress_level:
                final_stress_level = voice_stress_level
            else:
                final_stress_level = "Medium"  # Default
            
            # 5. Update session record with results
            session = db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
            if session:
                session.final_stress_level = final_stress_level
                session.text_stress_level = text_stress_level
                session.voice_stress_level = voice_stress_level
                session.total_score = total_score if num_scored > 0 else None
                session.end_time = datetime.now()
                db.commit()
            
            # 6. Prepare detailed response
            return {
                "success": True,
                "final_stress_level": final_stress_level,
                "text_stress_level": text_stress_level,
                "voice_stress_level": voice_stress_level,
                "total_score": total_score if num_scored > 0 else None,
                "dominant_emotion": dominant_emotion,
                "completed_questions": len(responses),
                "details": {
                    "emotion_counts": dict(emotion_counts),
                    "average_score": average_score,
                    "responses": [
                        {
                            "question_number": r.question_number,
                            "emotion": r.detected_emotion,
                            "likert_level": r.likert_level,
                            "score": r.score
                        } for r in responses
                    ]
                }
            }
            
        except Exception as e:
            return {"success": False, "error": f"Error calculating results: {str(e)}"}
    
    def _integrate_stress_levels(self, text_stress, voice_stress, total_score, dominant_emotion):
        """
        Apply rules to integrate text-based and voice-based stress assessments
        
        Args:
            text_stress: Text-based stress level
            voice_stress: Voice-based stress level
            total_score: Total Likert score
            dominant_emotion: Dominant emotion detected
            
        Returns:
            Final integrated stress level
        """
        # Rule 1: Both agree
        if text_stress == voice_stress:
            return text_stress
            
        # Rule 2: Differ by one level, take higher
        stress_levels = ["Minimal", "Low", "Medium", "High"]
        text_idx = stress_levels.index(text_stress)
        voice_idx = stress_levels.index(voice_stress)
        
        if abs(text_idx - voice_idx) == 1:
            return stress_levels[max(text_idx, voice_idx)]
            
        # Rule 3: Academic performance questions show high stress
        if total_score > 56 and voice_stress in ["Low", "Minimal"]:
            return text_stress
            
        # Rule 4: Voice shows anger
        if dominant_emotion == "angry" and voice_stress == "High" and text_stress in ["Medium", "Low"]:
            return voice_stress
            
        # Rule 5: Weighted average
        weights = {"Minimal": 1, "Low": 2, "Medium": 3, "High": 4}
        weighted_score = (weights[text_stress] * 0.6) + (weights[voice_stress] * 0.4)
        
        if weighted_score < 1.5:
            return "Minimal"
        elif weighted_score < 2.5:
            return "Low"
        elif weighted_score < 3.5:
            return "Medium"
        else:
            return "High"
            
    async def get_assessment_status(self, session_id: int, db: Session):
        """Get the current status of an assessment session"""
        try:
            # Check if session exists
            session = db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
            if not session:
                return {"success": False, "error": "Assessment session not found"}
                
            # Get responses
            responses = db.query(QuestionResponse).filter(QuestionResponse.session_id == session_id).all()
            
            # Get answered question numbers
            completed_questions = [r.question_number for r in responses]
            
            return {
                "success": True,
                "session_id": session_id,
                "status": "completed" if session.end_time else "in-progress",
                "completed_questions": completed_questions,
                "total_questions": len(self.questions)
            }
            
        except Exception as e:
            return {"success": False, "error": f"Error getting assessment status: {str(e)}"}


# import os
# import uuid
# import aiofiles
# from fastapi import UploadFile, BackgroundTasks
# from sqlalchemy.orm import Session
# import json
# from collections import Counter
# from datetime import datetime

# from app.db.models import AssessmentSession, User, EmotionEnum, StressLevelEnum, LikertLevelEnum, QuestionResponse
# from app.services.audio_processor import AudioProcessor
# from app.services.asr_service import ASRService
# from app.services.text_classifier import LikertClassifier

# class StressService:
#     def __init__(self):
#         self.audio_processor = AudioProcessor()
#         self.asr_service = ASRService()
#         self.text_classifier = LikertClassifier()
#         self.upload_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
        
#         # Create upload directory if it doesn't exist
#         os.makedirs(self.upload_dir, exist_ok=True)
        
#         # List of questions in English and Sinhala
#         self.questions = [
#             {
#                 "english": "How often do you lose interest in subjects during your university academic period?",
#                 "sinhala": "ඔබට විශ්වවිද්‍යාල අධ්‍යයන කාලය තුළ විෂයන් කෙරෙහි උනන්දුව අඩුවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How long have you been experiencing difficulty remembering what you have learned?",
#                 "sinhala": "ඔබ ඉගෙන ගත් දේවල් මතක තබා ගැනීමේ අපහසුතාව කොපමණ කාලයක් තිස්සේ දැනෙනවාද?"
#             },
#             {
#                 "english": "To what extent do you feel that your academic skills are not adequate for the expected level of the degree?",
#                 "sinhala": "ඔබේ අධ්‍යයන කුසලතා උපාධියේ අපේක්ෂිත මට්ටමට ප්‍රමාණවත් නොවන බව කොතරම් දුරට දැනෙනවාද?"
#             },
#             {
#                 "english": "How many times do you feel unprepared for exams despite studying?",
#                 "sinhala": "පාඩම් කළත් විභාගයට සූදානම් නැති බව කොපමණ වාර ගණනක් දැනෙනවාද?"
#             },
#             {
#                 "english": "How long have you felt that the syllabus is severe/excessive for you?",
#                 "sinhala": "විෂය නිර්දේශය ඔබට බරපතල/අධික බව කොපමණ කාලයක් තිස්සේ දැනෙනවාද?"
#             },
#             {
#                 "english": "How many times do you find it difficult to understand study notes and lectures?",
#                 "sinhala": "අධ්‍යයන සටහන් හා දේශන තේරුම් ගැනීමට අපහසු වන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times do you experience difficulties/hardships in completing assignments?",
#                 "sinhala": "පැවරුම් සම්පූර්ණ කිරීමේදී අපහසුතා/දුෂ්කරතා ඇතිවන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "To what extent do you experience difficulties/hardships when giving lectures/presentations in front of others?",
#                 "sinhala": "අන් අය ඉදිරියේ දේශන/ඉදිරිපත් කිරීම් සිදු කිරීමේදී ඔබට අපහසුතා/දුෂ්කරතා ඇතිවන තරම කොපමණද?"
#             },
#             {
#                 "english": "How many times do you worry about results after exams are over?",
#                 "sinhala": "විභාග අවසන් වූ පසු ප්‍රතිඵල ගැන ඔබ කනස්සල්ලට පත්වන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times do you find it difficult to understand and keep up with the pace of lecturers' teaching?",
#                 "sinhala": "කථිකාචාර්යවරුන්ගේ ඉගැන්වීම් වේගවත් හා අවබෝධ කර ගැනීමට අපහසු වන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times do uncomfortable/problematic situations arise with friends or teachers?",
#                 "sinhala": "යාළුවන් හෝ ගුරුවරුන් සමඟ අමනාප/ගැටලුකාරී තත්ත්වයන් ඇතිවන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times do you feel pressure about the high expectations of teachers or parents?",
#                 "sinhala": "ගුරුවරු හෝ දෙමව්පියන්ගේ ඉහළ බලාපොරොත්තු ගැන පීඩනයක් දැනෙන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times do you feel that the support from friends in group work is inadequate?",
#                 "sinhala": "කණ්ඩායම් වැඩවලදී යාළුවන්ගෙන් ලැබෙන සහයෝගය මදි බව දැනෙන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times is it difficult to focus on lessons due to family responsibilities and job duties?",
#                 "sinhala": "පවුලේ වගකීම් හා රැකියා කටයුතු නිසා පාඩම් වලට අවධානය යොමු කිරීමට අපහසු වන වාර ගණන කොපමණද?"
#             },
#             {
#                 "english": "How many times does alcohol/cigarette use increase during exam and evaluation periods?",
#                 "sinhala": "විභාග හා ඇගයීම් කාලවලදී මත්පැන්/දුම්වැටි භාවිතය වැඩිවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             },
#             {
#                 "english": "How many times do superstitions/silly beliefs increase during exam periods?",
#                 "sinhala": "විභාග කාලවලදී අන්ධ විශ්වාස/බොළඳ විශ්වාස වැඩිවන අවස්ථා කොපමණ වාර ගණනක් තිබේද?"
#             }
#         ]
    
#     async def start_assessment_session(self, user: User, db: Session):
#         """Start a new assessment session for a user"""
#         # Create a new session record
#         new_session = AssessmentSession(
#             user_id=user.id,
#             start_time=datetime.now()
#         )
        
#         db.add(new_session)
#         db.commit()
#         db.refresh(new_session)
        
#         return {
#             "session_id": new_session.id,
#             "questions": self.questions
#         }
    
#     async def get_question(self, question_number: int):
#         """Get a specific question by number"""
#         if question_number < 1 or question_number > len(self.questions):
#             return None
        
#         return self.questions[question_number - 1]
    
#     async def upload_audio_response(self, file: UploadFile, session_id: int, question_number: int, 
#                                     background_tasks: BackgroundTasks, user: User, db: Session):
#         """
#         Process uploaded audio file for a specific question
        
#         Args:
#             file: Uploaded audio file
#             session_id: Assessment session ID
#             question_number: Question number (1-16)
#             background_tasks: FastAPI background tasks
#             user: Current user
#             db: Database session
            
#         Returns:
#             Dictionary with processing results
#         """
#         try:
#             # Create unique filename
#             file_extension = os.path.splitext(file.filename)[1]
#             unique_filename = f"{session_id}_{question_number}_{uuid.uuid4()}{file_extension}"
#             file_path = os.path.join(self.upload_dir, unique_filename)
            
#             # Save uploaded file
#             async with aiofiles.open(file_path, 'wb') as out_file:
#                 content = await file.read()
#                 await out_file.write(content)
            
#             # Create response record in database
#             response = QuestionResponse(
#                 session_id=session_id,
#                 question_number=question_number,
#                 audio_file_path=file_path,
#                 created_at=datetime.now()
#             )
            
#             db.add(response)
#             db.commit()
#             db.refresh(response)
            
#             # Process the audio file in the background
#             background_tasks.add_task(
#                 self.process_audio_file, 
#                 file_path, 
#                 session_id, 
#                 question_number,
#                 response.id, 
#                 db
#             )
            
#             return {
#                 "success": True, 
#                 "response_id": response.id,
#                 "file_path": file_path
#             }
            
#         except Exception as e:
#             return {"success": False, "error": f"Upload failed: {str(e)}"}
    
#     async def process_audio_file(self, file_path: str, session_id: int, question_number: int, response_id: int, db: Session):
#         """Process uploaded audio file for both text and emotion analysis"""
#         try:
#             print(f"Processing audio file: {file_path}")
            
#             # 1. Process audio for emotion detection
#             emotion_result = self.audio_processor.predict_stress(file_path, extract_probs=True)
#             print(f"Emotion result: {emotion_result}")
            
#             # 2. Process audio for text transcription (ASR)
#             asr_result = self.asr_service.transcribe(file_path)
#             print(f"ASR result: {asr_result}")
            
#             # 3. Initialize variables
#             likert_level = None
#             text_stress_level = None
#             text_confidence = None
#             likert_score = None
            
#             # 4. If transcription successful, process for Likert classification
#             if asr_result["success"] and asr_result.get("text"):
#                 text_result = self.text_classifier.classify_text(asr_result["text"])
#                 print(f"Text classification result: {text_result}")
                
#                 if text_result["success"]:
#                     likert_level = text_result["likert_level"]
#                     text_stress_level = text_result["stress_level"]
#                     text_confidence = text_result["confidence"]
#                     likert_score = text_result["likert_score"]
            
#             # 5. Update database record with results
#             response = db.query(QuestionResponse).filter(QuestionResponse.id == response_id).first()
#             if response:
#                 # Always update what we have, even if some analysis failed
#                 if asr_result["success"]:
#                     response.transcribed_text = asr_result["text"]
                
#                 if emotion_result.get("success", False):
#                     response.detected_emotion = emotion_result.get("emotion")
#                     response.emotion_confidence = emotion_result.get("confidence")
                
#                 if likert_level:
#                     response.likert_level = likert_level
#                     response.score = likert_score
                
#                 db.commit()
#                 print(f"Updated response {response_id} in database")
            
#         except Exception as e:
#             print(f"Error processing audio file: {e}")
#             import traceback
#             traceback.print_exc()
    
#     async def calculate_final_results(self, session_id: int, db: Session):
#         """
#         Calculate final stress assessment results for a completed session
        
#         Args:
#             session_id: Assessment session ID
#             db: Database session
            
#         Returns:
#             Dictionary with final results
#         """
#         try:
#             # 1. Get all responses for this session
#             responses = db.query(QuestionResponse).filter(
#                 QuestionResponse.session_id == session_id
#             ).all()
            
#             if not responses:
#                 return {"success": False, "error": "No responses found for this session"}
            
#             # 2. Calculate text-based stress level
#             total_score = sum(r.score for r in responses if r.score is not None)
#             num_scored = sum(1 for r in responses if r.score is not None)
            
#             if num_scored > 0:
#                 average_score = total_score / num_scored
                
#                 # Scale up to match expected range if not all questions answered
#                 scaled_total = int(average_score * 16)
                
#                 # Apply scoring thresholds
#                 if scaled_total >= 64:
#                     text_stress_level = "High"
#                 elif scaled_total >= 48:
#                     text_stress_level = "Medium"
#                 elif scaled_total >= 32:
#                     text_stress_level = "Low"
#                 else:
#                     text_stress_level = "Minimal"
#             else:
#                 text_stress_level = None
#                 average_score = None
#                 scaled_total = None
            
#             # 3. Calculate voice-based stress level
#             emotions = [r.detected_emotion for r in responses if r.detected_emotion is not None]
#             emotion_counts = {}
#             dominant_emotion = None
            
#             if emotions:
#                 # Count frequency of each emotion
#                 emotion_counts = Counter(emotions)
                
#                 # Get most common emotion
#                 dominant_emotion, _ = emotion_counts.most_common(1)[0]
                
#                 # Map to stress level
#                 emotion_to_stress = {
#                     'angry': 'High',
#                     'sad': 'Medium',
#                     'neutral': 'Low',
#                     'happy': 'Minimal'
#                 }
                
#                 voice_stress_level = emotion_to_stress.get(dominant_emotion, "Medium")
#             else:
#                 voice_stress_level = None
            
#             # 4. Apply integration rules to determine final stress level
#             if text_stress_level and voice_stress_level:
#                 final_stress_level = self._integrate_stress_levels(
#                     text_stress_level, 
#                     voice_stress_level,
#                     total_score if num_scored > 0 else 0,
#                     dominant_emotion
#                 )
#             elif text_stress_level:
#                 final_stress_level = text_stress_level
#             elif voice_stress_level:
#                 final_stress_level = voice_stress_level
#             else:
#                 final_stress_level = "Medium"  # Default
            
#             # 5. Update session record with results
#             session = db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
#             if session:
#                 session.final_stress_level = final_stress_level
#                 session.text_stress_level = text_stress_level
#                 session.voice_stress_level = voice_stress_level
#                 session.total_score = total_score if num_scored > 0 else None
#                 session.end_time = datetime.now()
#                 db.commit()
            
#             # 6. Prepare detailed response
#             return {
#                 "success": True,
#                 "final_stress_level": final_stress_level,
#                 "text_stress_level": text_stress_level,
#                 "voice_stress_level": voice_stress_level,
#                 "total_score": total_score if num_scored > 0 else None,
#                 "dominant_emotion": dominant_emotion,
#                 "completed_questions": len(responses),
#                 "details": {
#                     "emotion_counts": dict(emotion_counts),
#                     "average_score": average_score,
#                     "responses": [
#                         {
#                             "question_number": r.question_number,
#                             "emotion": r.detected_emotion,
#                             "likert_level": r.likert_level,
#                             "score": r.score
#                         } for r in responses
#                     ]
#                 }
#             }
            
#         except Exception as e:
#             return {"success": False, "error": f"Error calculating results: {str(e)}"}
    
#     def _integrate_stress_levels(self, text_stress, voice_stress, total_score, dominant_emotion):
#         """
#         Apply rules to integrate text-based and voice-based stress assessments
        
#         Args:
#             text_stress: Text-based stress level
#             voice_stress: Voice-based stress level
#             total_score: Total Likert score
#             dominant_emotion: Dominant emotion detected
            
#         Returns:
#             Final integrated stress level
#         """
#         # Rule 1: Both agree
#         if text_stress == voice_stress:
#             return text_stress
            
#         # Rule 2: Differ by one level, take higher
#         stress_levels = ["Minimal", "Low", "Medium", "High"]
#         text_idx = stress_levels.index(text_stress)
#         voice_idx = stress_levels.index(voice_stress)
        
#         if abs(text_idx - voice_idx) == 1:
#             return stress_levels[max(text_idx, voice_idx)]
            
#         # Rule 3: Academic performance questions show high stress
#         if total_score > 56 and voice_stress in ["Low", "Minimal"]:
#             return text_stress
            
#         # Rule 4: Voice shows anger
#         if dominant_emotion == "angry" and voice_stress == "High" and text_stress in ["Medium", "Low"]:
#             return voice_stress
            
#         # Rule 5: Weighted average
#         weights = {"Minimal": 1, "Low": 2, "Medium": 3, "High": 4}
#         weighted_score = (weights[text_stress] * 0.6) + (weights[voice_stress] * 0.4)
        
#         if weighted_score < 1.5:
#             return "Minimal"
#         elif weighted_score < 2.5:
#             return "Low"
#         elif weighted_score < 3.5:
#             return "Medium"
#         else:
#             return "High"
            
#     async def get_assessment_status(self, session_id: int, db: Session):
#         """Get the current status of an assessment session"""
#         try:
#             # Check if session exists
#             session = db.query(AssessmentSession).filter(AssessmentSession.id == session_id).first()
#             if not session:
#                 return {"success": False, "error": "Assessment session not found"}
                
#             # Get responses
#             responses = db.query(QuestionResponse).filter(QuestionResponse.session_id == session_id).all()
            
#             # Get answered question numbers
#             completed_questions = [r.question_number for r in responses]
            
#             return {
#                 "success": True,
#                 "session_id": session_id,
#                 "status": "completed" if session.end_time else "in-progress",
#                 "completed_questions": completed_questions,
#                 "total_questions": len(self.questions)
#             }
            
#         except Exception as e:
#             return {"success": False, "error": f"Error getting assessment status: {str(e)}"}