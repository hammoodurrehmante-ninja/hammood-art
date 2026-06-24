import type { Metadata } from 'next'
import Link from 'next/link'
import Ticker from '@/components/Ticker'
import Accordion from '@/components/Accordion'

export const metadata: Metadata = {
  title: 'About — 7+ Years Designing SaaS, ERP & AI Products',
  description:
    '7+ years building SaaS dashboards, ERP platforms, mobile apps & AI-powered products. Learn about Hammood Ur Rehman\'s design process, experience, skills & full-stack dev using AI.',
  alternates: { canonical: 'https://hammood.com/about' },
  openGraph: { url: 'https://hammood.com/about' },
}

const TICKER_ITEMS = [
  'Figma Expert', 'Design Systems', 'ERP & SaaS', 'Mobile UX',
  'AI Workflows', 'Brand Identity', 'WordPress Dev', 'Product Strategy',
]

const ACCORDION_ITEMS = [
  {
    title: 'UX/UI & Product Design',
    text: 'From discovery to developer handoff I own the full design process. I work in Figma to create user flows, wireframes, interactive prototypes, and pixel-perfect UI that developers can actually build from without constant back-and-forth.',
    tags: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'Developer Handoff'],
  },
  {
    title: 'SaaS, ERP & Dashboard Design',
    text: "My bread and butter. I've designed complex dashboards, ERP platforms, and SaaS products across fintech, telecom, e-commerce, and enterprise sectors. I understand how to make dense data feel light and how to structure workflows users actually follow.",
    tags: ['SaaS Dashboards', 'ERP Systems', 'Data Visualization', 'Multi-Tenant UI'],
  },
  {
    title: 'Graphic Design & Branding',
    text: 'Strong graphic design roots I handle logos, brand identity, print, social media creatives, and marketing assets. I use Adobe Creative Suite alongside Figma, so the visual quality holds whether it\'s a screen or a printed piece.',
    tags: ['Adobe Suite', 'Brand Identity', 'Logo Design', 'Social Media'],
  },
  {
    title: 'Mobile App Design',
    text: 'Designed mobile-first experiences for iOS and Android from fintech wallets and VPN apps to telecom self-service and pharma field tools. I design for how people actually hold and use their phones, not just how things look in Figma.',
    tags: ['iOS & Android', 'Mobile UX', 'Onboarding Flows', 'Gestures & Micro-interactions'],
  },
  {
    title: 'WordPress Development',
    text: "I don't just design in Figma I also build in WordPress. This means I understand dev constraints, know what's achievable, and can deliver end-to-end for clients who need design and development in one place.",
    tags: ['WordPress', 'Elementor / Divi', 'Custom CSS', 'WooCommerce'],
  },
]

const AI_TOOLS = [
  { name: 'Claude',      role: 'Code Gen & Strategy' },
  { name: 'ChatGPT',     role: 'Prompts & Docs' },
  { name: 'Gemini',      role: 'Multimodal Analysis' },
  { name: 'Codex',       role: 'AI Code Integration' },
  { name: 'Higsfield',   role: 'AI Video Flow' },
  { name: 'VEO3',        role: 'Generative Video' },
  { name: 'Magnific AI', role: 'Asset Upscaling' },
  { name: 'Figma AI',    role: 'Design Generation' },
  { name: 'Figma Make',  role: 'Prompt Visuals' },
]

