import { useEffect, useState } from 'react'

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const st = (window as any).ScrollTrigger?.getAll?.().find((t: any) => t?.pin)
      if (st) setProgress(Math.max(0, Math.min(1, st.progress || 0)))
    }
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onScroll)
    const id = setInterval(onScroll, 200)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      clearInterval(id)
    }
  }, [])
  return (
    <div className="fixed top-[60px] sm:top-[68px] left-0 right-0 z-40 px-4 sm:px-6">
      <div className="h-[3px] sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-[var(--color-accent)]" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  )
}


