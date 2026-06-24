'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/',        label: 'Home' },
  { href: '/work',    label: 'Work' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Nav() {
  const pathname  = usePathname()
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) setMenuOpen(false)
    document.body.style.overflow = ''
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <Link href="/" className="nav-logo">
          HUR<span className="dot">.</span>
        </Link>
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={`nav-link${pathname === href ? ' active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nav-cta-btn">Let&apos;s Talk</Link>
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`nav-mobile${menuOpen ? ' open' : ''}`} id="navMobile">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} className="nav-link" onClick={toggleMenu}>
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
