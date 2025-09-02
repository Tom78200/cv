import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { strings } from '../i18n/strings'

type Entry = {
  id: string
  date: string
  title: string
  company?: string
  description: string
  tags: string[]
}

type Project = {
  id: string
  title: string
  description: string
  tag: string
}

function useData(lang: 'fr' | 'en') {
  const xp = strings[lang].xp
  return {
    filters: xp.filters as unknown as (typeof filters)[number][],
    experienceEntries: xp.experienceEntries as unknown as Entry[],
    educationEntries: xp.educationEntries as unknown as Entry[],
    projects: xp.projects as unknown as Project[],
    title: xp.title,
    experiences: xp.experiences,
    education: xp.education,
  }
}

// Experience list now in i18n data

// Entries and projects are now provided via i18n data

const filters = ['Tous', 'Web3', 'UI', 'Full Stack'] as const

export default function ExperienceProjects() {
  const { language } = useLanguage()
  const data = useData(language)
  const firstId = (data.experienceEntries as any)[0]?.id ?? null
  const [expanded, setExpanded] = useState<string | null>(
    typeof window !== 'undefined' && window.innerWidth < 640 ? null : firstId
  )
  const [filter, setFilter] = useState<(typeof filters)[number]>(data.filters[0] as any)

  const filtered = useMemo(
    () => (filter === (data.filters[0] as any) ? (data.projects as any) : (data.projects as any).filter((p: any) => p.tag === filter)),
    [filter, data]
  )

  return (
    <div className="section overflow-hidden">
      <div className="max-w-6xl mx-auto h-full overflow-hidden">
        <h2 className="text-[18px] sm:text-4xl md:text-5xl font-bold">{data.title}</h2>

        <div className="mt-4 sm:mt-10 grid md:grid-cols-2 gap-3 sm:gap-10 h-full overflow-hidden">
          <div className="min-h-0 overflow-hidden">
            <h3 className="text-sm sm:text-xl font-semibold">{data.experiences}</h3>
            <ol className="relative mt-2 sm:mt-4 border-s border-white/10 overflow-hidden">
              {(data.experienceEntries as any).map((e: Entry) => (
                <li key={e.id} className="ms-6 mb-3 sm:mb-6">
                  <span className="absolute -start-3.5 mt-1.5 size-2.5 sm:size-3 rounded-full bg-[var(--color-accent)]" />
                <button
                    onClick={() => setExpanded((x) => (x === e.id ? null : e.id))}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] sm:text-sm text-white/60">{e.date}</p>
                        <p className="text-[13px] sm:text-lg font-semibold leading-snug">{e.title} {e.company ? `· ${e.company}` : ''}</p>
                      </div>
                      <span className="text-[var(--color-accent)]">
                        {expanded === e.id ? '−' : '+'}
                      </span>
                    </div>
                     <AnimatePresence initial={false} mode="wait">
                      {expanded === e.id && (
                        <motion.div
                           initial={{ height: 0, opacity: 0, y: 8 }}
                           animate={{ height: 'auto', opacity: 1, y: 0 }}
                           exit={{ height: 0, opacity: 0, y: 8 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-1.5 sm:mt-3 text-white/80 text-[12px] sm:text-base leading-relaxed">{e.description}</p>
                          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                            {e.tags.map((t) => (
                              <span key={t} className="glass px-2 py-[2px] rounded-xl text-[10px] sm:text-xs text-[var(--color-accent)]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              ))}
            </ol>

            <h3 className="text-sm sm:text-xl font-semibold mt-5 sm:mt-10">{data.education}</h3>
            <ol className="relative mt-2 sm:mt-4 border-s border-white/10 overflow-hidden">
              {(data.educationEntries as any).map((e: Entry) => (
                <li key={e.id} className="ms-6 mb-3 sm:mb-6">
                  <span className="absolute -start-3.5 mt-1.5 size-2.5 sm:size-3 rounded-full bg-[var(--color-accent)]" />
                  <button
                    onClick={() => setExpanded((x) => (x === e.id ? null : e.id))}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[11px] sm:text-sm text-white/60">{e.date}</p>
                        <p className="text-[13px] sm:text-lg font-semibold leading-snug">{e.title} {e.company ? `· ${e.company}` : ''}</p>
                      </div>
                      <span className="text-[var(--color-accent)]">
                        {expanded === e.id ? '−' : '+'}
                      </span>
                    </div>
                    <AnimatePresence initial={false} mode="wait">
                      {expanded === e.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: 8 }}
                          animate={{ height: 'auto', opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: 8 }}
                          className="overflow-hidden"
                        >
                          <p className="mt-1.5 sm:mt-3 text-white/80 text-[12px] sm:text-base leading-relaxed">{e.description}</p>
                          <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                            {e.tags.map((t) => (
                              <span key={t} className="glass px-2 py-[2px] rounded-xl text-[10px] sm:text-xs text-[var(--color-accent)]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="hidden sm:flex min-h-0 overflow-hidden flex-col">
            <div className="flex flex-wrap gap-2">
              {(data.filters as any).map((f: any) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-sm sm:text-base ${
                    filter === f
                       ? 'bg-[var(--color-bg-secondary)] text-[var(--color-accent)]'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <motion.div layout className="mt-3 sm:mt-6 grid sm:grid-cols-2 gap-2 sm:gap-4 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {filtered.map((p: any) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="[transform-style:preserve-3d] glass p-2.5 sm:p-4 rounded-2xl min-h-24 sm:min-h-32"
                  >
                    <div className="pointer-events-none">
                      <p className="text-sm sm:text-lg font-semibold">{p.title}</p>
                      <p className="text-white/80 mt-1 text-xs sm:text-base">{p.description}</p>
                      <span className="text-[var(--color-accent)] text-[11px] sm:text-sm">{p.tag}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}


