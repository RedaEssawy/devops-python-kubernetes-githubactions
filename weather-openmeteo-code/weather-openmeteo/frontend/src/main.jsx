import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Reset styles
const s = document.createElement('style')
s.textContent = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0d1b2a; }
input::placeholder { color: rgba(255,255,255,0.45); }`
document.head.appendChild(s)

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>
)
