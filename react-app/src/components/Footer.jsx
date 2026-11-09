import FuzzyText from './reactbits/FuzzyText/FuzzyText'
import { useFontsReady, usePrefs } from '../hooks/usePrefs'

export default function Footer() {
  const { reduce } = usePrefs()
  const fontsReady = useFontsReady()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="sc-wrap">
        <div className="footer__word" aria-hidden="true">
          {fontsReady && (
            <FuzzyText
              fontSize="clamp(4.5rem, 21vw, 19rem)"
              fontWeight={900}
              fontFamily="Archivo, system-ui, sans-serif"
              color="#EEF3EF"
              baseIntensity={reduce ? 0 : 0.06}
              hoverIntensity={reduce ? 0 : 0.4}
              enableHover={!reduce}
            >
              WAFFIR
            </FuzzyText>
          )}
        </div>
        <div className="footer__line">
          <span>Waffir Hasan Alkamiil. Dari Subang, Jawa Barat. &copy; {year}</span>
          <span className="footer__links">
            <a href="https://github.com/wafiir051-ai" target="_blank" rel="noopener noreferrer" className="cursor-target">
              GitHub
            </a>
            <a href="https://www.godingofficial.com" target="_blank" rel="noopener noreferrer" className="cursor-target">
              godingofficial.com
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
