import { Canvas } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaNodeJs } from 'react-icons/fa'
import { SiTypescript, SiThreedotjs, SiGreensock, SiNextdotjs, SiTailwindcss, SiFramer, SiSolidity, SiRust, SiSolana } from 'react-icons/si'
import Typewriter from '../components/Typewriter'
import { useLanguage } from '../context/LanguageContext'
import { strings } from '../i18n/strings'

function Stars() {
  const ref = useRef<any>(null)
  const [points] = useState(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40
      positions[i + 1] = (Math.random() - 0.5) * 40
      positions[i + 2] = (Math.random() - 0.5) * 40
    }
    return positions
  })

  return (
    <group ref={ref}>
      <Points positions={points} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color={getComputedStyle(document.documentElement).getPropertyValue('--color-accent-2') || '#6EE7F9'}
          size={0.08}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  )
}

function useSlogans(lang: 'fr' | 'en') {
  return strings[lang].hero.slogans
}

// Icônes SVG qui orbitent autour du nom (logos officiels via react-icons)
const orbitingIcons = [
  {
    name: 'React',
    svg: <FaReact className="w-7 h-7" />,
    angle: 0,
    delay: 0,
  },
  {
    name: 'TypeScript',
    svg: <SiTypescript className="w-7 h-7" />,
    angle: 32.7,
    delay: 0.3,
  },
  {
    name: 'Three.js',
    svg: <SiThreedotjs className="w-7 h-7" />,
    angle: 65.4,
    delay: 0.6,
  },
  {
    name: 'GSAP',
    svg: <SiGreensock className="w-7 h-7" />,
    angle: 98.1,
    delay: 0.9,
  },
  {
    name: 'Node.js',
    svg: <FaNodeJs className="w-7 h-7" />,
    angle: 130.8,
    delay: 1.2,
  },
  {
    name: 'Next.js',
    svg: <SiNextdotjs className="w-7 h-7" />,
    angle: 163.5,
    delay: 1.5,
  },
  {
    name: 'Tailwind',
    svg: <SiTailwindcss className="w-7 h-7" />,
    angle: 196.2,
    delay: 1.8,
  },
  {
    name: 'Framer',
    svg: <SiFramer className="w-7 h-7" />,
    angle: 228.9,
    delay: 2.1,
  },
  {
    name: 'Solidity',
    svg: <SiSolidity className="w-7 h-7" />,
    angle: 261.6,
    delay: 2.4,
  },
  {
    name: 'Rust',
    svg: <SiRust className="w-7 h-7" />,
    angle: 294.3,
    delay: 2.7,
  },
  {
    name: 'Solana',
    svg: <SiSolana className="w-7 h-7" />,
    angle: 327,
    delay: 3,
  },
]

// Stat labels moved to i18n

export default function Hero() {
  const [index, setIndex] = useState(0)
  const { language } = useLanguage()
  const slogans = useSlogans(language)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slogans.length), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div id="hero" className="section relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Stars />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-bg-primary)]" />
      </div>

      {/* Icônes qui orbitent autour du nom */}
      <div className="absolute inset-0">
        {orbitingIcons.slice(0, 7).map((item, i) => {
          const base = 280
          const vw = typeof window !== 'undefined' ? window.innerWidth : 1280
          const radius = vw < 640 ? base * 0.42 : vw < 1024 ? base * 0.75 : base
          const centerX = 50 // Centre X en pourcentage
          const centerY = 50 // Centre Y en pourcentage
          
          const x = centerX + (radius * Math.cos(item.angle * Math.PI / 180)) / 10
          const y = centerY + (radius * Math.sin(item.angle * Math.PI / 180)) / 10
          
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: item.delay, duration: 0.5 }}
              className="absolute group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20 + i * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                whileHover={{ scale: 1.3 }}
                className="text-[var(--color-accent)] hover:text-[var(--color-accent-2)] transition-all duration-300 cursor-pointer"
              >
                {item.svg}
              </motion.div>
              
              {/* Tooltip */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                {item.name}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight drop-shadow-[0_0_25px_rgba(74,144,226,0.35)]"
        >
          <Typewriter text="Tom Cottu" className="text-[var(--color-accent)]" />
          <br />
          <Typewriter text={strings[language].hero.title} speed={30} />
        </motion.h1>

        <motion.p
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 text-sm sm:text-base text-white/80 min-h-[2ch]"
        >
          {slogans[index]}
        </motion.p>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex justify-center gap-6 sm:gap-10 mt-6"
        >
          {[{ label: strings[language].hero.statsYears, value: 4, suffix: '+' }, { label: strings[language].hero.statsTechs, value: 15, suffix: '+' }].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicateur de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-sm flex flex-col items-center gap-2"
        >
          <span>{strings[language].hero.scroll}</span>
          <span className="text-xl">→</span>
        </motion.div>
      </motion.div>
    </div>
  )
}


