import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollEffects() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('section')
      sections.forEach((s) => {
        gsap.fromTo(
          s,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: s, start: 'top 80%' },
          }
        )
      })
    })
    return () => ctx.revert()
  }, [])
  return null
}


