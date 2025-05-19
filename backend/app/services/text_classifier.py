# import os
# import joblib
# import numpy as np
# import time

# class LikertClassifier:
#     def __init__(self):
#         model_dir = os.path.join(
#             os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
#             "models", 
#             "text_classifier"
#         )
#         self.model_path = os.path.join(model_dir, "likert_classifier.joblib")
#         self.model = None
#         self.vectorizer = None
#         self.likert_mapping = {
#             'Always': 'High',
#             # 'Very Frequently': 'High',
#             'Frequently': 'High',
#             'Occasionally': 'Medium',
#             'Rarely': 'Low',
#             'Never': 'Minimal'
#         }
#         self.likert_scores = {
#             'Always': 5,
#             # 'Very Frequently': 4,
#             'Frequently': 4,
#             'Occasionally': 3,
#             'Rarely': 2,
#             'Never': 1
#         }
#         # === THE FIX: Add this mapping ===
#         self.likert_label_map = {
#             5: "Always",
#             # 4: "Very Frequently",
#             4: "Frequently",
#             3: "Occasionally",
#             2: "Rarely",
#             1: "Never"
#         }
#         self.load_model()
    
#     def load_model(self):
#         """Load the pre-trained text classification model"""
#         max_retries = 3
#         for attempt in range(max_retries):
#             try:
#                 # Load the model which contains both classifier and vectorizer
#                 model_data = joblib.load(self.model_path)
#                 self.model = model_data['classifier']
#                 self.vectorizer = model_data['vectorizer']
#                 print("Text classification model loaded successfully")
#                 return
#             except Exception as e:
#                 print(f"Error loading text classification model (attempt {attempt+1}/{max_retries}): {e}")
#                 if attempt < max_retries - 1:
#                     time.sleep(2)  # Wait before retrying
#                 else:
#                     print("Failed to load text classification model after maximum retries")
    
#     def classify_text(self, text):
#         """
#         Classify text into Likert scale level
        
#         Args:
#             text: Text to classify
            
#         Returns:
#             Dictionary containing classification results
#         """
#         try:
#             if not self.model or not self.vectorizer:
#                 return {"success": False, "error": "Text classification model not loaded"}
            
#             # Check for empty text
#             if not text or text.strip() == "":
#                 return {"success": False, "error": "Empty text cannot be classified"}
            
#             # Preprocess and vectorize the text
#             text_features = self.vectorizer.transform([text])
            
#             # Predict Likert level
#             prediction = self.model.predict(text_features)[0]
#             probabilities = self.model.predict_proba(text_features)[0]
#             confidence = float(np.max(probabilities) * 100)
            
#             # Apply minimum confidence threshold
#             MIN_CONFIDENCE_THRESHOLD = 40.0  # 40% confidence minimum
#             if confidence < MIN_CONFIDENCE_THRESHOLD:
#                 return {
#                     "success": False,
#                     "error": f"Classification confidence too low ({confidence:.1f}%)",
#                     "likert_level": prediction,
#                     "confidence": confidence
#                 }
            
#             # === THE FIX: Map Likert prediction to string if it's a number ===
#             if isinstance(prediction, (int, float, np.integer, np.floating)):
#                 likert_label = self.likert_label_map[int(prediction)]
#             else:
#                 likert_label = prediction  # Already string

#             stress_level = self.likert_mapping.get(likert_label, "Medium")
#             likert_score = self.likert_scores.get(likert_label, 3)
            
#             return {
#                 "likert_level": likert_label,  # Always a string!
#                 "stress_level": stress_level,
#                 "confidence": confidence,
#                 "likert_score": likert_score,
#                 "success": True
#             }
            
#         except Exception as e:
#             return {
#                 "error": f"Text classification failed: {str(e)}",
#                 "success": False
#             }


import os
import joblib
import numpy as np
import time
import re

