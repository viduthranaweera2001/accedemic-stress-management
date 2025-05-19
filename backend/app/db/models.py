from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    email = Column(String(100), unique=True, index=True)
    hashed_password = Column(String(255))
    full_name = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    assessment_sessions = relationship("AssessmentSession", back_populates="user")

class EmotionEnum(str, enum.Enum):
    angry = "angry"
    sad = "sad"
    neutral = "neutral"
    happy = "happy"

class StressLevelEnum(str, enum.Enum):
    High = "High"
    Medium = "Medium"
    Low = "Low"
    Minimal = "Minimal"

class LikertLevelEnum(str, enum.Enum):
    Always = "Always"
    # VeryFrequently = "Very Frequently"
    Frequently = "Frequently"
    Occasionally = "Occasionally"
    Rarely = "Rarely"
    Never = "Never"

class AssessmentSession(Base):
    __tablename__ = "assessment_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    start_time = Column(DateTime(timezone=True), server_default=func.now())
    end_time = Column(DateTime(timezone=True), nullable=True)
    final_stress_level = Column(Enum(StressLevelEnum), nullable=True)
    text_stress_level = Column(Enum(StressLevelEnum), nullable=True)
    voice_stress_level = Column(Enum(StressLevelEnum), nullable=True)
    total_score = Column(Integer, nullable=True)
    
    user = relationship("User", back_populates="assessment_sessions")
    question_responses = relationship("QuestionResponse", back_populates="session")

class QuestionResponse(Base):
    __tablename__ = "question_responses"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("assessment_sessions.id"))
    question_number = Column(Integer)
    audio_file_path = Column(String(255))
    transcribed_text = Column(Text, nullable=True)
    likert_level = Column(Enum(LikertLevelEnum), nullable=True)
    score = Column(Integer, nullable=True)
    detected_emotion = Column(Enum(EmotionEnum), nullable=True)
    emotion_confidence = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    session = relationship("AssessmentSession", back_populates="question_responses")