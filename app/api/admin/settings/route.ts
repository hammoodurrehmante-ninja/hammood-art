import { NextResponse } from 'next/server'
import { readJson, writeJson } from '@/lib/data'
import { getAdminSession } from '@/lib/auth'

export async function GET() {
  const settings = readJson('settings.json')
  return NextResponse.json(settings)
}

export async function PUT(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  writeJson('settings.json', body)
  return NextResponse.json({ ok: true })
}
