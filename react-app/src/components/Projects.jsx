import { useEffect, useMemo, useRef, useState } from 'react'
import FolderFloat from './reactbits/FolderFloat/FolderFloat'
import ProjectDiagram from './ProjectDiagram'
import { usePrefs } from '../hooks/usePrefs'
import { fetchProjects } from '../lib/projectsApi'

// Setiap proyek memakai skema label yang sama: jenis, stack, status, tautan.
const FALLBACK = [
  {
    title: 'Puspita Indah',
    shot: 'puspita-indah', caption: 'Beranda',
    jenis: 'Website bisnis',
    desc: 'Company profile lembaga pelatihan kerja di Gresik: tata rias, dekorasi, catering, tata busana. Ada galeri, peta lokasi, dan WhatsApp yang diarahkan ke beberapa CS.',
    stack: 'Proyek klien, Responsive, Multi-CS WhatsApp',
    status: 'Live',
    link: 'https://www.puspitaindah.com/',
  },
  {
    title: 'EduSpace',
    shot: 'eduspace', caption: 'Halaman login',
    jenis: 'Platform belajar',
    desc: 'LMS untuk SMKIT Assyifa Boarding School. Kuis interaktif layar penuh anti-curang, tiga peran (siswa, guru, admin), verifikasi akun lewat OTP email. Pernah dilombakan di TechnoFest.',
    stack: 'React, Supabase, Three.js',
    status: 'Live',
    link: 'https://eduspace-5pyozvspd-waffir-hasan-alkamiils-projects.vercel.app/login',
  },
  {
    title: 'Siroh Partner',
    shot: 'siroh-partner', caption: 'Beranda',
    jenis: 'Platform afiliasi',
    desc: 'Sistem afiliasi resmi Museum Siroh Nabawiyah: pelacakan referral, komisi otomatis, tier mitra, dan dashboard terpisah untuk admin dan mitra.',
    stack: 'React, Supabase, Vercel',
    status: 'Live',
    link: 'https://siroh-partner.vercel.app/',
  },
  {
    title: 'Batik Nusantara',
    shot: 'batik-nusantara', caption: 'Halaman sambutan',
    jenis: 'Edukasi interaktif',
    desc: 'Platform budaya batik: animasi dan studio membatik 3D, peta sentra pengrajin, galeri motif per daerah, tersedia dalam dua bahasa (ID dan EN).',
    stack: 'Web 3D, Dwibahasa, Interaktif',
    status: 'Live',
    link: 'https://batik-nusantara-01-72sh.vercel.app/Batik%20Nusantara.dc.html',
  },
  {
    title: 'Wali Santri',
    diagram: 'wali', caption: 'Peta fitur (diagram)',
    jenis: 'Aplikasi mobile',
    desc: 'Aplikasi Flutter untuk wali santri: memantau kehadiran, keuangan, pelanggaran, dan izin anak secara langsung. Login memakai NIS.',
    stack: 'Flutter, Supabase',
    status: 'Dalam pengembangan, segera ke Play Store',
  },
  {
    title: 'ECG Monitor',
    diagram: 'ecg', caption: 'Diagram alat (bukan foto)',
    jenis: 'IoT dan AI',
    desc: 'Pemantau detak jantung dari ESP32-S3 dan sensor AD8232. Mendeteksi denyut, mengklasifikasi ritme dengan model AI (9 kondisi), dan mencatat data langsung.',
    stack: 'ESP32, Python / FastAPI, Machine Learning',
    status: 'Proyek hardware, firmware mandiri',
  },
  {
    title: 'SIMAQ',
    shot: 'simaq', caption: 'Halaman login',
    jenis: 'Aplikasi web',
    desc: "Sistem Informasi Markas Qur'an: mencatat setoran hafalan santri dan membuat rapor tahfidz otomatis untuk musyrif dan ustadz.",
    stack: 'Web app, Tahfidz, Rapor otomatis',
    status: 'Live',
    link: 'https://simaq.vercel.app/',
  },
  {
    title: 'CORVUS',
    shot: 'corvus', caption: 'Beranda',
    jenis: 'E-commerce',
    desc: 'Toko dan website brand streetwear CORVUS: katalog dinamis, lookbook editorial, shopping bag, dan backend Supabase.',
    stack: 'Next.js, Supabase, Tailwind CSS',
    status: 'Live',
    link: 'https://officialcorvuscom.vercel.app/',
  },
  {
    title: 'Smart Sign Glove',
    diagram: 'glove', caption: 'Diagram alat (bukan foto)',
    jenis: 'IoT dan teknologi bantu',
    desc: 'Sarung tangan penerjemah gestur bahasa isyarat ke suara lewat speaker. Memakai sensor flex, IMU (akselerometer dan giroskop), dan ESP32.',
    stack: 'ESP32, Flex sensor, MPU6050, Modul audio',
    status: 'Dalam pengembangan, riset dan prototipe',
  },
]

