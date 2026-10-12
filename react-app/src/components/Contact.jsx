export default function Contact() {
  return (
    <section className="section contact-band" id="kontak">
      <div className="container reveal">
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Kontak</div>
        <h2>Ada proyek yang mau dikerjakan bareng?</h2>
        <p>Ceritain kebutuhan kamu lewat WhatsApp atau email — nanti kita diskusikan detailnya bareng-bareng.</p>
        <div className="contact-actions">
          <a href="https://wa.me/6281219135378" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Chat via WhatsApp
          </a>
          <a href="mailto:waffir.hasan25@smk.belajar.id" className="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            Email
          </a>
          <a href="https://github.com/wafiir051-ai" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <svg viewBox="0 0 24 24">
              <path d="M8 6L2 12L8 18M16 6L22 12L16 18" />
            </svg>
            GitHub
          </a>
          <a href="https://www.godingofficial.com/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            Goding Official
          </a>
        </div>
      </div>
    </section>
  )
}
