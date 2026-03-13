import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkStyle = ({ isActive }) => ({
    ...styles.link,
    ...(isActive ? styles.active : {}),
  })

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>⛅ WeatherApp</span>
      <div style={styles.links}>
        <NavLink to="/" style={linkStyle} end>الطقس الحالي</NavLink>
        <NavLink to="/forecast" style={linkStyle}>التوقعات</NavLink>
        <NavLink to="/history" style={linkStyle}>السجل</NavLink>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 32px',
    background: 'rgba(0,0,0,0.35)',
    backdropFilter: 'blur(10px)',
    position: 'sticky', top: 0, zIndex: 100,
    direction: 'rtl',
  },
  brand: { fontWeight: 800, fontSize: '20px', color: '#fff' },
  links: { display: 'flex', gap: '16px' },
  link: {
    color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
    fontWeight: 500, fontSize: '15px',
    padding: '6px 14px', borderRadius: '8px',
  },
  active: { color: '#fff', background: 'rgba(255,255,255,0.15)' },
}
