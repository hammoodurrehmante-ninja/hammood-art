'use client'
import { useEffect, useRef, useState } from 'react'

interface Asset { name: string; path: string; size: number; modified: string }

const IMG_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.svg']
const isImage = (name: string) => IMG_EXTS.some(e => name.toLowerCase().endsWith(e))
function fmtSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [filter, setFilter] = useState('')
  const [tab, setTab] = useState<'all' | 'images' | 'other'>('all')
  const [drag, setDrag] = useState(false)
  const [toast, setToast] = useState('')
  const [copied, setCopied] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch('/api/admin/assets')
    setAssets(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function uploadFile(file: File) {
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/admin/assets', { method: 'POST', body: form })
    setUploading(false)
    if (res.ok) { await load(); showToast(`Uploaded: ${file.name}`) }
    else showToast('Upload failed')
  }

  async function uploadUrl() {
    if (!urlInput.trim()) return
    setUploading(true)
    const res = await fetch('/api/admin/assets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: urlInput }),
    })
    setUploading(false)
    if (res.ok) { setUrlInput(''); await load(); showToast('Uploaded from URL') }
    else showToast('URL upload failed')
  }

  async function deleteAsset(asset: Asset) {
    if (!confirm(`Delete "${asset.name}"?`)) return
    const filename = asset.name
    const res = await fetch(`/api/admin/assets/${encodeURIComponent(filename)}`, { method: 'DELETE' })
    if (res.ok) { await load(); showToast('Deleted') }
    else showToast('Can only delete uploaded assets')
  }

  function copyPath(path: string) {
    navigator.clipboard.writeText(path)
    setCopied(path)
    setTimeout(() => setCopied(''), 2000)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDrag(false)
    const files = Array.from(e.dataTransfer.files)
    files.forEach(uploadFile)
  }

  const filtered = assets.filter(a => {
    const matchTab = tab === 'all' || (tab === 'images' ? isImage(a.name) : !isImage(a.name))
    const matchFilter = !filter || a.name.toLowerCase().includes(filter.toLowerCase()) || a.path.includes(filter)
    return matchTab && matchFilter
  })

  return (
    <div>
      <div className="ad-page-head">
        <div>
          <h1>Assets</h1>
          <p>{assets.length} files in your site</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className={`ad-upload-zone${drag ? ' drag-over' : ''}`}
        style={{ marginBottom: 20 }}
        onDragOver={e => { e.preventDefault(); setDrag(true) }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
      >
        <div className="ad-upload-icon">🖼</div>
        <div className="ad-upload-title">{uploading ? 'Uploading…' : 'Drop files here or click to upload'}</div>
        <div className="ad-upload-sub">PNG, JPG, SVG, GIF, WebP, PDF  uploads go to /assets/uploads/</div>
        <input ref={fileRef} type="file" multiple accept="image/*,.pdf,.svg" style={{ display: 'none' }}
          onChange={e => Array.from(e.target.files ?? []).forEach(uploadFile)} />
      </div>

      {/* URL upload */}
      <div className="ad-card" style={{ marginBottom: 20 }}>
        <div className="ad-card-title" style={{ marginBottom: 12 }}>Upload from URL</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="ad-input"
            placeholder="https://example.com/image.png"
            value={urlInput}
            onChange={e => setUrlInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && uploadUrl()}
          />
          <button className="ad-btn ad-btn-primary" onClick={uploadUrl} disabled={uploading} style={{ flexShrink: 0 }}>
            {uploading ? '…' : 'Upload'}
          </button>
        </div>
      </div>

      {/* Filter + Tabs */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="ad-tabs" style={{ marginBottom: 0, flex: 1 }}>
          {(['all', 'images', 'other'] as const).map(t => (
            <button key={t} className={`ad-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'all' ? `All (${assets.length})` : t === 'images' ? `Images (${assets.filter(a => isImage(a.name)).length})` : `Other (${assets.filter(a => !isImage(a.name)).length})`}
            </button>
          ))}
        </div>
        <div className="ad-search" style={{ width: 220 }}>
          <span className="ad-search-icon" style={{ fontSize: 14 }}>🔍</span>
          <input className="ad-input ad-search" placeholder="Search assets…" value={filter} onChange={e => setFilter(e.target.value)} style={{ paddingLeft: 32 }} />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ color: 'var(--ad-t3)', padding: '60px 0', textAlign: 'center' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="ad-empty">
          <div className="ad-empty-icon">🖼</div>
          <div className="ad-empty-title">No assets found</div>
          <div className="ad-empty-sub">Upload some files to get started</div>
        </div>
      ) : (
        <div className="ad-assets-grid">
          {filtered.map(asset => (
            <div key={asset.path} className={`ad-asset-item${copied === asset.path ? ' selected' : ''}`} onClick={() => copyPath(asset.path)}>
              <div className="ad-asset-thumb">
                {isImage(asset.name)
                  ? <img src={asset.path} alt={asset.name} loading="lazy" />
                  : <div className="ad-asset-icon">{asset.name.endsWith('.pdf') ? '📄' : '📁'}</div>
                }
              </div>
              <button
                className="ad-asset-del"
                onClick={e => { e.stopPropagation(); deleteAsset(asset) }}
                title="Delete"
              >✕</button>
              <div className="ad-asset-info">
                <div className="ad-asset-name" title={asset.name}>{asset.name}</div>
                <div className="ad-asset-size">{fmtSize(asset.size)}</div>
                {copied === asset.path && <div style={{ fontSize: 9, color: 'var(--ad-green)', marginTop: 2 }}>Copied!</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && <div className="ad-toast">{toast}</div>}
    </div>
  )
}
