import { NextResponse } from 'next/server'
import { trackView } from '@/lib/data'

export async function POST(req: Request) {
  try {
    const { path } = await req.json()
    if (typeof path === 'string') trackView(path)
  } catch {}
  return NextResponse.json({ ok: true })
}
