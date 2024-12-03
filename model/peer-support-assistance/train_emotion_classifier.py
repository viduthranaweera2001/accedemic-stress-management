import pandas as pd
import numpy as np
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.linear_model import LogisticRegression
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

class EmotionClassifier:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()
        self.label_encoder = LabelEncoder()
        self.classifier = LogisticRegression(max_iter=1000)
        
    def preprocess_text(self, text):
        text = str(text)
        text = text.lower()
        text = re.sub(r'[^a-z\s]', '', text)
        text = ' '.join(text.split())
        return text
    
    def load_data(self, file_path):
        # Load the dataset
        df = pd.read_csv(file_path)
        
        if 'text' not in df.columns or 'label' not in df.columns:
            raise ValueError("CSV must have 'text' and 'label' columns")
        
        # Print unique labels for verification
        print("Unique Labels:", df['label'].unique())
        
        # Create label mapping
        label_map = {
            0: 'label_0', 1: 'label_1', 2: 'label_2', 
            3: 'label_3', 4: 'label_4', 5: 'label_5'
        }
        
        # Map numeric labels to string labels
        df['label_str'] = df['label'].map(label_map)
        
        # Preprocess text
        df['processed_text'] = df['text'].apply(self.preprocess_text)
        
        return df
    
    def prepare_data(self, df):
        # Encode labels
        y = self.label_encoder.fit_transform(df['label_str'])
        
        # Vectorize text
        X = self.vectorizer.fit_transform(df['processed_text'])
        
        return X, y
    
    def train_and_save_model(self, file_path, test_size=0.2, random_state=42):
        # Load data
        df = self.load_data(file_path)
        
        # Prepare data
        X, y = self.prepare_data(df)
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=random_state
        )
        
        # Train model
        self.classifier.fit(X_train, y_train)
        
        # Evaluate model
        y_pred = self.classifier.predict(X_test)
        unique_labels = self.label_encoder.classes_
        
        print("Classification Report:")
        print(classification_report(y_test, y_pred, 
            target_names=unique_labels, zero_division=0))
        
        # Confusion Matrix
        cm = confusion_matrix(y_test, y_pred)
        plt.figure(figsize=(10,7))
        sns.heatmap(cm, annot=True, fmt='d', 
            xticklabels=unique_labels,
            yticklabels=unique_labels)
        plt.title('Confusion Matrix')
        plt.xlabel('Predicted')
        plt.ylabel('Actual')
        plt.show()
        
        # Save model components
        joblib.dump(self.classifier, 'emotion_classifier_model.pkl')
        joblib.dump(self.vectorizer, 'vectorizer.pkl')
        joblib.dump(self.label_encoder, 'label_encoder.pkl')
        print("Model, vectorizer, and label encoder saved!")

def main():
    # Path to your dataset
    file_path = '/Users/viduthranaweera/Desktop/SLIIT/Y4/ml-project/test.csv'
    
    # Create and run the classifier
    emotion_classifier = EmotionClassifier()
    emotion_classifier.train_and_save_model(file_path)

if __name__ == '__main__':
    main()
