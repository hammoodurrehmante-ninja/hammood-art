import { NextResponse } from 'next/server'
import { readSettings, writeSettings, type Settings } from '@/lib/data'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  const settings = await readSettings()
  return NextResponse.json(settings)
}

export async function PUT(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json() as Settings
  await writeSettings(body)
  return NextResponse.json({ ok: true })
}
