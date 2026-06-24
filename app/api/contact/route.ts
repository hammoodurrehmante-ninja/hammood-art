import { NextRequest, NextResponse } from 'next/server'
import { Pool } from 'pg'
import nodemailer from 'nodemailer'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LIMITS: Record<string, number> = { name: 120, email: 254, subject: 200, message: 4000 }

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

  try {
    await pool.query(
      'INSERT INTO contact_submissions (name, email, subject, message) VALUES ($1, $2, $3, $4)',
      [clean.name, clean.email, clean.subject, clean.message]
    )
  } catch (err: unknown) {
    console.error('DB error:', (err as Error).message)
    return NextResponse.json({ error: 'Failed to save message. Please try again.' }, { status: 500 })
  }

  if (
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS &&
    process.env.EMAIL_USER !== 'your-gmail@gmail.com'
  ) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      })
      await transporter.sendMail({
        from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        replyTo: clean.email,
        to:      process.env.EMAIL_USER,
        subject: `[Portfolio] ${clean.subject}`,
        html: `
          <h2 style="color:#FF0022">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${esc(clean.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${esc(clean.email)}">${esc(clean.email)}</a></p>
          <p><strong>Subject:</strong> ${esc(clean.subject)}</p>
          <hr style="border-color:#333" />
          <p style="white-space:pre-line">${esc(clean.message)}</p>
        `,
      })
    } catch (err: unknown) {
      console.error('Mail error:', (err as Error).message)
    }
  }

  return NextResponse.json({ success: true })
}

export async function GET(req: NextRequest) {
  const key = req.headers.get('x-api-key')
  if (!key || key !== process.env.ADMIN_API_KEY)
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

  try {
    const { rows } = await pool.query(
      'SELECT id, name, email, subject, message, submitted_at FROM contact_submissions ORDER BY submitted_at DESC'
    )
    return NextResponse.json(rows)
  } catch (err: unknown) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}
