'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Screen { src: string; caption: string }
interface Step { step: string; desc: string }

export interface ProjectData {
  slug: string; title: string; tagline: string
  categories: string[]; year: string; role: string
  duration: string; industry: string; tools: string[]
  overview: string; challenge: string; solution: string
  approach: Step[]; outcome: string; tags: string[]
  accentColor: string; heroImg: string; screens: Screen[]
  live?: string
}

const EMPTY: ProjectData = {
  slug: '', title: '', tagline: '', categories: [], year: new Date().getFullYear().toString(),
  role: 'Lead Product Designer', duration: '3 months', industry: '', tools: [],
  overview: '', challenge: '', solution: '', approach: [{ step: '', desc: '' }],
  outcome: '', tags: [], accentColor: '#FF0022', heroImg: '', screens: [], live: '',
}

function TagsInput({ value, onChange, placeholder }: { value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState('')
  function add() {
    const v = input.trim()
    if (v && !value.includes(v)) onChange([...value, v])
    setInput('')
  }
  return (
    <div className="ad-tags-input">
      {value.map(t => (
        <span key={t} className="ad-tag-chip">
          {t}
          <button type="button" onClick={() => onChange(value.filter(x => x !== t))}>×</button>
        </span>
      ))}
      <input
        value={input} placeholder={placeholder || 'Type and press Enter'}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } if (e.key === ',' && input) { e.preventDefault(); add() } }}
      />
    </div>
  )
}

