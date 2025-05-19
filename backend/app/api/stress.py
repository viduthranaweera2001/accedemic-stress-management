from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, UploadFile, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from app.db.base import get_db
from app.db.models import User, AssessmentSession, QuestionResponse
from app.api.auth import get_current_user
from app.services.stress_service import StressService

router = APIRouter()
stress_service = StressService()

@router.post("/assessment/start")
async def start_assessment(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Start a new assessment session"""
    result = await stress_service.start_assessment_session(current_user, db)
    return result

@router.get("/assessment/question/{question_number}")
async def get_question(
    question_number: int,
    current_user: User = Depends(get_current_user)
):
    """Get a specific question by number"""
    question = await stress_service.get_question(question_number)
    if not question:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Question {question_number} not found"
        )
    return question

@router.post("/assessment/upload")
async def upload_audio_response(
    background_tasks: BackgroundTasks,
    session_id: int = Form(...),
    question_number: int = Form(...),
    audio_file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload and process audio response for a question"""
    # Validate file type
    if not audio_file.filename.lower().endswith(('.wav', '.mp3')):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only WAV and MP3 files are supported"
        )
    
    result = await stress_service.upload_audio_response(
        audio_file, 
        session_id, 
        question_number, 
        background_tasks,
        current_user, 
        db
    )
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=result["error"]
        )
    
    return result

@router.get("/assessment/status/{session_id}")
async def get_assessment_status(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get status of an assessment session"""
    # Check if the session exists and belongs to the user
    session = db.query(AssessmentSession).filter(
        AssessmentSession.id == session_id,
        AssessmentSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment session not found"
        )
    
    result = await stress_service.get_assessment_status(session_id, db)
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=result["error"]
        )
    
    return result

@router.post("/assessment/complete/{session_id}")
async def complete_assessment(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Complete assessment and calculate final results"""
    # Verify that the session belongs to the current user
    session = db.query(AssessmentSession).filter(
        AssessmentSession.id == session_id,
        AssessmentSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment session not found"
        )
    
    result = await stress_service.calculate_final_results(session_id, db)
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=result["error"]
        )
    
    return result

@router.get("/assessment/results/{session_id}")
async def get_assessment_results(
    session_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get results of a completed assessment"""
    # Verify that the session belongs to the current user
    session = db.query(AssessmentSession).filter(
        AssessmentSession.id == session_id,
        AssessmentSession.user_id == current_user.id
    ).first()
    
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Assessment session not found"
        )
    
    if not session.end_time:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Assessment not completed yet"
        )
    
    # Get a fresh calculation of results
    result = await stress_service.calculate_final_results(session_id, db)
    
    if not result["success"]:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=result["error"]
        )
    
    return result