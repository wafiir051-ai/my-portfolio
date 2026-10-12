import { useEffect } from 'react'

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
