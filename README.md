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

## Component 02 - Personalized Therapy Recommendation ([Git link](https://github.com/viduthranaweera2001/accedemic-stress-management/tree/feature/personalized-therapy-suggestion))

### System overview 
This system offers a personalized approach to managing depression and stress through music therapy and meditation, incorporating real-time stress monitoring. It evaluates stress levels using questionnaires and pulse sensors, categorizing individuals into mild, moderate, or severe stages. Consequently, it provides customized music playlists and meditation practices tailored to each stage. Adaptive reminders ensure continued engagement, while follow-ups monitor the effectiveness of the interventions. Leveraging wearable devices and sophisticated algorithms, the system personalizes the interventions, making therapy accessible and scalable. 

### System overview 

![system diagram drawio](https://github.com/user-attachments/assets/aff86c75-7bcc-47c8-9639-402a9c7ac00a)

### Key Dependencies

### 4.Heartbeat Inputs:
Get pulse count ( ESP32, pulse sensor)

### 5.Personalized Therapy:

Music therapy libraries (e.g., Python-Based Music Library)
Meditation and mindfulness techniques (e.g., PyMindfulness)
Peer support integration (e.g., chat, forums)

### 6.Monitor the improvement:
update the persons details and give analytics


## Component 03 - AI Assisted Peer Support for Depression ([git link](https://github.com/viduthranaweera2001/accedemic-stress-management/tree/feature/ai-peer-assistance))

This study aims to assess the impact of interactive games on stress reduction. Participants will use heart rate monitors to track their stress levels before and after engaging in stress-relieving games or activities. AI will analyze both physiological data (heart rate) and behavioral data (game performance) to provide personalized feedback and visualizations. The effectiveness of the games in reducing stress will be evaluated using statistical analysis, ensuring a comprehensive approach to mental health support.

### System overview 

![system diagram](https://github.com/user-attachments/assets/e57972f0-bbbf-4ed0-929c-df1710fff66d)

### Key Dependencies

### 7.Heartbeat Inputs
Get pulse count ( ESP32, pulse sensor)

### 8.Machine Learning
DistilBERT for emotional tone analysis,
scikit-learn for implementing traditional machine learning models for additional analysis
Pandas for data handling and manipulation, working with heart rate and game performance data.



  
