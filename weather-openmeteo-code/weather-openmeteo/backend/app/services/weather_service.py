"""
Open-Meteo Integration Service
================================
مجاني 100% — مفيش API key — مفيش تسجيل
الـ API بيستخدم latitude/longitude مش اسم المدينة
فبنعمل خطوتين:
  1. Geocoding API: اسم المدينة → latitude, longitude
  2. Weather API:   latitude, longitude → بيانات الطقس
"""
import httpx
from datetime import datetime
from typing import Dict, Any

from app.schemas.weather import (
    CurrentWeatherResponse,
    ForecastResponse,
    ForecastDay,
)

# ── URLs الخاصة بـ Open-Meteo ────────────────────────────────
GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search"
WEATHER_URL   = "https://api.open-meteo.com/v1/forecast"


async def get_coordinates(city: str) -> Dict[str, Any]:
    """
    الخطوة 1: بيحول اسم المدينة لـ latitude و longitude
    مثال: "Cairo" → {"lat": 30.06, "lon": 31.24, "country": "EG"}
    """
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(GEOCODING_URL, params={
            "name": city,
            "count": 1,
            "language": "en",
            "format": "json"
        })
        response.raise_for_status()
        data = response.json()

    results = data.get("results")
    if not results:
        raise ValueError(f"City not found: {city}")

    result = results[0]
    return {
        "name":      result.get("name", city),
        "country":   result.get("country_code", ""),
        "latitude":  result["latitude"],
        "longitude": result["longitude"],
    }


async def fetch_current_weather(city: str) -> CurrentWeatherResponse:
    """
    الخطوة 2: بيجيب الطقس الحالي بعد ما يعرف الإحداثيات
    """
    # أولاً: جيب الإحداثيات
    geo = await get_coordinates(city)

    # ثانياً: جيب الطقس
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(WEATHER_URL, params={
            "latitude":  geo["latitude"],
            "longitude": geo["longitude"],
            "current":   [
                "temperature_2m",
                "apparent_temperature",
                "relative_humidity_2m",
                "wind_speed_10m",
                "surface_pressure",
                "weather_code",
            ],
            "wind_speed_unit": "kmh",
            "timezone": "auto",
        })
        response.raise_for_status()
        data = response.json()

    current = data.get("current", {})

    return CurrentWeatherResponse(
        city=geo["name"],
        latitude=geo["latitude"],
        longitude=geo["longitude"],
        temperature=round(current.get("temperature_2m", 0), 1),
        feels_like=round(current.get("apparent_temperature", 0), 1),
        humidity=current.get("relative_humidity_2m", 0),
        wind_speed=round(current.get("wind_speed_10m", 0), 1),
        pressure=int(current.get("surface_pressure", 0)),
        description=weather_code_to_description(current.get("weather_code", 0)),
        recorded_at=datetime.utcnow(),
    )


async def fetch_forecast(city: str) -> ForecastResponse:
    """
    بيجيب توقعات 7 أيام
    """
    geo = await get_coordinates(city)

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(WEATHER_URL, params={
            "latitude":  geo["latitude"],
            "longitude": geo["longitude"],
            "daily": [
                "temperature_2m_max",
                "temperature_2m_min",
                "weather_code",
            ],
            "wind_speed_unit": "kmh",
            "timezone": "auto",
            "forecast_days": 7,
        })
        response.raise_for_status()
        data = response.json()

    daily = data.get("daily", {})
    dates      = daily.get("time", [])
    temp_max   = daily.get("temperature_2m_max", [])
    temp_min   = daily.get("temperature_2m_min", [])
    codes      = daily.get("weather_code", [])

    forecast_days = []
    for i, date_str in enumerate(dates):
        dt = datetime.strptime(date_str, "%Y-%m-%d")
        forecast_days.append(ForecastDay(
            date=date_str,
            day_name=dt.strftime("%A"),
            temp_max=round(temp_max[i], 1) if i < len(temp_max) else 0,
            temp_min=round(temp_min[i], 1) if i < len(temp_min) else 0,
            description=weather_code_to_description(codes[i] if i < len(codes) else 0),
        ))

    return ForecastResponse(
        city=geo["name"],
        latitude=geo["latitude"],
        longitude=geo["longitude"],
        forecast=forecast_days,
    )


def weather_code_to_description(code: int) -> str:
    """
    Open-Meteo بيرجع كود رقمي للطقس (WMO Weather Code)
    الدالة دي بتحوله لوصف مفهوم
    """
    descriptions = {
        0:  "Clear sky",
        1:  "Mainly clear",
        2:  "Partly cloudy",
        3:  "Overcast",
        45: "Foggy",
        48: "Icy fog",
        51: "Light drizzle",
        53: "Moderate drizzle",
        55: "Dense drizzle",
        61: "Slight rain",
        63: "Moderate rain",
        65: "Heavy rain",
        71: "Slight snow",
        73: "Moderate snow",
        75: "Heavy snow",
        80: "Slight showers",
        81: "Moderate showers",
        82: "Violent showers",
        95: "Thunderstorm",
        99: "Thunderstorm with hail",
    }
    return descriptions.get(code, "Unknown")
