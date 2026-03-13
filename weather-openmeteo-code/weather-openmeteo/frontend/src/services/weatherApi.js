import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 15000,
})

export const getCurrentWeather = (city) =>
  api.get('/weather/current', { params: { city } }).then(r => r.data)

export const getForecast = (city) =>
  api.get('/weather/forecast', { params: { city } }).then(r => r.data)

export const getWeatherHistory = (city, limit = 20) =>
  api.get('/weather/history', { params: { city, limit } }).then(r => r.data)
