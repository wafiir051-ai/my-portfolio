import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './lib/scrollcraft.css'
import './index.css'
import App from './App.jsx'

// Selalu mulai dari atas saat halaman dibuka.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
