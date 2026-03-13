export default function WeatherCard({ data }) {
  if (!data) return null

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.city}>{data.city}</h2>
          <p style={styles.desc}>{data.description}</p>
        </div>
        <div style={styles.tempBig}>{data.temperature}°C</div>
      </div>

      <p style={styles.feelsLike}>الإحساس الحراري: {data.feels_like}°C</p>

      {/* Stats */}
      <div style={styles.grid}>
        <Stat label="💧 الرطوبة"     value={`${data.humidity}%`} />
        <Stat label="💨 الرياح"      value={`${data.wind_speed} km/h`} />
        <Stat label="🌡 الضغط"       value={`${data.pressure} hPa`} />
        <Stat label="🌐 خط العرض"   value={data.latitude?.toFixed(2)} />
        <Stat label="🌐 خط الطول"   value={data.longitude?.toFixed(2)} />
        <Stat label="📡 المصدر"      value="Open-Meteo ✓" />
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div style={styles.stat}>
      <span style={styles.statLabel}>{label}</span>
      <span style={styles.statValue}>{value}</span>
    </div>
  )
}

const styles = {
  card: {
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2d6a9f 100%)',
    borderRadius: '20px', padding: '28px',
    color: '#fff', maxWidth: '500px', margin: '20px auto',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    direction: 'rtl',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' },
  city: { margin: 0, fontSize: '26px', fontWeight: 700 },
  desc: { margin: '4px 0 0', opacity: 0.8, fontSize: '15px' },
  tempBig: { fontSize: '64px', fontWeight: 800, lineHeight: 1 },
  feelsLike: { opacity: 0.7, fontSize: '14px', marginBottom: '20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginTop: '16px' },
  stat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  statLabel: { fontSize: '11px', opacity: 0.65 },
  statValue: { fontSize: '15px', fontWeight: 600 },
}
