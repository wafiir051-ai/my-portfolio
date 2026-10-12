export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow">Tools &amp; Teknologi</div>
          <h2>Stack yang saya pakai sehari-hari</h2>
        </div>
        <div className="skills-grid">
          <div className="card reveal">
            <div className="eyebrow">Frontend</div>
            <div className="skill-tags">
              <span className="pill">React</span>
              <span className="pill">Next.js</span>
              <span className="pill">Vite</span>
              <span className="pill">Flutter</span>
              <span className="pill">Tailwind CSS</span>
            </div>
          </div>
          <div className="card reveal">
            <div className="eyebrow">Backend &amp; Data</div>
            <div className="skill-tags">
              <span className="pill">Supabase</span>
              <span className="pill">PostgreSQL</span>
              <span className="pill">Node.js</span>
              <span className="pill">Python / FastAPI</span>
            </div>
          </div>
          <div className="card reveal">
            <div className="eyebrow">Hardware &amp; IoT</div>
            <div className="skill-tags">
              <span className="pill">ESP32</span>
              <span className="pill">Arduino</span>
              <span className="pill">Sensor Integration</span>
              <span className="pill">Firmware</span>
            </div>
          </div>
          <div className="card reveal">
            <div className="eyebrow">Tools</div>
            <div className="skill-tags">
              <span className="pill">Git &amp; GitHub</span>
              <span className="pill">Vercel</span>
              <span className="pill">Figma</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
