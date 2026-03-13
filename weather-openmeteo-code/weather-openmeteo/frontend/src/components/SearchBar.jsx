import { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = 'ادخل اسم المدينة...', loading = false }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = city.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <button type="submit" disabled={loading} style={styles.btn}>
        {loading ? '...' : '🔍 بحث'}
      </button>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
        dir="ltr"
      />
    </form>
  )
}

const styles = {
  form: {
    display: 'flex', gap: '10px',
    maxWidth: '480px', margin: '0 auto 28px',
    direction: 'rtl',
  },
  input: {
    flex: 1, padding: '12px 16px', borderRadius: '10px',
    border: 'none', fontSize: '15px', outline: 'none',
    background: 'rgba(255,255,255,0.15)', color: '#fff',
    backdropFilter: 'blur(6px)',
    textAlign: 'left',
  },
  btn: {
    padding: '12px 20px', borderRadius: '10px', border: 'none',
    background: '#f0a500', color: '#fff', fontWeight: 700,
    cursor: 'pointer', fontSize: '14px', whiteSpace: 'nowrap',
  },
}
