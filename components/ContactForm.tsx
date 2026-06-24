'use client'
import { useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Fields = { name: string; email: string; subject: string; message: string }
type Status = { type: 'success' | 'error'; text: string } | null

export default function ContactForm() {
  const [fields, setFields]   = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors]   = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus]   = useState<Status>(null)
  const [loading, setLoading] = useState(false)

  const update = (key: keyof Fields, val: string) => {
    setFields(prev => ({ ...prev, [key]: val }))
    setErrors(prev => ({ ...prev, [key]: false }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Partial<Record<keyof Fields, boolean>> = {}
    if (!fields.name.trim())                                  newErrors.name    = true
    if (!fields.email.trim() || !EMAIL_REGEX.test(fields.email)) newErrors.email = true
    if (!fields.subject.trim())                               newErrors.subject = true
    if (!fields.message.trim())                               newErrors.message = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setStatus({ type: 'error', text: 'Please fill in all fields correctly.' })
      return
    }

    setLoading(true)
    setStatus(null)

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus({ type: 'success', text: "Message sent! I'll get back to you soon." })
        setFields({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ type: 'error', text: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Your Name</label>
          <input
            className={`form-input${errors.name ? ' invalid' : ''}`}
            type="text" id="name"
            placeholder="What should I call you?"
            value={fields.name}
            onChange={e => update('name', e.target.value)}
            autoComplete="name"
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">Email Address</label>
          <input
            className={`form-input${errors.email ? ' invalid' : ''}`}
            type="email" id="email"
            placeholder="your@email.com"
            value={fields.email}
            onChange={e => update('email', e.target.value)}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="subject">Subject</label>
        <input
          className={`form-input${errors.subject ? ' invalid' : ''}`}
          type="text" id="subject"
          placeholder="What's this about?"
          value={fields.subject}
          onChange={e => update('subject', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">Your Message</label>
        <textarea
          className={`form-textarea${errors.message ? ' invalid' : ''}`}
          id="message" rows={6}
          placeholder="Tell me about your project, idea, or whatever's on your mind..."
          value={fields.message}
          onChange={e => update('message', e.target.value)}
        />
      </div>

      <button type="submit" className="form-submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>

      {status && (
        <p className={`form-status show ${status.type}`}>{status.text}</p>
      )}
    </form>
  )
}
