# Voice-Based Academic Stress Analyzer

# Overview

The Voice-Based Academic Stress Analyzer is an innovative, AI-driven system designed to accurately assess and address academic stress among university students in Sri Lanka. The system leverages bilingual voice input recognition and natural language processing to capture the unique linguistic patterns used by students when expressing their stress levels.

By analyzing Sinhala language voice input using a 16-item self-report scale, the system can accurately predict stress levels and offer personalized recommendations to help students manage their academic stress. The system combines voice-based stress assessment, therapeutic approaches (such as music therapy and meditation), and peer support to provide a comprehensive solution for improving the well-being and academic performance of Sri Lankan university students.

# Architectural Diagram

![system diagran drawio (2)](https://github.com/user-attachments/assets/4a99b0ba-e5d5-47ca-a7a5-7316776114e0)

## Component 01 - VoiceInputHandler ([Git Link](https://github.com/viduthranaweera2001/accedemic-stress-management/tree/feature/stress-score-calculation-new))
A voice-based academic stress assessment system that processes Sinhala-English code-mixed responses to evaluate student stress levels. The system combines speech recognition, tone analysis, and stress level classification to provide automated stress assessment.

### System overview 

![Image](https://github.com/user-attachments/assets/a7702f02-9ca9-4d6d-8582-d8400e18e4b6)

### Key Dependencies

### 1.Speech Processing

wav2vec2.0 for ASR, 
librosa for audio processing, 
soundfile for audio I/O, 

### 2.Machine Learning

PyTorch for deep learning models, 
transformers for BERT-based classification, 
scikit-learn for traditional ML algorithms, 

### 3.Audio Processing

pyAudioAnalysis for feature extraction, 
scipy for signal processing, 
numpy for numerical operations, 

## Component 02 - Personalized Therapy Recommendation ([Git link])https://github.com/viduthranaweera2001/accedemic-stress-management/tree/feature/personalized-therapy-suggestion)

### System overview 
This system offers a personalized approach to managing depression and stress through music therapy and meditation, incorporating real-time stress monitoring. It evaluates stress levels using questionnaires and pulse sensors, categorizing individuals into mild, moderate, or severe stages. Consequently, it provides customized music playlists and meditation practices tailored to each stage. Adaptive reminders ensure continued engagement, while follow-ups monitor the effectiveness of the interventions. Leveraging wearable devices and sophisticated algorithms, the system personalizes the interventions, making therapy accessible and scalable. 

###image

### 4.Personalized Therapy:

Music therapy libraries (e.g., Python-Based Music Library)
Meditation and mindfulness techniques (e.g., PyMindfulness)
Peer support integration (e.g., chat, forums)


## Component 03 Name1 (git link)

### System overview 

###image
  
