import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Hire Me — Let\'s Build Something Great',
  description:
    'Have a project in mind? Get in touch with Hammood Ur Rehman — Lead Product Designer specializing in SaaS, ERP, mobile apps, AI-powered products & full-stack dev using AI.',
  alternates: { canonical: 'https://hammood.com/contact' },
  openGraph: { url: 'https://hammood.com/contact' },
}

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="label">Get in Touch</span>
          <h1 className="page-hero-title">Have a project <em>in mind?</em></h1>
          <p className="page-hero-desc">
            Whether you need a product designed from scratch, a dashboard that actually makes sense, or just want to talk through an idea I&apos;m here. Let&apos;s build it right.
          </p>
        </div>
      </div>

      <main className="section">
        <div className="container">
          <div className="contact-grid">

            {/* Left: Info */}
            <div className="contact-info-col reveal">
              <span className="label">Direct email</span>
              <a href="mailto:hire@hammood.com?subject=Project%20Inquiry" className="contact-email-link">
                hire@hammood.com →
              </a>

              <span className="label" style={{ marginBottom: '1rem' }}>Connect</span>
              <div className="contact-socials">
                <a href="https://www.linkedin.com/in/hammood-ur-rehman/" target="_blank" rel="noopener noreferrer" className="contact-social">
                  <span className="soc-icon">in</span>
                  LinkedIn
                </a>
                <a href="https://www.behance.net/hammood" target="_blank" rel="noopener noreferrer" className="contact-social">
                  <span className="soc-icon">Bē</span>
                  Behance Portfolio
                </a>
                <a href="/assets/resume/Hammood-Resume.pdf" download className="contact-social">
                  <span className="soc-icon">↓</span>
                  Download Resume
                </a>
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--bg-2)', border: '1px solid var(--b1)', borderRadius: 'var(--rad-lg)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent) 50%, transparent)' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                  <span className="hero-badge-dot" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--t1)' }}>Open to new projects</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--t2)', lineHeight: 1.65 }}>
                  I&apos;m currently taking on new design projects. Typical response time is within 24 hours.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal rd1">
              <ContactForm />
            </div>

          </div>
        </div>
      </main>
    </>
  )
}
