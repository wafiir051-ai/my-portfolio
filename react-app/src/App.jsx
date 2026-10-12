import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AmbientLayer from './components/AmbientLayer'
import CyberBot from './components/CyberBot'
import FloatingChars from './components/FloatingChars'
import { useReveal } from './hooks/useReveal'
import { useBotScroll } from './hooks/useBotScroll'

export default function App() {
  useReveal()
  useBotScroll()

  return (
    <>
      <FloatingChars />
      <AmbientLayer />
      <Nav />
      <header className="hero" id="top">
        <Hero />
      </header>
      <main>
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
      <CyberBot />
    </>
  )
}
