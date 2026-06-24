import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import FloatingWidgets from '@/components/FloatingWidgets'

const BASE = 'https://hammood.com'
const OG_IMAGE = `${BASE}/assets/images/og-image.jpg`

export const metadata: Metadata = {
  metadataBase: new URL(BASE),

  title: {
    default: 'Hammood Ur Rehman — Lead Product Designer',
    template: '%s | Hammood Ur Rehman',
  },
  description:
    'Lead Product Designer with 7+ years crafting SaaS dashboards, ERP platforms, mobile apps & AI-powered products. Expert in Figma, design systems & full-stack dev using AI. Based in Lahore, Pakistan.',

  keywords: [
    'Lead Product Designer', 'UX/UI Designer', 'Figma Expert', 'SaaS Dashboard Design',
    'ERP Design', 'Mobile App Design', 'AI Product Design', 'Design Systems',
    'Hammood Ur Rehman', 'Product Designer Pakistan', 'Lahore Designer',
    'Fintech UI Design', 'Full Stack Dev AI', 'Freelance Product Designer',
  ],

  authors:   [{ name: 'Hammood Ur Rehman', url: BASE }],
  creator:   'Hammood Ur Rehman',
  publisher: 'Hammood Ur Rehman',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type:      'website',
    locale:    'en_US',
    url:       BASE,
    siteName:  'Hammood Ur Rehman — Portfolio',
    title:     'Hammood Ur Rehman — Lead Product Designer',
    description:
      'Lead Product Designer with 7+ years crafting SaaS dashboards, ERP platforms, mobile apps & AI-powered products. Based in Lahore, Pakistan.',
    images: [{
      url:    OG_IMAGE,
      width:  1200,
      height: 630,
      alt:    'Hammood Ur Rehman — Lead Product Designer',
    }],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Hammood Ur Rehman — Lead Product Designer',
    description: 'Lead Product Designer with 7+ years crafting SaaS dashboards, ERP platforms & AI-powered products.',
    images:      [OG_IMAGE],
    creator:     '@hammoodur',
  },

  alternates: {
    canonical: BASE,
  },

  icons: {
    icon:      [{ url: '/favicon.ico' }, { url: '/favicon-32x32.png', sizes: '32x32' }],
    shortcut:  '/favicon-16x16.png',
    apple:     '/apple-touch-icon.png',
  },

  manifest: '/site.webmanifest',

  category: 'portfolio',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE}/#person`,
      name: 'Hammood Ur Rehman',
      url: BASE,
      image: `${BASE}/assets/images/hammood.png`,
      jobTitle: 'Lead Product Designer',
      description: 'Lead Product Designer with 7+ years crafting SaaS dashboards, ERP platforms, mobile apps & AI-powered products.',
      email: 'hire@hammood.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Lahore', addressCountry: 'PK' },
      sameAs: [
        'https://www.linkedin.com/in/hammood-ur-rehman/',
        'https://www.behance.net/hammood',
      ],
      knowsAbout: ['UX Design', 'UI Design', 'Figma', 'SaaS', 'ERP', 'Mobile App Design', 'AI', 'Design Systems'],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'Hammood Ur Rehman — Portfolio',
      description: 'Lead Product Designer portfolio — SaaS, ERP, AI products, mobile apps.',
      publisher: { '@id': `${BASE}/#person` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE}/#service`,
      name: 'Hammood Ur Rehman Design Services',
      url: BASE,
      provider: { '@id': `${BASE}/#person` },
      serviceType: ['UX/UI Design', 'Product Design', 'Full-stack Dev using AI', 'Design Systems', 'SaaS Dashboard Design'],
      areaServed: 'Worldwide',
      email: 'hire@hammood.com',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0D0A14" />
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-orb-1" aria-hidden="true" />
        <div className="bg-orb-2" aria-hidden="true" />
        <CustomCursor />
        <ScrollRevealInit />
        <FloatingWidgets />
        <Nav />
        <div className="page-wrap">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
