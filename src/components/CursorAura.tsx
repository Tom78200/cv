import { useEffect, useState } from 'react'

export default function CursorAura() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 })
  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x - 200,
        top: pos.y - 200,
        width: 400,
        height: 400,
        pointerEvents: 'none',
        background:
          'radial-gradient(180px 180px at center, rgba(74,144,226,0.15), rgba(74,144,226,0) 70%)',
        filter: 'blur(15px)',
        zIndex: 5,
        transition: 'transform 80ms',
        transform: 'translateZ(0)',
      }}
    />
  )
}


