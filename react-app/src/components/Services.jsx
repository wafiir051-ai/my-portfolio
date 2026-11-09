const SERVICES = [
  ['Website dan landing page', 'Company profile, landing page, sampai toko online sederhana. Desain custom, cepat dibuka, nyaman dari HP maupun laptop.'],
  ['Aplikasi web', 'Sistem dengan database: dashboard admin, manajemen internal, atau platform dengan login dan peran pengguna yang berbeda.'],
  ['Aplikasi mobile (Flutter)', 'Aplikasi Android dari desain sampai siap rilis di Play Store, lengkap dengan backend dan notifikasi.'],
  ['IoT dan prototipe hardware', 'Alat berbasis ESP32 atau Arduino yang terhubung ke sensor dan dashboard. Cocok untuk riset, tugas akhir, lomba, atau produk baru.'],
]

export default function Services() {
  return (
    <section className="sec sec--paper" id="layanan" data-sc-act="flow">
      <div className="sc-wrap">
        <div className="services__head" data-sc-in>
          <h2 className="display">Yang bisa saya kerjakan.</h2>
        </div>
        <div className="services" data-sc-in data-sc-stagger="70">
          {SERVICES.map(([name, desc]) => (
            <div className="svc" key={name}>
              <h3 className="svc__name">{name}</h3>
              <p className="svc__desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
