import { useState, useEffect, useRef } from 'react'

export default function Hero() {
  const [roleText, setRoleText] = useState('Full-Stack Developer')
  const heroRef = useRef(null)
  const frameRef = useRef(null)

  // Typewriter effect
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setRoleText('Full-Stack Developer')
      return
    }

    const roles = ['Full-Stack Developer', 'Mobile App Developer (Flutter)', 'IoT & Hardware Engineer']
    let ri = 0
    let ci = 0
    let deleting = false
    let timer

    function tick() {
      const word = roles[ri]
      ci += deleting ? -1 : 1
      setRoleText(word.slice(0, ci))
      let delay = deleting ? 35 : 65

      if (!deleting && ci === word.length) {
        delay = 1500
        deleting = true
      } else if (deleting && ci === 0) {
        deleting = false
        ri = (ri + 1) % roles.length
        delay = 300
      }
      timer = setTimeout(tick, delay)
    }

    timer = setTimeout(tick, 500)
    return () => clearTimeout(timer)
  }, [])

  // Mouse tilt parallax on hero photo
  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reduceMotion) return

    const hero = heroRef.current
    const frame = frameRef.current
    if (!hero || !frame) return

    let rafId = null

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (frame) {
          frame.style.transform = `rotateY(${px * 18}deg) rotateX(${-py * 18}deg)`
        }
      })
    }

    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (frame) {
        frame.style.transform = 'rotateY(0deg) rotateX(0deg)'
      }
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="container" ref={heroRef}>
      <div className="hero-copy">
        <div className="status-pill">
          <span className="status-dot" aria-hidden="true" />
          Terbuka untuk proyek baru
        </div>
        <h1>
          Waffir Hasan
          <br />
          Alkamiil
        </h1>
        <p className="hero-role">
          <span id="heroRole">{roleText}</span>
          <span className="cursor" aria-hidden="true" />
        </p>
        <p className="lede">
          Saya membangun aplikasi web, mobile, dan perangkat IoT dari ide sampai jalan nyata — sudah dipakai sekolah, komunitas, dan klien bisnis. Pelajar SMK, 16 tahun, asal Subang, Jawa Barat.
        </p>
        <div className="hero-actions">
          <a href="#proyek" className="btn btn-primary">Lihat Proyek</a>
          <a href="#kontak" className="btn btn-outline">Hubungi Saya</a>
        </div>
        <div className="hero-tech">
          <span className="pill">React</span>
          <span className="pill">Next.js</span>
          <span className="pill">Flutter</span>
          <span className="pill">Supabase</span>
          <span className="pill">ESP32</span>
          <span className="pill">Vercel</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-photo-frame" ref={frameRef}>
          <img
            src="/malioboro.jpg"
            alt="Waffir Hasan Alkamiil di Jalan Malioboro, Yogyakarta"
            width="900"
            height="1200"
            fetchPriority="high"
            loading="eager"
          />
          <div className="hero-photo-caption">
            <span>
              <span className="status-dot" aria-hidden="true" style={{ display: 'inline-block', marginRight: '.4rem', verticalAlign: 'middle' }} />
              Waffir Hasan Alkamiil
            </span>
            <strong>Subang, ID</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
