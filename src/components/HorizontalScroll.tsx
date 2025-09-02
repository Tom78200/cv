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
  const mobileRef = useRef<HTMLDivElement | null>(null)
  const [, setActiveId] = useState(sectionIds[0] || 'hero')
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Mobile: native horizontal scroll with snap
  useLayoutEffect(() => {
    if (!isMobile) return
    const el = mobileRef.current
    if (!el) return

    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / Math.max(1, el.clientWidth))
      const id = sectionIds[Math.min(sectionIds.length - 1, Math.max(0, idx))]
      if (id) {
        setActiveId((prev) => {
          if (prev === id) return prev
          window.dispatchEvent(new CustomEvent('horizontal:active', { detail: id }))
          return id
        })
      }
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    const gotoHandler = (e: Event) => {
      const id = (e as CustomEvent<string>).detail
      const index = sectionIds.indexOf(id)
      if (index < 0) return
      const left = index * el.clientWidth
      el.scrollTo({ left, behavior: 'smooth' })
    }
    window.addEventListener('horizontal:goto', gotoHandler as EventListener)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('horizontal:goto', gotoHandler as EventListener)
    }
  }, [isMobile, sectionIds])

  useLayoutEffect(() => {
    if (isMobile) return
    if (!containerRef.current || !trackRef.current) return

    const sections = Array.from(trackRef.current.children) as HTMLElement[]

    // Force each panel to exactly full viewport width to have a reliable total width
    const syncSizes = () => {
      const vw = window.innerWidth
      const vh = (window as any).visualViewport?.height ?? window.innerHeight
      sections.forEach((el) => {
        el.style.width = `${vw}px`
        el.style.height = `${vh}px`
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
          scrub: 0.2,
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

      // Touch swipe: follow finger + snap to nearest panel (desktop/tablet only)
      let touchStartX = 0
      let touchStartY = 0
      let startProgress = 0
      let isTouching = false
      const onTouchStart = (ev: TouchEvent) => {
        isTouching = true
        touchStartX = ev.touches[0].clientX
        touchStartY = ev.touches[0].clientY
        startProgress = st.progress
      }
      const onTouchMove = (ev: TouchEvent) => {
        if (!isTouching) return
        const dx = ev.touches[0].clientX - touchStartX
        const dy = ev.touches[0].clientY - touchStartY
        // N'intercepte qu'un geste clairement horizontal
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
          ev.preventDefault()
          const vw = Math.max(1, window.innerWidth)
          const delta = -dx / vw
          const nextProgress = Math.min(1, Math.max(0, startProgress + delta))
          const y = containerRef.current!.offsetTop + getTotal() * nextProgress
          gsap.to(window, { scrollTo: y, duration: 0, overwrite: true, ease: 'none' })
        }
      }
      const onTouchEnd = () => {
        if (!isTouching) return
        const progress = st.progress
        const nearestIndex = Math.round(progress * (sections.length - 1))
        const y = containerRef.current!.offsetTop + (getTotal() * (nearestIndex / Math.max(1, sections.length - 1)))
        gsap.to(window, { scrollTo: y, duration: 0.35, ease: 'power2.out' })
        isTouching = false
      }
      const el = containerRef.current!
      el.addEventListener('touchstart', onTouchStart, { passive: false })
      el.addEventListener('touchmove', onTouchMove, { passive: false })
      el.addEventListener('touchend', onTouchEnd)

      const gotoHandler = (e: Event) => {
        const id = (e as CustomEvent<string>).detail
        const index = sectionIds.indexOf(id)
        if (index < 0) return
        const y = containerRef.current!.offsetTop + (getTotal() * (index / Math.max(1, sections.length - 1)))
        gsap.to(window, { scrollTo: y, duration: 0.5, ease: 'power2.out' })
      }
      window.addEventListener('horizontal:goto', gotoHandler as EventListener)
      return () => {
        window.removeEventListener('horizontal:goto', gotoHandler as EventListener)
        ScrollTrigger.removeEventListener('refresh', updateActive)
        ScrollTrigger.removeEventListener('scrollEnd', updateActive)
        window.removeEventListener('resize', onResize)
        el.removeEventListener('touchstart', onTouchStart as EventListener)
        el.removeEventListener('touchmove', onTouchMove as EventListener)
        el.removeEventListener('touchend', onTouchEnd as EventListener)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [sectionIds])

  return isMobile ? (
    <div ref={mobileRef} className="relative h-[100svh] overflow-x-auto overflow-y-hidden snap-x snap-mandatory whitespace-nowrap touch-pan-x">
      <div className="inline-flex h-full">
        {Array.from({ length: (children as any[]).length }).map((_, i) => (
          <div key={i} className="snap-start snap-always w-[100vw] h-[100svh] inline-block align-top">
            {(children as any[])[i]}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div ref={containerRef} className="relative h-[100svh] overflow-hidden touch-pan-x">
      <div ref={trackRef} className="absolute inset-0 flex will-change-transform">
        {children}
      </div>
    </div>
  )
}


