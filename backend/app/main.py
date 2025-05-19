# import os
# from fastapi import FastAPI, Depends
# from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from app.db.base import engine, get_db
# from app.db.models import Base
# from app.api import auth, stress
# from app.api.limits import FileSizeLimitMiddleware
# from starlette.responses import Response

# # Create database tables
# Base.metadata.create_all(bind=engine)

# # Create upload directory
# os.makedirs("uploads", exist_ok=True)

# app = FastAPI(title="Academic Stress Detection System API")

# # Add file size limit middleware (100MB)
# app.add_middleware(FileSizeLimitMiddleware, max_size_mb=100)

# # Configure CORS
# origins = [
#     "http://localhost",
#     "http://localhost:3000", # React development server
#     "http://frontend:80", # Docker service name
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Include routers
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(stress.router, prefix="/api/stress", tags=["Stress Detection"])

# @app.get("/")
# def read_root():
#     return {"message": "Academic Stress Detection System API"}

# @app.get("/health")
# def health_check():
#     return {"status": "healthy"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)



import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.db.base import engine, get_db
from app.db.models import Base
from app.api import auth, stress
from app.api.limits import FileSizeLimitMiddleware
from starlette.responses import Response

# Create database tables
Base.metadata.create_all(bind=engine)

# Create upload directory
os.makedirs("uploads", exist_ok=True)

app = FastAPI(
    title="Academic Stress Detection System API",
    # Set max request size to 10MB to match nginx
    max_request_size=10 * 1024 * 1024
)

# Add file size limit middleware (10MB)
app.add_middleware(FileSizeLimitMiddleware, max_size_mb=10)

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",  # React development server
    "http://frontend:80",     # Docker service name
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(stress.router, prefix="/api/stress", tags=["Stress Detection"])

@app.get("/")
def read_root():
    return {"message": "Academic Stress Detection System API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)