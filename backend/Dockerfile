# FROM python:3.9

# WORKDIR /app

# # Install system dependencies
# RUN apt-get update && apt-get install -y \
#     libsndfile1 \
#     ffmpeg \
#     build-essential \
#     python3-dev

# # Copy requirements first to leverage Docker cache
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# # Create directories for models and uploads
# RUN mkdir -p uploads
# RUN mkdir -p models/emotion models/asr models/text_classifier

# # Copy the rest of the application
# COPY . .

# # CPU-only flag for TensorFlow to ensure compatibility
# ENV CUDA_VISIBLE_DEVICES="-1"

# # Command to run the application
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]


FROM python:3.9

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libsndfile1 \
    ffmpeg \
    build-essential \
    python3-dev

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create directories for models and uploads with proper permissions
RUN mkdir -p uploads && chmod 755 uploads
RUN mkdir -p models/emotion models/asr models/text_classifier

# Copy the rest of the application
COPY . .

# Ensure uploads directory is writable
RUN chmod -R 755 uploads

# CPU-only flag for TensorFlow to ensure compatibility
ENV CUDA_VISIBLE_DEVICES="-1"

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]