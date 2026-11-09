import { useEffect, useRef, useState } from 'react'

const CHIPS = ['Siapa Waffir?', 'Proyek terbarunya?', 'Skill apa saja?', 'Cara kontak Waffir']

// Obrolan dengan Astra lewat /api/chat (fungsi Vercel di api/chat.js).
export default function AstraChat() {
  const [log, setLog] = useState([])
  const [busy, setBusy] = useState(false)
  const [value, setValue] = useState('')
  const logRef = useRef(null)
  const historyRef = useRef([])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log, busy])

  const ask = async (raw) => {
    const text = raw.trim()
    if (!text || busy) return
    setBusy(true)
    setValue('')
    setLog((l) => [...l, { role: 'user', text }])
    let reply
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyRef.current }),
      })
      const type = r.headers.get('content-type') || ''
      if (!type.includes('application/json')) {
        reply = 'Obrolan belum tersambung ke server (/api/chat tidak ditemukan).'
      } else {
        const data = await r.json()
        reply = data.reply || 'Maaf, coba lagi ya.'
        if (r.ok) historyRef.current.push({ role: 'user', text }, { role: 'bot', text: reply })
      }
    } catch {
      reply = 'Astra lagi offline, coba lagi nanti.'
    }
    setLog((l) => [...l, { role: 'bot', text: reply }])
    setBusy(false)
  }

  return (
    <div className="astra">
      {log.length > 0 && (
        <div className="astra__log" ref={logRef} aria-live="polite">
          {log.map((m, i) => (
            <p key={i} className={`astra__msg astra__msg--${m.role}`}>
              {m.text}
            </p>
          ))}
          {busy && <p className="astra__msg astra__msg--bot astra__typing">Astra mengetik...</p>}
        </div>
      )}
      {log.length === 0 && (
        <div className="astra__chips">
          {CHIPS.map((c) => (
            <button type="button" key={c} onClick={() => ask(c)}>
              {c}
            </button>
          ))}
        </div>
      )}
      <form
        className="astra__form"
        onSubmit={(e) => {
          e.preventDefault()
          ask(value)
        }}
        // Keyboard di kotak ini tidak boleh memicu pintasan halaman.
        onKeyDown={(e) => e.stopPropagation()}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={300}
          placeholder="Tanya Astra tentang Waffir"
          aria-label="Pesan untuk Astra"
          autoComplete="off"
        />
        <button type="submit" disabled={busy || !value.trim()} aria-label="Kirim pesan">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
      <p className="astra__note">Dijawab AI dari data portofolio ini. Bisa keliru.</p>
    </div>
  )
}
