export interface ProjectScreen {
  src: string
  caption: string
}

export interface ProjectStep {
  step: string
  desc: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  categories: string[]
  year: string
  role: string
  duration: string
  industry: string
  tools: string[]
  overview: string
  challenge: string
  solution: string
  approach: ProjectStep[]
  outcome: string
  tags: string[]
  accentColor: string
  heroImg: string
  screens: ProjectScreen[]
  live?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'vedapure',
    title: 'VedaPure Wellness',
    tagline: 'End-to-end e-commerce design & development for a premium wellness brand.',
    categories: ['E-Commerce', 'UX/UI Design', 'Web Development'],
    year: '2024',
    role: 'Lead Designer & Developer',
    duration: '3 months',
    industry: 'Wellness & E-Commerce',
    tools: ['Figma', 'React', 'Tailwind CSS', 'Node.js', 'Neon DB'],
    overview: 'VedaPure is a wellness brand that needed a complete e-commerce experience from brand identity to live store. I designed and built the entire product: high-fidelity UI in Figma, then brought it to life with React, Tailwind CSS, Node.js backend, and Neon Postgres for the database.\n\nEvery decision was made with conversion in mind. The design language balances premium feel with clarity clean product pages, a seamless checkout flow, and mobile-first layouts that work across every screen size.',
    challenge: 'The brief was clear but the challenge was real: build a wellness e-commerce store that feels premium without feeling cold, and converts browsers into buyers. The brand was new there was no existing visual identity, no established UI patterns, and no technical infrastructure to build on.',
    solution: 'I started with the brand defining the visual direction, colour system, and typography before touching the UI. Once the brand foundation was in place, I moved into full product design in Figma: product listings, detail pages, cart, checkout, user accounts, and order management. Development followed in React with Node.js and Neon Postgres powering the backend.',
    approach: [
      { step: 'Brand Direction', desc: 'Defined the visual language earthy tones, clean typography, premium but approachable feel.' },
      { step: 'Figma UI Design', desc: 'Designed every screen in high fidelity: homepage, product listing, PDP, cart, checkout, and account flows.' },
      { step: 'React Development', desc: 'Built the frontend with React and Tailwind CSS component-driven, mobile-first, performance-focused.' },
      { step: 'Backend & Launch', desc: 'Implemented the Node.js API and Neon Postgres DB, connected payments, and launched the live store.' },
    ],
    outcome: 'VedaPure launched as a fully functioning e-commerce store. Live at vedhapure.com mobile-optimised, fast, and performing well in its early months.',
    tags: ['Figma', 'React', 'Tailwind CSS', 'Node.js', 'Neon DB', 'E-Commerce'],
    accentColor: '#4ade80',
    heroImg: '/assets/projects/vedapure/hero.png',
    screens: [
      { src: '/assets/projects/vedapure/screen-1.png', caption: 'Homepage hero & featured products' },
      { src: '/assets/projects/vedapure/screen-2.png', caption: 'Product detail page with cart integration' },
      { src: '/assets/projects/vedapure/screen-3.png', caption: 'Mobile checkout flow' },
    ],
    live: 'https://www.vedhapure.com',
  },
  {
    slug: 'payvato',
    title: 'Payvato App & Dashboard',
    tagline: 'A complete fintech product P2P mobile wallet and admin dashboard.',
    categories: ['Fintech', 'Mobile App', 'Dashboard Design'],
    year: '2024',
    role: 'Lead Product Designer',
    duration: '4 months',
    industry: 'Fintech / Digital Payments',
    tools: ['Figma', 'Mobile UI', 'Dashboard Design', 'Design Systems'],
    overview: 'Payvato is a fintech startup building a P2P digital wallet with a companion admin dashboard. I owned the full design: mobile app (iOS & Android) and the web-based admin platform.\n\nThe brief demanded speed and trust users needed to send money in seconds, and the UI needed to communicate security without sacrificing simplicity. The dark, minimal design language achieves exactly that.',
    challenge: 'Fintech apps live or die by trust. Users are handing over real money every screen needs to feel safe, fast, and reliable. The challenge was building a product that felt premium and modern while making complex financial flows feel completely effortless to use.',
    solution: 'I designed the full product across two platforms. For the mobile app, I focused on reducing steps in core flows top-up, send, receive. For the admin dashboard, I designed for data density without clutter: transaction monitoring, user management, and compliance views that were actually usable.',
    approach: [
      { step: 'User Research', desc: 'Mapped the core flows: onboarding, KYC verification, send money, receive, top-up, withdraw, and history.' },
      { step: 'Mobile App Design', desc: 'Designed the iOS/Android app in Figma dark UI, fast flows, micro-animations for key actions.' },
      { step: 'Dashboard Design', desc: 'Designed the admin platform: transaction monitoring, user management, analytics, and compliance views.' },
      { step: 'Design System', desc: 'Built a shared component library covering both platforms with consistent tokens and patterns.' },
    ],
    outcome: 'Delivered a complete Figma handoff covering 80+ screens across mobile and dashboard. Approved by stakeholders and handed to development.',
    tags: ['Figma', 'Mobile UI', 'P2P Payments', 'Dashboard', 'Design Systems', 'Fintech'],
    accentColor: '#4d7cfe',
    heroImg: '/assets/projects/payvato/hero.png',
    screens: [
      { src: '/assets/projects/payvato/screen-1.png', caption: 'Mobile wallet home & balance overview' },
      { src: '/assets/projects/payvato/screen-2.png', caption: 'Send money flow fast & minimal' },
      { src: '/assets/projects/payvato/screen-3.png', caption: 'Admin dashboard transaction monitoring' },
    ],
  },
  {
    slug: 'protego',
    title: 'Protego Suite',
    tagline: 'Enterprise compliance and security made manageable.',
    categories: ['Enterprise SaaS', 'Security & Compliance'],
    year: '2023',
    role: 'Lead Product Designer',
    duration: '5 months',
    industry: 'Enterprise Security',
    tools: ['Figma', 'UX Research', 'Design Systems', 'Enterprise UI'],
    overview: 'Protego is an enterprise security and compliance platform serving large organisations with complex audit and access control requirements. I designed the full product: navigation, information architecture, dense data tables, multi-step audit workflows, and role-based access management.\n\nEnterprise software has a reputation for being ugly and hard to use. Protego needed to break that pattern the same functionality, but a product people actually want to open in the morning.',
    challenge: 'Enterprise compliance tools are notoriously difficult dense with data, complex workflows, and multiple user roles with different permissions and views. The challenge was making genuine complexity feel manageable without dumbing it down or hiding information users need.',
    solution: 'I focused heavily on information hierarchy. Rather than hiding complexity, I structured it. Dense tables became scannable with careful typography and colour coding. Multi-step workflows got clear progress indicators. Role-based views show each user exactly what they need nothing more.',
    approach: [
      { step: 'Discovery & IA', desc: 'Mapped all user roles, permissions, and workflows. Built the information architecture before any UI.' },
      { step: 'Pattern Library', desc: 'Designed reusable components: data tables, status indicators, workflow steps, and form patterns.' },
      { step: 'Core Workflows', desc: 'Designed the main compliance flows: audit creation, evidence collection, review, and approval.' },
      { step: 'Role-Based Views', desc: 'Tailored dashboards for admins, auditors, and read-only reviewers with appropriate scope.' },
    ],
    outcome: 'Delivered a complete design system and 100+ screens across the full product. User testing showed significantly improved task completion rates versus the previous system.',
    tags: ['Figma', 'UX Research', 'Enterprise UI', 'Role-Based Access', 'Design Systems'],
    accentColor: '#22c55e',
    heroImg: '/assets/projects/protego/hero.png',
    screens: [
      { src: '/assets/projects/protego/screen-1.png', caption: 'Compliance dashboard audit overview' },
      { src: '/assets/projects/protego/screen-2.png', caption: 'Multi-step audit workflow' },
      { src: '/assets/projects/protego/screen-3.png', caption: 'Role-based access control panel' },
    ],
  },
  {
    slug: 'nextlevel',
    title: 'NextLevel Platform',
    tagline: 'Real estate fintech multi-role dashboards for buyers, advisors, and agents.',
    categories: ['Fintech', 'Real Estate', 'Product Design'],
    year: '2024',
    role: 'Lead Product Designer',
    duration: '4 months',
    industry: 'Real Estate Fintech',
    tools: ['Figma', 'Dashboard UX', 'Data Visualization', 'Multi-Role UI'],
    overview: 'NextLevel is a digital real estate platform that simplifies the home-buying process through smart financing and advisor-led guidance. I designed a multi-role SaaS platform serving three distinct user types: home buyers, financial advisors, and real estate agents each with their own dashboard and workflow.\n\nOne product, three completely different views sharing the same design system.',
    challenge: 'Real estate transactions involve multiple stakeholders who all need different information at different times. Building one platform that serves buyers, advisors, and agents without overwhelming any of them was the core design problem to solve.',
    solution: 'I designed role-specific dashboards that share the same design system but present entirely different views. Buyers see their progress, financing options, and documents. Advisors see their client portfolio and action items. Agents manage listings and deal pipelines.',
    approach: [
      { step: 'Role Mapping', desc: 'Defined the distinct needs, goals, and core workflows for each of the three user types.' },
      { step: 'Shared Design System', desc: 'Built one component library used across all three dashboard variants for consistency.' },
      { step: 'Buyer Dashboard', desc: 'Designed the home-buying journey: mortgage calculator, document upload, and progress tracker.' },
      { step: 'Advisor & Agent Views', desc: 'Designed client management, deal pipeline, and analytics for professional users.' },
    ],
    outcome: 'Delivered 90+ screens across three role-based dashboard variants with a unified design system. The platform is in active development.',
    tags: ['Figma', 'Dashboard UX', 'Data Visualization', 'Multi-Role UI', 'Fintech'],
    accentColor: '#f59e0b',
    heroImg: '/assets/projects/nextlevel/hero.png',
    screens: [
      { src: '/assets/projects/nextlevel/screen-1.png', caption: 'Buyer dashboard property search & financing' },
      { src: '/assets/projects/nextlevel/screen-2.png', caption: 'Advisor view client portfolio overview' },
      { src: '/assets/projects/nextlevel/screen-3.png', caption: 'Agent dashboard listing & deal pipeline' },
    ],
  },
  {
    slug: 'appeals-doctor',
    title: 'Appeals Doctor',
    tagline: 'Amazon suspension recovery platform structured workflows for faster reinstatement.',
    categories: ['SaaS Platform', 'Amazon Seller Tools'],
    year: '2024',
    role: 'Lead Product Designer',
    duration: '3 months',
    industry: 'E-Commerce SaaS',
    tools: ['Figma', 'Dashboard UX', 'Case Management', 'SaaS Workflows'],
    overview: 'Amazon sellers lose thousands every day when their accounts get suspended. Appeals Doctor is a SaaS platform that guides sellers through the reinstatement process structured case management, document uploads, appeal templates, and collaboration tools.\n\nI designed the complete product: case dashboard, appeal builder, document tracking, and communication interface.',
    challenge: 'Amazon suspension appeals are stressful, time-sensitive, and confusing. Sellers are panicking they need clarity and a clear path forward. The design had to make a complex legal and procedural process feel structured and manageable, not overwhelming.',
    solution: 'I structured the product around a clear case lifecycle: opened → evidence gathering → appeal draft → submitted → resolved. Every screen maps to a stage in that lifecycle. The UI prioritises status visibility and next actions always showing the user what to do next.',
    approach: [
      { step: 'Process Mapping', desc: 'Mapped the full Amazon appeal process: suspension types, evidence requirements, and typical timelines.' },
      { step: 'Case Dashboard', desc: 'Designed the main dashboard case list, status tracking, priority flagging, and deadline alerts.' },
      { step: 'Appeal Builder', desc: 'Designed a guided appeal writing workflow with Amazon-specific templates and best practices.' },
      { step: 'Document Management', desc: 'Designed the evidence collection and document tracking interface.' },
    ],
    outcome: 'Delivered 70+ screens covering the full case lifecycle. The structured approach reduced user confusion and significantly improved the quality of appeals submitted.',
    tags: ['Figma', 'Dashboard UX', 'Case Management', 'SaaS Workflows'],
    accentColor: '#f97316',
    heroImg: '/assets/projects/appeals-doctor/hero.png',
    screens: [
      { src: '/assets/projects/appeals-doctor/screen-1.png', caption: 'Case dashboard active appeals overview' },
      { src: '/assets/projects/appeals-doctor/screen-2.png', caption: 'Appeal builder guided writing workflow' },
      { src: '/assets/projects/appeals-doctor/screen-3.png', caption: 'Document tracking & evidence management' },
    ],
  },
  {
    slug: 'pixis-stellar',
    title: 'Pixis · Stellar',
    tagline: 'AI-driven ad automation complex campaign pipelines made effortless.',
    categories: ['AI Advertising', 'SaaS Dashboard'],
    year: '2023',
    role: 'Lead Product Designer',
    duration: '6 months',
    industry: 'AdTech / AI SaaS',
    tools: ['Figma', 'AI SaaS', 'Product Design', 'Design Systems', 'Data Visualization'],
    overview: 'Pixis is an AI-powered advertising platform. I designed the Stellar dashboard the core interface where brands manage AI-driven campaigns across channels. The product handles large amounts of real-time data: spend, impressions, conversions, audience segments, and creative performance.\n\nThe challenge was making AI automation feel transparent and trustworthy to media buyers used to manual control.',
    challenge: 'AI advertising tools often feel like a black box you put money in and hope for results. Stellar needed to make the AI\'s decisions visible and editable, giving experienced media buyers confidence in the system while reducing their manual work.',
    solution: 'I designed around explainability. Every AI decision surfaces with context: why the system made a budget shift, what audience signal drove a bid change, which creative is underperforming and why. The dashboard shows the AI working, not just the results of its decisions.',
    approach: [
      { step: 'User Research', desc: 'Interviewed media buyers and campaign managers to understand mental models and pain points.' },
      { step: 'Information Architecture', desc: 'Restructured navigation to match campaign management workflows, not the system\'s internal architecture.' },
      { step: 'Dashboard Design', desc: 'Designed campaign overview, ad group management, creative performance, and audience insights.' },
      { step: 'Design System', desc: 'Built a scalable component library for data visualisation, status indicators, and complex filters.' },
    ],
    outcome: 'The Stellar redesign reduced the campaign setup flow from 12 steps to 5. Media buyers reported significantly higher confidence in AI-managed campaigns post-launch.',
    tags: ['Figma', 'AI SaaS', 'Product Design', 'Design Systems', 'Data Visualization'],
    accentColor: '#8b5cf6',
    heroImg: '/assets/projects/pixis-stellar/hero.png',
    screens: [
      { src: '/assets/projects/pixis-stellar/screen-1.png', caption: 'Campaign overview real-time performance' },
      { src: '/assets/projects/pixis-stellar/screen-2.png', caption: 'AI decision log explainable automation' },
      { src: '/assets/projects/pixis-stellar/screen-3.png', caption: 'Creative performance analytics' },
    ],
  },
  {
    slug: 'etisalat',
    title: 'Etisalat Mobile App',
    tagline: 'Redesigning self-service mobile UX for one of the Middle East\'s largest telecoms.',
    categories: ['Telecom', 'Mobile App UX'],
    year: '2023',
    role: 'Lead UX/UI Designer',
    duration: '4 months',
    industry: 'Telecom',
    tools: ['Figma', 'Mobile UX', 'Design System', 'User Research'],
    overview: 'Etisalat is one of the largest telecom providers in the Middle East. I redesigned core sections of the mobile app focusing on onboarding, digital service management, data plan purchasing, and payment flows.\n\nThe goal was to reduce support call volume by improving digital self-service so customers could manage their accounts entirely within the app.',
    challenge: 'The existing app had high abandonment rates on key flows particularly data purchases and service activation. The UI was dense with telecom jargon, navigation didn\'t match how users thought about their accounts, and key actions were buried too deep.',
    solution: 'I redesigned the app from the user\'s perspective, not the telecom\'s product hierarchy. Service management became "What do you want to do today?" Plain language replaced technical jargon. Key actions top-up, data add-on, bill payment came to the surface.',
    approach: [
      { step: 'Audit & Research', desc: 'Audited the existing app, reviewed user feedback, and mapped journeys causing the highest drop-offs.' },
      { step: 'Flow Redesign', desc: 'Redesigned onboarding, data purchases, bill payment, and service management flows end-to-end.' },
      { step: 'Component Library', desc: 'Built a new component library following updated brand guidelines and accessibility standards.' },
      { step: 'Prototype & Test', desc: 'Ran prototype testing sessions with users to validate the simplified flows before handoff.' },
    ],
    outcome: 'Prototype testing showed a 40% reduction in task completion time for key flows. The redesigned screens were approved by stakeholders for development.',
    tags: ['Figma', 'Mobile UX', 'Design System', 'Telecom', 'User Research'],
    accentColor: '#06b6d4',
    heroImg: '/assets/projects/etisalat/hero.png',
    screens: [
      { src: '/assets/projects/etisalat/screen-1.png', caption: 'Redesigned home personalised service hub' },
      { src: '/assets/projects/etisalat/screen-2.png', caption: 'Data plan purchase flow' },
      { src: '/assets/projects/etisalat/screen-3.png', caption: 'Bill payment & account management' },
    ],
  },
  {
    slug: 'gluon-erp',
    title: 'Gluon ERP',
    tagline: 'Redesigning a multi-industry ERP platform for real-world usability.',
    categories: ['ERP System', 'SaaS Dashboard'],
    year: '2023',
    role: 'Lead Product Designer',
    duration: '18 months',
    industry: 'Enterprise Software',
    tools: ['Figma', 'ERP Design', 'Complex Workflows', 'Multi-Industry', 'Design Systems'],
    overview: 'Gluon is Softbeats\' flagship ERP product serving multiple industries manufacturing, real estate, agriculture, textiles, and marine electronics. I redesigned the entire platform and delivered custom dashboard variants for five enterprise clients.\n\nERP systems are notoriously hard to use. They\'re built around data models, not people. My job was to change that.',
    challenge: 'The existing Gluon interface was developer-designed functional but painful. Users needed constant training, data entry was slow, and the navigation didn\'t match real workflows. Clients kept requesting custom builds because the core product didn\'t serve them. The business couldn\'t scale like that.',
    solution: 'I redesigned Gluon with a modular, industry-adaptable approach. The core UI became clean and consistent while industry-specific modules inventory, project tracking, payroll, procurement could be configured without custom development. I also delivered bespoke dashboards for five enterprise clients.',
    approach: [
      { step: 'Platform Audit', desc: 'Audited all existing modules, mapped user journeys across five industries, identified critical pain points.' },
      { step: 'Core Redesign', desc: 'Redesigned navigation, data entry forms, and table views across the entire core platform.' },
      { step: 'Module Design', desc: 'Designed configurable modules: inventory, HR, procurement, project tracking, and financial reporting.' },
      { step: 'Client Dashboards', desc: 'Delivered custom dashboard variants for Isotherm, Rafi Developers, Eto Rice, Silkoshine, and Marine Electronics.' },
    ],
    outcome: 'The redesigned Gluon significantly reduced onboarding time for new enterprise clients. Five custom deployments were completed and shipped.',
    tags: ['Figma', 'ERP Design', 'Complex Workflows', 'Multi-Industry', 'Design Systems'],
    accentColor: '#FF0022',
    heroImg: '/assets/projects/gluon-erp/hero.png',
    screens: [
      { src: '/assets/projects/gluon-erp/screen-1.png', caption: 'Main ERP dashboard operations overview' },
      { src: '/assets/projects/gluon-erp/screen-2.png', caption: 'Inventory management module' },
      { src: '/assets/projects/gluon-erp/screen-3.png', caption: 'Custom client dashboard Rafi Developers' },
    ],
  },
  {
    slug: 'qgolf-vpn',
    title: 'QGOLF VPN',
    tagline: 'Clean, minimal VPN experience admin dashboard and mobile app.',
    categories: ['VPN SaaS', 'Mobile App'],
    year: '2024',
    role: 'Lead Product Designer',
    duration: '3 months',
    industry: 'VPN / Network Security',
    tools: ['Figma', 'VPN UX', 'Mobile App', 'Dashboard', 'Dark UI'],
    overview: 'QGOLF VPN needed a complete product design an admin dashboard for managing servers and users, plus a consumer mobile app for iOS and Android. The client wanted premium positioning: a clean, confident interface that would stand out in a market dominated by generic, functional-but-ugly VPN apps.\n\nI designed both products end-to-end.',
    challenge: 'VPN apps are typically utilitarian they work but feel like security tools, not consumer products. QGOLF wanted a premium feel with an interface that made connection and server selection completely effortless. The challenge was stripping away the technical complexity without losing the control power users need.',
    solution: 'I stripped the UI down to what matters: connection status, server selection, and speed indicators. Dark background, teal accent, minimal chrome. For the admin dashboard, I focused on server health monitoring and user management clean tables, quick filters, and clear status indicators throughout.',
    approach: [
      { step: 'App Architecture', desc: 'Defined the core flows: onboarding, subscription, server selection, connection, and settings.' },
      { step: 'Mobile App Design', desc: 'Designed the iOS/Android app dark UI, animated connection state, quick server switcher.' },
      { step: 'Admin Dashboard', desc: 'Designed the admin platform: server management, user accounts, and subscription analytics.' },
      { step: 'Prototype', desc: 'Built interactive Figma prototypes for both mobile and dashboard for stakeholder review.' },
    ],
    outcome: 'Delivered complete design handoff 50+ mobile screens and 30+ dashboard screens. Positive stakeholder sign-off, currently in active development.',
    tags: ['Figma', 'VPN UX', 'Mobile App', 'Dashboard', 'Dark UI'],
    accentColor: '#5de4c7',
    heroImg: '/assets/projects/qgolf-vpn/hero.png',
    screens: [
      { src: '/assets/projects/qgolf-vpn/screen-1.png', caption: 'Mobile app connection screen' },
      { src: '/assets/projects/qgolf-vpn/screen-2.png', caption: 'Server selection & speed stats' },
      { src: '/assets/projects/qgolf-vpn/screen-3.png', caption: 'Admin dashboard server management' },
    ],
  },
]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}

export function getNextProject(slug: string): Project | undefined {
  const idx = PROJECTS.findIndex(p => p.slug === slug)
  if (idx === -1) return undefined
  return PROJECTS[(idx + 1) % PROJECTS.length]
}
