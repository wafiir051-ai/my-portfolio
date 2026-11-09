import { useEffect, useState } from 'react'

const REDUCE = '(prefers-reduced-motion: reduce)'
const FINE = '(hover: hover) and (pointer: fine)'
const NARROW = '(max-width: 860px)'

const read = () => ({
  reduce: window.matchMedia(REDUCE).matches,
  fine: window.matchMedia(FINE).matches,
  narrow: window.matchMedia(NARROW).matches,
})

export function usePrefs() {
  const [prefs, setPrefs] = useState(read)

  useEffect(() => {
    const lists = [REDUCE, FINE, NARROW].map((q) => window.matchMedia(q))
    const update = () => setPrefs(read())
    lists.forEach((l) => l.addEventListener('change', update))
    return () => lists.forEach((l) => l.removeEventListener('change', update))
  }, [])

  return prefs
}

export function useFontsReady() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let live = true
    const done = () => live && setReady(true)
    if (!document.fonts) return done()
    Promise.all([
      document.fonts.load('900 100px Archivo'),
      document.fonts.load('400 16px Geist'),
    ]).then(done, done)
    const guard = setTimeout(done, 3000)
    return () => {
      live = false
      clearTimeout(guard)
    }
  }, [])

  return ready
}
