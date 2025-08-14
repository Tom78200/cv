import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  interests?: string[]
  className?: string
}

export default function InterestsAsteroid({
  interests = ['Musique', 'Espace', 'IA', 'Photographie', 'Jeux'],
  className,
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <motion.button
        aria-label="Voir mes centres d’intérêt"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(74,144,226,0.35)' }}
        whileTap={{ scale: 0.98 }}
        className="relative w-14 h-14 rounded-full bg-[#394b6e] shadow-[inset_-6px_-10px_16px_rgba(0,0,0,0.55),0_0_25px_rgba(74,144,226,0.25)]"
      >
        <span className="absolute left-2 top-2 w-2 h-2 rounded-full bg-[#6b7aa6]" />
        <span className="absolute right-3 top-4 w-3 h-3 rounded-full bg-[#51618a]" />
        <span className="absolute left-4 bottom-3 w-2.5 h-2.5 rounded-full bg-[#51618a]" />
        <span className="absolute inset-0 rounded-full ring-2 ring-white/10" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-40 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="fixed right-6 top-24 z-50 glass rounded-2xl p-5 w-[min(90vw,360px)]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-wide text-white/70">Centres d’intérêt</p>
                <button className="text-white/70 hover:text-white" onClick={() => setOpen(false)}>Fermer</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-white/10 text-sm hover:bg-white/15 transition-colors"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