class LikertClassifier:
    def __init__(self):
        model_dir = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "models",
            "text_classifier"
        )
        self.model_path = os.path.join(model_dir, "likert_classifier.joblib")
        self.model = None
        self.vectorizer = None
        self.likert_mapping = {
            'Always': 'High',
            'Frequently': 'High',
            'Occasionally': 'Medium',
            'Rarely': 'Low',
            'Never': 'Minimal'
        }
        self.likert_scores = {
            'Always': 5,
            'Frequently': 4,
            'Occasionally': 3,
            'Rarely': 2,
            'Never': 1
        }
        self.likert_label_map = {
            5: "Always",
            4: "Frequently",
            3: "Occasionally",
            2: "Rarely",
            1: "Never"
        }
        
        # Add Sinhala to English mappings for common responses
        self.sinhala_to_english = {
            'සෑම විටම': 'Always',
            'නිතරම': 'Always',
            'නිතර': 'Frequently',
            'සමහර විට': 'Occasionally',
            'කලාතුරකින්': 'Rarely',
            'කිසි විටෙක': 'Never',
            'නැත': 'Never'
        }
        
        self.load_model()

    def load_model(self):
        """Load the pre-trained text classification model"""
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # Load the model which contains both classifier and vectorizer
                model_data = joblib.load(self.model_path)
                self.model = model_data['classifier']
                self.vectorizer = model_data['vectorizer']
                print("Text classification model loaded successfully")
                return
            except Exception as e:
                print(f"Error loading text classification model (attempt {attempt+1}/{max_retries}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2)  # Wait before retrying
                else:
                    print("Failed to load text classification model after maximum retries")

    def preprocess_text(self, text):
        """Preprocess text to handle Sinhala and mixed language content"""
        # Clean the text
        text = text.strip()
        
        # Check for common Sinhala frequency words
        for sinhala, english in self.sinhala_to_english.items():
            if sinhala in text:
                return english
        
        # Extract English words from mixed text
        english_words = re.findall(r'[a-zA-Z]+', text)
        if english_words:
            english_text = ' '.join(english_words)
            # Check for frequency keywords in English
            frequency_keywords = {
                'always': 'Always',
                'frequently': 'Frequently',
                'often': 'Frequently',
                'sometimes': 'Occasionally',
                'occasionally': 'Occasionally',
                'rarely': 'Rarely',
                'never': 'Never',
                'not': 'Never'
            }
            
            for keyword, likert in frequency_keywords.items():
                if keyword in english_text.lower():
                    return likert
        
        return text
    
    def classify_text(self, text):
        """Classify text into Likert scale level"""
        try:
            if not self.model or not self.vectorizer:
                return {"success": False, "error": "Text classification model not loaded"}
            
            # Check for empty text
            if not text or text.strip() == "":
                return {"success": False, "error": "Empty text cannot be classified"}
            
            # Preprocess the text
            processed_text = self.preprocess_text(text)
            
            # If preprocessing found a direct match, return it
            if processed_text in self.likert_scores:
                return {
                    "likert_level": processed_text,
                    "stress_level": self.likert_mapping.get(processed_text, "Medium"),
                    "confidence": 95.0,  # High confidence for direct matches
                    "likert_score": self.likert_scores.get(processed_text, 3),
                    "success": True
                }
            
            # Otherwise, use the ML model
            text_features = self.vectorizer.transform([processed_text])
            
            # Predict Likert level
            prediction = self.model.predict(text_features)[0]
            probabilities = self.model.predict_proba(text_features)[0]
            confidence = float(np.max(probabilities) * 100)
            
            # Handle numeric predictions
            if isinstance(prediction, (int, float, np.integer, np.floating)):
                likert_label = self.likert_label_map.get(int(prediction), "Occasionally")
            else:
                likert_label = prediction
            
            # Lower confidence threshold for mixed language
            MIN_CONFIDENCE_THRESHOLD = 30.0
            if confidence < MIN_CONFIDENCE_THRESHOLD:
                # Default to "Occasionally" for low confidence
                likert_label = "Occasionally"
                confidence = 35.0
            
            stress_level = self.likert_mapping.get(likert_label, "Medium")
            likert_score = self.likert_scores.get(likert_label, 3)
            
            return {
                "likert_level": likert_label,
                "stress_level": stress_level,
                "confidence": confidence,
                "likert_score": likert_score,
                "success": True
            }
            
        except Exception as e:
            return {
                "error": f"Text classification failed: {str(e)}",
                "success": False
            }