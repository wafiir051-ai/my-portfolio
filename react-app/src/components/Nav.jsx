import { useEffect, useRef, useState } from 'react'
import {
  UserIcon,
  CodeIcon,
  Folder01Icon,
  Wrench01Icon,
  WhatsappIcon,
  Mail01Icon,
  GithubIcon,
} from '@hugeicons/core-free-icons'
import GooeyNav from './reactbits/GooeyNav/GooeyNav'
import BranchedMenu from './reactbits/BranchedMenu/BranchedMenu'
import { usePrefs } from '../hooks/usePrefs'

const SECTIONS = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'skills', label: 'Stack' },
  { id: 'proyek', label: 'Proyek' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'kontak', label: 'Kontak' },
]

const WA = 'https://wa.me/6281219135378'
const MAIL = 'mailto:waffir.hasan25@smk.belajar.id'
const GH = 'https://github.com/wafiir051-ai'

const MENU = [
  {
    label: 'Halaman',
    children: [
      { value: '#tentang', label: 'Tentang', icon: UserIcon },
      { value: '#skills', label: 'Stack', icon: CodeIcon },
      { value: '#proyek', label: 'Proyek', icon: Folder01Icon },
      { value: '#layanan', label: 'Layanan', icon: Wrench01Icon },
    ],
  },
  {
    label: 'Hubungi',
    children: [
      { value: WA, label: 'WhatsApp', icon: WhatsappIcon },
      { value: MAIL, label: 'Email', icon: Mail01Icon },
      { value: GH, label: 'GitHub', icon: GithubIcon },
    ],
  },
]

export default function Nav() {
  const { narrow, reduce } = usePrefs()
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const sheetRef = useRef(null)

  // Penanda aktif mengikuti bagian yang sedang dibaca. Indeks baru hanya
  // dikirim setelah scroll berhenti: GooeyNav salah mendarat kalau indeksnya
  // berganti beruntun selagi halaman masih bergerak melewati beberapa bagian.
  useEffect(() => {
    let timer
    const read = () => {
      const line = window.innerHeight * 0.45
      let next = 0
      SECTIONS.forEach((sec, i) => {
        const el = document.getElementById(sec.id)
        if (el && el.getBoundingClientRect().top <= line) next = i
      })
      setActive(next)
    }
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(read, 180)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    read()
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onDown = (e) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const go = (value) => {
    setOpen(false)
    if (value.startsWith('#')) {
      document.querySelector(value)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
    } else if (value.startsWith('mailto:')) {
      window.location.href = value
    } else {
      window.open(value, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <header className="topbar" ref={sheetRef}>
      <a href="#top" className="topbar__mark cursor-target" aria-label="Kembali ke atas">
        WHA
      </a>

      {!narrow && (
        <nav className="topbar__nav" aria-label="Utama">
          <GooeyNav
            items={SECTIONS.map((s) => ({ label: s.label, href: `#${s.id}` }))}
            activeIndex={active}
            onChange={setActive}
            theme="dark"
            colors={['#3ED8A8', '#EEF3EF']}
            color="#3ED8A8"
            activeTextColor="#04211A"
            size="md"
          />
        </nav>
      )}

      {narrow && (
        <>
          <button
            type="button"
            className="topbar__menu"
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Tutup' : 'Menu'}
          </button>
          {open && (
            <div className="topbar__sheet" id="menu-sheet">
              <BranchedMenu
                items={MENU}
                defaultOpen={[0, 1]}
                onSelect={go}
                color="#EEF3EF"
                accentColor="#3ED8A8"
                lineColor="#35574b"
                width={248}
                rowHeight={44}
              />
            </div>
          )}
        </>
      )}
    </header>
  )
}
