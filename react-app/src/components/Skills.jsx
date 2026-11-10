import { HugeiconsIcon } from '@hugeicons/react'
import { BrowserIcon, Database01Icon, CpuIcon, Wrench01Icon } from '@hugeicons/core-free-icons'
import CursorGrid from './reactbits/CursorGrid/CursorGrid'
import SectionHead from './SectionHead'
import { usePrefs } from '../hooks/usePrefs'

const STACK = [
  [BrowserIcon, 'Frontend', ['React', 'Next.js', 'Vite', 'Flutter', 'Tailwind CSS']],
  [Database01Icon, 'Backend dan data', ['Supabase', 'PostgreSQL', 'Node.js', 'Python / FastAPI']],
  [CpuIcon, 'Hardware dan IoT', ['ESP32', 'Arduino', 'Integrasi sensor', 'Firmware']],
  [Wrench01Icon, 'Perkakas', ['Git dan GitHub', 'Vercel', 'Figma']],
]

export default function Skills() {
  const { reduce, fine } = usePrefs()

  const content = (
    <div className="sc-wrap stack">
      <SectionHead
        label="Stack"
        title="Alat yang saya pakai tiap hari."
        intro="Dari antarmuka sampai papan sirkuit, supaya satu orang bisa membawa proyek dari ide sampai jalan."
      />
      <div className="panels" data-sc-in data-sc-stagger="70">
        {STACK.map(([icon, group, items]) => (
          <article className="panel" key={group}>
            <h3 className="panel__head">
              <span className="panel__icon">
                <HugeiconsIcon icon={icon} size={20} strokeWidth={1.7} />
              </span>
              {group}
            </h3>
            <ul className="chips">
              {items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )

  return (
    <section className="sec stack-sec" id="skills" data-sc-act="flow">
      {reduce || !fine ? (
        content
      ) : (
        <CursorGrid
          className="stack__grid"
          cellSize={56}
          color="#3ED8A8"
          gridColor="#EEF3EF"
          gridOpacity={0.06}
          fillOpacity={0.1}
          radius={150}
          spotlight={0.35}
        >
          {content}
        </CursorGrid>
      )}
    </section>
  )
}
