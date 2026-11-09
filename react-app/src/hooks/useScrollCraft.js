import { useEffect } from 'react'
import '../lib/scrollcraft.js'

// Memasang mesin scroll-craft setelah DOM halaman ada. Mesin membaca atribut
// data-sc-* dan tidak membuat elemen sendiri.
export function useScrollCraft(ready) {
  useEffect(() => {
    const api = window.ScrollCraft.mount(document)
    const relayout = () => api.layout()
    window.addEventListener('load', relayout)
    document.fonts?.ready.then(relayout)
    return () => {
      window.removeEventListener('load', relayout)
      api.destroy()
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const t = setTimeout(() => window.ScrollCraft.instances.forEach((i) => i.layout()), 60)
    return () => clearTimeout(t)
  }, [ready])
}
