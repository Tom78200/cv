import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
// Communique avec HorizontalScroll via CustomEvents

const sections = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'xp', label: 'Expériences' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)
  const [, setActiveId] = useState<string>('hero')

  useEffect(() => {
    const onActive = (e: Event) => setActiveId((e as CustomEvent<string>).detail)
    window.addEventListener('horizontal:active', onActive as EventListener)
    return () => window.removeEventListener('horizontal:active', onActive as EventListener)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.6 }
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  const handleScrollTo = (id: string) => {
    setMenuOpen(false)
    window.dispatchEvent(new CustomEvent('horizontal:goto', { detail: id }))
  }

  return (
    <div className="fixed top-0 inset-x-0 z-50">
      <nav className="mx-3 mt-3">
        <div className="flex items-center justify-between px-0 py-0">
          <button
            className="text-xl font-semibold text-[color:var(--color-text)]"
            onClick={() => handleScrollTo('hero')}
          >
            <span className="text-[var(--color-accent)]">&lt;/&gt;</span> Cottu Tom, 21 ans
          </button>

          <div className="hidden md:flex items-center gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => handleScrollTo(s.id)}
                className={`px-3 py-2 rounded-xl transition-colors ${
                  active === s.id
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text)]/80 hover:text-[var(--color-text)]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen((m) => !m)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-4 pb-4"
          >
            <div className="grid gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleScrollTo(s.id)}
                  className={`px-3 py-2 rounded-xl text-left ${
                    active === s.id
                      ? 'text-[var(--color-accent)]'
                      : 'text-[var(--color-text)]/80 hover:text-[var(--color-text)]'
                  }`}
                >
                  {s.label}
                </button>
              ))}

              
            </div>
          </motion.div>
        )}
      </nav>
    </div>
  )
}


