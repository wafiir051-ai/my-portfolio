import { useEffect, useRef } from 'react'

const projects = [
  {
    cat: 'Website Bisnis',
    title: 'Puspita Indah',
    desc: 'Company profile untuk lembaga pelatihan kerja di Gresik — program tata rias, dekorasi, catering, sampai tata busana. Lengkap dengan galeri kegiatan, peta lokasi, dan routing WhatsApp ke beberapa CS sekaligus.',
    tags: ['Client Project', 'Responsive', 'Multi-CS WhatsApp'],
    link: 'https://www.puspitaindah.com/'
  },
  {
    cat: 'Learning Platform',
    title: 'EduSpace',
    desc: 'LMS untuk SMKIT Assyifa Boarding School — kuis interaktif dengan mode fullscreen anti-cheat, tiga peran pengguna (siswa/guru/admin), dan verifikasi akun via OTP email. Sempat dilombakan di TechnoFest.',
    tags: ['React', 'Supabase', 'Three.js'],
    link: 'https://eduspace-5pyozvspd-waffir-hasan-alkamiils-projects.vercel.app/login'
  },
  {
    cat: 'Affiliate Platform',
    title: 'Siroh Partner',
    desc: 'Sistem afiliasi resmi Museum Siroh Nabawiyah — tracking referral, kalkulasi komisi otomatis, tier partner berjenjang, dan dashboard terpisah untuk admin & mitra.',
    tags: ['React', 'Supabase', 'Vercel'],
    link: 'https://siroh-partner.vercel.app/'
  },
  {
    cat: 'Edukasi Interaktif',
    title: 'Batik Nusantara',
    desc: 'Platform edukasi budaya seputar batik Nusantara — animasi & studio membatik 3D, peta persebaran sentra pengrajin, galeri motif per daerah, dan versi dwibahasa (ID/EN).',
    tags: ['3D Web', 'Bilingual', 'Interactive'],
    link: 'https://batik-nusantara-01-72sh.vercel.app/Batik%20Nusantara.dc.html'
  },
  {
    cat: 'Mobile App',
    title: 'Wali Santri',
    desc: 'Aplikasi Flutter untuk wali santri pondok pesantren — pantau kehadiran, keuangan, pelanggaran, dan izin anak secara real-time, dengan login khusus memakai NIS.',
    tags: ['Flutter', 'Supabase'],
    status: 'Dalam pengembangan — segera di Play Store'
  },
  {
    cat: 'IoT + AI',
    title: 'ECG Monitor',
    desc: 'Alat pemantau detak jantung berbasis ESP32-S3 dan sensor AD8232 — deteksi denyut otomatis, klasifikasi ritme jantung memakai model AI (9 kondisi), dan pencatatan data real-time.',
    tags: ['ESP32', 'Python / FastAPI', 'Machine Learning'],
    status: 'Proyek hardware — firmware standalone'
  },
  {
    cat: 'Web App',
    title: 'SIMAQ',
    desc: 'Sistem Informasi Markas Qur\'an — platform untuk mencatat setoran hafalan santri dan menghasilkan rapor tahfidz secara otomatis, memudahkan musyrif/ustadz memantau perkembangan hafalan tiap santri.',
    tags: ['Web App', 'Tahfidz', 'Rapor Otomatis'],
    link: 'https://simaq.vercel.app/'
  }
]

export default function Projects() {
  const gridRef = useRef(null)

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!supportsHover || reduceMotion || !gridRef.current) return

    const cards = gridRef.current.querySelectorAll('.project-card')

    cards.forEach((card) => {
      let rafId = null

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const px = x / rect.width
        const py = y / rect.height
        const rotateY = ((x - cx) / cx) * 12
        const rotateX = -((y - cy) / cy) * 12

        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) translateZ(24px) scale(1.02)`
          card.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`)
          card.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`)
          card.style.setProperty('--glow-opacity', '1')
        })
      }

      const handleLeave = () => {
        if (rafId) cancelAnimationFrame(rafId)
        card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0) translateZ(0) scale(1)'
        card.style.setProperty('--glow-opacity', '0')
      }

      card.addEventListener('mousemove', handleMove)
      card.addEventListener('mouseleave', handleLeave)
    })
  }, [])

  return (
    <section className="section" id="proyek">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Proyek</div>
          <h2>Proyek yang sudah live</h2>
          <p>Sebagian proyek yang sudah saya kerjakan — dari website klien, sistem sekolah, sampai eksperimen hardware.</p>
        </div>
        <div className="projects-grid" ref={gridRef}>
          {projects.map((p, idx) => (
            <div key={idx} className="card project-card reveal">
              <div className="cat">{p.cat}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((tag, tIdx) => (
                  <span key={tIdx}>{tag}</span>
                ))}
              </div>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  Lihat Live{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              ) : (
                <div className="project-status">{p.status}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
