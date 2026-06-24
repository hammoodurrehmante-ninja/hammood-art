import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export async function DELETE(req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { filename } = await params
  const filePath = path.join(process.cwd(), 'public', 'assets', 'uploads', filename)
  if (!fs.existsSync(filePath)) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  fs.unlinkSync(filePath)
  return NextResponse.json({ ok: true })
}
