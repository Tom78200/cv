import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiExpress, SiSolidity, SiSolana, SiEthereum, SiMongodb, SiPostgresql, SiDocker, SiGithub, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiPython, SiTailwindcss } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import { strings } from '../i18n/strings'

type Skill = {
  name: string
  Icon: React.ComponentType<{ className?: string }>
}

const skills: Skill[] = [
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'React', Icon: FaReact },
  { name: 'Node.js', Icon: FaNodeJs },
  { name: 'Express', Icon: SiExpress },
  { name: 'Solidity', Icon: SiSolidity },
  { name: 'Solana', Icon: SiSolana },
  { name: 'Ethereum', Icon: SiEthereum },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'PostgreSQL', Icon: SiPostgresql },
  { name: 'Docker', Icon: SiDocker },
  { name: 'Git/GitHub', Icon: SiGithub },
  { name: 'HTML', Icon: SiHtml5 },
  { name: 'CSS', Icon: SiCss3 },
  { name: 'TailwindCSS', Icon: SiTailwindcss },
  { name: 'Python', Icon: SiPython },
]

export default function Skills() {
  const { language } = useLanguage()
  const [selected, setSelected] = useState<Skill | null>(null)

  return (
    <div className="section relative overflow-hidden">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">{strings[language].skills.title}</h2>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {skills.map((s, i) => (
            <motion.button
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4, scale: 1.03 }}
              onClick={() => setSelected(s)}
              className="glass p-4 rounded-2xl flex flex-col items-center gap-2 text-center hover:shadow-[0_0_30px_rgba(74,144,226,0.18)]"
            >
              <s.Icon className="w-7 h-7 text-[var(--color-accent)]" />
              <span className="text-sm">{s.name}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.name}
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelected(null)}
              />
              <motion.div
                initial={{ scale: 0.95, y: 10, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="glass relative max-w-2xl w-[92%] md:w-[70%] p-6 rounded-2xl overflow-hidden"
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-2 rounded-xl hover:bg-white/10"
                  aria-label={strings[language].skills.close}
                >
                  <FiX className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 pr-8">
                  <selected.Icon className="w-6 h-6 text-[var(--color-accent)]" />
                  <p className="font-semibold">{strings[language].skills.exampleWith} {selected.name}</p>
                </div>
                <p className="text-white/80 mt-3">{strings[language].skills.exampleText}</p>
                <pre className="mt-3 text-xs whitespace-pre-wrap bg-black/30 rounded-xl p-4 overflow-x-auto max-h-[50svh]">
{`// Exemple: composant animé (simplifié)
import { motion } from 'framer-motion'

export function Card() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }} className="glass p-4 rounded-xl">
      Contenu interactif
    </motion.div>
  )
}`}
                </pre>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}


