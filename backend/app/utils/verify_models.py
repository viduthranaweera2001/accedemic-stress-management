import os
import tensorflow as tf
import pickle
import joblib

def verify_models():
    """Verify all models are properly loaded"""
    base_path = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    
    # 1. Check emotion model
    emotion_model_path = os.path.join(base_path, "models", "emotion", "emotion_model.keras")
    label_encoder_path = os.path.join(base_path, "models", "emotion", "label_encoder.pkl")
    
    print(f"Checking emotion model at: {emotion_model_path}")
    if os.path.exists(emotion_model_path):
        try:
            model = tf.keras.models.load_model(emotion_model_path)
            print("✓ Emotion model loaded successfully")
            print(f"  Model input shape: {model.input_shape}")
            print(f"  Model output shape: {model.output_shape}")
        except Exception as e:
            print(f"✗ Error loading emotion model: {e}")
    else:
        print("✗ Emotion model file not found")
    
    print(f"\nChecking label encoder at: {label_encoder_path}")
    if os.path.exists(label_encoder_path):
        try:
            with open(label_encoder_path, 'rb') as f:
                encoder = pickle.load(f)
            print("✓ Label encoder loaded successfully")
            print(f"  Classes: {encoder.classes_}")
        except Exception as e:
            print(f"✗ Error loading label encoder: {e}")
    else:
        print("✗ Label encoder file not found")
    
    # 2. Check text classifier
    text_model_path = os.path.join(base_path, "models", "text_classifier", "likert_classifier.joblib")
    print(f"\nChecking text classifier at: {text_model_path}")
    if os.path.exists(text_model_path):
        try:
            model_data = joblib.load(text_model_path)
            print("✓ Text classifier loaded successfully")
            print(f"  Keys in model: {list(model_data.keys())}")
        except Exception as e:
            print(f"✗ Error loading text classifier: {e}")
    else:
        print("✗ Text classifier file not found")

if __name__ == "__main__":
    verify_models()