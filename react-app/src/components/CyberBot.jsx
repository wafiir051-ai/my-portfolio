import { useState, useEffect, useRef } from 'react'

const sectionData = {
  top: {
    badge: '⚡ ASTRA BOT • ONLINE',
    text: 'Halo! Selamat datang di portofolio Waffir. Scroll ke bawah yuk! 🚀',
    expr: 'expr-happy',
    waving: true
  },
  tentang: {
    badge: '🤖 INFO DEVELOPER',
    text: 'Waffir adalah developer 16 tahun & Ketua Tim Robotika asal Subang! 🏆',
    expr: 'expr-normal',
    waving: false
  },
  skills: {
    badge: '⚙️ TECH STACK',
    text: 'Kombinasi Web, Mobile (Flutter) & IoT (ESP32) siap pakai! ⚡',
    expr: 'expr-scan',
    waving: false
  },
  proyek: {
    badge: '💻 PROJECT RADAR',
    text: 'Ini dia proyek-proyek live dari client, sekolah & riset IoT! 🌟',
    expr: 'expr-happy',
    waving: true
  },
  layanan: {
    badge: '🛠️ DEV SERVICES',
    text: 'Punya ide website, aplikasi atau alat IoT? Siap bantu garap! 💡',
    expr: 'expr-normal',
    waving: false
  },
  kontak: {
    badge: '📬 CONNECT NOW',
    text: 'Tertarik kerja sama? Kirim pesan via WhatsApp atau Email ya! ✨',
    expr: 'expr-happy',
    waving: true
  }
}

const easterEggs = [
  { badge: '⚡ ESP32 + FLUTTER', text: 'Kombo maut buat bikin aplikasi terhubung hardware pintar! 🤖', expr: 'expr-happy' },
  { badge: '☕ NGODING NIGHT', text: 'Fun fact: Waffir sering eksplor teknologi baru sampai tengah malam! 🌙', expr: 'expr-wink' },
  { badge: '🏆 ROBOTIKA SUBANG', text: 'Ketua Tim Robotika di SMKIT Assyifa Boarding School! 🦾', expr: 'expr-happy' },
  { badge: '🚀 READY TO DEPLOY', text: 'Website responsif, cepat, & terintegrasi database real-time! ⚡', expr: 'expr-scan' },
  { badge: '✨ TERIMA KASIH', text: 'Terima kasih sudah mampir! Yuk klik tombol kontak untuk kolaborasi! 💬', expr: 'expr-happy' }
]

