import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import { strings } from '../i18n/strings'
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
  const { language, setLanguage } = useLanguage()
  const [langOpen, setLangOpen] = useState(false)

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
                {strings[language].nav[
                  s.id === 'hero' ? 'home' : s.id === 'about' ? 'about' : s.id === 'xp' ? 'experience' : s.id === 'skills' ? 'skills' : 'contact'
                ]}
              </button>
            ))}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="px-3 py-2 rounded-xl text-[var(--color-text)]/80 hover:text-[var(--color-text)] inline-flex items-center gap-1"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                {language === 'fr' ? strings.fr.nav.languageFr : strings.en.nav.languageEn} <FiChevronDown />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden" role="listbox">
                  <button
                    role="option"
                    aria-selected={language === 'fr'}
                    className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${language === 'fr' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]/80'}`}
                    onClick={() => { setLanguage('fr'); setLangOpen(false) }}
                  >
                    {strings.fr.nav.languageFr}
                  </button>
                  <button
                    role="option"
                    aria-selected={language === 'en'}
                    className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${language === 'en' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]/80'}`}
                    onClick={() => { setLanguage('en'); setLangOpen(false) }}
                  >
                    {strings.en.nav.languageEn}
                  </button>
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen((m) => !m)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {menuOpen && (
          <>
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)} />
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="relative z-50 md:hidden px-4 pb-4"
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
              <div className="pt-2">
                <div className="relative">
                  <button
                    onClick={() => setLangOpen((v) => !v)}
                    className="px-3 py-2 rounded-xl text-[var(--color-text)]/80 hover:text-[var(--color-text)] inline-flex items-center gap-1"
                    aria-haspopup="listbox"
                    aria-expanded={langOpen}
                  >
                    {language === 'fr' ? 'Français' : 'English'} <FiChevronDown />
                  </button>
                  {langOpen && (
                    <div className="absolute left-0 mt-2 w-40 bg-[var(--color-bg-secondary)]/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl overflow-hidden" role="listbox">
                      <button
                        role="option"
                        aria-selected={language === 'fr'}
                        className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${language === 'fr' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]/80'}`}
                        onClick={() => { setLanguage('fr'); setLangOpen(false) }}
                      >
                        Français
                      </button>
                      <button
                        role="option"
                        aria-selected={language === 'en'}
                        className={`block w-full text-left px-3 py-2 hover:bg-white/10 ${language === 'en' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text)]/80'}`}
                        onClick={() => { setLanguage('en'); setLangOpen(false) }}
                      >
                        English
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </nav>
    </div>
  )
}


