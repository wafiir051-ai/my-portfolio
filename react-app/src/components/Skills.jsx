import CursorGrid from './reactbits/CursorGrid/CursorGrid'
import { usePrefs } from '../hooks/usePrefs'

const STACK = [
  ['Frontend', ['React', 'Next.js', 'Vite', 'Flutter', 'Tailwind CSS']],
  ['Backend dan data', ['Supabase', 'PostgreSQL', 'Node.js', 'Python / FastAPI']],
  ['Hardware dan IoT', ['ESP32', 'Arduino', 'Integrasi sensor', 'Firmware']],
  ['Perkakas', ['Git dan GitHub', 'Vercel', 'Figma']],
]

export default function Skills() {
  const { reduce, fine } = usePrefs()

  const content = (
    <div className="sc-wrap stack">
      <div className="stack__head" data-sc-in>
        <h2 className="display">Alat yang saya pakai tiap hari.</h2>
      </div>
      <div className="ledger" data-sc-in data-sc-stagger="70">
        {STACK.map(([group, items]) => (
          <div className="ledger__row" key={group}>
            <h3 className="label">{group}</h3>
            <ul className="ledger__items">
              {items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
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
