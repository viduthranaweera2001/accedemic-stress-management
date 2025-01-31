import sys
import re
import joblib

class EmotionPredictor:
    def __init__(self, model_path='emotion_classifier_model.pkl', 
                 vectorizer_path='vectorizer.pkl', 
                 label_encoder_path='label_encoder.pkl'):

        self.classifier = joblib.load(model_path)
        self.vectorizer = joblib.load(vectorizer_path)
        self.label_encoder = joblib.load(label_encoder_path)
    
    def preprocess_text(self, text):
        # Ensure text is a string
        text = str(text)
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and digits
        text = re.sub(r'[^a-z\s]', '', text)
        
        # Remove extra whitespaces
        text = ' '.join(text.split())
        
        return text
    
    def predict_emotion(self, text):
        # Preprocess the input text
        processed_text = self.preprocess_text(text)
        
        # Vectorize the text
        text_vectorized = self.vectorizer.transform([processed_text])
        
        # Predict
        prediction = self.classifier.predict(text_vectorized)
        predicted_label = self.label_encoder.inverse_transform(prediction)[0]
        
        return predicted_label

def main():
    # Create predictor instance
    predictor = EmotionPredictor()
    
    # Read input from stdin
    text = sys.stdin.readline().strip()
    
    # Predict emotion
    predicted_emotion = predictor.predict_emotion(text)
    
    # Print the predicted emotion (for Java to read)
    print(predicted_emotion)

if __name__ == '__main__':
    main()