# import librosa
# import numpy as np
# import os

# def extract_features(audio_path, max_pad_len=174):
#     """
#     Extract audio features for emotion recognition
    
#     Args:
#         audio_path: Path to audio file
#         max_pad_len: Maximum padding length for features
        
#     Returns:
#         features: Extracted features array
#     """
#     try:
#         # Check if file exists
#         if not os.path.exists(audio_path):
#             print(f"File not found: {audio_path}")
#             return None
            
#         # Load audio file
#         y, sr = librosa.load(audio_path, sr=44100)
        
#         # Extract MFCCs
#         mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
        
#         # Pad or truncate MFCC to ensure consistent dimensions
#         if mfccs.shape[1] < max_pad_len:
#             pad_width = max_pad_len - mfccs.shape[1]
#             mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
#         else:
#             mfccs = mfccs[:, :max_pad_len]
        
#         # Normalize features
#         mfccs = (mfccs - np.mean(mfccs)) / (np.std(mfccs) + 1e-8)
        
#         # Reshape for model input (adding channel dimension)
#         features = mfccs.T.reshape(max_pad_len, 40, 1)
        
#         return features
    
#     except Exception as e:
#         print(f"Error extracting features: {e}")
#         return None


# import librosa
# import numpy as np
# import os

# def extract_features(audio_path, mfcc_features=54, time_frames=259):
#     """
#     Extract audio features for emotion recognition
    
#     Args:
#         audio_path: Path to audio file
#         mfcc_features: Number of MFCC features (default 54 to match model)
#         time_frames: Number of time frames (default 259 to match model)
    
#     Returns:
#         features: Extracted features array with shape (259, 54, 1)
#     """
#     try:
#         # Check if file exists
#         if not os.path.exists(audio_path):
#             print(f"File not found: {audio_path}")
#             return None
        
#         # Load audio file with consistent sample rate
#         y, sr = librosa.load(audio_path, sr=44100)
        
#         # Extract MFCCs with the required number of features
#         mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=mfcc_features)
        
#         # Transpose to get (time, features) shape
#         mfccs = mfccs.T
        
#         # Pad or truncate to ensure consistent time dimension
#         if mfccs.shape[0] < time_frames:
#             pad_width = time_frames - mfccs.shape[0]
#             mfccs = np.pad(mfccs, pad_width=((0, pad_width), (0, 0)), mode='constant')
#         else:
#             mfccs = mfccs[:time_frames, :]
        
#         # Normalize features
#         mfccs = (mfccs - np.mean(mfccs)) / (np.std(mfccs) + 1e-8)
        
#         # Reshape for model input (adding channel dimension)
#         # Final shape should be (time_frames, mfcc_features, 1) = (259, 54, 1)
#         features = mfccs.reshape(time_frames, mfcc_features, 1)
        
#         # Verify the shape
#         expected_shape = (time_frames, mfcc_features, 1)
#         if features.shape != expected_shape:
#             print(f"Warning: Feature shape {features.shape} doesn't match expected {expected_shape}")
        
#         return features
        
#     except Exception as e:
#         print(f"Error extracting features: {e}")
#         return None


# import librosa
# import numpy as np
# import os

# def extract_features(audio_path, mfcc_features=54, time_frames=259):
#     """
#     Extract audio features for emotion recognition
    
#     Args:
#         audio_path: Path to audio file
#         mfcc_features: Number of MFCC features (default 54 to match model)
#         time_frames: Number of time frames (default 259 to match model)
    
#     Returns:
#         features: Extracted features array with shape (259, 54, 1)
#     """
#     try:
#         # Check if file exists
#         if not os.path.exists(audio_path):
#             print(f"File not found: {audio_path}")
#             return None
        
#         # Load audio file with consistent sample rate
#         y, sr = librosa.load(audio_path, sr=44100)
        
#         # Extract MFCCs with the required number of features
#         # librosa.feature.mfcc returns shape (n_mfcc, time)
#         mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=mfcc_features)
        
#         # DO NOT transpose yet - we need to handle padding first
#         # Current shape is (54, time)
        
#         # Pad or truncate the time dimension (axis=1)
#         if mfccs.shape[1] < time_frames:
#             pad_width = time_frames - mfccs.shape[1]
#             mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
#         else:
#             mfccs = mfccs[:, :time_frames]
        
#         # Now transpose to get (time, features) shape
#         # From (54, 259) to (259, 54)
#         mfccs = mfccs.T
        
#         # Normalize features
#         mfccs = (mfccs - np.mean(mfccs)) / (np.std(mfccs) + 1e-8)
        
