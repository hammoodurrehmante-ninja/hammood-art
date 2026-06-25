import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Work  Product Design Portfolio | 15 Projects',
  description:
    'Selected work by Hammood Ur Rehman  SaaS dashboards, ERP platforms, mobile apps, fintech, AI-powered products & full-stack dev using AI.',
  alternates: { canonical: 'https://hammood.com/work' },
  openGraph: { url: 'https://hammood.com/work' },
}

const PROJECTS = [
  {
    slug: 'vedapure',
    title: 'VedaPure Wellness',
    cats: ['E-Commerce', 'UX/UI Design', 'Web Development'],
    desc: 'Designed and built a full e-commerce experience from scratch. A high-fidelity Figma UI brought to life with React, Tailwind CSS, Node.js, and Neon Postgres  every screen crafted to feel premium and convert browsers into buyers.',
    tags: ['Figma', 'React', 'Tailwind CSS', 'Node.js', 'Neon DB'],
    thumb: '/assets/vedapure-card.webp',
    link: { label: 'Live Site ↗', href: 'https://www.vedhapure.com', external: true },
    featured: true,
  },
  {
    slug: 'payvato',
    title: 'Payvato App & Dashboard',
    cats: ['Fintech', 'Digital Wallet'],
    desc: 'A complete fintech product  mobile wallet app plus admin dashboard. Dark, clean UI with fast transaction flows and micro-animations designed to make P2P payments feel instant and trustworthy.',
    tags: ['Figma', 'Mobile UI', 'P2P Payments', 'Dashboard'],
    thumb: '/assets/payvato-card.webp',
  },
  {
    slug: 'protego',
    title: 'Protego Suite',
    cats: ['Enterprise SaaS', 'Security & Compliance'],
    desc: 'Enterprise compliance is complex and messy  Protego needed it to feel manageable. Designed the full product: dense data tables, multi-step audit workflows, and role-based access controls.',
    tags: ['Figma', 'UX Research', 'Enterprise UI', 'Role-Based Access'],
    thumb: '/assets/protego-card.webp',
  },
  {
    slug: 'nextlevel',
    title: 'NextLevel Platform',
    cats: ['Fintech', 'Product Design'],
    desc: 'A digital real estate fintech platform built to simplify the home-buying journey. Multi-role dashboards for buyers, advisors, and agents  clear data layouts that cut through the complexity.',
    tags: ['Figma', 'Dashboard UX', 'Data Visualization', 'Multi-Role UI'],
    thumb: '/assets/nextlevel-card.webp',
  },
  {
    slug: 'appeals-doctor',
    title: 'Appeals Doctor',
    cats: ['SaaS Platform', 'Amazon Seller Tools'],
    desc: 'Amazon sellers lose thousands every day to account suspensions. Designed the full dashboard  structured case workflows, document tracking, and collaboration tools so sellers recover faster.',
    tags: ['Figma', 'Dashboard UX', 'Case Management', 'SaaS Workflows'],
    thumb: '/assets/appeals-doctor-card.webp',
  },
  {
    slug: 'pixis-stellar',
    title: 'Pixis · Stellar',
    cats: ['AI Advertising', 'SaaS Dashboard'],
    desc: 'Designed the Stellar dashboard for Pixis  an AI-driven ad automation platform. Clean, focused interfaces for complex campaign pipelines built to make AI-powered advertising feel effortless.',
    tags: ['Figma', 'AI SaaS', 'Product Design', 'Design Systems'],
    thumb: '/assets/pixis-stellar-card.webp',
  },
  {
    slug: 'mau-brands',
    title: 'Mau Brands',
    cats: ['Amazon Analytics', 'SaaS Dashboard'],
    desc: 'A comprehensive Amazon analytics platform built to give sellers a clear picture of their brand performance. Designed data-dense dashboards that surface key metrics without overwhelming the user.',
    tags: ['Figma', 'Analytics', 'SaaS', 'Dashboard UX'],
    thumb: '/assets/mau-brands-card.webp',
  },
  {
    slug: 'gluon-erp',
    title: 'Gluon ERP',
    cats: ['ERP System', 'SaaS Dashboard'],
    desc: "Redesigned Softbeats' flagship ERP product and delivered custom dashboards for Isotherm, Rafi Developers, Eto Rice, Silkoshine, and Marine Electronics.",
    tags: ['Figma', 'ERP Design', 'Complex Workflows', 'Multi-Industry'],
    thumb: null,
  },
  {
    slug: 'qgolf-vpn',
    title: 'QGolf VPN',
    cats: ['VPN SaaS', 'Mobile App'],
    desc: 'Designed both the admin dashboard and mobile application for QGolf VPN. Clean, minimal interface with fast server-switching UI and real-time connection status.',
    tags: ['Figma', 'VPN UX', 'Mobile App', 'Dashboard'],
    thumb: '/assets/qgolf-vpn-card.webp',
  },
  {
    slug: 'fedposts',
    title: 'FedPosts',
    cats: ['GovTech', 'Marketplace'],
    desc: 'A government-grade marketplace platform connecting federal buyers and vendors. Designed for clarity and compliance  streamlined procurement flows, vendor dashboards, and audit-ready reporting.',
    tags: ['Figma', 'GovTech', 'Marketplace UX', 'Product Design'],
    thumb: '/assets/fedposts-card.webp',
  },
  {
    slug: 'skcab',
    title: 'SKCab',
    cats: ['Transport', 'Mobile App'],
    desc: 'A ride-hailing mobile app built for speed and simplicity. Designed the full passenger and driver experience  real-time tracking, fare estimation, and intuitive booking flows.',
    tags: ['Figma', 'Mobile UX', 'Transport', 'Maps UI'],
    thumb: '/assets/skcab-card.webp',
  },
  {
    slug: 'welx',
    title: 'WELX Cloud',
    cats: ['Cloud Storage', 'Web App'],
    desc: 'A modern cloud storage and file management platform. Designed clean, intuitive interfaces for file uploads, sharing, and team collaboration  productivity without the clutter.',
    tags: ['Figma', 'Cloud UX', 'Web App', 'Dashboard'],
    thumb: '/assets/welx-card.webp',
  },
  {
    slug: 'kamran-shekh',
    title: 'Kamran Shekh',
    cats: ['Portfolio', 'Web Design'],
    desc: 'Personal portfolio website for a creative professional. Designed a bold, minimal digital presence that puts work front and center  crafted to impress and convert visitors into clients.',
    tags: ['Figma', 'Web Design', 'Portfolio', 'UI Design'],
    thumb: '/assets/kamran-shekh-card.webp',
  },
  {
    slug: 'ihealthchart',
    title: 'iHealthChart',
    cats: ['Healthcare', 'Mobile App'],
    desc: 'A healthcare mobile app for tracking patient vitals and medical records. Designed for doctors and patients alike  clear data visualizations, appointment management, and secure health records.',
    tags: ['Figma', 'Healthcare UX', 'Mobile App', 'Data Viz'],
    thumb: '/assets/ihealthchart-card.webp',
  },
  {
    slug: 'namal',
    title: 'Namal App',
    cats: ['E-Reading', 'Mobile App'],
    desc: 'A digital reading app for Urdu fiction  bringing the beloved Namal novel series to mobile. Designed an immersive reading experience with clean typography, dark mode, and offline support.',
    tags: ['Figma', 'Mobile UI', 'E-Reading', 'Typography'],
    thumb: '/assets/namal-card.webp',
  },
]