export default function ProjectForm({ initial, isNew }: { initial?: ProjectData; isNew?: boolean }) {
  const router = useRouter()
  const [data, setData] = useState<ProjectData>(initial ?? EMPTY)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  function set<K extends keyof ProjectData>(k: K, v: ProjectData[K]) {
    setData(d => ({ ...d, [k]: v }))
  }

  function showToast(msg: string) {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${initial?.slug}`
    const method = isNew ? 'POST' : 'PUT'
    const payload = { ...data }
    if (isNew && !payload.slug) {
      payload.slug = payload.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setSaving(false)
    if (res.ok) {
      showToast(isNew ? 'Project created!' : 'Saved!')
      if (isNew) router.push('/admin/projects')
    } else {
      showToast('Save failed')
    }
  }

  function addScreen() { set('screens', [...data.screens, { src: '', caption: '' }]) }
  function setScreen(i: number, k: keyof Screen, v: string) {
    const arr = [...data.screens]; arr[i] = { ...arr[i], [k]: v }; set('screens', arr)
  }
  function removeScreen(i: number) { set('screens', data.screens.filter((_, j) => j !== i)) }

  function addStep() { set('approach', [...data.approach, { step: '', desc: '' }]) }
  function setStep(i: number, k: keyof Step, v: string) {
    const arr = [...data.approach]; arr[i] = { ...arr[i], [k]: v }; set('approach', arr)
  }
  function removeStep(i: number) { set('approach', data.approach.filter((_, j) => j !== i)) }

  return (
    <form onSubmit={save}>
      {/* Basic Info */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>Basic Info</div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Title *</label>
            <input className="ad-input" value={data.title} onChange={e => set('title', e.target.value)} placeholder="Project title" required />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Slug (URL)</label>
            <input className="ad-input" value={data.slug} onChange={e => set('slug', e.target.value)} placeholder="auto-generated" />
          </div>
        </div>
        <div className="ad-form-group">
          <label className="ad-label">Tagline *</label>
          <input className="ad-input" value={data.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Short one-liner" required />
        </div>
        <div className="ad-form-row-3">
          <div className="ad-form-group">
            <label className="ad-label">Year</label>
            <input className="ad-input" value={data.year} onChange={e => set('year', e.target.value)} />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Role</label>
            <input className="ad-input" value={data.role} onChange={e => set('role', e.target.value)} />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Duration</label>
            <input className="ad-input" value={data.duration} onChange={e => set('duration', e.target.value)} placeholder="3 months" />
          </div>
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Industry</label>
            <input className="ad-input" value={data.industry} onChange={e => set('industry', e.target.value)} />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Live URL</label>
            <input className="ad-input" type="url" value={data.live ?? ''} onChange={e => set('live', e.target.value)} placeholder="https://" />
          </div>
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Categories</label>
            <TagsInput value={data.categories} onChange={v => set('categories', v)} placeholder="e.g. SaaS, Mobile App" />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Tools</label>
            <TagsInput value={data.tools} onChange={v => set('tools', v)} placeholder="e.g. Figma, React" />
          </div>
        </div>
        <div className="ad-form-group">
          <label className="ad-label">Tags</label>
          <TagsInput value={data.tags} onChange={v => set('tags', v)} placeholder="Additional tags" />
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Accent Color</label>
            <div className="ad-color-row">
              <div className="ad-color-swatch">
                <input type="color" value={data.accentColor} onChange={e => set('accentColor', e.target.value)} />
              </div>
              <input className="ad-input" value={data.accentColor} onChange={e => set('accentColor', e.target.value)} placeholder="#FF0022" style={{ fontFamily: 'monospace' }} />
            </div>
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Hero Image URL</label>
            <input className="ad-input" value={data.heroImg} onChange={e => set('heroImg', e.target.value)} placeholder="/assets/projects/slug/hero.png" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>Content</div>
        <div className="ad-form-group">
          <label className="ad-label">Overview</label>
          <textarea className="ad-textarea" style={{ minHeight: 120 }} value={data.overview} onChange={e => set('overview', e.target.value)} placeholder="Project overview (supports double line breaks for paragraphs)" />
        </div>
        <div className="ad-form-group">
          <label className="ad-label">Challenge</label>
          <textarea className="ad-textarea" value={data.challenge} onChange={e => set('challenge', e.target.value)} />
        </div>
        <div className="ad-form-group">
          <label className="ad-label">Solution</label>
          <textarea className="ad-textarea" value={data.solution} onChange={e => set('solution', e.target.value)} />
        </div>
        <div className="ad-form-group">
          <label className="ad-label">Outcome</label>
          <textarea className="ad-textarea" value={data.outcome} onChange={e => set('outcome', e.target.value)} />
        </div>
      </div>

      {/* Approach Steps */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-head">
          <div className="ad-card-title">Approach Steps</div>
          <button type="button" className="ad-btn ad-btn-ghost ad-btn-sm" onClick={addStep}>+ Add Step</button>
        </div>
        <div className="ad-steps-list">
          {data.approach.map((s, i) => (
            <div key={i} className="ad-step-item">
              <input className="ad-input" value={s.step} onChange={e => setStep(i, 'step', e.target.value)} placeholder="Step title" />
              <input className="ad-input" value={s.desc} onChange={e => setStep(i, 'desc', e.target.value)} placeholder="Description" />
              <button type="button" className="ad-btn ad-btn-danger ad-btn-sm" onClick={() => removeStep(i)}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Screens */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-head">
          <div className="ad-card-title">Design Screens</div>
          <button type="button" className="ad-btn ad-btn-ghost ad-btn-sm" onClick={addScreen}>+ Add Screen</button>
        </div>
        <div className="ad-screens-list">
          {data.screens.map((s, i) => (
            <div key={i} className="ad-screen-item">
              <div className="ad-screen-preview">
                {s.src && <img src={s.src} alt="" />}
              </div>
              <div className="ad-screen-fields">
                <input className="ad-input" value={s.src} onChange={e => setScreen(i, 'src', e.target.value)} placeholder="Image URL /assets/..." />
                <input className="ad-input" value={s.caption} onChange={e => setScreen(i, 'caption', e.target.value)} placeholder="Caption" />
              </div>
              <button type="button" className="ad-btn ad-btn-danger ad-btn-sm" onClick={() => removeScreen(i)} style={{ flexShrink: 0 }}>✕</button>
            </div>
          ))}
          {data.screens.length === 0 && (
            <div style={{ color: 'var(--ad-t3)', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No screens yet. Click Add Screen to add one.</div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <button type="button" className="ad-btn ad-btn-ghost" onClick={() => router.push('/admin/projects')}>Cancel</button>
        <button type="submit" className="ad-btn ad-btn-primary" disabled={saving}>
          {saving ? 'Saving…' : (isNew ? 'Create Project' : 'Save Changes')}
        </button>
      </div>

      {toast && <div className={`ad-toast${toast.includes('fail') ? ' error' : ''}`}>{toast}</div>}
    </form>
  )
}
