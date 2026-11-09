// Diagram untuk proyek yang belum punya foto atau tangkapan layar.
// Ini gambar skema, bukan foto alat dan bukan tangkapan layar aplikasi.
// Kalau fotonya sudah ada, taruh di public/projects/<slug>.jpg dan isi `shot` di Projects.jsx.

const Box = ({ x, y, w = 92, h = 52, lines, strong }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" className={strong ? 'dg-box dg-box--strong' : 'dg-box'} />
    {lines.map((t, i) => (
      <text key={t} x={x + w / 2} y={y + h / 2 + (i - (lines.length - 1) / 2) * 14 + 4} textAnchor="middle" className={i === 0 ? 'dg-t dg-t--main' : 'dg-t'}>
        {t}
      </text>
    ))}
  </g>
)

const Arrow = ({ x1, y1, x2, y2 }) => (
  <g className="dg-line">
    <line x1={x1} y1={y1} x2={x2 - 5} y2={y2} />
    <path d={`M${x2 - 7} ${y2 - 4} L${x2} ${y2} L${x2 - 7} ${y2 + 4}`} fill="none" />
  </g>
)

function Frame({ children, label }) {
  return (
    <svg className="dg" viewBox="0 0 480 270" role="img" aria-label={label}>
      {children}
    </svg>
  )
}

function Ecg() {
  return (
    <Frame label="Diagram alur ECG Monitor: elektroda, AD8232, ESP32-S3, model AI, data tercatat">
      <polyline className="dg-wave" points="20,60 60,60 72,60 80,36 88,78 96,60 140,60 152,60 160,26 170,92 178,60 220,60 232,60 240,40 248,72 256,60 300,60 312,60 320,30 330,86 338,60 380,60 392,60 400,44 408,70 416,60 460,60" />
      <Box x={14} y={150} lines={['Elektroda', 'dada']} />
      <Arrow x1={106} y1={176} x2={134} y2={176} />
      <Box x={134} y={150} lines={['AD8232', 'penguat']} />
      <Arrow x1={226} y1={176} x2={254} y2={176} />
      <Box x={254} y={150} lines={['ESP32-S3', 'firmware']} strong />
      <Arrow x1={346} y1={176} x2={374} y2={176} />
      <Box x={374} y={150} lines={['FastAPI', 'model AI']} />
      <text x="420" y="236" textAnchor="middle" className="dg-t">9 kondisi ritme</text>
      <line x1="420" y1="202" x2="420" y2="222" className="dg-line" />
    </Frame>
  )
}

function Glove() {
  return (
    <Frame label="Diagram Smart Sign Glove: sensor flex dan MPU6050 masuk ke ESP32, keluar lewat modul audio ke speaker">
      <Box x={14} y={44} lines={['Sensor flex', 'tiap jari']} />
      <Box x={14} y={150} lines={['MPU6050', 'akselerometer', 'giroskop']} h={64} />
      <Arrow x1={106} y1={70} x2={176} y2={124} />
      <Arrow x1={106} y1={182} x2={176} y2={142} />
      <Box x={176} y={104} lines={['ESP32', 'baca gestur']} strong h={60} />
      <Arrow x1={268} y1={134} x2={306} y2={134} />
      <Box x={306} y={108} w={78} lines={['Modul', 'audio']} />
      <Arrow x1={384} y1={134} x2={398} y2={134} />
      <g>
        <rect x="398" y="112" width="30" height="44" rx="4" className="dg-box" />
        <circle cx="413" cy="140" r="8" className="dg-box" />
        <circle cx="413" cy="124" r="3" className="dg-box" />
      </g>
      <text x="413" y="176" textAnchor="middle" className="dg-t">speaker</text>
    </Frame>
  )
}

function WaliSantri() {
  return (
    <Frame label="Peta fitur Wali Santri: kehadiran, keuangan, pelanggaran, izin, terhubung ke Supabase">
      <Box x={14} y={24} w={150} h={40} lines={['Kehadiran']} />
      <Box x={14} y={80} w={150} h={40} lines={['Keuangan']} />
      <Box x={14} y={136} w={150} h={40} lines={['Pelanggaran']} />
      <Box x={14} y={192} w={150} h={40} lines={['Izin anak']} />
      <g className="dg-line">
        <path d="M164 44 H200 V128 H236" fill="none" />
        <path d="M164 100 H200" fill="none" />
        <path d="M164 156 H200 V128" fill="none" />
        <path d="M164 212 H212 V128" fill="none" />
        <path d="M229 124 L236 128 L229 132" fill="none" />
      </g>
      <Box x={236} y={96} w={104} h={64} lines={['Aplikasi', 'Flutter']} strong />
      <Arrow x1={340} y1={128} x2={372} y2={128} />
      <Box x={372} y={102} w={96} h={52} lines={['Supabase', 'login NIS']} />
    </Frame>
  )
}

export default function ProjectDiagram({ kind }) {
  if (kind === 'ecg') return <Ecg />
  if (kind === 'glove') return <Glove />
  return <WaliSantri />
}