export default function CyberBot() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [dialog, setDialog] = useState(sectionData.top)
  const [pctText, setPctText] = useState('0%')
  const [isSpinning, setIsSpinning] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  const botRef = useRef(null)
  const stageRef = useRef(null)
  const progressBarRef = useRef(null)
  const sparkBurstRef = useRef(null)

  const isManualRef = useRef(false)
  const manualTimerRef = useRef(null)
  const currentSectionRef = useRef('top')
  const eggIdxRef = useRef(0)

  // Scroll Progress and Physics Loop
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const circumference = 2 * Math.PI * 54 // r = 54
    if (progressBarRef.current) {
      progressBarRef.current.style.strokeDasharray = circumference.toFixed(2)
      progressBarRef.current.style.strokeDashoffset = circumference.toFixed(2)
    }

    let lastY = window.scrollY
    let lastTime = performance.now()
    let targetTilt = 0
    let currentTilt = 0
    let targetThrust = 1
    let currentThrust = 1
    let rafId = null

    const handleScroll = () => {
      const now = performance.now()
      const dt = Math.max(now - lastTime, 16)
      const sy = window.scrollY
      const dy = sy - lastY
      lastY = sy
      lastTime = now

      // Clamped velocity to eliminate fast-scroll physics explosion
      const rawV = dy / dt
      const velocity = Math.max(Math.min(rawV, 3), -3)

      const docH = document.documentElement.scrollHeight - window.innerHeight
      const pct = docH > 0 ? Math.min(Math.max(sy / docH, 0), 1) : 0
      const pctFormatted = Math.round(pct * 100)

      setPctText(`${pctFormatted}%`)
      if (progressBarRef.current) {
        const offset = circumference - pct * circumference
        progressBarRef.current.style.strokeDashoffset = offset.toFixed(2)
      }

      if (Math.abs(velocity) > 0.05) {
        targetTilt = Math.min(Math.max(velocity * 12, -18), 18)
        targetThrust = Math.min(1 + Math.abs(velocity) * 1.5, 2.5)
      } else {
        targetTilt = 0
        targetThrust = 1
      }
    }

    const physicsLoop = () => {
      currentTilt += (targetTilt - currentTilt) * 0.15
      currentThrust += (targetThrust - currentThrust) * 0.16

      // Quickly decay targetTilt and targetThrust when user stops scrolling
      targetTilt *= 0.9
      targetThrust = 1 + (targetThrust - 1) * 0.9

      if (stageRef.current && !reduceMotion) {
        stageRef.current.style.setProperty('--thrust-scale', currentThrust.toFixed(2))
        stageRef.current.style.setProperty('--thrust-width', (1 + (currentThrust - 1) * 0.3).toFixed(2))
        stageRef.current.style.transform = `rotate(${currentTilt.toFixed(2)}deg)`
      }

      rafId = requestAnimationFrame(physicsLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    rafId = requestAnimationFrame(physicsLoop)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Section Observer for Contextual Speech
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const triggerSection = (key) => {
      if (isManualRef.current || currentSectionRef.current === key) return
      currentSectionRef.current = key
      const data = sectionData[key] || sectionData.top

      setTextVisible(false)
      setTimeout(() => {
        setDialog(data)
        setTextVisible(true)
      }, 120)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id')
          if (id && sectionData[id]) {
            triggerSection(id)
          }
        }
      })
    }, { threshold: 0.25 })

    const targets = ['top', 'tentang', 'skills', 'proyek', 'layanan', 'kontak']
    targets.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Mouse eye tracking
  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsFinePointer || reduceMotion) return

    const handleMouseMove = (e) => {
      if (!botRef.current) return
      const rect = botRef.current.getBoundingClientRect()
      const botCenterX = rect.left + rect.width / 2
      const botCenterY = rect.top + rect.height / 2
      const dx = e.clientX - botCenterX
      const dy = e.clientY - botCenterY
      const maxDist = 450
      const lookX = Math.min(Math.max(dx / maxDist, -1), 1)
      const lookY = Math.min(Math.max(dy / maxDist, -1), 1)

      botRef.current.style.setProperty('--look-x', lookX.toFixed(3))
      botRef.current.style.setProperty('--look-y', lookY.toFixed(3))
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove, { passive: true })
  }, [])

  const handleBotClick = (e) => {
    e.stopPropagation()
    setIsCollapsed(false)

    // Trigger 360 spin animation
    setIsSpinning(true)
    setTimeout(() => setIsSpinning(false), 800)

    // Sparkle burst
    if (sparkBurstRef.current) {
      sparkBurstRef.current.innerHTML = ''
      sparkBurstRef.current.classList.add('active')
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement('div')
        spark.className = 'spark-particle'
        const angle = (i / 8) * Math.PI * 2
        const dist = 34 + Math.random() * 18
        spark.style.setProperty('--dx', `${(Math.cos(angle) * dist).toFixed(1)}px`)
        spark.style.setProperty('--dy', `${(Math.sin(angle) * dist).toFixed(1)}px`)
        sparkBurstRef.current.appendChild(spark)
      }
      setTimeout(() => {
        if (sparkBurstRef.current) sparkBurstRef.current.classList.remove('active')
      }, 700)
    }

    // Cycle easter eggs
    const egg = easterEggs[eggIdxRef.current % easterEggs.length]
    eggIdxRef.current++
    isManualRef.current = true
    clearTimeout(manualTimerRef.current)

    setTextVisible(false)
    setTimeout(() => {
      setDialog({
        badge: egg.badge,
        text: egg.text,
        expr: egg.expr,
        waving: true
      })
      setTextVisible(true)
    }, 120)

    manualTimerRef.current = setTimeout(() => {
      isManualRef.current = false
      const fallback = sectionData[currentSectionRef.current] || sectionData.top
      setDialog(fallback)
    }, 5500)
  }

  return (
    <div className="cyber-companion-wrap" id="cyberCompanionWrap">
      {/* Speech Bubble */}
      <div className={`bot-bubble ${isCollapsed ? 'is-collapsed' : ''}`} id="botBubble">
        <div className="bot-bubble-header">
          <span className="bot-badge" id="botBadge">{dialog.badge}</span>
          <button
            type="button"
            className="bot-close-btn"
            id="botCloseBtn"
            title="Tutup pesan"
            aria-label="Tutup pesan"
            onClick={(e) => {
              e.stopPropagation()
              setIsCollapsed(true)
            }}
          >
            ✕
          </button>
        </div>
        <div
          className="bot-bubble-text"
          id="botBubbleText"
          style={{ opacity: textVisible ? 1 : 0, transition: 'opacity 0.15s ease' }}
        >
          {dialog.text}
        </div>
        <div className="bot-bubble-footer">
          <span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>{' '}
            Scroll Progress
          </span>
          <span className="bot-pct-num" id="botPctNum">{pctText}</span>
        </div>
      </div>

      {/* Companion Character */}
      <div
        className={`cyber-companion ${dialog.expr} ${dialog.waving ? 'is-waving' : ''} ${isSpinning ? 'bot-spinning' : ''}`}
        id="cyberBot"
        ref={botRef}
        role="button"
        tabIndex="0"
        aria-label="Asisten Robotik Waffir, klik untuk interaksi"
        onClick={handleBotClick}
      >
        <button
          type="button"
          className="bot-bubble-toggle"
          id="botBubbleToggle"
          aria-label="Buka pesan robot"
          onClick={(e) => {
            e.stopPropagation()
            setIsCollapsed((prev) => !prev)
          }}
        >
          💬 Tanya Bot
        </button>

        {/* Circular Scroll Progress Ring */}
        <svg className="bot-progress-svg" viewBox="0 0 120 120" aria-hidden="true">
          <circle className="bot-progress-track" cx="60" cy="60" r="54" />
          <circle className="bot-progress-bar" id="botProgressBar" ref={progressBarRef} cx="60" cy="60" r="54" />
        </svg>

        {/* Orbiting Satellite */}
        <div className="bot-orb-orbit" aria-hidden="true">
          <div className="bot-orb" />
        </div>

        {/* Sparkle Burst Container */}
        <div className="bot-spark-burst" id="botSparkBurst" ref={sparkBurstRef} aria-hidden="true" />

        {/* Floating Robot Stage */}
        <div className="bot-float-stage" id="botFloatStage" ref={stageRef}>
          <svg className="bot-svg" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="botGradChassis" x1="24" y1="28" x2="96" y2="84" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#193B30" />
                <stop offset="50%" stopColor="#122A23" />
                <stop offset="100%" stopColor="#0B1A15" />
              </linearGradient>
              <linearGradient id="botGradBody" x1="40" y1="82" x2="80" y2="108" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1C4035" />
                <stop offset="100%" stopColor="#0E211A" />
              </linearGradient>
              <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#E6FFFA" />
                <stop offset="30%" stopColor="#3ED8A8" />
                <stop offset="85%" stopColor="rgba(62,216,168,0.3)" />
                <stop offset="100%" stopColor="rgba(62,216,168,0)" />
              </linearGradient>
              <filter id="eyeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Plasma Thrusters */}
            <g className="bot-thruster">
              <rect x="47" y="104" width="10" height="6" rx="2" fill="#0A1815" stroke="#264438" strokeWidth="1" />
              <rect x="63" y="104" width="10" height="6" rx="2" fill="#0A1815" stroke="#264438" strokeWidth="1" />
              <g className="thruster-flame">
                <path d="M 48 110 Q 52 134 52 136 Q 52 134 56 110 Z" fill="url(#plasmaGrad)" />
                <path d="M 50 110 Q 52 124 52 126 Q 52 124 54 110 Z" fill="#FFFFFF" opacity="0.9" />
                <path d="M 64 110 Q 68 134 68 136 Q 68 134 72 110 Z" fill="url(#plasmaGrad)" />
                <path d="M 66 110 Q 68 124 68 126 Q 68 124 70 110 Z" fill="#FFFFFF" opacity="0.9" />
              </g>
            </g>

            {/* Left Arm */}
            <g className="bot-hand-left">
              <rect x="14" y="78" width="12" height="15" rx="6" fill="#132A23" stroke="#3ED8A8" strokeWidth="1.2" />
              <circle cx="20" cy="85" r="2.5" fill="#3ED8A8" />
            </g>

            {/* Right Arm */}
            <g className="bot-hand-right">
              <rect x="94" y="78" width="12" height="15" rx="6" fill="#132A23" stroke="#3ED8A8" strokeWidth="1.2" />
              <circle cx="100" cy="85" r="2.5" fill="#3ED8A8" />
            </g>

            {/* Body */}
            <path d="M 40 82 Q 60 86 80 82 L 75 106 Q 60 110 45 106 Z" fill="url(#botGradBody)" stroke="rgba(62,216,168,0.4)" strokeWidth="1.5" />
            {/* Chest Core */}
            <circle cx="60" cy="94" r="5.5" fill="#132A23" stroke="#3ED8A8" strokeWidth="1.2" />
            <circle cx="60" cy="94" r="3.5" fill="#3ED8A8" filter="url(#eyeGlow)" />
            <circle cx="60" cy="94" r="1.5" fill="#E6FFFA" />

            {/* Antenna */}
            <line x1="60" y1="16" x2="60" y2="28" stroke="#3ED8A8" strokeWidth="2.5" strokeLinecap="round" />
            <circle className="bot-antenna-ring" cx="60" cy="16" r="6" stroke="#3ED8A8" strokeWidth="1.2" fill="none" />
            <circle className="bot-antenna-beacon" cx="60" cy="16" r="4.5" fill="#3ED8A8" />

            {/* Ear Pods */}
            <g>
              <rect x="19" y="44" width="7" height="24" rx="3.5" fill="#132A23" stroke="#264438" strokeWidth="1.2" />
              <rect className="bot-eq-bar" x="21" y="54" width="3" height="4" rx="1.5" />
              <rect x="94" y="44" width="7" height="24" rx="3.5" fill="#132A23" stroke="#264438" strokeWidth="1.2" />
              <rect className="bot-eq-bar" x="96" y="54" width="3" height="4" rx="1.5" />
            </g>

            {/* Helmet */}
            <rect x="25" y="28" width="70" height="54" rx="25" fill="url(#botGradChassis)" stroke="rgba(62,216,168,0.5)" strokeWidth="1.8" />
            <path d="M 38 34 Q 60 30 82 34" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Visor */}
            <rect className="bot-visor" x="33" y="38" width="54" height="36" rx="15" />

            {/* Eyes */}
            <g className="bot-eyes-wrap">
              {/* Left Eye */}
              <g className="eye-left">
                <g className="eye-shape-default bot-eye-core">
                  <circle cx="46" cy="55" r="6" fill="#3ED8A8" filter="url(#eyeGlow)" />
                  <circle className="pupil-left" cx="47" cy="54" r="2.4" fill="#0A1815" />
                  <circle cx="45" cy="53" r="1" fill="#FFFFFF" />
                </g>
                <path className="eye-shape-happy" d="M 40 58 Q 46 48 52 58" />
                <rect className="eye-shape-scan" x="40" y="53" width="12" height="4" rx="2" fill="#3ED8A8" filter="url(#eyeGlow)" />
              </g>

              {/* Right Eye */}
              <g className="eye-right">
                <g className="eye-shape-default bot-eye-core">
                  <circle cx="74" cy="55" r="6" fill="#3ED8A8" filter="url(#eyeGlow)" />
                  <circle className="pupil-right" cx="75" cy="54" r="2.4" fill="#0A1815" />
                  <circle cx="73" cy="53" r="1" fill="#FFFFFF" />
                </g>
                <path className="eye-shape-happy" d="M 68 58 Q 74 48 80 58" />
                <path className="eye-shape-wink" d="M 68 55 Q 74 61 80 55" />
                <rect className="eye-shape-scan" x="68" y="53" width="12" height="4" rx="2" fill="#3ED8A8" filter="url(#eyeGlow)" />
              </g>

              {/* Cheeks Blush */}
              <ellipse className="bot-blush" cx="38" cy="65" rx="3" ry="1.5" fill="#3ED8A8" opacity="0" />
              <ellipse className="bot-blush" cx="82" cy="65" rx="3" ry="1.5" fill="#3ED8A8" opacity="0" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
