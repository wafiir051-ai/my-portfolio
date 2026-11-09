import { useEffect, useState } from 'react'
import FluxLines from './reactbits/FluxLines/FluxLines'
import TechText from './reactbits/TechText/TechText'
import ProfileCard from './reactbits/ProfileCard/ProfileCard'
import { useFontsReady, usePrefs } from '../hooks/usePrefs'

const ROLES = ['Full-Stack Developer', 'Mobile Developer (Flutter)', 'IoT & Hardware Engineer']

function useTypewriter(enabled) {
  const [text, setText] = useState(ROLES[0])

  useEffect(() => {
    if (!enabled) return
    let ri = 0
    let ci = 0
    let deleting = false
    let timer
    const tick = () => {
      const word = ROLES[ri]
      ci += deleting ? -1 : 1
      setText(word.slice(0, ci))
      let delay = deleting ? 35 : 65
      if (!deleting && ci === word.length) {
        delay = 1600
        deleting = true
      } else if (deleting && ci === 0) {
        deleting = false
        ri = (ri + 1) % ROLES.length
        delay = 300
      }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 1800)
    return () => clearTimeout(timer)
  }, [enabled])

  return text
}

export default function Hero() {
  const { reduce, narrow } = usePrefs()
  const fontsReady = useFontsReady()
  const role = useTypewriter(!reduce)

  const toContact = () =>
    document.getElementById('kontak')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })

  return (
    <header className="hero" id="top" data-sc-act="flow">
      {/* Lapisan 0: latar. Bergerak paling pelan. */}
      {!reduce && (
        <div className="hero__flux" data-sc-parallax="0.9" aria-hidden="true">
          <FluxLines
            colors={['#3ED8A8', '#1F8F70', '#0E4A3A']}
            speed={0.3}
            scale={1.4}
            transparent={false}
            backgroundColor="#0B1814"
            opacity={0.7}
            glow={0.4}
            shimmer={0.3}
            sharpness={3.5}
            lineWidth={0.8}
            mouseStrength={0.8}
          />
        </div>
      )}

      {/* Lapisan 1: kata besar, di belakang kartu dan di depan latar. */}
      <div className="hero__mark" data-sc-parallax="-1.6" aria-hidden="true">
        {fontsReady && (
          <TechText
            text="WAFFIR"
            fontFamily="Archivo, system-ui, sans-serif"
            fontWeight={900}
            letterSpacing={-0.04}
            color="#EEF3EF"
            accentColor="#3ED8A8"
            align={narrow ? 'center' : 'left'}
            labels={!narrow}
            specks={narrow ? 6 : 15}
            reach={narrow ? 120 : 200}
          />
        )}
      </div>
      <h1 className="sr-only">Waffir Hasan Alkamiil</h1>

      {/* Lapisan 2: kartu. Memotong kata besar, jadi kedalamannya terbaca. */}
      <div className="hero__card" data-sc-parallax="0.5">
        <ProfileCard
          avatarUrl="/malioboro.jpg"
          name="Waffir Hasan Alkamiil"
          title="Full-Stack & IoT Developer"
          handle="wafiir051-ai"
          status="Terbuka untuk proyek"
          statusColor="#3ED8A8"
          contactText="Hubungi"
          onContactClick={toContact}
          backdropColor="#11241E"
          radius={6}
          enableTilt={!reduce}
          holo={0.55}
          glare={0.35}
        />
      </div>

      {/* Lapisan 3: teks. Tidak ikut bergerak supaya tetap terbaca. */}
      <div className="hero__copy">
        <p className="label">Subang, Jawa Barat</p>
        <p className="hero__role" aria-label="Peran">
          <span>{role}</span>
          <span className="caret" aria-hidden="true" />
        </p>
        <p className="hero__lede">
          Saya membuat web app, aplikasi Flutter, dan alat IoT. Beberapa sudah dipakai sekolah dan klien.
        </p>
        <div className="hero__actions">
          <a href="#proyek" className="btn btn--primary cursor-target" data-cursor-label="Proyek">
            Lihat proyek
          </a>
          <a href="#kontak" className="btn btn--line cursor-target" data-cursor-label="Kontak">
            Hubungi saya
          </a>
        </div>
      </div>
      <ul className="hero__stack" aria-label="Alat utama">
        {['React', 'Next.js', 'Flutter', 'Supabase', 'ESP32', 'Vercel'].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </header>
  )
}
