import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import { Resend } from 'resend'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS: Record<string, number> = { name: 120, email: 254, subject: 200, message: 4000 }

async function ensureTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  for (const [field, max] of Object.entries(LIMITS)) {
    const val = body[field]
    if (typeof val !== 'string' || val.trim().length === 0)
      return NextResponse.json({ error: `${field} is required.` }, { status: 400 })
    if (val.length > max)
      return NextResponse.json({ error: `${field} must be under ${max} characters.` }, { status: 400 })
  }

  const { name, email, subject, message } = body as Record<string, string>

  if (!EMAIL_REGEX.test(email))
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })

  const clean = {
    name:    name.trim(),
    email:   email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
  }

  // Send email first — don't let DB issues block delivery
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from:    'Portfolio Contact <onboarding@resend.dev>',
        replyTo: clean.email,
        to:      'hammoodurrehman.te@gmail.com',
        subject: `[Portfolio] ${clean.subject}`,
        html: `
          <h2 style="color:#FF0022;font-family:sans-serif">New message from your portfolio</h2>
          <p style="font-family:sans-serif"><strong>Name:</strong> ${esc(clean.name)}</p>
          <p style="font-family:sans-serif"><strong>Email:</strong> <a href="mailto:${esc(clean.email)}">${esc(clean.email)}</a></p>
          <p style="font-family:sans-serif"><strong>Subject:</strong> ${esc(clean.subject)}</p>
          <hr style="border-color:#333" />
          <p style="font-family:sans-serif;white-space:pre-line">${esc(clean.message)}</p>
        `,
      })
    } catch (err: unknown) {
      console.error('Mail error:', (err as Error).message)
    }
  }

  // Save to DB (non-blocking — don't fail the response if this errors)
  try {
    await ensureTable()
    await pool.query(
      'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [clean.name, clean.email, clean.subject, clean.message]
    )
  } catch (err: unknown) {
    console.error('DB error:', (err as Error).message)
  }

  return NextResponse.json({ success: true })
}

export async function GET(req: NextRequest) {
  const key = req.headers.get('x-api-key')
  if (!key || key !== process.env.ADMIN_API_KEY)
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  try {
    await ensureTable()
    const { rows } = await pool.query(
      'SELECT id, name, email, subject, message, submitted_at FROM contact_submissions ORDER BY submitted_at DESC'
    )
    return NextResponse.json(rows)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
