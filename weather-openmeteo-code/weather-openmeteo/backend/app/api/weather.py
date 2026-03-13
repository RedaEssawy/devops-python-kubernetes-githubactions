"""
Weather API Endpoints
  GET /weather/current?city=Cairo
  GET /weather/forecast?city=Cairo
  GET /weather/history?city=Cairo
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.weather import WeatherRecord
from app.schemas.weather import (
    CurrentWeatherResponse,
    ForecastResponse,
    WeatherHistoryResponse,
    WeatherHistoryItem,
)
from app.services.weather_service import fetch_current_weather, fetch_forecast

router = APIRouter(prefix="/weather", tags=["weather"])


@router.get("/current", response_model=CurrentWeatherResponse)
async def get_current_weather(
    city: str = Query(..., description="اسم المدينة — مثال: Cairo"),
    db: Session = Depends(get_db),
):
    """
    بيجيب الطقس الحالي من Open-Meteo وبيحفظه في DB للـ history
    """
    try:
        weather = await fetch_current_weather(city)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Weather API error: {e}")

    # حفظ في قاعدة البيانات
    record = WeatherRecord(
        city=weather.city,
        latitude=weather.latitude,
        longitude=weather.longitude,
        temperature=weather.temperature,
        feels_like=weather.feels_like,
        humidity=weather.humidity,
        wind_speed=weather.wind_speed,
        pressure=weather.pressure,
        description=weather.description,
        recorded_at=weather.recorded_at,
    )
    db.add(record)
    db.commit()

    return weather


@router.get("/forecast", response_model=ForecastResponse)
async def get_forecast(
    city: str = Query(..., description="اسم المدينة — مثال: London"),
):
    """
    بيجيب توقعات 7 أيام من Open-Meteo
    """
    try:
        return await fetch_forecast(city)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Forecast API error: {e}")


@router.get("/history", response_model=WeatherHistoryResponse)
def get_history(
    city: str = Query(..., description="اسم المدينة"),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """
    بيجيب السجلات التاريخية من PostgreSQL
    (كل مرة تطلب /current بيتحفظ سجل هنا)
    """
    records = (
        db.query(WeatherRecord)
        .filter(WeatherRecord.city.ilike(f"%{city}%"))
        .order_by(WeatherRecord.recorded_at.desc())
        .limit(limit)
        .all()
    )

    return WeatherHistoryResponse(
        city=city,
        records=[WeatherHistoryItem.model_validate(r) for r in records],
        total=len(records),
    )
