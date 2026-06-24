'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Project { slug: string; title: string; categories: string[]; year: string; accentColor: string }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')

  async function load() {
    const res = await fetch('/api/admin/projects')
    setProjects(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function duplicate(slug: string) {
    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _duplicate: slug }),
    })
    if (res.ok) { await load(); showToast('Project duplicated') }
  }

  async function deleteProject(slug: string) {
    if (!confirm(`Delete project "${slug}"? This cannot be undone.`)) return
    await fetch(`/api/admin/projects/${slug}`, { method: 'DELETE' })
    await load()
    showToast('Project deleted')
  }

  return (
    <div>
      <div className="ad-page-head">
        <div>
          <h1>Projects</h1>
          <p>{projects.length} case studies</p>
        </div>
        <Link href="/admin/projects/new" className="ad-btn ad-btn-primary">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Link>
      </div>

      {loading ? (
        <div style={{ color: 'var(--ad-t3)', padding: '60px 0', textAlign: 'center' }}>Loading…</div>
      ) : (
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Categories</th>
                <th>Year</th>
                <th>Accent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.slug}>
                  <td>
                    <div className="td-title">{p.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--ad-t3)', marginTop: 2 }}>/work/{p.slug}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {p.categories.slice(0, 2).map(c => (
                        <span key={c} className="ad-badge ad-badge-gray">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td>{p.year}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 4, background: p.accentColor }} />
                      <span style={{ fontSize: 11, color: 'var(--ad-t3)', fontFamily: 'monospace' }}>{p.accentColor}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <Link href={`/admin/projects/${p.slug}`} className="ad-btn ad-btn-ghost ad-btn-sm">Edit</Link>
                      <Link href={`/work/${p.slug}`} target="_blank" className="ad-btn ad-btn-ghost ad-btn-sm">View ↗</Link>
                      <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => duplicate(p.slug)}>Duplicate</button>
                      <button className="ad-btn ad-btn-danger ad-btn-sm" onClick={() => deleteProject(p.slug)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toast && <div className="ad-toast">{toast}</div>}
    </div>
  )
}
