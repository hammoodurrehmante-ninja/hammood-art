import type { Metadata } from 'next'
import Link from 'next/link'
import Ticker from '@/components/Ticker'

export const metadata: Metadata = {
  title: 'Hammood Ur Rehman — Lead Product Designer | UX/UI, Figma & AI SaaS',
  description:
    'Lead Product Designer with 7 years crafting SaaS dashboards, ERP platforms, mobile apps & AI-powered products. Expert in Figma, design systems & end-to-end UX.',
}

const TICKER_ITEMS = [
  'Product Design', 'UX/UI & Figma', 'SaaS Dashboards', 'ERP Systems',
  'Mobile App Design', 'Design Systems', 'AI-Powered Products', 'TikTok · Amazon Ads',
]

const STATS = [
  { num: '7',   lbl: 'Years Experience' },
  { num: '50+', lbl: 'Projects Delivered' },
  { num: '6',   lbl: 'Companies' },
  { num: 'AI',  lbl: 'Daily Workflow' },
]

const CASE_STUDIES = [
  {
    title: 'Payvato',
    cat: 'Fintech · Mobile App',
    img: null,
    bg: 'linear-gradient(145deg, #1a0010 0%, #600010 40%, #FF0022 100%)',
    icon: '₿',
  },
  {
    title: 'VedaPure',
    cat: 'E-Commerce · Web',
    img: '/assets/vedapure-thumb.png',
    bg: null,
    icon: null,
  },
  {
    title: 'Protego',
    cat: 'Security · SaaS',
    img: null,
    bg: 'linear-gradient(145deg, #0D0A14 0%, #3a0010 50%, #800018 100%)',
    icon: '🔒',
  },
  {
    title: 'NextLevel',
    cat: 'Fintech · Dashboard',
    img: '/assets/nextlevel-thumb.png',
    bg: null,
    icon: null,
  },
  {
    title: 'Appeals Doctor',
    cat: 'SaaS · Amazon',
    img: '/assets/appealsdr-thumb.png',
    bg: null,
    icon: null,
  },
]

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────── */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Open to new projects
        </div>

        <div className="hero-left">
          <h1 className="hero-heading">Lead Product<br />Designer</h1>
          <p className="hero-sub">based in Lahore, Pakistan</p>
        </div>

        <div className="hero-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/hammood.png"
            alt="Hammood Ur Rehman — Lead Product Designer"
            className="hero-photo"
          />
        </div>

        <div className="hero-right">
          <p className="hero-desc">
            7 years designing SaaS platforms, ERP dashboards, mobile apps &amp; AI-powered products that people actually enjoy using.
          </p>
          <Link href="/work" className="hero-cta">
            <span className="hero-cta-icon">→</span>
            View my work
          </Link>
          <a href="/assets/resume/Hammood-Resume.pdf" download className="hero-resume">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M8 1v9M4 7l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="hero-name-row" aria-hidden="true">
          <span className="hero-name-text">HAMMOOD</span>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <span className="hero-scroll-text">Scroll</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      {/* ── Ticker ───────────────────────── */}
      <Ticker items={TICKER_ITEMS} />

      {/* ── Stats ────────────────────────── */}
      <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid var(--b1)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 'var(--rad-lg)', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)' }}>
            {STATS.map(({ num, lbl }) => (
              <div key={lbl} style={{ background: 'rgba(255,255,255,0.035)', backdropFilter: 'blur(20px)', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--f-head)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1, textShadow: '0 0 24px rgba(255,0,34,0.5)' }}>{num}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--t3)', marginTop: '0.4rem', fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies Fan ──────────────────── */}
      <section className="cs-fan-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Selected Work</span>
            <h2 className="section-title">Projects that made <em>a difference.</em></h2>
          </div>
        </div>

        <div className="cs-fan-wrap">
          {CASE_STUDIES.map(({ title, cat, img, bg, icon }) => (
            <div
              key={title}
              className="cs-card"
              style={bg ? { background: bg } : undefined}
            >
              {img ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={img} alt={title} className="cs-card-img" />
              ) : (
                <div className="cs-card-solid">{icon}</div>
              )}
              <div className="cs-card-overlay">
                <div className="cs-card-cat">{cat}</div>
                <div className="cs-card-title">{title}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '5rem' }}>
          <Link href="/work" className="hero-cta" style={{ display: 'inline-flex' }}>
            <span className="hero-cta-icon">→</span>
            See all projects
          </Link>
        </div>
      </section>
    </>
  )
}
