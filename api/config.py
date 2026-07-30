import os
from pydantic import BaseModel

class Settings(BaseModel):
    APP_NAME: str = "Jeevan Haris Portfolio API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "https://*.vercel.app",
        "*"
    ]

settings = Settings()
