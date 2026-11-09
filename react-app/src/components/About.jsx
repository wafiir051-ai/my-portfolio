const FACTS = [
  ['Lokasi', 'Subang, Jawa Barat'],
  ['Sekolah', 'SMKIT Assyifa Boarding School, kelas 11'],
  ['Peran', 'Ketua Tim Robotika sekolah'],
  ['Fokus', 'Web, mobile, IoT'],
]

export default function About() {
  return (
    <section className="sec sec--paper" id="tentang" data-sc-act="flow">
      <div className="sc-wrap about">
        <div className="about__text" data-sc-in data-sc-stagger="70">
          <p className="label">Profil</p>
          <h2 className="display">Pelajar SMK yang sudah memegang proyek klien.</h2>
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
          {FACTS.map(([k, v]) => (
            <div className="facts__row" key={k}>
              <dt className="label">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
