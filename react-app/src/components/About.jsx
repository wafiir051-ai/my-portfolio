import { HugeiconsIcon } from '@hugeicons/react'
import { Location01Icon, School01Icon, UserGroupIcon, CodeIcon, TrophyIcon } from '@hugeicons/core-free-icons'
import SectionHead from './SectionHead'

const FACTS = [
  [Location01Icon, 'Lokasi', 'Subang, Jawa Barat'],
  [School01Icon, 'Sekolah', 'SMKIT Assyifa Boarding School, kelas 11'],
  [UserGroupIcon, 'Peran', 'Ketua Tim Robotika sekolah'],
  [CodeIcon, 'Fokus', 'Web, mobile, IoT'],
]

const AWARD = {
  title: 'Terbaik 1 Festival Hadroh BAF (Buahati Annual Fest) tingkat Jabodetabek',
  note: 'Bersama Tim Hadroh SMPIT Insan Mandiri Greenville',
}

export default function About() {
  return (
    <section className="sec sec--paper" id="tentang" data-sc-act="flow">
      <div className="sc-wrap about">
        <SectionHead label="Profil" title="Pelajar SMK yang sudah memegang proyek klien." />
        <div className="about__copy" data-sc-in data-sc-stagger="70">
          <p className="body">
            Saya Waffir, pelajar SMK asal Subang, Jawa Barat. Selama sekolah saya mengerjakan website bisnis untuk
            klien, sistem informasi sekolah, platform afiliasi, dan alat IoT berbasis ESP32.
          </p>
          <p className="body">
            Saya juga memimpin Tim Robotika di sekolah dan ikut lomba teknologi tingkat daerah. Sekarang saya mulai
            menerima proyek lepas, dari website sampai alat IoT, dan menemani sampai selesai.
          </p>
        </div>
        <dl className="facts" data-sc-in data-sc-stagger="60">
          {FACTS.map(([icon, k, v]) => (
            <div className="facts__tile" key={k}>
              <span className="facts__icon">
                <HugeiconsIcon icon={icon} size={20} strokeWidth={1.7} />
              </span>
              <dt className="label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
          <div className="facts__tile facts__tile--award">
            <span className="facts__icon">
              <HugeiconsIcon icon={TrophyIcon} size={20} strokeWidth={1.7} />
            </span>
            <div className="facts__award">
              <dt className="label">Prestasi</dt>
              <dd>{AWARD.title}</dd>
              <p className="facts__note">{AWARD.note}</p>
            </div>
          </div>
        </dl>
      </div>
    </section>
  )
}
