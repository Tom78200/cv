import './App.css'
import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import { LanguageProvider } from './context/LanguageContext'
import ScrollEffects from './components/ScrollEffects'
import HorizontalScroll from './components/HorizontalScroll'
import CursorAura from './components/CursorAura'
import ProgressBar from './components/ProgressBar'
import Hero from './sections/Hero'
import About from './sections/About'
import ExperienceProjects from './sections/ExperienceProjects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

function App() {
  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', 'dark light')
  }, [])

  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="min-h-screen bg-bg text-[color:var(--color-text)]">
          <Navbar />
          <CursorAura />
          <ProgressBar />
          <AnimatePresence mode="wait">
            <main>
              <ScrollEffects />
              <HorizontalScroll sectionIds={["hero","about","xp","skills","contact"]}>
              <section id="hero" className="min-w-[100vw] h-[100svh] flex-shrink-0 overflow-hidden">
                <Hero />
              </section>
              <section id="about" className="min-w-[100vw] h-[100svh] flex-shrink-0 overflow-hidden">
                <About />
              </section>
              <section id="xp" className="min-w-[100vw] h-[100svh] flex-shrink-0 overflow-hidden">
                <ExperienceProjects />
              </section>
              <section id="skills" className="min-w-[100vw] h-[100svh] flex-shrink-0 overflow-hidden">
                <Skills />
              </section>
              <section id="contact" className="min-w-[100vw] h-[100svh] flex-shrink-0 overflow-hidden">
                <Contact />
              </section>
              </HorizontalScroll>
            </main>
          </AnimatePresence>
        </div>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
