import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { readAnalytics } from '@/lib/data'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = readAnalytics()
  return NextResponse.json(data)
}