const featured = PROJECTS[0]
const grid = PROJECTS.slice(1)

export default function WorkPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">Selected Work</span>
          <h1 className="page-hero-title">Projects that<br />made a <em>difference.</em></h1>
          <p className="page-hero-desc">
            7+ years of solving real design problems  from AI-powered ad platforms to enterprise ERP systems, mobile wallets, and telecom apps.
          </p>
        </div>
      </div>

      <main className="container">

        {/* Featured */}
        <div className="project-featured reveal">
          <div className="pf-img-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={featured.thumb!} alt={featured.title} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 'inherit' }} />
          </div>
          <div className="pf-info-col">
            <div>
              <div className="project-cats">
                {featured.cats.map(c => <span key={c} className="project-cat">{c}</span>)}
              </div>
              <h2 className="project-title" style={{ marginTop: '0.85rem' }}>{featured.title}</h2>
              <p className="project-desc" style={{ marginTop: '0.75rem' }}>{featured.desc}</p>
              <div className="project-tags" style={{ marginTop: '0.85rem' }}>
                {featured.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
              </div>
            </div>
            {featured.link && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href={featured.link.href} target="_blank" rel="noopener noreferrer" className="project-link" style={{ opacity: 0.6 }}>
                  {featured.link.label}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="projects-grid" style={{ marginBottom: '1.25rem' }}>
          {grid.map((p, i) => (
            <div key={p.slug} className={`project-card reveal ${i % 2 === 0 ? 'rd1' : 'rd2'}`}>
              <div className="project-thumb">
                {p.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.thumb} alt={p.title} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                ) : (
                  <div className="vis vis-erp">
                    <div className="vis-erp-table">
                      {[true, false, false, false, false].map((isHead, j) => (
                        <div key={j} className={`vis-tr${isHead ? ' head' : ''}`}>
                          {[0, 1, 2, 3].map(k => <div key={k} className="vis-td" />)}
                        </div>
                      ))}
                    </div>
                    <span className="vis-label">ERP / MULTI-INDUSTRY PLATFORM</span>
                  </div>
                )}
              </div>
              <div className="project-body">
                <div className="project-cats">
                  {p.cats.map(c => <span key={c} className="project-cat">{c}</span>)}
                </div>
                <h2 className="project-title">{p.title}</h2>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
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
