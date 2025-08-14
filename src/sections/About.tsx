import { motion } from 'framer-motion'

const text = `Je ne me contente pas de développer des applications : je veux créer un
nouveau monde. Un monde où le Web 3.0 n’est pas seulement une évolution
technologique, mais une véritable révolution dans notre façon de concevoir,
d’échanger et de collaborer.

Entrepreneur passionné, j’aspire à repousser les limites de ce que l’on
croit possible dans l’univers numérique. Mon objectif est d’innover en
permanence, de proposer des solutions uniques et sur mesure, capables de
répondre aux besoins de tout type d’entreprise, de projet ou de
professionnel.

Grâce à mon expertise Full Stack et en blockchain (Solidity, Solana,
Ethereum), je conçois des outils et plateformes à la fois immersifs,
performants et sécurisés. Je souhaite bâtir des infrastructures digitales
robustes qui protègent les données, renforcent la confiance et ouvrent de
nouvelles opportunités créatives et économiques.

Ce n’est pas qu’un projet professionnel, c’est une mission : participer à
la transformation profonde du web, pour en faire un espace plus
décentralisé, plus éthique et plus inspirant, au service de toutes les
ambitions.`

const keywords = [
  'React',
  'Node.js',
  'Solidity',
  'Solana',
  'Ethereum',
  'Express',
  'JavaScript',
  'Python',
  'HTML/CSS',
  'SQL',
  'MongoDB',
  'Docker',
]

export default function About() {
  return (
    <div className="section relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(78,145,226,0.15),transparent_60%)]" />

      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10 items-center">
        <div className="md:col-span-3 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold"
          >
            À propos
          </motion.h2>

          {text.split('\n\n').map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="mt-6 text-white/80 leading-relaxed text-lg"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-3">
            {keywords.map((k, i) => (
              <motion.span
                key={k}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ amount: 0.2 }}
                transition={{ delay: i * 0.04 }}
                className="glass px-4 py-2 rounded-2xl text-sm text-[var(--color-accent)] shadow-[0_0_15px_rgba(74,144,226,0.2)]"
              >
                {k}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


