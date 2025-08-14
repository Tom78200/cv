import { motion } from 'framer-motion'
import { FiGlobe, FiMail, FiLinkedin } from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'

export default function Contact() {
  const links = [
    { label: 'Site web', href: 'https://webtris.fr', Icon: FiGlobe },
    { label: 'WhatsApp', href: 'https://wa.me/33679506058', Icon: SiWhatsapp },
    { label: 'Email', href: 'mailto:Cottutom@outlook.fr', Icon: FiMail },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tom-cottu-881017359/', Icon: FiLinkedin },
  ] as const

  return (
    <div className="section overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">Contact</h2>
        <p className="mt-2 text-white/70">Tom Cottu · Paris · 0679506058 · Cottutom@outlook.fr</p>

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


