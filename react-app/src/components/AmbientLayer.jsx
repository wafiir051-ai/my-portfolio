import { useEffect, useRef } from 'react'

export default function AmbientLayer() {
  const containerRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !containerRef.current) return

    const rawEls = containerRef.current.querySelectorAll('.fly-el')
    const items = []
    rawEls.forEach(el => {
      items.push({
        el,
        spd: parseFloat(el.getAttribute('data-speed')) || 0.1,
        rot: parseFloat(el.getAttribute('data-rot')) || 0
      })
    })

    let lastY = window.scrollY
    let lastTime = performance.now()
    let currentVelocity = 0
    let targetVelocity = 0
    let rafId = null

    const onScroll = () => {
      const now = performance.now()
      const dt = Math.max(now - lastTime, 16)
      const sy = window.scrollY
      const dy = sy - lastY
      lastY = sy
      lastTime = now

      // Clamped velocity to prevent extreme glitching on super fast scroll
      const rawV = dy / dt
      targetVelocity = Math.max(Math.min(rawV, 2.5), -2.5)
    }

    const updatePhysics = () => {
      // Smooth decay of velocity towards 0
      currentVelocity += (targetVelocity - currentVelocity) * 0.15
      targetVelocity *= 0.85

      const sy = window.scrollY
      const absV = Math.abs(currentVelocity)
      const burstFactor = Math.min(absV * 8, 1)

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        // Modulo/clamped so elements stay comfortably within viewport
        const yOff = (sy * item.spd) % (window.innerHeight * 0.8)
        const xScatter = burstFactor * item.spd * 80
        const angle = (sy * item.rot) % 360
        const sc = 1 + burstFactor * 0.2 * Math.abs(item.spd)
        const op = Math.min(0.35 + burstFactor * 0.45, 0.9)

        item.el.style.transform = `translate3d(${xScatter.toFixed(1)}px, ${yOff.toFixed(1)}px, 0) rotate(${angle.toFixed(1)}deg) scale(${sc.toFixed(3)})`
        item.el.style.opacity = op.toFixed(2)
      }

      rafId = requestAnimationFrame(updatePhysics)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    rafId = requestAnimationFrame(updatePhysics)

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true })
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="ambient-tech-layer" id="ambientLayer" aria-hidden="true" ref={containerRef}>
      {/* Glowing Orbs */}
      <div className="fly-el fly-orb" style={{ '--sz': '5px', '--dur': '3.2s', '--glow': '8px', top: '8%', left: '6%' }} data-speed="0.15" data-rot="0.04" />
      <div className="fly-el fly-orb" style={{ '--sz': '8px', '--dur': '4.1s', '--glow': '14px', top: '22%', right: '9%' }} data-speed="-0.11" data-rot="-0.02" />
      <div className="fly-el fly-orb" style={{ '--sz': '4px', '--dur': '2.6s', '--glow': '6px', top: '48%', left: '3%' }} data-speed="0.18" data-rot="0.06" />
      <div className="fly-el fly-orb" style={{ '--sz': '7px', '--dur': '3.8s', '--glow': '12px', top: '65%', right: '5%' }} data-speed="-0.14" data-rot="0.03" />
      <div className="fly-el fly-orb" style={{ '--sz': '5px', '--dur': '3s', '--glow': '8px', top: '82%', left: '8%' }} data-speed="0.1" data-rot="-0.05" />
      <div className="fly-el fly-orb" style={{ '--sz': '6px', '--dur': '3.5s', '--glow': '10px', top: '35%', left: '50%' }} data-speed="-0.08" data-rot="0.07" />
      <div className="fly-el fly-orb" style={{ '--sz': '3px', '--dur': '2.8s', '--glow': '5px', top: '55%', right: '20%' }} data-speed="0.2" data-rot="-0.03" />

      {/* Hexagons */}
      <div className="fly-el fly-hex" style={{ '--sz': '32px', '--dur': '22s', top: '12%', right: '14%' }} data-speed="-0.07" data-rot="0.12" />
      <div className="fly-el fly-hex" style={{ '--sz': '20px', '--dur': '16s', top: '55%', left: '7%' }} data-speed="0.13" data-rot="-0.08" />
      <div className="fly-el fly-hex" style={{ '--sz': '26px', '--dur': '19s', top: '78%', right: '18%' }} data-speed="-0.1" data-rot="0.1" />
      <div className="fly-el fly-hex" style={{ '--sz': '18px', '--dur': '24s', top: '38%', left: '85%' }} data-speed="0.06" data-rot="-0.14" />

      {/* Diamonds */}
      <div className="fly-el fly-diamond" style={{ '--sz': '12px', '--dur': '4.5s', top: '18%', left: '22%' }} data-speed="0.16" data-rot="0.09" />
      <div className="fly-el fly-diamond" style={{ '--sz': '10px', '--dur': '5.5s', top: '42%', right: '12%' }} data-speed="-0.12" data-rot="-0.06" />
      <div className="fly-el fly-diamond" style={{ '--sz': '16px', '--dur': '6s', top: '72%', left: '15%' }} data-speed="0.09" data-rot="0.11" />
      <div className="fly-el fly-diamond" style={{ '--sz': '8px', '--dur': '4s', top: '90%', right: '30%' }} data-speed="-0.18" data-rot="-0.04" />

      {/* Code Brackets */}
      <div className="fly-el fly-bracket" style={{ '--sz': '1.6rem', '--dur': '7s', top: '15%', left: '82%' }} data-speed="-0.09" data-rot="0.05">&lt;/&gt;</div>
      <div className="fly-el fly-bracket" style={{ '--sz': '1.2rem', '--dur': '5.5s', top: '50%', left: '12%' }} data-speed="0.14" data-rot="-0.08">&#123; &#125;</div>
      <div className="fly-el fly-bracket" style={{ '--sz': '1.4rem', '--dur': '6.5s', top: '32%', right: '6%' }} data-speed="-0.16" data-rot="0.07">=&gt;</div>
      <div className="fly-el fly-bracket" style={{ '--sz': '1rem', '--dur': '5s', top: '85%', left: '42%' }} data-speed="0.11" data-rot="-0.1">( )</div>

      {/* Circuit Traces */}
      <div className="fly-el fly-trace" style={{ '--w': '80px', '--dur': '3.5s', top: '25%', left: '0%' }} data-speed="0.08" data-rot="0" />
      <div className="fly-el fly-trace" style={{ '--w': '55px', '--dur': '2.8s', top: '60%', right: '2%' }} data-speed="-0.13" data-rot="0" />
      <div className="fly-el fly-trace" style={{ '--w': '70px', '--dur': '4s', top: '45%', left: '25%' }} data-speed="0.06" data-rot="0" />
      <div className="fly-el fly-trace" style={{ '--w': '40px', '--dur': '3s', top: '75%', right: '22%' }} data-speed="-0.1" data-rot="0" />

      {/* Crosses / Plus */}
      <div className="fly-el fly-cross" style={{ '--sz': '16px', '--dur': '14s', top: '20%', left: '40%' }} data-speed="0.12" data-rot="0.15" />
      <div className="fly-el fly-cross" style={{ '--sz': '10px', '--dur': '10s', top: '58%', right: '35%' }} data-speed="-0.15" data-rot="-0.12" />
      <div className="fly-el fly-cross" style={{ '--sz': '12px', '--dur': '18s', top: '88%', left: '60%' }} data-speed="0.07" data-rot="0.09" />

      {/* Rings */}
      <div className="fly-el fly-ring" style={{ '--sz': '24px', '--dur': '4.2s', top: '30%', right: '28%' }} data-speed="-0.1" data-rot="0.06" />
      <div className="fly-el fly-ring" style={{ '--sz': '18px', '--dur': '3.6s', top: '68%', left: '28%' }} data-speed="0.17" data-rot="-0.09" />
      <div className="fly-el fly-ring" style={{ '--sz': '30px', '--dur': '5s', top: '10%', left: '55%' }} data-speed="-0.06" data-rot="0.11" />

      {/* Code Chips */}
      <div className="fly-el fly-chip" style={{ '--dur': '5.5s', top: '14%', left: '30%' }} data-speed="0.1" data-rot="0.03">flutter run</div>
      <div className="fly-el fly-chip" style={{ '--dur': '6s', top: '44%', right: '15%' }} data-speed="-0.13" data-rot="-0.05">npm deploy</div>
      <div className="fly-el fly-chip" style={{ '--dur': '4.5s', top: '74%', left: '55%' }} data-speed="0.15" data-rot="0.04">gpio.write()</div>
      <div className="fly-el fly-chip" style={{ '--dur': '5s', top: '92%', right: '40%' }} data-speed="-0.08" data-rot="-0.06">supabase.from</div>

      {/* Triangles */}
      <div className="fly-el fly-tri" style={{ '--sz': '10px', '--dur': '13s', top: '26%', left: '68%' }} data-speed="0.11" data-rot="0.08" />
      <div className="fly-el fly-tri" style={{ '--sz': '8px', '--dur': '16s', top: '52%', right: '45%' }} data-speed="-0.14" data-rot="-0.1" />
      <div className="fly-el fly-tri" style={{ '--sz': '12px', '--dur': '20s', top: '80%', left: '35%' }} data-speed="0.09" data-rot="0.13" />

      {/* Dot Clusters */}
      <div className="fly-el fly-dot-cluster" style={{ '--dur': '4s', top: '6%', right: '38%' }} data-speed="-0.12" data-rot="0"><span /><span /><span /></div>
      <div className="fly-el fly-dot-cluster" style={{ '--dur': '5s', top: '62%', left: '18%' }} data-speed="0.16" data-rot="0"><span /><span /><span /></div>
      <div className="fly-el fly-dot-cluster" style={{ '--dur': '3.8s', top: '40%', right: '50%' }} data-speed="-0.07" data-rot="0"><span /><span /><span /></div>
    </div>
  )
}
