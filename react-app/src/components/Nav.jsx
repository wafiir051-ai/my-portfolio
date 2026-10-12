import { useState } from 'react'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <nav className={`nav ${isOpen ? 'is-open' : ''}`} id="main-nav">
        <div className="container">
          <ul className="nav-links" id="navLinks">
            <li><a href="#tentang" onClick={closeMenu}>Tentang</a></li>
            <li><a href="#proyek" onClick={closeMenu}>Proyek</a></li>
            <li><a href="#layanan" onClick={closeMenu}>Layanan</a></li>
            <li><a href="#kontak" onClick={closeMenu}>Kontak</a></li>
            <li><a href="#kontak" className="btn btn-primary nav-cta" onClick={closeMenu}>Hubungi</a></li>
          </ul>
          <button 
            type="button" 
            className="nav-toggle" 
            id="navToggle" 
            aria-label="Buka menu" 
            aria-expanded={isOpen} 
            aria-controls="navLinks"
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
      <div 
        className={`nav-overlay ${isOpen ? 'is-visible' : ''}`} 
        id="navOverlay" 
        onClick={closeMenu} 
      />
    </>
  )
}
