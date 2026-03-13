import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { getForecast } from '../services/weatherApi'

export default function ForecastPage() {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSearch = async (city) => {
    setLoading(true); setError(''); setForecast(null)
    try {
      setForecast(await getForecast(city))
    } catch (err) {
      setError(err.response?.data?.detail || 'حدث خطأ — تأكد من اسم المدينة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📅 توقعات 7 أيام</h1>
      <p style={styles.sub}>توقعات الطقس لأي مدينة في العالم</p>

      <SearchBar onSearch={handleSearch} loading={loading} placeholder="ادخل اسم المدينة..." />

      {loading && <p style={styles.info}>جاري جلب التوقعات...</p>}
      {error   && <p style={styles.error}>{error}</p>}

      {forecast && (
        <div style={styles.wrapper}>
          <h3 style={styles.cityName}>
            {forecast.city} — {forecast.latitude.toFixed(2)}°N, {forecast.longitude.toFixed(2)}°E
          </h3>
          <div style={styles.grid}>
            {forecast.forecast.map(day => (
              <div key={day.date} style={styles.card}>
                <p style={styles.dayName}>{translateDay(day.day_name)}</p>
                <p style={styles.date}>{day.date}</p>
                <p style={styles.desc}>{day.description}</p>
                <div style={styles.temps}>
                  <span style={styles.max}>↑ {day.temp_max}°</span>
                  <span style={styles.min}>↓ {day.temp_min}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ترجمة أيام الأسبوع
function translateDay(day) {
  const map = {
    Monday: 'الاثنين', Tuesday: 'الثلاثاء', Wednesday: 'الأربعاء',
    Thursday: 'الخميس', Friday: 'الجمعة', Saturday: 'السبت', Sunday: 'الأحد',
  }
  return map[day] || day
}

const styles = {
  page:     { padding: '40px 20px', minHeight: '100vh', color: '#fff', direction: 'rtl' },
  title:    { textAlign: 'center', fontSize: '32px', margin: '0 0 8px', fontWeight: 800 },
  sub:      { textAlign: 'center', opacity: 0.7, marginBottom: '32px' },
  info:     { textAlign: 'center', opacity: 0.8 },
  error:    { textAlign: 'center', color: '#ff6b6b', fontWeight: 600 },
  wrapper:  { maxWidth: '900px', margin: '0 auto' },
  cityName: { textAlign: 'center', fontSize: '18px', marginBottom: '24px', opacity: 0.85 },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
    gap: '12px',
  },
  card: {
    background: 'rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '14px',
    padding: '16px 10px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.15)',
  },
  dayName: { margin: 0, fontWeight: 700, fontSize: '14px' },
  date:    { margin: '4px 0 8px', opacity: 0.6, fontSize: '11px' },
  desc:    { fontSize: '11px', opacity: 0.8, margin: '0 0 10px', minHeight: '30px' },
  temps:   { display: 'flex', justifyContent: 'center', gap: '10px' },
  max:     { fontWeight: 700, fontSize: '16px', color: '#f0a500' },
  min:     { opacity: 0.6, fontSize: '14px' },
}
