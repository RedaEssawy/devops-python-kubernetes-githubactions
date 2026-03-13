"""
FastAPI App — نقطة البداية
بيعمل الجداول في DB تلقائي ويشغل الـ routes
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database.session import Base, engine
from app.api.weather import router as weather_router

# بيعمل الجداول في PostgreSQL لو مش موجودة
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="Weather platform powered by Open-Meteo — مجاني 100%",
    version="1.0.0",
)

# السماح للـ React frontend يكلم الـ API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather_router)


@app.get("/", tags=["health"])
def health_check():
    return {"status": "ok", "app": settings.APP_NAME, "api": "Open-Meteo (free)"}
