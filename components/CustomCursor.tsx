'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function CustomCursor() {
  const pathname = usePathname()
  useEffect(() => {
    if (pathname.startsWith('/admin')) return
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouchDevice) return

    const dot  = document.createElement('div')
    const ring = document.createElement('div')
    dot.className  = 'cursor-dot'
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      document.documentElement.style.setProperty('--cx', `${mx}px`)
      document.documentElement.style.setProperty('--cy', `${my}px`)
    }
    document.addEventListener('mousemove', onMove)

    const follow = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      document.documentElement.style.setProperty('--fx', `${rx}px`)
      document.documentElement.style.setProperty('--fy', `${ry}px`)
      requestAnimationFrame(follow)
    }
    requestAnimationFrame(follow)

    const addHover = (el: Element) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'))
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'))
    }

    document.querySelectorAll('a, button, .accordion-btn, .project-card, .ai-chip, .contact-social').forEach(addHover)

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, .accordion-btn, .project-card, .ai-chip, .contact-social').forEach(addHover)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      observer.disconnect()
      dot.remove()
      ring.remove()
    }
  }, [pathname])

  return null
}