// Gambar per judul, dipakai juga untuk proyek yang datang dari Supabase.
const MEDIA = Object.fromEntries(
  FALLBACK.map((p) => [p.title.toLowerCase(), { shot: p.shot, diagram: p.diagram, caption: p.caption }]),
)

const NUMBER_WORDS = ['Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas', 'Dua belas']

export default function Projects() {
  const { reduce, fine } = usePrefs()
  const [remote, setRemote] = useState(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetchProjects(ctrl.signal).then(setRemote, () => {})
    return () => ctrl.abort()
  }, [])

  const PROJECTS = useMemo(
    () => (remote ? remote.map((p) => ({ ...MEDIA[p.title.toLowerCase()], ...p })) : FALLBACK),
    [remote],
  )
  const actRef = useRef(null)
  const railRef = useRef(null)
  const plateRefs = useRef([])

  // Indeks folder melompat ke objek yang dipilih. Rak bergeser mengikuti scroll,
  // jadi posisi tujuan dihitung dari lebar rak dan tinggi scroll aktnya.
  const jumpTo = (title) => {
    const i = PROJECTS.findIndex((p) => p.title === title)
    const act = actRef.current
    const rail = railRef.current
    const plate = plateRefs.current[i]
    if (!act || !rail || !plate) return
    const overflow = rail.scrollWidth - window.innerWidth
    if (overflow <= 0) return
    const gutter = parseFloat(getComputedStyle(rail).paddingLeft) || 0
    const p = Math.min(1, Math.max(0, (plate.offsetLeft - gutter) / overflow))
    const top = act.getBoundingClientRect().top + window.scrollY
    const travel = act.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + p * travel, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section className="rack" id="proyek" ref={actRef} data-sc-act="pan" data-sc-span="5.5">
      <div className="sc-stage rack__stage" data-sc-stage>
        <div className="rack__rail" ref={railRef} data-sc-pan="0">
          <div className="rack__head">
            <div>
              <p className="label">Proyek</p>
              <h2 className="display">{NUMBER_WORDS[PROJECTS.length] || PROJECTS.length} proyek.</h2>
              <p className="body">Semuanya ditulis dengan label yang sama. Scroll untuk menggeser rak, atau pilih dari indeks.</p>
            </div>
            <div className="rack__folder">
              <FolderFloat
                items={PROJECTS.map((p) => p.title)}
                label="Indeks proyek"
                sublabel={`${PROJECTS.length} proyek`}
                trigger={fine ? 'hover' : 'click'}
                onSelect={(item) => jumpTo(typeof item === 'string' ? item : item.label)}
                folderColor="#17302a"
                frontColor="#244238"
                paperColor="#EEF3EF"
                itemColor="#EEF3EF"
                itemTextColor="#0B1814"
                labelColor="#EEF3EF"
                width={220}
                height={150}
                radius={6}
                spread={150}
                lift={30}
              />
            </div>
          </div>

          {PROJECTS.map((p, i) => (
            <article className="plate" key={p.title} ref={(el) => (plateRefs.current[i] = el)}>
              <p className="label">{p.jenis}</p>
              {(p.shot || p.diagram) && (
              <figure className="plate__media">
                {p.shot ? (
                  <div className="browser">
                    <div className="browser__bar" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <span>{p.link ? new URL(p.link).host : ''}</span>
                    </div>
                    <img
                      src={`/projects/${p.shot}.jpg`}
                      alt={`${p.caption} ${p.title}`}
                      width="1440"
                      height="900"
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                ) : (
                  <ProjectDiagram kind={p.diagram} />
                )}
                <figcaption className="label">{p.caption}</figcaption>
              </figure>
              )}
              <h3 className="plate__title">{p.title}</h3>
              <p className="plate__desc">{p.desc}</p>
              <dl className="plate__meta">
                <div>
                  <dt className="label">Stack</dt>
                  <dd>{p.stack}</dd>
                </div>
                <div>
                  <dt className="label">Status</dt>
                  <dd>{p.status}</dd>
                </div>
              </dl>
              {p.link ? (
                <a
                  className="plate__link cursor-target"
                  data-cursor-label="Buka"
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buka {p.title}
                  <span aria-hidden="true"> &rarr;</span>
                </a>
              ) : (
                <p className="plate__link plate__link--off">Belum dirilis</p>
              )}
            </article>
          ))}

          <div className="rack__tail">
            <p className="body">Proyek lain dan kode sumbernya ada di GitHub.</p>
            <a
              className="btn btn--line cursor-target"
              href="https://github.com/wafiir051-ai"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="GitHub"
            >
              Buka GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
