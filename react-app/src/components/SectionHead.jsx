// Kepala bagian yang sama di semua seksi: label, judul, dan pengantar singkat.
export default function SectionHead({ label, title, intro, className = '' }) {
  return (
    <header className={`sechead ${className}`.trim()}>
      <p className="sechead__label">{label}</p>
      <h2 className="display">{title}</h2>
      {intro && <p className="sechead__intro">{intro}</p>}
    </header>
  )
}
