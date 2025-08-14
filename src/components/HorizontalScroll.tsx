import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

type Props = {
  children: React.ReactNode
  sectionIds: string[]
}

export default function HorizontalScroll({ children, sectionIds }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [, setActiveId] = useState(sectionIds[0] || 'hero')

  useLayoutEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const sections = Array.from(trackRef.current.children) as HTMLElement[]

    // Force each panel to exactly full viewport width to have a reliable total width
    const syncSizes = () => {
      sections.forEach((el) => {
        el.style.width = `${window.innerWidth}px`
        el.style.height = `${window.innerHeight}px`
      })
    }
    syncSizes()

    const getTotal = () => Math.max(1, sections.length * window.innerWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      const tween = gsap.to(trackRef.current, {
        x: () => -getTotal(),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current!,
          pin: true,
          start: 'top top',
          end: () => `+=${getTotal()}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      const st = tween.scrollTrigger!

      const updateActive = () => {
        const progress = st.progress
        const idx = Math.round(progress * (sections.length - 1))
        const id = sectionIds[idx]
        if (!id) return
        setActiveId((prev) => {
          if (prev === id) return prev
          window.dispatchEvent(new CustomEvent('horizontal:active', { detail: id }))
          return id
        })
      }

      st?.scroll(0)
      ScrollTrigger.addEventListener('refresh', updateActive)
      ScrollTrigger.addEventListener('scrollEnd', updateActive)

      const onResize = () => {
        syncSizes()
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', onResize)

      const gotoHandler = (e: Event) => {
        const id = (e as CustomEvent<string>).detail
        const index = sectionIds.indexOf(id)
        if (index < 0) return
        const y = containerRef.current!.offsetTop + (getTotal() * (index / Math.max(1, sections.length - 1)))
        gsap.to(window, { scrollTo: y, duration: 0.8, ease: 'power3.out' })
      }
      window.addEventListener('horizontal:goto', gotoHandler as EventListener)
      return () => {
        window.removeEventListener('horizontal:goto', gotoHandler as EventListener)
        ScrollTrigger.removeEventListener('refresh', updateActive)
        ScrollTrigger.removeEventListener('scrollEnd', updateActive)
        window.removeEventListener('resize', onResize)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [sectionIds])

  return (
    <div ref={containerRef} className="relative h-[100svh] overflow-hidden">
      <div ref={trackRef} className="absolute inset-0 flex will-change-transform">
        {children}
      </div>
    </div>
  )
}


