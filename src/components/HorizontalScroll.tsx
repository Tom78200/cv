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

      // Touch swipe support for horizontal navigation
      let touchStartX = 0
      let touchStartY = 0
      let isTouching = false
      const onTouchStart = (ev: TouchEvent) => {
        isTouching = true
        touchStartX = ev.touches[0].clientX
        touchStartY = ev.touches[0].clientY
      }
      const onTouchMove = (ev: TouchEvent) => {
        if (!isTouching) return
        const dx = ev.touches[0].clientX - touchStartX
        const dy = ev.touches[0].clientY - touchStartY
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
          ev.preventDefault()
        }
      }
      const onTouchEnd = (ev: TouchEvent) => {
        if (!isTouching) return
        const dx = (ev.changedTouches?.[0]?.clientX ?? touchStartX) - touchStartX
        const threshold = 50
        const progress = st.progress
        const currentIndex = Math.round(progress * (sections.length - 1))
        let targetIndex = currentIndex
        if (dx < -threshold) targetIndex = Math.min(sections.length - 1, currentIndex + 1)
        else if (dx > threshold) targetIndex = Math.max(0, currentIndex - 1)
        const y = containerRef.current!.offsetTop + (getTotal() * (targetIndex / Math.max(1, sections.length - 1)))
        gsap.to(window, { scrollTo: y, duration: 0.45, ease: 'power2.out' })
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

  return (
    <div ref={containerRef} className="relative h-[100svh] overflow-hidden">
      <div ref={trackRef} className="absolute inset-0 flex will-change-transform">
        {children}
      </div>
    </div>
  )
}


