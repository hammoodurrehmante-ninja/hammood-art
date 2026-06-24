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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--b1)', border: '1px solid var(--b1)', borderRadius: 'var(--rad-lg)', overflow: 'hidden' }}>
            {STATS.map(({ num, lbl }) => (
              <div key={lbl} style={{ background: 'var(--bg-2)', padding: '2rem 1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--f-head)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--t3)', marginTop: '0.4rem', fontWeight: 500 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Work ─────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <span className="label">Selected Work</span>
            <h2 className="section-title">Projects that made <em>a difference.</em></h2>
          </div>

          <div className="project-featured reveal rd1">
            <div className="pf-img-col">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/vedapure-thumb.png" alt="VedaPure E-Commerce Platform by Hammood Ur Rehman" />
            </div>
            <div className="pf-info-col">
              <div>
                <div className="project-cats">
                  <span className="project-cat">E-Commerce</span>
                  <span className="project-cat">UX/UI Design</span>
                  <span className="project-cat">Web Development</span>
                </div>
                <h3 className="project-title" style={{ marginTop: '0.85rem' }}>VedaPure Wellness</h3>
                <p className="project-desc" style={{ marginTop: '0.75rem' }}>
                  Designed and built a full e-commerce experience from the ground up. A high-fidelity Figma UI brought to life with React, Tailwind CSS, Node.js, and Neon Postgres — every screen crafted to feel premium and convert.
                </p>
                <div className="project-tags" style={{ marginTop: '0.75rem' }}>
                  {['Figma', 'React', 'Tailwind CSS', 'Node.js', 'Neon DB'].map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <a href="https://www.vedhapure.com" target="_blank" rel="noopener noreferrer" className="project-link">
                View Live Project <span className="lk-arrow">→</span>
              </a>
            </div>
          </div>

          <div className="projects-grid">
            <div className="project-card reveal rd1">
              <div className="project-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/nextlevel-thumb.png" alt="NextLevel Fintech Platform" />
              </div>
              <div className="project-body">
                <div className="project-cats">
                  <span className="project-cat">Fintech</span>
                  <span className="project-cat">Product Design</span>
                </div>
                <h3 className="project-title">NextLevel Platform</h3>
                <p className="project-desc">Digital real estate fintech — multi-role dashboards for buyers, advisors, and agents.</p>
                <div className="project-tags">
                  {['Figma', 'Dashboard UX', 'Multi-Role UI'].map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="project-card reveal rd2">
              <div className="project-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/appealsdr-thumb.png" alt="Appeals Doctor SaaS" />
              </div>
              <div className="project-body">
                <div className="project-cats">
                  <span className="project-cat">SaaS Platform</span>
                  <span className="project-cat">Amazon Seller Tools</span>
                </div>
                <h3 className="project-title">Appeals Doctor</h3>
                <p className="project-desc">Amazon suspension recovery platform — structured case workflows and document tracking.</p>
                <div className="project-tags">
                  {['Figma', 'Dashboard UX', 'SaaS Workflows'].map(tag => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/work" className="hero-cta" style={{ display: 'inline-flex' }}>
              <span className="hero-cta-icon">→</span>
              See all projects
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
