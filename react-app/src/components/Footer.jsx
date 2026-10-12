export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <span>
          Waffir Hasan Alkamiil — © <span id="year">{year}</span>. Dibangun dari Subang, Indonesia.
        </span>
        <div className="footer-links">
          <a href="https://github.com/wafiir051-ai" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.godingofficial.com" target="_blank" rel="noopener noreferrer">godingofficial.com</a>
        </div>
      </div>
    </footer>
  )
}
