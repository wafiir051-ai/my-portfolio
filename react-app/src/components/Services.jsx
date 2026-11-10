import { HugeiconsIcon } from '@hugeicons/react'
import { BrowserIcon, Layers01Icon, SmartPhone01Icon, CpuIcon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons'
import SectionHead from './SectionHead'

const SERVICES = [
  [BrowserIcon, 'Website dan landing page', 'Company profile, landing page, sampai toko online sederhana. Desain custom, cepat dibuka, nyaman dari HP maupun laptop.'],
  [Layers01Icon, 'Aplikasi web', 'Sistem dengan database: dashboard admin, manajemen internal, atau platform dengan login dan peran pengguna yang berbeda.'],
  [SmartPhone01Icon, 'Aplikasi mobile (Flutter)', 'Aplikasi Android dari desain sampai siap rilis di Play Store, lengkap dengan backend dan notifikasi.'],
  [CpuIcon, 'IoT dan prototipe hardware', 'Alat berbasis ESP32 atau Arduino yang terhubung ke sensor dan dashboard. Cocok untuk riset, tugas akhir, lomba, atau produk baru.'],
]

export default function Services() {
  return (
    <section className="sec sec--paper" id="layanan" data-sc-act="flow">
      <div className="sc-wrap">
        <SectionHead label="Layanan" title="Yang bisa saya kerjakan." intro="Klik salah satu untuk langsung membahasnya." />
        <div className="services" data-sc-in data-sc-stagger="70">
          {SERVICES.map(([icon, name, desc]) => (
            <a className="svc cursor-target" href="#kontak" data-cursor-label="Diskusi" key={name}>
              <span className="svc__icon">
                <HugeiconsIcon icon={icon} size={22} strokeWidth={1.6} />
              </span>
              <h3 className="svc__name">{name}</h3>
              <p className="svc__desc">{desc}</p>
              <span className="svc__go" aria-hidden="true">
                <HugeiconsIcon icon={ArrowUpRight01Icon} size={20} strokeWidth={1.8} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
