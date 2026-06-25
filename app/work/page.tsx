import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work — Product Design Portfolio | 9 Case Studies',
  description:
    'Selected case studies by Hammood Ur Rehman — SaaS dashboards, ERP platforms, mobile apps, fintech, AI-powered products & full-stack dev using AI.',
  alternates: { canonical: 'https://hammood.com/work' },
  openGraph: { url: 'https://hammood.com/work' },
}

const BAR_HEIGHTS = [35, 55, 40, 72, 50, 82, 60, 90]

export default function WorkPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">Selected Work</span>
          <h1 className="page-hero-title">Projects that<br />made a <em>difference.</em></h1>
          <p className="page-hero-desc">
            7+ years of solving real design problems from AI-powered ad platforms to enterprise ERP systems, mobile wallets, and telecom apps.
          </p>
        </div>
      </div>

      <main className="container">

        {/* Featured: VedaPure */}
        <div className="project-featured reveal">
          <div className="pf-img-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/vedapure-thumb.png" alt="VedaPure E-Commerce Platform Hammood Ur Rehman" />
          </div>
          <div className="pf-info-col">
            <div>
              <div className="project-cats">
                <span className="project-cat">E-Commerce</span>
                <span className="project-cat">UX/UI Design</span>
                <span className="project-cat">Web Development</span>
              </div>
              <h2 className="project-title" style={{ marginTop: '0.85rem' }}>VedaPure Wellness</h2>
              <p className="project-desc" style={{ marginTop: '0.75rem' }}>
                Designed and built a full e-commerce experience from scratch. A high-fidelity Figma UI brought to life with React, Tailwind CSS, Node.js, and Neon Postgres every screen crafted to feel premium and convert browsers into buyers.
              </p>
              <div className="project-tags" style={{ marginTop: '0.85rem' }}>
                {['Figma', 'React', 'Tailwind CSS', 'Node.js', 'Neon DB'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="https://www.vedhapure.com" target="_blank" rel="noopener noreferrer" className="project-link" style={{ opacity: 0.6 }}>
                Live Site ↗
              </a>
            </div>
          </div>
        </div>

        {/* 2-col grid */}
        <div className="projects-grid" style={{ marginBottom: '1.25rem' }}>

          {/* NextLevel */}
          <div className="project-card reveal rd1">
            <div className="project-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/nextlevel-thumb.png" alt="NextLevel Real Estate Fintech Platform" />
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">Fintech</span>
                <span className="project-cat">Product Design</span>
              </div>
              <h2 className="project-title">NextLevel Platform</h2>
              <p className="project-desc">A digital real estate fintech platform built to simplify the home-buying journey. Multi-role dashboards for buyers, advisors, and agents clear data layouts that cut through the complexity.</p>
              <div className="project-tags">
                {['Figma', 'Dashboard UX', 'Data Visualization', 'Multi-Role UI'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Appeals Doctor */}
          <div className="project-card reveal rd2">
            <div className="project-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/appealsdr-thumb.png" alt="Appeals Doctor SaaS Dashboard" />
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">SaaS Platform</span>
                <span className="project-cat">Amazon Seller Tools</span>
              </div>
              <h2 className="project-title">Appeals Doctor</h2>
              <p className="project-desc">Amazon sellers lose thousands every day to account suspensions. Designed the full dashboard structured case workflows, document tracking, and collaboration tools so sellers recover faster.</p>
              <div className="project-tags">
                {['Figma', 'Dashboard UX', 'Case Management', 'SaaS Workflows'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Pixis Stellar */}
          <div className="project-card reveal rd1">
            <div className="project-thumb">
              <div className="vis vis-pixis">
                <div className="vis-grid-bg" />
                <div className="vis-node-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="vis-node"><div className="vis-node-dot" /></div>
                  ))}
                </div>
                <span className="vis-label">STELLAR / AI AD AUTOMATION</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">AI Advertising</span>
                <span className="project-cat">SaaS Dashboard</span>
              </div>
              <h2 className="project-title">Pixis · Stellar</h2>
              <p className="project-desc">Designed the Stellar dashboard for Pixis an AI-driven ad automation platform. Clean, focused interfaces for complex campaign pipelines built to make AI-powered advertising feel effortless.</p>
              <div className="project-tags">
                {['Figma', 'AI SaaS', 'Product Design', 'Design Systems'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Protego Suite */}
          <div className="project-card reveal rd2">
            <div className="project-thumb">
              <div className="vis vis-protego">
                <svg className="vis-shield-svg" viewBox="0 0 60 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 4L54 14V34C54 48 43 60 30 66C17 60 6 48 6 34V14L30 4Z" stroke="rgba(34,197,94,0.45)" strokeWidth="1.5" fill="rgba(34,197,94,0.05)" />
                  <path d="M30 16L44 22V34C44 42 38 49 30 52C22 49 16 42 16 34V22L30 16Z" stroke="rgba(34,197,94,0.25)" strokeWidth="1" fill="none" />
                </svg>
                <span className="vis-label">COMPLIANCE / SECURITY SUITE</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">Enterprise SaaS</span>
                <span className="project-cat">Security &amp; Compliance</span>
              </div>
              <h2 className="project-title">Protego Suite</h2>
              <p className="project-desc">Enterprise compliance is complex and messy Protego needed it to feel manageable. Designed the full product: dense data tables, multi-step audit workflows, and role-based access controls.</p>
              <div className="project-tags">
                {['Figma', 'UX Research', 'Enterprise UI', 'Role-Based Access'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Etisalat */}
          <div className="project-card reveal rd1">
            <div className="project-thumb">
              <div className="vis vis-etisalat">
                <div className="vis-wave-ring" />
                <div className="vis-wave-ring" />
                <div className="vis-wave-ring" />
                <div className="vis-wave-ring" />
                <div className="vis-center-dot" />
                <span className="vis-label">MOBILE / TELECOM UX</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">Telecom</span>
                <span className="project-cat">Mobile App UX</span>
              </div>
              <h2 className="project-title">Etisalat Mobile App</h2>
              <p className="project-desc">Improved the mobile experience for one of the Middle East&apos;s largest telecom providers. Redesigned onboarding flows, digital service modules, and payment screens.</p>
              <div className="project-tags">
                {['Figma', 'Mobile UX', 'Design System', 'Telecom'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Payvato */}
          <div className="project-card reveal rd2">
            <div className="project-thumb">
              <div className="vis vis-payvato">
                <div className="vis-bars">
                  {BAR_HEIGHTS.map((h, i) => (
                    <div key={i} className="vis-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                <span className="vis-label">FINTECH / P2P WALLET</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">Fintech</span>
                <span className="project-cat">Digital Wallet</span>
              </div>
              <h2 className="project-title">Payvato App &amp; Dashboard</h2>
              <p className="project-desc">A complete fintech product mobile wallet app plus admin dashboard. Dark, clean UI with fast transaction flows and micro-animations designed to make P2P payments feel instant and trustworthy.</p>
              <div className="project-tags">
                {['Figma', 'Mobile UI', 'P2P Payments', 'Dashboard'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Gluon ERP */}
          <div className="project-card reveal rd1">
            <div className="project-thumb">
              <div className="vis vis-erp">
                <div className="vis-erp-table">
                  {[true, false, false, false, false].map((isHead, i) => (
                    <div key={i} className={`vis-tr${isHead ? ' head' : ''}`}>
                      {[0, 1, 2, 3].map(j => <div key={j} className="vis-td" />)}
                    </div>
                  ))}
                </div>
                <span className="vis-label">ERP / MULTI-INDUSTRY PLATFORM</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">ERP System</span>
                <span className="project-cat">SaaS Dashboard</span>
              </div>
              <h2 className="project-title">Gluon ERP</h2>
              <p className="project-desc">Redesigned Softbeats&apos; flagship ERP product and delivered custom dashboards for Isotherm, Rafi Developers, Eto Rice, Silkoshine, and Marine Electronics.</p>
              <div className="project-tags">
                {['Figma', 'ERP Design', 'Complex Workflows', 'Multi-Industry'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* QGOLF VPN */}
          <div className="project-card reveal rd2">
            <div className="project-thumb">
              <div className="vis" style={{ background: 'linear-gradient(135deg, #0a0f14, #0f1820)' }}>
                <div className="vis-wave-ring" style={{ borderColor: 'rgba(93,228,199,0.22)' }} />
                <div className="vis-wave-ring" style={{ borderColor: 'rgba(93,228,199,0.15)', width: '100px', height: '100px', animationDelay: '0.5s' }} />
                <div className="vis-wave-ring" style={{ borderColor: 'rgba(93,228,199,0.10)', width: '150px', height: '150px', animationDelay: '1s' }} />
                <div className="vis-center-dot" style={{ background: '#5de4c7' }} />
                <span className="vis-label">VPN / DASHBOARD + MOBILE APP</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-cats">
                <span className="project-cat">VPN SaaS</span>
                <span className="project-cat">Mobile App</span>
              </div>
              <h2 className="project-title">QGOLF VPN</h2>
              <p className="project-desc">Designed both the admin dashboard and mobile application for QGOLF VPN. Clean, minimal interface with fast server-switching UI and real-time connection status.</p>
              <div className="project-tags">
                {['Figma', 'VPN UX', 'Mobile App', 'Dashboard'].map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', padding: '3rem 0 4rem', borderTop: '1px solid var(--b1)' }}>
          <span className="label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Let&apos;s work together</span>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Have a project <em>in mind?</em></h2>
          <Link href="/contact" className="hero-cta" style={{ display: 'inline-flex' }}>
            <span className="hero-cta-icon">→</span>
            Get in touch
          </Link>
        </div>

      </main>
    </>
  )
}
