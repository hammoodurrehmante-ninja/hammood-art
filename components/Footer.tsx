import Link from 'next/link'

const CONTACTS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: 'hammoodchand@gmail.com',
    href: 'mailto:hammoodchand@gmail.com',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: '+92 330 2616738',
    href: 'tel:+923302616738',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hammood-ur-rehman/',
    external: true,
  },
]

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="footer-cta">
      <div className="container">
        <div className="ftr-card">
          <div className="ftr-glow" />

          <div className="ftr-label">
            <span className="ftr-num">05</span>
            <span className="ftr-dash" />
            <span className="ftr-tag">Contact</span>
          </div>

          <h2 className="ftr-heading">
            Got an idea worth <em>designing?</em>
          </h2>
          <p className="ftr-sub">
            I&apos;m currently taking on remote UX/UI, product design and full-stack<br />
            dev using AI. Let&apos;s chat.
          </p>

          <div className="ftr-contacts">
            {CONTACTS.map(({ icon, label, href, external }) => (
              <a
                key={label}
                href={href}
                className="ftr-contact-btn"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="ftr-contact-icon">{icon}</span>
                <span className="ftr-contact-label">{label}</span>
                <span className="ftr-contact-arrow"><ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>

        <div className="ftr-bottom">
          <p className="ftr-copy">© 2026 Hammood Ur Rehman  Lead Product Designer</p>
          <div className="ftr-bottom-links">
            <Link href="/work" className="ftr-bottom-link">Work</Link>
            <Link href="/about" className="ftr-bottom-link">About</Link>
            <Link href="/contact" className="ftr-bottom-link">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
