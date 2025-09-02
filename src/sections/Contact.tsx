import { motion } from 'framer-motion'
import { FiGlobe, FiMail, FiLinkedin } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import { strings } from '../i18n/strings'

export default function Contact() {
  const { language } = useLanguage()
  const t = strings[language]
  const links = [
    { label: t.contact.website, href: 'https://webtris.fr', Icon: FiGlobe },
    { label: t.contact.whatsapp, href: 'https://wa.me/33679506058', Icon: SiWhatsapp },
    { label: t.contact.email, href: 'mailto:Cottutom@outlook.fr', Icon: FiMail },
    { label: t.contact.linkedin, href: 'https://www.linkedin.com/in/tom-cottu-881017359/', Icon: FiLinkedin },
  ] as const

  return (
    <div className="section overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">{t.contact.title}</h2>
        <p className="mt-2 text-white/70">{t.contact.summary}</p>

        <div className="mt-8 flex items-center gap-4">
          {links.map(({ Icon, href, label }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.06, filter: 'drop-shadow(0 0 10px rgba(110,231,249,0.4))' }}
              className="glass p-3 rounded-2xl flex items-center gap-2"
              aria-label={label}
            >
              <Icon size={22} />
              <span className="hidden sm:inline">{label}</span>
            </motion.a>
          ))}
        </div>

        
      </div>
    </div>
  )
}


