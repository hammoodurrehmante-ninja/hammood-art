import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { initDb } from '@/lib/db'

export async function POST() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initDb()
  return NextResponse.json({ ok: true, message: 'Database initialised and seeded' })
}
