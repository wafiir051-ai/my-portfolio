import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { TrophyIcon, Cancel01Icon } from '@hugeicons/core-free-icons'
import { fetchAchievements } from '../lib/projectsApi'

// Cadangan kalau Supabase belum terjangkau atau tabel prestasi masih kosong.
const FALLBACK = [
  {
    id: 'hadroh-baf-2025',
    title: 'Terbaik 1 Festival Hadroh BAF (Buahati Annual Fest) tingkat Jabodetabek',
    note: 'Saat kelas 9, bersama Tim Hadroh SMPIT Insan Mandiri Greenville',
    year: 2025,
    image: '/prestasi/hadroh-baf-2025.webp',
  },
  {
    id: 'lks-jabar-2026',
    title: 'Peserta LKS Tingkat Provinsi Jawa Barat 2026, bidang Robot Bergerak Otonom',
    note: 'Mewakili Kab. Subang, 10 sampai 11 Juni 2026 di SMK Negeri 1 Karawang',
    year: 2026,
    image: '/prestasi/lks-jabar-2026.jpg',
  },
]

export default function Achievements() {
  const [items, setItems] = useState(FALLBACK)
  const [open, setOpen] = useState(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const ctrl = new AbortController()
    fetchAchievements(ctrl.signal).then((rows) => rows && setItems(rows), () => {})
    return () => ctrl.abort()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="awards" data-sc-in data-sc-stagger="70">
      {items.map((a) => (
        <article className="award" key={a.id}>
          {a.image && (
            <button type="button" className="award__media cursor-target" data-cursor-label="Perbesar" onClick={() => setOpen(a)} aria-label={`Perbesar gambar: ${a.title}`}>
              <img src={a.image} alt={`Bukti prestasi: ${a.title}`} loading="lazy" draggable="false" />
            </button>
          )}
          <div className="award__body">
            <p className="award__label">
              <HugeiconsIcon icon={TrophyIcon} size={18} strokeWidth={1.8} />
              Prestasi{a.year ? ` ${a.year}` : ''}
            </p>
            <h3 className="award__title">{a.title}</h3>
            {a.note && <p className="award__note">{a.note}</p>}
          </div>
        </article>
      ))}

      {open &&
        createPortal(
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.title} onClick={() => setOpen(null)}>
            <button type="button" ref={closeRef} className="lightbox__close" onClick={() => setOpen(null)} aria-label="Tutup gambar">
              <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
            </button>
            <img src={open.image} alt={`Bukti prestasi: ${open.title}`} onClick={(e) => e.stopPropagation()} />
          </div>,
          document.body,
        )}
    </div>
  )
}