const EXPERIENCE = [
  {
    date: 'Dec 2025 Present', badge: 'Current',
    role: 'Lead UX/UI Designer (Product Designer)',
    company: 'Techesthete · Lahore',
    bullets: [
      'Led end-to-end design of AI-powered SaaS products focused on TikTok and Amazon advertising platforms',
      'Designed product experiences for campaign setup, audience targeting, creative management, budget controls, and performance analytics dashboards',
      'Translated complex advertising and marketplace data into intuitive, action-driven user interfaces',
      'Owned product discovery, user flows, wireframes, high-fidelity UI, and developer handoff',
      'Built and maintained scalable design systems ensuring consistency, accessibility, and cross-platform usability',
      'Collaborated closely with product managers, engineers, and data teams to align UX decisions with business and growth goals',
      'Applied AI-assisted design workflows to validate ideas, optimize usability, and reduce iteration cycles',
      'Led and mentored designers, setting quality standards and improving team design processes',
    ],
    tags: ['AI SaaS', 'Figma', 'Design Systems', 'Analytics Dashboards', 'TikTok Ads', 'Amazon'],
  },
  {
    date: 'Feb 2024 Present', badge: 'Current',
    role: 'Lead UX/UI Designer · Product Designer · Graphic Designer',
    company: 'Freelance · United Kingdom (Remote)',
    bullets: [
      'Designed ERP systems, SaaS dashboards, websites, and mobile apps for global clients',
      'Delivered end-to-end projects from Figma design to live WordPress development',
      'Created websites for Hvato Agency, Kamran Shekh, Helpi Dashboard, WELX Cloud, QGOLF VPN, Payvato, and more',
      'Specialized in dashboard design, mobile-first experiences, and high-converting websites',
      'Key projects: Hvato Website, Payvato App + Dashboard, Northside Maintenance Platform, QGOLF VPN Dashboard + Mobile App',
    ],
    tags: ['Figma', 'WordPress', 'SaaS Dashboards', 'Mobile Apps', 'ERP'],
  },
  {
    date: 'Jun 2023 Dec 2025',
    role: 'Lead UX/UI Designer · ERP & SaaS Product Design',
    company: 'Softbeats (Pvt.) Ltd · Lahore',
    bullets: [
      'Designed and redesigned ERP SaaS platforms and mobile apps for multiple industries',
      'Worked on Gluon ERP (flagship product), redesigning its interface for improved usability',
      'Delivered custom ERP dashboards for Isotherm, Rafi Developers, Eto Rice, Silkoshine Premium, Marine Electronics',
      'Collaborated with developers and business teams to transform complex workflows into simple, user-friendly systems',
      'Focus areas: ERP Systems, SaaS Dashboards, Product Design, Mobile Applications',
    ],
    tags: ['ERP Systems', 'SaaS UI', 'Mobile Apps', 'Figma', 'Product Design'],
  },
  {
    date: 'Jan 2022 Dec 2023',
    role: 'UX/UI Designer → Lead UX/UI Designer · Graphic Designer',
    company: 'Logo Web Pros · Sindh, Pakistan',
    bullets: [
      'Started as a UX/UI Designer and was promoted to Lead Designer',
      'Designed websites and mobile apps for VPN services, crypto platforms, and SaaS startups',
      'Mentored junior designers and managed design delivery for international clients',
      'Learned and applied WordPress customization alongside UX/UI design',
      'Improved product usability and engagement across multiple client projects, leading to higher client retention',
    ],
    tags: ['Web Design', 'Mobile UI', 'WordPress', 'SaaS', 'Crypto'],
  },
  {
    date: 'Aug 2021 Jan 2022',
    role: 'UX/UI Designer · Graphic Designer',
    company: 'Skylinx Technologies · Lahore',
    bullets: [
      'Designed web and mobile applications in collaboration with developers and stakeholders',
      'Created 200+ tablet screens for a pharmaceutical company\'s sales software to help reps pitch to doctors',
      'Conducted requirement gathering, analysis, and prototyping using Adobe XD and Figma',
      'Supported both UI design and graphic design tasks across client projects',
    ],
    tags: ['Adobe XD', 'Figma', 'Wireframing', 'Prototyping'],
  },
  {
    date: 'Mar 2019 Aug 2021',
    role: 'Graphic Designer & UI Designer',
    company: 'Dizainers · Lahore',
    bullets: [
      'Began as a graphic designer, later transitioned into UI/UX design',
      'Designed eCommerce websites, mobile applications, and brand assets (logos, posters, Amazon graphics, social media creatives)',
      'Redesigned websites and apps for the Summits Team, improving usability and structure',
      'Built a foundation in information architecture, stakeholder collaboration, and design systems',
      'Focus areas: Graphic Design, eCommerce UI Design, Social Media Design',
    ],
    tags: ['Graphic Design', 'eCommerce UI', 'Brand Identity', 'Social Media'],
  },
]

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">About Me</span>
          <h1 className="page-hero-title">I design products<br />people <em>enjoy using.</em></h1>
          <p className="page-hero-desc">
            Lead Product Designer with 7+ years of experience turning complex business problems into clean, intuitive products across SaaS, fintech, telecom, ERP, and AI.
          </p>
        </div>
      </div>

      <main>

        {/* About */}
        <section className="section">
          <div className="container">
            <div className="about-grid">

              {/* Photo + Stats */}
              <div className="about-photo-wrap">
                <div className="about-photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/images/hammood.png"
                    alt="Hammood Ur Rehman Lead Product Designer"
                  />
                </div>
                <div className="about-stats">
                  <div className="stat-card"><div className="stat-num">7</div><div className="stat-lbl">Years Exp.</div></div>
                  <div className="stat-card"><div className="stat-num">50+</div><div className="stat-lbl">Projects</div></div>
                  <div className="stat-card"><div className="stat-num">6</div><div className="stat-lbl">Industries</div></div>
                </div>
              </div>

              {/* Bio */}
              <div className="about-text reveal">
                <p className="about-para">
                  I&apos;m Hammood a <strong>Lead Product Designer</strong> with 7+ years of experience turning complex business problems into products people actually want to use. I&apos;ve worked across SaaS, fintech, telecom, e-commerce, and enterprise with startups, agencies, and global clients.
                </p>
                <p className="about-para">
                  My strength is in <span className="about-hl">making complexity feel simple.</span> Whether it&apos;s a dense ERP system, a multi-tenant SaaS dashboard, or a mobile app I focus on the user first and the pixels second. Good design isn&apos;t about aesthetics alone; it&apos;s about products that work the way people expect them to.
                </p>
                <p className="about-para">
                  I currently work at <strong>Techesthete</strong> as Lead Product Designer, building <span className="about-hl">AI-powered SaaS products</span> for TikTok and Amazon advertising platforms. I also take on freelance work for global clients designing everything from fintech apps to enterprise platforms to brand identities.
                </p>
                <p className="about-para">
                  I apply <strong>AI-assisted design workflows</strong> daily using tools like Claude, Figma AI, ChatGPT, and Figma Make to validate ideas faster, reduce iteration cycles, and ship better products sooner. AI doesn&apos;t replace the thinking it accelerates it.
                </p>
                <p className="about-para" style={{ marginTop: '0.5rem' }}>
                  <strong>Education:</strong> BS Information Technology, University of Education (PK), 2016–2020.<br />
                  <strong>Location:</strong> Lahore, Pakistan working with global clients.<br />
                  <strong>Behance:</strong>{' '}
                  <a href="https://www.behance.net/hammood" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>behance.net/hammood</a>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Ticker */}
        <Ticker items={TICKER_ITEMS} reverse />

        {/* Skills */}
        <section className="section">
          <div className="container">
            <div className="section-head reveal">
              <span className="label">What I Do</span>
              <h2 className="section-title">My skills, <em>honestly.</em></h2>
            </div>

            <div className="skills-grid">
              <div className="reveal rd1">
                <Accordion items={ACCORDION_ITEMS} />
              </div>

              <div className="reveal rd2">
                <div className="ai-panel">
                  <h3 className="ai-panel-title">
                    <span className="ai-dot" />
                    AI Tools I Actually Use
                  </h3>
                  <p className="ai-panel-desc">
                    Not buzzwords these are in my daily workflow. I use AI to move faster, validate concepts earlier, and spend more time on decisions that actually matter.
                  </p>
                  <div className="ai-chips">
                    {AI_TOOLS.map(({ name, role }) => (
                      <div key={name} className="ai-chip">
                        <div className="ai-chip-name">{name}</div>
                        <div className="ai-chip-role">{role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="section" style={{ borderTop: '1px solid var(--b1)' }}>
          <div className="container">
            <div className="section-head reveal">
              <span className="label">Work History</span>
              <h2 className="section-title">7+ years of building <em>real products.</em></h2>
            </div>

            <div className="exp-list">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="exp-item reveal">
                  <div className="exp-date-col">
                    <div className="exp-date">{exp.date}</div>
                    {exp.badge && <div className="exp-badge">{exp.badge}</div>}
                  </div>
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <p className="exp-company">{exp.company}</p>
                    <ul className="exp-bullets">
                      {exp.bullets.map((b, j) => <li key={j}>{b}</li>)}
                    </ul>
                    <div className="exp-tags">
                      {exp.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', padding: '3rem var(--pad) 4rem', borderTop: '1px solid var(--b1)' }}>
          <span className="label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Let&apos;s work together</span>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Ready to build something <em>great?</em></h2>
          <Link href="/contact" className="hero-cta" style={{ display: 'inline-flex' }}>
            <span className="hero-cta-icon">→</span>
            Get in touch
          </Link>
        </div>

      </main>
    </>
  )
}
