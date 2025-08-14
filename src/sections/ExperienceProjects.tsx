import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

const experienceEntries: Entry[] = [
  {
    id: 'e-webtris',
    date: '2025 → présent',
    title: 'Fondateur',
    company: 'Webtris',
    description:
      "Entreprise vendant des solutions Web3 (plateformes, dApps, intégrations NFT), accompagnement de marques et artistes pour des expériences immersives. Lancement officiel prévu octobre 2025.",
    tags: ['Web3', 'Solidity', 'Solana', 'React', 'Node.js'],
  },
  {
    id: 'e-prodware',
    date: 'Jan. 2023 → Juin 2023',
    title: 'Développeur Junior',
    company: 'Prodware',
    description:
      "Développement et maintenance d'applications internes. Participation à la conception de solutions web et gestion de bases de données.",
    tags: ['Full Stack', 'SQL', 'React', 'Node.js'],
  },
]

const educationEntries: Entry[] = [
  {
    id: 'f-wf3',
    date: '2023 → 2024',
    title: 'Licence Informatique',
    company: 'WebForce3',
    description:
      "Parcours axé développement web et logiciels, avec projets d'application mobile et web. Bonnes pratiques (performance, accessibilité).",
    tags: ['Formation', 'Web', 'Licence'],
  },
  {
    id: 'f-oc',
    date: '2022 → 2023',
    title: 'Bac +2 Full Stack Developer',
    company: 'OpenClassrooms',
    description:
      'Création de sites web, gestion du back-end et mise en place/usage de bases de données.',
    tags: ['Formation', 'React', 'Node.js', 'Express', 'Bases de données'],
  },
  {
    id: 'f-alchemy',
    date: '2025',
    title: 'Formation Web3',
    company: 'Alchemy University',
    description:
      'Blockchain, smart contracts, Solidity, Solana; bonnes pratiques de sécurité et déploiements.',
    tags: ['Formation', 'Web3', 'Solidity', 'Solana'],
  },
  {
    id: 'f-fcc',
    date: '2025',
    title: 'Développement Web',
    company: 'freeCodeCamp',
    description:
      'Création de sites web, gestion du back-end et mise en place/usage de bases de données.',
    tags: ['Formation', 'JavaScript', 'Frontend', 'Backend', 'Base de données'],
  },
]

const projects: Project[] = [
  { id: 'p-webtris', title: 'Webtris', description: "Plateforme artistique Web3 (art, littérature) avec intégration blockchain.", tag: 'Web3' },
  { id: 'p-dapp', title: 'dApp NFT', description: 'Smart contracts, mint et marketplace légère.', tag: 'Web3' },
  { id: 'p-dashboard', title: 'Dashboard Blockchain', description: 'Visualisation des métriques on-chain.', tag: 'UI' },
  { id: 'p-fullstack', title: 'API + Front', description: 'Stack React/Node avec sécurité et auth.', tag: 'Full Stack' },
]

const filters = ['Tous', 'Web3', 'UI', 'Full Stack'] as const

export default function ExperienceProjects() {
  const [expanded, setExpanded] = useState<string | null>(experienceEntries[0]?.id ?? null)
  const [filter, setFilter] = useState<(typeof filters)[number]>('Tous')

  const filtered = useMemo(
    () => (filter === 'Tous' ? projects : projects.filter((p) => p.tag === filter)),
    [filter]
  )

  return (
    <div className="section overflow-hidden">
      <div className="max-w-6xl mx-auto h-full overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold">Expériences & Projets</h2>

        <div className="mt-10 grid md:grid-cols-2 gap-10 h-full overflow-hidden">
          <div className="min-h-0 overflow-hidden">
            <h3 className="text-xl font-semibold">Expériences</h3>
            <ol className="relative mt-4 border-s border-white/10 overflow-hidden">
              {experienceEntries.map((e) => (
                <li key={e.id} className="ms-6 mb-6">
                  <span className="absolute -start-3.5 mt-2 size-3 rounded-full bg-[var(--color-accent)]" />
                <button
                    onClick={() => setExpanded((x) => (x === e.id ? null : e.id))}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60">{e.date}</p>
                        <p className="text-lg font-semibold">{e.title} {e.company ? `· ${e.company}` : ''}</p>
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
                          <p className="mt-3 text-white/80">{e.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {e.tags.map((t) => (
                              <span key={t} className="glass px-2 py-1 rounded-xl text-xs text-[var(--color-accent)]">
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

            <h3 className="text-xl font-semibold mt-10">Formations</h3>
            <ol className="relative mt-4 border-s border-white/10 overflow-hidden">
              {educationEntries.map((e) => (
                <li key={e.id} className="ms-6 mb-6">
                  <span className="absolute -start-3.5 mt-2 size-3 rounded-full bg-[var(--color-accent)]" />
                  <button
                    onClick={() => setExpanded((x) => (x === e.id ? null : e.id))}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white/60">{e.date}</p>
                        <p className="text-lg font-semibold">{e.title} {e.company ? `· ${e.company}` : ''}</p>
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
                          <p className="mt-3 text-white/80">{e.description}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {e.tags.map((t) => (
                              <span key={t} className="glass px-2 py-1 rounded-xl text-xs text-[var(--color-accent)]">
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

          <div className="min-h-0 overflow-hidden flex flex-col">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-xl ${
                    filter === f
                       ? 'bg-[var(--color-bg-secondary)] text-[var(--color-accent)]'
                      : 'hover:bg-white/5'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <motion.div layout className="mt-6 grid sm:grid-cols-2 gap-4 overflow-hidden">
              <AnimatePresence mode="popLayout">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="[transform-style:preserve-3d] glass p-4 rounded-2xl min-h-32"
                  >
                    <div className="pointer-events-none">
                      <p className="text-lg font-semibold">{p.title}</p>
                      <p className="text-white/80 mt-1">{p.description}</p>
                      <span className="text-[var(--color-accent)] text-sm">{p.tag}</span>
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


