import { HugeiconsIcon } from '@hugeicons/react'
import { Location01Icon, School01Icon, UserGroupIcon, CodeIcon } from '@hugeicons/core-free-icons'
import SectionHead from './SectionHead'
import Achievements from './Achievements'

const FACTS = [
  [Location01Icon, 'Lokasi', 'Subang, Jawa Barat'],
  [School01Icon, 'Sekolah', 'SMKIT Assyifa Boarding School, kelas 11'],
  [UserGroupIcon, 'Peran', 'Ketua Tim Robotika dan Ketua Hadroh sekolah'],
  [CodeIcon, 'Fokus', 'Web, mobile, IoT'],
]

export default function About() {
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
            Saya juga memimpin Tim Robotika dan Hadroh di sekolah, dan ikut lomba teknologi sampai tingkat provinsi. Sekarang saya mulai
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
        </dl>
        <div className="about__awards">
          <Achievements />
        </div>
      </div>
    </section>
  )
}
