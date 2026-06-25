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
      const now = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Karachi',
        dateStyle: 'long',
        timeStyle: 'short',
      })
      await resend.emails.send({
        from:    'Portfolio Contact <onboarding@resend.dev>',
        replyTo: clean.email,
        to:      'hammoodurrehman.te@gmail.com',
        subject: `[Portfolio] ${clean.subject}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New Portfolio Message</title></head>
<body style="margin:0;padding:0;background:#0a0a0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#0d0a14;border-radius:16px 16px 0 0;padding:36px 40px 28px;border-bottom:2px solid #FF0022;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 4px;color:#FF0022;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">Portfolio Message</p>
                <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.2;">New Inquiry Received</h1>
              </td>
              <td align="right" style="vertical-align:top;">
                <div style="width:48px;height:48px;background:#FF0022;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;">
                  <span style="color:#fff;font-size:22px;line-height:48px;display:block;text-align:center;">✉</span>
                </div>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Sender Info Block -->
        <tr><td style="background:#110e1a;padding:32px 40px 0;">
          <p style="margin:0 0 20px;color:#888;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Sender Details</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                <p style="margin:0 0 4px;color:#555;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Name</p>
                <p style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">${esc(clean.name)}</p>
              </td>
              <td width="50%" style="padding-bottom:20px;vertical-align:top;">
                <p style="margin:0 0 4px;color:#555;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Email</p>
                <a href="mailto:${esc(clean.email)}" style="color:#FF0022;font-size:15px;font-weight:600;text-decoration:none;">${esc(clean.email)}</a>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding-bottom:24px;vertical-align:top;">
                <p style="margin:0 0 4px;color:#555;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;">Subject</p>
                <p style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">${esc(clean.subject)}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Divider -->
        <tr><td style="background:#110e1a;padding:0 40px;">
          <div style="height:1px;background:linear-gradient(90deg,#FF0022 0%,#3a1a20 60%,transparent 100%);"></div>
        </td></tr>

        <!-- Message Body -->
        <tr><td style="background:#110e1a;padding:28px 40px 32px;">
          <p style="margin:0 0 14px;color:#888;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;">Message</p>
          <div style="background:#0d0a14;border-left:3px solid #FF0022;border-radius:0 10px 10px 0;padding:20px 24px;">
            <p style="margin:0;color:#d0cdd8;font-size:15px;line-height:1.7;white-space:pre-line;">${esc(clean.message)}</p>
          </div>
        </td></tr>

        <!-- Reply CTA -->
        <tr><td style="background:#110e1a;padding:0 40px 32px;">
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:#FF0022;border-radius:8px;">
              <a href="mailto:${esc(clean.email)}?subject=Re: ${esc(clean.subject)}" style="display:inline-block;padding:13px 28px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:0.5px;">Reply to ${esc(clean.name)} →</a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d0a14;border-radius:0 0 16px 16px;padding:20px 40px;border-top:1px solid #1e1a2e;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;color:#444;font-size:12px;">Sent from <span style="color:#FF0022;font-weight:600;">hammood.com/contact</span></p>
              </td>
              <td align="right">
                <p style="margin:0;color:#444;font-size:11px;">${now} PKT</p>
              </td>
            </tr>
          </table>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
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
