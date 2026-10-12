import { useEffect } from 'react'

export function useBotScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const heroVisualEl = document.querySelector('.hero-visual')
    let heroDepthTicking = false

    function updateHeroScrollDepth() {
      heroDepthTicking = false
      const vh = window.innerHeight
      if (heroVisualEl) {
        const sy = window.scrollY
        if (sy <= vh * 1.2) {
          const p = Math.min(Math.max(sy / vh, 0), 1)
          heroVisualEl.style.transform = `rotateX(${p * 26}deg) rotateZ(${p * -4}deg) translateY(${p * -46}px) scale(${1 - p * 0.1})`
          heroVisualEl.style.opacity = String(1 - p * 0.6)
        } else {
          heroVisualEl.style.transform = `rotateX(26deg) rotateZ(-4deg) translateY(-46px) scale(0.9)`
          heroVisualEl.style.opacity = '0.4'
        }
      }
    }

    function onScroll() {
      if (!heroDepthTicking) {
        requestAnimationFrame(updateHeroScrollDepth)
        heroDepthTicking = true
      }
    }

    if (!reduceMotion) {
      window.addEventListener('scroll', onScroll, { passive: true })
      updateHeroScrollDepth()
    }

    // Nav scrolled state
    const nav = document.getElementById('main-nav')
    function onNavScroll() {
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12)
    }
    window.addEventListener('scroll', onNavScroll, { passive: true })
    onNavScroll()

    // Active nav links
    const sections = document.querySelectorAll('main section[id]')
    const navLinks = document.querySelectorAll('#navLinks a[href^="#"]')
    let navObs = null
    if ('IntersectionObserver' in window && sections.length) {
      navObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + id))
          }
        })
      }, { rootMargin: '-40% 0px -50% 0px' })
      sections.forEach((s) => navObs.observe(s))
    }

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
      window.removeEventListener('scroll', onNavScroll, { passive: true })
      if (navObs) navObs.disconnect()
    }
  }, [])
}
