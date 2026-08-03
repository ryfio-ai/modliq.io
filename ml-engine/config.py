import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "Modliq ML Engine"
    ENV: str = os.getenv("ENV", "development")
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")

    # Security & Origins
    ML_INTERNAL_API_KEY: str = os.getenv("ML_INTERNAL_API_KEY", "test-key")
    CORS_ORIGINS: str = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5000,https://modliq.vercel.app")

    # Limits
    MAX_CSV_BYTES: int = int(os.getenv("MAX_CSV_BYTES", "50000000"))
    MAX_TRAINING_SECONDS: int = int(os.getenv("MAX_TRAINING_SECONDS", "300"))

    # DB & Cache
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    MONGO_URL: str = os.getenv("MONGO_URL", "mongodb://localhost:27017/modliq")

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
