import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { getWeatherHistory } from '../services/weatherApi'

export default function WeatherHistoryPage() {
  const [history, setHistory] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSearch = async (city) => {
    setLoading(true); setError(''); setHistory(null)
    try {
      setHistory(await getWeatherHistory(city, 30))
    } catch (err) {
      setError(err.response?.data?.detail || 'حدث خطأ')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (iso) =>
    new Date(iso).toLocaleString('ar-EG', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🕐 سجل الطقس</h1>
      <p style={styles.sub}>السجلات المحفوظة في قاعدة البيانات</p>

      <SearchBar onSearch={handleSearch} loading={loading} placeholder="ابحث عن مدينة..." />

      {loading && <p style={styles.info}>جاري تحميل السجلات...</p>}
      {error   && <p style={styles.error}>{error}</p>}

      {history && (
        <div style={styles.wrapper}>
          <p style={styles.count}>
            {history.total} سجل لمدينة <strong>{history.city}</strong>
          </p>

          {history.records.length === 0 ? (
            <p style={styles.info}>
              لا توجد سجلات — ابحث عن الطقس الحالي أولاً لتبدأ التسجيل
            </p>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {['التاريخ والوقت', 'الحرارة', 'الرطوبة', 'الرياح', 'الحالة'].map(h => (
                      <th key={h} style={styles.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.records.map(rec => (
                    <tr key={rec.id} style={styles.tr}>
                      <td style={styles.td}>{formatDate(rec.recorded_at)}</td>
                      <td style={styles.td}>{rec.temperature}°C</td>
                      <td style={styles.td}>{rec.humidity}%</td>
                      <td style={styles.td}>{rec.wind_speed} km/h</td>
                      <td style={styles.td}>{rec.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const styles = {
  page:      { padding: '40px 20px', minHeight: '100vh', color: '#fff', direction: 'rtl' },
  title:     { textAlign: 'center', fontSize: '32px', margin: '0 0 8px', fontWeight: 800 },
  sub:       { textAlign: 'center', opacity: 0.7, marginBottom: '32px' },
  info:      { textAlign: 'center', opacity: 0.8 },
  error:     { textAlign: 'center', color: '#ff6b6b', fontWeight: 600 },
  wrapper:   { maxWidth: '900px', margin: '0 auto' },
  count:     { opacity: 0.75, marginBottom: '12px', fontSize: '14px' },
  tableWrap: { overflowX: 'auto' },
  table:     { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: {
    background: 'rgba(255,255,255,0.15)',
    padding: '10px 14px', textAlign: 'right',
    fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.2)',
    whiteSpace: 'nowrap',
  },
  tr: { borderBottom: '1px solid rgba(255,255,255,0.08)' },
  td: { padding: '10px 14px', opacity: 0.9, textAlign: 'right' },
}
