import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import WeatherSearchPage  from './pages/WeatherSearchPage'
import ForecastPage       from './pages/ForecastPage'
import WeatherHistoryPage from './pages/WeatherHistoryPage'

export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.app}>
        <Navbar />
        <main>
          <Routes>
            <Route path="/"        element={<WeatherSearchPage />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="/history"  element={<WeatherHistoryPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

const styles = {
  app: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #0d1b2a 0%, #1b3a5c 50%, #0d2137 100%)',
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
}
