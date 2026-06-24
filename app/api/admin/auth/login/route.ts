import { NextResponse } from 'next/server'
import { signAdminToken, COOKIE } from '@/lib/auth'

const ADMIN_USER = process.env.ADMIN_USERNAME || 'hammood'
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin2025'

export async function POST(req: Request) {
  const { username, password } = await req.json()

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const token = await signAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}