#         # Reshape for model input (adding channel dimension)
#         # Final shape should be (time_frames, mfcc_features, 1) = (259, 54, 1)
#         features = mfccs.reshape(time_frames, mfcc_features, 1)
        
#         # Verify the shape
#         expected_shape = (time_frames, mfcc_features, 1)
#         if features.shape != expected_shape:
#             print(f"Warning: Feature shape {features.shape} doesn't match expected {expected_shape}")
#         else:
#             print(f"Features extracted successfully with shape: {features.shape}")
        
#         return features
        
#     except Exception as e:
#         print(f"Error extracting features: {e}")
#         import traceback
#         traceback.print_exc()
#         return None


# import librosa
# import numpy as np
# import os

# def extract_features(audio_path, mfcc_features=54, time_frames=259):
#     """
#     Extract audio features for emotion recognition
    
#     Args:
#         audio_path: Path to audio file
#         mfcc_features: Number of MFCC features (default 54 to match model)
#         time_frames: Number of time frames (default 259 to match model)
        
#     Returns:
#         features: Extracted features array with shape (259, 54, 1)
#     """
#     try:
#         # Check if file exists
#         if not os.path.exists(audio_path):
#             print(f"File not found: {audio_path}")
#             return None
            
#         # Load audio file with consistent sample rate
#         y, sr = librosa.load(audio_path, sr=44100)
        
#         # Extract MFCCs with the required number of features
#         # librosa.feature.mfcc returns shape (n_mfcc, time)
#         mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=mfcc_features)
        
#         # DO NOT transpose yet - we need to handle padding first
#         # Current shape is (54, time)
        
#         # Pad or truncate the time dimension (axis=1)
#         if mfccs.shape[1] < time_frames:
#             pad_width = time_frames - mfccs.shape[1]
#             mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
#         else:
#             mfccs = mfccs[:, :time_frames]
        
#         # Now transpose to get (time, features) shape
#         # From (54, 259) to (259, 54)
#         mfccs = mfccs.T
        
#         # Normalize features
#         mfccs = (mfccs - np.mean(mfccs)) / (np.std(mfccs) + 1e-8)
        
#         # Reshape for model input (adding channel dimension)
#         # Final shape should be (time_frames, mfcc_features, 1) = (259, 54, 1)
#         features = mfccs.reshape(time_frames, mfcc_features, 1)
        
#         # Verify the shape
#         expected_shape = (time_frames, mfcc_features, 1)
#         if features.shape != expected_shape:
#             print(f"Warning: Feature shape {features.shape} doesn't match expected {expected_shape}")
#         else:
#             print(f"Features extracted successfully with shape: {features.shape}")
        
#         return features
    
#     except Exception as e:
#         print(f"Error extracting features: {e}")
#         import traceback
#         traceback.print_exc()
#         return None

import librosa
import numpy as np
import os

def extract_features(audio_path, mfcc_features=54, time_frames=259):
    """
    Extract audio features for emotion recognition
    
    Args:
        audio_path: Path to audio file
        mfcc_features: Number of MFCC features (default 54 to match model)
        time_frames: Number of time frames (default 259 to match model)
        
    Returns:
        features: Extracted features array with shape (54, 259, 1)
    """
    try:
        # Check if file exists
        if not os.path.exists(audio_path):
            print(f"File not found: {audio_path}")
            return None
            
        # Load audio file with consistent sample rate
        y, sr = librosa.load(audio_path, sr=44100)
        
        # Extract MFCCs with the required number of features
        # librosa.feature.mfcc returns shape (n_mfcc, time)
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=mfcc_features)
        
        # DO NOT transpose - keep original shape
        # Current shape is (54, time)
        
        # Pad or truncate the time dimension (axis=1)
        if mfccs.shape[1] < time_frames:
            pad_width = time_frames - mfccs.shape[1]
            mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
        else:
            mfccs = mfccs[:, :time_frames]
        
        # Shape is now (54, 259)
        # Do NOT transpose - the model expects (54, 259, 1)
        
        # Normalize features
        mfccs = (mfccs - np.mean(mfccs)) / (np.std(mfccs) + 1e-8)
        
        # Reshape for model input (adding channel dimension)
        # Final shape should be (mfcc_features, time_frames, 1) = (54, 259, 1)
        features = mfccs.reshape(mfcc_features, time_frames, 1)
        
        # Verify the shape
        expected_shape = (mfcc_features, time_frames, 1)
        if features.shape != expected_shape:
            print(f"Warning: Feature shape {features.shape} doesn't match expected {expected_shape}")
        else:
            print(f"Features extracted successfully with shape: {features.shape}")
        
        return features
    
    except Exception as e:
        print(f"Error extracting features: {e}")
        import traceback
        traceback.print_exc()
        return None