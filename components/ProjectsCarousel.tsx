'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  title: string
  cat: string
  date: string
  slug: string
  bg: string
}

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  const outerRef    = useRef<HTMLDivElement>(null)
  const rafRef      = useRef<number>(0)
  const isDragging  = useRef(false)
  const isHovered   = useRef(false)
  const hasDragged  = useRef(false)
  const startX      = useRef(0)
  const startScroll = useRef(0)

  useEffect(() => {
    const el = outerRef.current
    if (!el) return

    const SPEED = 0.65

    const tick = () => {
      if (!isDragging.current && !isHovered.current) {
        el.scrollLeft += SPEED
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    hasDragged.current = false
    startX.current = e.pageX
    startScroll.current = outerRef.current?.scrollLeft ?? 0
    outerRef.current?.classList.add('is-dragging')
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const dx = e.pageX - startX.current
    if (Math.abs(dx) > 5) hasDragged.current = true
    if (outerRef.current) outerRef.current.scrollLeft = startScroll.current - dx
  }

  const stopDrag = () => {
    isDragging.current = false
    outerRef.current?.classList.remove('is-dragging')
  }

  const onClickCapture = (e: React.MouseEvent) => {
    if (hasDragged.current) e.preventDefault()
  }

  const doubled = [...projects, ...projects]

  return (
    <div
      ref={outerRef}
      className="proj-scroll-outer"
      onMouseEnter={() => { isHovered.current = true }}
      onMouseLeave={() => { isHovered.current = false; stopDrag() }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDrag}
      onClickCapture={onClickCapture}
    >
      <div className="proj-scroll-track">
        {doubled.map(({ title, cat, date, slug, bg }, i) => (
          <Link
            key={i}
            href={`/work/${slug}`}
            className="proj-sc-card"
            style={{ background: bg }}
            draggable={false}
          >
            <div className="proj-sc-overlay">
              <span className="proj-sc-date">{date}</span>
              <div className="proj-sc-bottom">
                <div className="proj-sc-cat">{cat}</div>
                <div className="proj-sc-title">{title}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
