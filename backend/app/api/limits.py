from fastapi import FastAPI
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import logging

class FileSizeLimitMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: FastAPI, max_size_mb: int = 10):
        super().__init__(app)
        self.max_size_bytes = max_size_mb * 1024 * 1024
        logging.info(f"Setting max file upload size to {max_size_mb}MB ({self.max_size_bytes} bytes)")

    async def dispatch(self, request: Request, call_next):
        # Only check content length for POST/PUT requests
        if request.method in ["POST", "PUT"]:
            content_length = request.headers.get("content-length")
            if content_length:
                if int(content_length) > self.max_size_bytes:
                    return Response(
                        status_code=413,
                        content={"detail": f"File too large. Maximum size allowed is {self.max_size_bytes} bytes."},
                        media_type="application/json"
                    )
        response = await call_next(request)
        return response