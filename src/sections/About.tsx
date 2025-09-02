import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { strings } from '../i18n/strings'

export default function About() {
  const { language } = useLanguage()
  return (
    <div className="section relative">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_10%,rgba(78,145,226,0.15),transparent_60%)]" />

      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-6 sm:gap-10 items-center">
        <div className="md:col-span-3 overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl md:text-5xl font-bold"
          >
            {strings[language].about.title}
          </motion.h2>

          {strings[language].about.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="mt-3 sm:mt-5 text-white/80 leading-relaxed text-base sm:text-lg"
            >
              {para}
            </motion.p>
          ))}
        </div>

        <div className="md:col-span-2">
          <div className="flex flex-wrap gap-3">
            {strings[language].about.keywords.map((k, i) => (
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


