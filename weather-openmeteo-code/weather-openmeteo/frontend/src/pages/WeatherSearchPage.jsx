import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import WeatherCard from '../components/WeatherCard'
import { getCurrentWeather } from '../services/weatherApi'

export default function WeatherSearchPage() {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSearch = async (city) => {
    setLoading(true); setError(''); setWeather(null)
    try {
      setWeather(await getCurrentWeather(city))
    } catch (err) {
      setError(err.response?.data?.detail || 'حدث خطأ — تأكد من اسم المدينة')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🌤 الطقس الحالي</h1>
      <p style={styles.sub}>ابحث عن أي مدينة في العالم</p>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {loading && <p style={styles.info}>جاري جلب البيانات...</p>}
      {error   && <p style={styles.error}>{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  )
}

const styles = {
  page:  { padding: '40px 20px', minHeight: '100vh', color: '#fff', direction: 'rtl' },
  title: { textAlign: 'center', fontSize: '32px', margin: '0 0 8px', fontWeight: 800 },
  sub:   { textAlign: 'center', opacity: 0.7, marginBottom: '32px' },
  info:  { textAlign: 'center', opacity: 0.8 },
  error: { textAlign: 'center', color: '#ff6b6b', fontWeight: 600 },
}
