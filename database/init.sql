CREATE DATABASE IF NOT EXISTS stress_detection;
USE stress_detection;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stress assessment sessions
CREATE TABLE IF NOT EXISTS assessment_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP NULL,
    final_stress_level ENUM('High', 'Medium', 'Low', 'Minimal') NULL,
    text_stress_level ENUM('High', 'Medium', 'Low', 'Minimal') NULL,
    voice_stress_level ENUM('High', 'Medium', 'Low', 'Minimal') NULL,
    total_score INT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Individual question responses
CREATE TABLE IF NOT EXISTS question_responses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT NOT NULL,
    question_number INT NOT NULL,
    audio_file_path VARCHAR(255) NOT NULL,
    transcribed_text TEXT NULL,
    likert_level ENUM('Always', 'Very Frequently', 'Occasionally', 'Rarely', 'Never') NULL,
    score INT NULL,
    detected_emotion ENUM('angry', 'sad', 'neutral', 'happy') NULL,
    emotion_confidence FLOAT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES assessment_sessions(id)
);