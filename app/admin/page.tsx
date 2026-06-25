'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Analytics {
  pageViews: Record<string, number>
  dailyViews: Record<string, number>
  totalViews: number
  uniqueVisitors: number
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)

  useEffect(() => {
    fetch('/api/admin/analytics').then(r => r.json()).then(setAnalytics)
  }, [])

  const totalViews = analytics?.totalViews ?? 0
  const topPages = analytics
    ? Object.entries(analytics.pageViews).sort((a, b) => b[1] - a[1]).slice(0, 5)
    : []

  const last7 = analytics
    ? (() => {
        const days: { label: string; count: number }[] = []
        for (let i = 6; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const key = d.toISOString().slice(0, 10)
          const label = d.toLocaleDateString('en', { weekday: 'short' })
          days.push({ label, count: analytics.dailyViews[key] ?? 0 })
        }
        return days
      })()
    : []

  const maxVal = Math.max(...last7.map(d => d.count), 1)

  return (
    <div>
      <div className="ad-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your portfolio website</p>
        </div>
        <Link href="/" target="_blank" className="ad-btn ad-btn-ghost">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Live Site
        </Link>
      </div>

      {/* Stats */}
      <div className="ad-stats">
        <div className="ad-stat">
          <div className="ad-stat-label">Total Page Views</div>
          <div className="ad-stat-value">{totalViews.toLocaleString()}</div>
          <div className="ad-stat-change">All time</div>
        </div>
        <div className="ad-stat">
          <div className="ad-stat-label">Today&apos;s Views</div>
          <div className="ad-stat-value">
            {(analytics?.dailyViews[new Date().toISOString().slice(0, 10)] ?? 0).toLocaleString()}
          </div>
          <div className="ad-stat-change">Today</div>
        </div>
        <div className="ad-stat">
          <div className="ad-stat-label">Projects</div>
          <div className="ad-stat-value">9</div>
          <div className="ad-stat-change" style={{ color: 'var(--ad-t3)' }}>Case studies</div>
        </div>
        <div className="ad-stat">
          <div className="ad-stat-label">Pages</div>
          <div className="ad-stat-value">{Object.keys(analytics?.pageViews ?? {}).length}</div>
          <div className="ad-stat-change" style={{ color: 'var(--ad-t3)' }}>Tracked routes</div>
        </div>
      </div>

      <div className="ad-grid-2" style={{ gap: 20 }}>
        {/* Chart */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div>
              <div className="ad-card-title">Page Views  Last 7 Days</div>
              <div className="ad-card-sub">Daily traffic breakdown</div>
            </div>
          </div>
          <div className="ad-chart" style={{ height: 100 }}>
            {last7.map(({ label, count }) => (
              <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div
                  className="ad-chart-bar"
                  style={{ height: `${(count / maxVal) * 80}px`, width: '100%' }}
                  title={`${count} views`}
                />
                <span style={{ fontSize: 10, color: 'var(--ad-t3)' }}>{label}</span>
              </div>
            ))}
          </div>
          {totalViews === 0 && (
            <p style={{ fontSize: 12, color: 'var(--ad-t3)', marginTop: 12, textAlign: 'center' }}>
              Views will appear here as visitors browse your site.
            </p>
          )}
        </div>

        {/* Top Pages */}
        <div className="ad-card">
          <div className="ad-card-head">
            <div className="ad-card-title">Top Pages</div>
          </div>
          {topPages.length === 0 ? (
            <div style={{ color: 'var(--ad-t3)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>
              No views tracked yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {topPages.map(([page, views]) => (
                <div key={page} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                    <span style={{ fontSize: 11, color: 'var(--ad-t3)', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{page || '/'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <div style={{ width: 80, height: 4, background: 'var(--ad-surface2)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ width: `${(views / (topPages[0]?.[1] ?? 1)) * 100}%`, height: '100%', background: 'var(--ad-accent)', borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--ad-t2)', fontWeight: 600, minWidth: 28, textAlign: 'right' }}>{views}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="ad-card" style={{ marginTop: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>Quick Actions</div>
        <div className="ad-grid-4">
          {[
            { href: '/admin/projects/new', icon: '➕', label: 'New Project' },
            { href: '/admin/assets', icon: '🖼', label: 'Upload Asset' },
            { href: '/admin/settings', icon: '⚙️', label: 'Settings' },
            { href: '/admin/staff', icon: '👤', label: 'Add Staff' },
          ].map(({ href, icon, label }) => (
            <Link key={href} href={href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 12px', background: 'var(--ad-surface2)', borderRadius: 'var(--ad-rad)', border: '1px solid var(--ad-border)', textDecoration: 'none', transition: 'border-color 0.15s' }}>
              <span style={{ fontSize: 24 }}>{icon}</span>
              <span style={{ fontSize: 12, color: 'var(--ad-t2)', fontWeight: 500 }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
