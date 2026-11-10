import { useEffect, useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  Location01Icon,
  School01Icon,
  UserGroupIcon,
  CodeIcon,
  Award01Icon,
  Book01Icon,
  StarIcon,
  Briefcase01Icon,
  Calendar01Icon,
  Mortarboard01Icon,
} from '@hugeicons/core-free-icons'
import SectionHead from './SectionHead'
import Achievements from './Achievements'
import { fetchProfileFacts } from '../lib/projectsApi'

// Nama ikon yang bisa dipilih di admin.
const ICONS = {
  lokasi: Location01Icon,
  sekolah: School01Icon,
  grup: UserGroupIcon,
  kode: CodeIcon,
  piala: Award01Icon,
  buku: Book01Icon,
  bintang: StarIcon,
  kerja: Briefcase01Icon,
  tanggal: Calendar01Icon,
  topi: Mortarboard01Icon,
}

// Dipakai selama tabel profile_facts kosong atau belum dibuat.
const FALLBACK = [
  { id: 'lokasi', icon: 'lokasi', label: 'Lokasi', value: 'Subang, Jawa Barat' },
  { id: 'sekolah', icon: 'sekolah', label: 'Sekolah', value: 'SMKIT Assyifa Boarding School, kelas 11' },
  { id: 'peran', icon: 'grup', label: 'Peran', value: 'Ketua IT Club dan Ketua Hadroh sekolah' },
  { id: 'organisasi', icon: 'grup', label: 'Organisasi', value: 'Pernah jadi OSIS divisi kebersihan, SMPIT Insan Mandiri Greenville' },
  { id: 'kepanitiaan', icon: 'grup', label: 'Kepanitiaan', value: 'Pernah jadi anggota Danus (Dana Usaha) di acara Asfera, Assyiffa Festival Raya' },
  { id: 'fokus', icon: 'kode', label: 'Fokus', value: 'Web, mobile, IoT' },
]

export default function About() {
  const [facts, setFacts] = useState(FALLBACK)

  useEffect(() => {
    const ctrl = new AbortController()
    fetchProfileFacts(ctrl.signal).then((rows) => rows && setFacts(rows), () => {})
    return () => ctrl.abort()
  }, [])

  return (
    <section className="sec sec--paper" id="tentang" data-sc-act="flow">
      <div className="drip drip--dark" aria-hidden="true" />
      <div className="sc-wrap about">
        <SectionHead label="Profil" title="Pelajar SMK yang sudah memegang proyek klien." />
        <div className="about__copy" data-sc-in data-sc-stagger="70">
          <p className="body">
            Saya Waffir, pelajar SMK asal Subang, Jawa Barat. Selama sekolah saya mengerjakan website bisnis untuk
            klien, sistem informasi sekolah, platform afiliasi, dan alat IoT berbasis ESP32.
          </p>
          <p className="body">
            Saya juga memimpin IT Club sekolah (divisi cyber security, game dev, web dev, dan robotika) dan Hadroh, serta pernah ikut LKS sampai tingkat kabupaten. Sekarang saya mulai
            menerima proyek lepas, dari website sampai alat IoT, dan menemani sampai selesai.
          </p>
        </div>
        <dl className="facts" data-sc-in data-sc-stagger="60">
          {facts.map((f) => (
            <div className="facts__tile" key={f.id}>
              <span className="facts__icon">
                <HugeiconsIcon icon={ICONS[f.icon] || UserGroupIcon} size={20} strokeWidth={1.7} />
              </span>
              <dt className="label">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
        <div className="about__awards">
          <Achievements />
        </div>
      </div>
    </section>
  )
}
