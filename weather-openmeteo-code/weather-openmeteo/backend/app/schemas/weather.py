"""
Schemas — بتحدد شكل البيانات الجاية والراحة من الـ API
"""
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel


# ── الطقس الحالي ───────────────────────────────────────────────

class CurrentWeatherResponse(BaseModel):
    city: str
    latitude: float
    longitude: float
    temperature: float
    feels_like: Optional[float] = None
    humidity: int
    wind_speed: float
    pressure: Optional[int] = None
    description: str
    recorded_at: datetime


# ── التوقعات ───────────────────────────────────────────────────

class ForecastDay(BaseModel):
    date: str
    day_name: str
    temp_max: float
    temp_min: float
    description: str


class ForecastResponse(BaseModel):
    city: str
    latitude: float
    longitude: float
    forecast: List[ForecastDay]


# ── السجلات التاريخية ──────────────────────────────────────────

class WeatherHistoryItem(BaseModel):
    id: int
    city: str
    temperature: float
    humidity: int
    wind_speed: float
    description: str
    recorded_at: datetime

    class Config:
        from_attributes = True


class WeatherHistoryResponse(BaseModel):
    city: str
    records: List[WeatherHistoryItem]
    total: int
