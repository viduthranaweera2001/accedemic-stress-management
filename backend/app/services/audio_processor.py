# import os
# import tensorflow as tf
# import pickle
# import numpy as np
# from app.utils.feature_extraction import extract_features
# import time

# class AudioProcessor:
#     def __init__(self):
#         model_dir = os.path.join(
#             os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
#             "models", 
#             "emotion"
#         )
#         self.model_path = os.path.join(model_dir, "emotion_model.keras")
#         self.label_encoder_path = os.path.join(model_dir, "label_encoder.pkl")
#         self.model = None
#         self.label_encoder = None
#         self.stress_mapping = {
#             'angry': 'High',
#             'sad': 'Medium',
#             'neutral': 'Low',
#             'happy': 'Minimal'
#         }
#         self.load_model()
        
#     def load_model(self):
#         """Load the pre-trained emotion recognition model"""
#         max_retries = 3
#         for attempt in range(max_retries):
#             try:
#                 # self.model = tf.keras.models.load_model(self.model_path)
#                 # with open(self.label_encoder_path, 'rb') as f:
#                 #     self.label_encoder = pickle.load(f)
                
#                 self.model = tf.keras.models.load_model(
#                     self.model_path,
#                     # custom_objects={'CustomLayer': CustomLayer}  # ✅ Add if needed
#                 )
#                 # with open(self.label_encoder_path, 'rb') as f:
#                 #     self.label_encoder = pickle.load(f)
                
#                 print("Emotion model and label encoder loaded successfully")
#                 return
#             except Exception as e:
#                 # print(f"Error loading emotion model (attempt {attempt+1}/{max_retries}): {e}")
#                 print(f"Error loading Keras model (attempt {attempt+1}/{max_retries}): {e}")
#                 if attempt < max_retries - 1:
#                     time.sleep(2)  # Wait before retrying
#                 else:
#                     print("Failed to load emotion model after maximum retries")
    
#     def predict_stress(self, file_path, extract_probs=False):
#         """
#         Predict stress level from audio file
        
#         Args:
#             file_path: Path to audio file
#             extract_probs: Whether to extract class probabilities
            
#         Returns:
#             Dictionary containing prediction results
#         """
#         try:
#             if not self.model or not self.label_encoder:
#                 return {"error": "Emotion model not loaded", "success": False}
            
#             # Extract features from audio file
#             features = extract_features(file_path)
            
#             if features is None:
#                 return {"error": "Failed to extract features", "success": False}
            
#             # Add batch dimension
#             features = np.expand_dims(features, axis=0)
            
#             # Predict emotion
#             prediction = self.model.predict(features)[0]
#             predicted_class = np.argmax(prediction)
#             predicted_emotion = self.label_encoder.inverse_transform([predicted_class])[0]
#             confidence = float(prediction[predicted_class] * 100)
            
#             # Map emotion to stress level
#             stress_level = self.stress_mapping.get(predicted_emotion, "Medium")
            
#             result = {
#                 "emotion": predicted_emotion,
#                 "stress_level": stress_level,
#                 "confidence": confidence,
#                 "success": True
#             }
            
#             # Add all class probabilities if requested
#             if extract_probs:
#                 all_emotions = self.label_encoder.classes_
#                 all_probabilities = {emotion: float(prediction[i] * 100) for i, emotion in enumerate(all_emotions)}
#                 result["all_probabilities"] = all_probabilities
            
#             return result
#         except Exception as e:
#             return {"error": f"Emotion prediction failed: {str(e)}", "success": False}


import os
import tensorflow as tf
import pickle
import numpy as np
from app.utils.feature_extraction import extract_features
import time

class AudioProcessor:
    def __init__(self):
        model_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "models",
            "emotion"
        )
        self.model_path = os.path.join(model_dir, "emotion_model.keras")
        self.label_encoder_path = os.path.join(model_dir, "label_encoder.pkl")
        self.model = None
        self.label_encoder = None
        self.stress_mapping = {
            'angry': 'High',
            'sad': 'Medium',
            'neutral': 'Low',
            'happy': 'Minimal'
        }
        self.load_model()

    def load_model(self):
        """Load the pre-trained emotion recognition model"""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # FIX 1: Properly load the Keras model
                self.model = tf.keras.models.load_model(self.model_path)
                
                # FIX 2: Load the label encoder with proper error handling
                with open(self.label_encoder_path, 'rb') as f:
                    self.label_encoder = pickle.load(f)
                
                print(f"Emotion model loaded successfully from: {self.model_path}")
                print(f"Label encoder loaded successfully from: {self.label_encoder_path}")
                
                # Verify model and encoder
                if self.model is None or self.label_encoder is None:
                    raise ValueError("Model or encoder failed to load properly")
                
                return
            except Exception as e:
                print(f"Error loading emotion model (attempt {attempt+1}/{max_retries}): {str(e)}")
                if attempt < max_retries - 1:
                    time.sleep(2)
                else:
                    print("Failed to load emotion model after maximum retries")
                    # Don't raise exception, just log the error
    
    def predict_stress(self, file_path, extract_probs=False):
        """
        Predict stress level from audio file
        
        Args:
            file_path: Path to audio file
            extract_probs: Whether to extract class probabilities
            
        Returns:
            Dictionary containing prediction results
        """
        try:
            if not self.model or not self.label_encoder:
                return {"error": "Emotion model not loaded", "success": False}
            
            # Extract features from audio file
            features = extract_features(file_path)
            
            if features is None:
                return {"error": "Failed to extract features", "success": False}
            
            # Add batch dimension
            features = np.expand_dims(features, axis=0)
            
            # Predict emotion
            prediction = self.model.predict(features)[0]
            predicted_class = np.argmax(prediction)
            predicted_emotion = self.label_encoder.inverse_transform([predicted_class])[0]
            confidence = float(prediction[predicted_class] * 100)
            
            # Map emotion to stress level
            stress_level = self.stress_mapping.get(predicted_emotion, "Medium")
            
            result = {
                "emotion": predicted_emotion,
                "stress_level": stress_level,
                "confidence": confidence,
                "success": True
            }
            
            # Add all class probabilities if requested
            if extract_probs:
                all_emotions = self.label_encoder.classes_
                all_probabilities = {emotion: float(prediction[i] * 100) for i, emotion in enumerate(all_emotions)}
                result["all_probabilities"] = all_probabilities
            
            return result
        except Exception as e:
            return {"error": f"Emotion prediction failed: {str(e)}", "success": False}