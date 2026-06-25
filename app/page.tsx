import type { Metadata } from 'next'
import Link from 'next/link'
import Ticker from '@/components/Ticker'
import ProjectsCarousel from '@/components/ProjectsCarousel'

export const metadata: Metadata = {
  title: 'Lead Product Designer | UX/UI, Figma, SaaS & AI — Hammood Ur Rehman',
  description:
    'Lead Product Designer with 7+ years crafting SaaS dashboards, ERP platforms, mobile apps & AI-powered products. Expert in Figma, design systems & full-stack dev using AI. Based in Lahore, Pakistan.',
  alternates: { canonical: 'https://hammood.com' },
  openGraph: { url: 'https://hammood.com' },
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

const ALL_PROJECTS = [
  { title: 'VedaPure',        cat: 'E-Commerce · Web',      date: 'Jan 2025', slug: 'vedapure',       bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'Payvato',         cat: 'Fintech · Mobile App',  date: 'Mar 2025', slug: 'payvato',        bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'Protego',         cat: 'Security · SaaS',       date: 'Jun 2024', slug: 'protego',        bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'NextLevel',       cat: 'Fintech · Dashboard',   date: 'Sep 2024', slug: 'nextlevel',      bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'Appeals Doctor',  cat: 'SaaS · Amazon',         date: 'Dec 2024', slug: 'appeals-doctor', bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'Pixis Stellar',   cat: 'Ad Tech · SaaS',        date: 'Feb 2025', slug: 'pixis-stellar',  bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'Etisalat',        cat: 'Telecom · Enterprise',  date: 'Aug 2023', slug: 'etisalat',       bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'Gluon ERP',       cat: 'ERP · SaaS',            date: 'Nov 2023', slug: 'gluon-erp',      bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
  { title: 'QGolf VPN',       cat: 'VPN · Mobile',          date: 'Apr 2024', slug: 'qgolf-vpn',      bg: 'linear-gradient(145deg, #0e0e0e 0%, #181818 100%)' },
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
            alt="Hammood Ur Rehman Lead Product Designer"
            className="hero-photo"
          />
        </div>

        <div className="hero-right">
          <p className="hero-desc">
            7+ years designing SaaS platforms, ERP dashboards, mobile apps &amp; AI-powered products that people actually enjoy using.
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
          <span className="hero-name-text hero-name-l1">HAMM</span>
          <span className="hero-name-text hero-name-l2">OOD</span>
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

      {/* ── Projects Carousel ──────────────────── */}
      <section className="proj-scroll-section">
        <div className="container">
          <div className="proj-scroll-header">
            <div>
              <span className="label">Selected Work</span>
              <h2 className="section-title" style={{ marginTop: '0.5rem' }}>Projects that made <em>a difference.</em></h2>
            </div>
            <Link href="/work" className="proj-scroll-more">View All +9 →</Link>
          </div>
        </div>

        <ProjectsCarousel projects={ALL_PROJECTS} />

        <div style={{ textAlign: 'center', padding: '3.5rem 0 5rem' }}>
          <Link href="/work" className="hero-cta" style={{ display: 'inline-flex' }}>
            <span className="hero-cta-icon">→</span>
            See all projects
          </Link>
        </div>
      </section>
    </>
  )
}
