import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollRevealInit from '@/components/ScrollRevealInit'

export const metadata: Metadata = {
  title: {
    default: 'Hammood Ur Rehman — Lead Product Designer | UX/UI, Figma & AI SaaS',
    template: '%s — Hammood Ur Rehman',
  },
  description:
    'Lead Product Designer with 7 years crafting SaaS dashboards, ERP platforms, mobile apps & AI-powered products. Expert in Figma, design systems & end-to-end UX.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-grid" aria-hidden="true" />
        <div className="bg-orb-1" aria-hidden="true" />
        <div className="bg-orb-2" aria-hidden="true" />
        <CustomCursor />
        <ScrollRevealInit />
        <Nav />
        <div className="page-wrap">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
