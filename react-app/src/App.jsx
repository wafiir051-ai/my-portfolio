import { useCallback, useState } from 'react'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CyberBot from './components/CyberBot'
import BackgroundAudio from './components/BackgroundAudio'
import TargetCursor from './components/reactbits/TargetCursor/TargetCursor'
import { useScrollCraft } from './hooks/useScrollCraft'
import { usePrefs } from './hooks/usePrefs'

export default function App() {
  const [ready, setReady] = useState(false)
  const onDone = useCallback(() => setReady(true), [])
  const { fine, reduce } = usePrefs()

  useScrollCraft(ready)

  return (
    <>
      <Loader onDone={onDone} />
      {fine && !reduce && (
        <TargetCursor
          targetSelector=".cursor-target"
          cursorColor="#EEF3EF"
          cursorColorOnTarget="#3ED8A8"
          blendMode="difference"
          hideDefaultCursor
        />
      )}
      <div className="scrollbar" data-sc-progress aria-hidden="true" />
      <Nav />
      <Hero />
      <main>
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <CyberBot />
      <BackgroundAudio />
    </>
  )
}
