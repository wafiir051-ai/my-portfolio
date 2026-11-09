import { useEffect, useState } from 'react'
import LatticeLoader from './reactbits/LatticeLoader/LatticeLoader'

const KEY = 'wha-seen'

const alreadySeen = () => {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export default function Loader({ onDone }) {
  const [skip] = useState(alreadySeen)
  const [status, setStatus] = useState('working')
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(skip)

  useEffect(() => {
    if (skip) {
      onDone()
      return
    }
    const root = document.documentElement
    root.classList.add('is-loading')

    let live = true
    const timers = []
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)))
    const loaded = new Promise((r) => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', r, { once: true })
    })
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve()

    Promise.all([Promise.race([Promise.all([loaded, fonts]), wait(4000)]), wait(1100)])
      .then(() => {
        if (!live) return
        setStatus('done')
        return wait(500)
      })
      .then(() => {
        if (!live) return
        setLeaving(true)
        root.classList.remove('is-loading')
        try {
          sessionStorage.setItem(KEY, '1')
        } catch {
          /* private mode */
        }
        onDone()
        return wait(450)
      })
      .then(() => live && setGone(true))

    return () => {
      live = false
      timers.forEach(clearTimeout)
      root.classList.remove('is-loading')
    }
  }, [skip, onDone])

  if (gone) return null

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <LatticeLoader
        label="Menyiapkan halaman"
        doneLabel="Siap"
        status={status}
        pattern="orbit"
        grid={3}
        shape="square"
        cellSize={8}
        gap={3}
        fontSize={14}
        color="#EEF3EF"
        doneColor="#3ED8A8"
        showTimer={false}
      />
    </div>
  )
}
