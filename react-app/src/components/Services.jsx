export default function Services() {
  return (
    <section className="section section-alt" id="layanan">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Layanan</div>
          <h2>Yang bisa saya bantu kerjakan</h2>
        </div>
        <div className="services-grid">
          <div className="card service-card reveal">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <path d="M8 6L2 12L8 18M16 6L22 12L16 18" />
              </svg>
            </div>
            <h3>Website &amp; Landing Page</h3>
            <p>
              Company profile, landing page promosi, sampai toko online sederhana. Desain custom, cepat diakses, enak dilihat dari HP maupun laptop.
            </p>
          </div>
          <div className="card service-card reveal">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="8" height="8" rx="2" />
                <rect x="13" y="3" width="8" height="8" rx="2" />
                <rect x="3" y="13" width="8" height="8" rx="2" />
                <rect x="13" y="13" width="8" height="8" rx="2" />
              </svg>
            </div>
            <h3>Web Application</h3>
            <p>
              Sistem custom dengan database — dashboard admin, sistem manajemen internal, atau platform dengan login &amp; role pengguna berbeda-beda.
            </p>
          </div>
          <div className="card service-card reveal">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <rect x="7" y="2" width="10" height="20" rx="2" />
                <line x1="10" y1="18" x2="14" y2="18" />
              </svg>
            </div>
            <h3>Aplikasi Mobile (Flutter)</h3>
            <p>
              Aplikasi Android dari desain sampai siap rilis ke Play Store, lengkap dengan integrasi backend dan notifikasi.
            </p>
          </div>
          <div className="card service-card reveal">
            <div className="service-icon">
              <svg viewBox="0 0 24 24">
                <rect x="7" y="7" width="10" height="10" rx="2" />
                <line x1="12" y1="7" x2="12" y2="3" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="7" y1="12" x2="3" y2="12" />
                <line x1="17" y1="12" x2="21" y2="12" />
              </svg>
            </div>
            <h3>IoT &amp; Prototipe Hardware</h3>
            <p>
              Alat berbasis ESP32/Arduino yang terhubung ke sensor dan dashboard — cocok untuk riset, tugas akhir, lomba, atau produk baru.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
