'use client'
import { useEffect, useState } from 'react'

interface Settings {
  contact: { email: string; phone: string; location: string }
  social: { linkedin: string; behance: string; twitter: string; instagram: string; github: string }
  whatsapp: { enabled: boolean; number: string; position: string }
  site: { name: string; tagline: string; domain: string; resumeUrl: string }
}

const EMPTY: Settings = {
  contact: { email: '', phone: '', location: '' },
  social: { linkedin: '', behance: '', twitter: '', instagram: '', github: '' },
  whatsapp: { enabled: true, number: '', position: 'bottom-left' },
  site: { name: '', tagline: '', domain: '', resumeUrl: '' },
}

export default function SettingsPage() {
  const [s, setS] = useState<Settings>(EMPTY)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings').then(r => r.json()).then(d => { setS(d); setLoading(false) })
  }, [])

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function save() {
    setSaving(true)
    await fetch('/api/admin/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
    setSaving(false)
    showToast('Settings saved!')
  }

  function patch<K extends keyof Settings>(section: K, key: keyof Settings[K], val: unknown) {
    setS(prev => ({ ...prev, [section]: { ...prev[section], [key]: val } }))
  }

  if (loading) return <div style={{ color: 'var(--ad-t3)', padding: 60, textAlign: 'center' }}>Loading…</div>

  const WA_POSITIONS = [
    { value: 'bottom-left', label: '↙ Bottom Left' },
    { value: 'bottom-right', label: '↘ Bottom Right' },
    { value: 'top-left', label: '↖ Top Left' },
    { value: 'top-right', label: '↗ Top Right' },
  ]

  return (
    <div>
      <div className="ad-page-head">
        <div><h1>Settings</h1><p>Manage contact info, social links & widget config</p></div>
        <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {/* Site */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>🌐</span> Site Info
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Site Name</label>
            <input className="ad-input" value={s.site.name} onChange={e => patch('site', 'name', e.target.value)} />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Tagline</label>
            <input className="ad-input" value={s.site.tagline} onChange={e => patch('site', 'tagline', e.target.value)} />
          </div>
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Domain</label>
            <input className="ad-input" value={s.site.domain} onChange={e => patch('site', 'domain', e.target.value)} placeholder="https://hammood.com" />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Resume URL</label>
            <input className="ad-input" value={s.site.resumeUrl} onChange={e => patch('site', 'resumeUrl', e.target.value)} placeholder="/assets/resume/resume.pdf" />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>📧</span> Contact Details
        </div>
        <div className="ad-form-row-3">
          <div className="ad-form-group">
            <label className="ad-label">Email</label>
            <input className="ad-input" type="email" value={s.contact.email} onChange={e => patch('contact', 'email', e.target.value)} placeholder="hire@hammood.com" />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Phone</label>
            <input className="ad-input" value={s.contact.phone} onChange={e => patch('contact', 'phone', e.target.value)} placeholder="+923302616738" />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Location</label>
            <input className="ad-input" value={s.contact.location} onChange={e => patch('contact', 'location', e.target.value)} placeholder="Lahore, Pakistan" />
          </div>
        </div>
      </div>

      {/* Social */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>🔗</span> Social Media
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">LinkedIn URL</label>
            <input className="ad-input" value={s.social.linkedin} onChange={e => patch('social', 'linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Behance URL</label>
            <input className="ad-input" value={s.social.behance} onChange={e => patch('social', 'behance', e.target.value)} placeholder="https://behance.net/..." />
          </div>
        </div>
        <div className="ad-form-row">
          <div className="ad-form-group">
            <label className="ad-label">Twitter / X Handle</label>
            <input className="ad-input" value={s.social.twitter} onChange={e => patch('social', 'twitter', e.target.value)} placeholder="@username" />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Instagram</label>
            <input className="ad-input" value={s.social.instagram} onChange={e => patch('social', 'instagram', e.target.value)} placeholder="https://instagram.com/..." />
          </div>
        </div>
        <div className="ad-form-group" style={{ maxWidth: '50%' }}>
          <label className="ad-label">GitHub</label>
          <input className="ad-input" value={s.social.github} onChange={e => patch('social', 'github', e.target.value)} placeholder="https://github.com/..." />
        </div>
      </div>

      {/* WhatsApp Widget */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 16 }}>
          <span style={{ marginRight: 8 }}>💬</span> WhatsApp Widget
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <label className="ad-toggle">
            <input
              type="checkbox"
              checked={s.whatsapp.enabled}
              onChange={e => patch('whatsapp', 'enabled', e.target.checked)}
            />
            <div className="ad-toggle-track"><div className="ad-toggle-thumb" /></div>
            <span className="ad-toggle-label">{s.whatsapp.enabled ? 'Widget Enabled' : 'Widget Disabled'}</span>
          </label>
          <span className={`ad-badge ${s.whatsapp.enabled ? 'ad-badge-green' : 'ad-badge-gray'}`}>
            {s.whatsapp.enabled ? 'Live' : 'Hidden'}
          </span>
        </div>

        <div className="ad-form-group" style={{ maxWidth: '50%' }}>
          <label className="ad-label">WhatsApp Number (digits only, with country code)</label>
          <input
            className="ad-input"
            value={s.whatsapp.number}
            onChange={e => patch('whatsapp', 'number', e.target.value.replace(/\D/g, ''))}
            placeholder="923302616738"
          />
          <span style={{ fontSize: 11, color: 'var(--ad-t3)', marginTop: 4 }}>
            Will open: wa.me/{s.whatsapp.number}
          </span>
        </div>

        <div className="ad-form-group">
          <label className="ad-label">Widget Position</label>
          <div className="ad-pos-grid" style={{ maxWidth: 360 }}>
            {WA_POSITIONS.map(pos => (
              <div
                key={pos.value}
                className={`ad-pos-option${s.whatsapp.position === pos.value ? ' active' : ''}`}
                onClick={() => patch('whatsapp', 'position', pos.value)}
              >
                {pos.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="ad-btn ad-btn-primary" onClick={save} disabled={saving} style={{ padding: '10px 28px' }}>
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {toast && <div className="ad-toast">{toast}</div>}
    </div>
  )
}
