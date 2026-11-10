import { useEffect, useRef, useState } from 'react'
import FluxLines from './reactbits/FluxLines/FluxLines'
import LatticeLoader from './reactbits/LatticeLoader/LatticeLoader'
import { usePrefs } from '../hooks/usePrefs'

// Layar pembuka dalam dua tahap:
// 1. "Masuk": nama, kata Masuk, dan keterangan tipis. Klik, ketuk, atau Enter di
//    mana saja. Interaksi itu membuka izin suara dari browser ("wha:enter").
// 2. Pemuat: animasi LatticeLoader jalan sampai halaman siap. Begitu selesai,
//    musik diputar ("wha:play") lalu layar dibuka.
export default function Loader({ onDone }) {
  const { reduce } = usePrefs()
  const [phase, setPhase] = useState('gate') // gate | loading
  const [status, setStatus] = useState('working')
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const gateRef = useRef(null)
  const loadedRef = useRef(null)
  const timersRef = useRef([])

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('is-loading')
    // Halaman mulai dimuat sejak layar Masuk tampil; tahap pemuat menunggunya.
    loadedRef.current = Promise.race([
      new Promise((r) => {
        if (document.readyState === 'complete') r()
        else window.addEventListener('load', r, { once: true })
      }),
      new Promise((r) => setTimeout(r, 4000)),
    ])
    const timers = timersRef.current
    return () => {
      timers.forEach(clearTimeout)
      root.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    if (phase === 'gate') gateRef.current?.focus()
  }, [phase])

  const wait = (ms) =>
    new Promise((r) => {
      timersRef.current.push(setTimeout(r, ms))
    })

  const enter = () => {
    if (phase !== 'gate') return
    // Klik ini membuka izin suara dari browser; musik baru diputar setelah pemuatan selesai.
    window.dispatchEvent(new Event('wha:enter'))
    setPhase('loading')
    // Animasi pemuat terlihat minimal 1,8 detik supaya tidak berkedip.
    Promise.all([loadedRef.current, wait(1800)])
      .then(() => {
        setStatus('done')
        // Pemuatan selesai: sekarang musik diputar.
        window.dispatchEvent(new Event('wha:play'))
        return wait(500)
      })
      .then(() => {
        setLeaving(true)
        document.documentElement.classList.remove('is-loading')
        onDone()
        return wait(500)
      })
      .then(() => setGone(true))
  }

  if (gone) return null

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`}>
      {!reduce && (
        <div className="loader__bed" aria-hidden="true">
          <FluxLines
            colors={['#3ED8A8', '#1F8F70', '#0E4A3A']}
            speed={0.25}
            scale={1.3}
            transparent={false}
            backgroundColor="#081410"
            opacity={0.85}
            glow={0.4}
            shimmer={0.3}
            sharpness={3.5}
            lineWidth={0.8}
            mouseStrength={0.8}
          />
        </div>
      )}

      <div className="loader__frame" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>

      {phase === 'gate' ? (
        <>
          <button type="button" ref={gateRef} className="loader__gate cursor-target" data-cursor-label="Masuk" onClick={enter} aria-label="Masuk ke portofolio Waffir Hasan Alkamiil">
            <span className="loader__eyebrow">
              <i aria-hidden="true" />
              Waffir Hasan Alkamiil
            </span>
            <span className="loader__enter">
              <span className="loader__word">Masuk</span>
              <span className="loader__orb" aria-hidden="true">
                <svg className="loader__ring" viewBox="0 0 120 120">
                  <defs>
                    <path id="loader-ring-path" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
                  </defs>
                  <text>
                    <textPath href="#loader-ring-path" startOffset="0" textLength="284" lengthAdjust="spacing">
                      MASUK · PORTOFOLIO · MASUK · PORTOFOLIO ·
                    </textPath>
                  </text>
                </svg>
                <span className="loader__arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M13 6l6 6-6 6" />
                  </svg>
                </span>
              </span>
            </span>
            <span className="loader__hint">Klik di mana saja untuk masuk</span>
          </button>
          <p className="loader__foot" aria-hidden="true">
            <span>Portofolio</span>
            <span>Subang, Jawa Barat</span>
          </p>
        </>
      ) : (
        <div className="loader__wait" role="status" aria-live="polite">
          <span className="loader__eyebrow">Waffir Hasan Alkamiil</span>
          <span className="loader__status">
            <LatticeLoader
              label="Memuat"
              doneLabel="Siap"
              status={status}
              pattern="orbit"
              grid={3}
              shape="square"
              cellSize={9}
              gap={3}
              fontSize={15}
              color="#EEF3EF"
              doneColor="#3ED8A8"
              showTimer={false}
            />
          </span>
        </div>
      )}
    </div>
  )
}
