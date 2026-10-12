export default function About() {
  return (
    <section className="section" id="tentang">
      <div className="container about-grid">
        <div className="reveal" data-reveal="left">
          <div className="eyebrow">Tentang</div>
          <h2>Developer 16 tahun, sudah pegang proyek nyata</h2>
          <p>
            Saya Waffir — developer sekaligus pelajar SMK asal Subang, Jawa Barat. Sejak duduk di bangku SMK, saya sudah menyelesaikan lebih dari selusin proyek nyata: dari website bisnis untuk klien, sistem informasi sekolah, platform afiliasi, sampai alat IoT berbasis ESP32. Saya juga memimpin Tim Robotika di sekolah dan aktif ikut kompetisi teknologi tingkat daerah.
          </p>
          <p style={{ marginTop: '1rem' }}>
            Sekarang saya sedang serius membangun karier sebagai developer lepas. Kalau kamu punya proyek yang perlu dikerjakan — website, aplikasi, atau alat IoT — saya siap bantu dari awal sampai selesai.
          </p>
        </div>
        <div className="card fact-list reveal" data-reveal="right">
          <div className="fact-row">
            <span>Lokasi</span>
            <strong>Subang, Jawa Barat</strong>
          </div>
          <div className="fact-row">
            <span>Pendidikan</span>
            <strong>SMKIT Assyifa Boarding School — Kelas 11</strong>
          </div>
          <div className="fact-row">
            <span>Peran</span>
            <strong>Ketua Tim Robotika Sekolah</strong>
          </div>
          <div className="fact-row">
            <span>Fokus</span>
            <strong>Web · Mobile · IoT</strong>
          </div>
        </div>
      </div>
    </section>
  )
}
