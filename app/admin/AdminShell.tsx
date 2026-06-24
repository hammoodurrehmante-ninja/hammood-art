'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: '⬡', exact: true },
  { href: '/admin/projects', label: 'Projects', icon: '◈' },
  { href: '/admin/assets', label: 'Assets', icon: '◻' },
  { href: '/admin/settings', label: 'Settings', icon: '◎' },
  { href: '/admin/staff', label: 'Staff', icon: '◉' },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const isLogin = pathname === '/admin/login'
  if (isLogin) return <>{children}</>

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const pageTitle = NAV.find(n => n.exact ? pathname === n.href : pathname.startsWith(n.href))?.label ?? 'Admin'

  return (
    <div className="ad-wrap">
      <aside className="ad-sidebar">
        <div className="ad-logo">
          <div className="ad-logo-mark">H</div>
          <div className="ad-logo-text">
            <div className="ad-logo-name">Hammood</div>
            <div className="ad-logo-sub">Admin Panel</div>
          </div>
        </div>

        <nav className="ad-nav">
          <div className="ad-nav-section">Main</div>
          {NAV.map(({ href, label, icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link key={href} href={href} className={`ad-nav-link${active ? ' active' : ''}`}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                {label}
              </Link>
            )
          })}

          <div className="ad-nav-section" style={{ marginTop: 8 }}>Quick</div>
          <Link href="/" target="_blank" className="ad-nav-link">
            <svg className="ad-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Site
          </Link>
        </nav>

        <div className="ad-sidebar-footer">
          <button className="ad-nav-link" onClick={logout}>
            <svg className="ad-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <div className="ad-main">
        <header className="ad-topbar">
          <div className="ad-topbar-title">{pageTitle}</div>
          <div className="ad-topbar-actions">
            <span style={{ fontSize: 12, color: 'var(--ad-t3)' }}>hammood.com</span>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--ad-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#fff' }}>H</div>
          </div>
        </header>
        <div className="ad-content">{children}</div>
      </div>
    </div>
  )
}
