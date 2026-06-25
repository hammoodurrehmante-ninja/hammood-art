'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setErr('')
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    })
    setLoading(false)
    if (res.ok) {
      router.push('/admin')
    } else {
      setErr('Invalid username or password')
    }
  }

  return (
    <div className="ad-login-wrap">
      <div className="ad-login-box">
        <div className="ad-login-logo">
          <div className="ad-login-logomark">
            HUR<span style={{ color: 'var(--ad-accent)' }}>.</span>
          </div>
        </div>

        {err && <div className="ad-error">{err}</div>}

        <form onSubmit={submit}>
          <div className="ad-form-group">
            <label className="ad-label">Username</label>
            <input
              className="ad-input"
              type="text"
              placeholder="Enter username"
              value={user}
              onChange={e => setUser(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="ad-form-group">
            <label className="ad-label">Password</label>
            <input
              className="ad-input"
              type="password"
              placeholder="Enter password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
            />
          </div>
          <button className="ad-btn ad-btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8, padding: '11px 16px', fontSize: 14 }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  )
}
