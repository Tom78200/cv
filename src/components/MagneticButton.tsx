import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export default function MagneticButton({ className, children, onClick }: Props) {
  const ref = useRef<HTMLButtonElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 12, mass: 0.3 })
  const sy = useSpring(my, { stiffness: 120, damping: 12, mass: 0.3 })
  const rotate = useTransform(sx, [-40, 40], [-6, 6])

  function onMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    mx.set(x * 0.25)
    my.set(y * 0.25)
  }
  function onLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ x: sx, y: sy, rotate }}
      className={className}
      whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(74,144,226,0.45)' }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}


