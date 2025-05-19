import logging
import os

def setup_logger(name):
    """Setup logger with proper formatting"""
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG if os.getenv("DEBUG", "False") == "True" else logging.INFO)
    
    handler = logging.StreamHandler()
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
    
    return logger