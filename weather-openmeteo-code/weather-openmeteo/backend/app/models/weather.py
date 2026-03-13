"""
جدول weather_records في PostgreSQL
بيتحفظ فيه كل طلب طقس عشان نعمل history
"""
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database.session import Base


class WeatherRecord(Base):
    __tablename__ = "weather_records"

    id          = Column(Integer, primary_key=True, index=True)
    city        = Column(String(100), nullable=False, index=True)
    latitude    = Column(Float, nullable=False)
    longitude   = Column(Float, nullable=False)

    # بيانات الطقس
    temperature = Column(Float, nullable=False)    # °C
    feels_like  = Column(Float, nullable=True)     # °C
    humidity    = Column(Integer, nullable=False)  # %
    wind_speed  = Column(Float, nullable=False)    # km/h
    pressure    = Column(Integer, nullable=True)   # hPa
    description = Column(String(200), nullable=False)

    # وقت السجل
    recorded_at = Column(DateTime(timezone=True), nullable=False)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())
