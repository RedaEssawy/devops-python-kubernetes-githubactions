"""
إعدادات التطبيق — بيقرأ المتغيرات من ملف .env
Open-Meteo مجاني 100% ومحتاجش API key
"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # PostgreSQL
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/weatherdb"

    # إعدادات عامة
    APP_NAME: str = "Weather Forecasting App"
    DEBUG: bool = True

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
