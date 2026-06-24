import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { readJson, writeJson } from '@/lib/data'

interface StaffMember {
  id: string
  name: string
  role: string
  email: string
  phone: string
  department: string
  status: 'active' | 'inactive'
  joinedAt: string
}

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const staff = readJson<StaffMember[]>('staff.json')
  return NextResponse.json(staff)
}

export async function POST(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const staff = readJson<StaffMember[]>('staff.json')
  const member: StaffMember = { ...body, id: Date.now().toString(), joinedAt: new Date().toISOString() }
  staff.push(member)
  writeJson('staff.json', staff)
  return NextResponse.json(member, { status: 201 })
}

export async function PUT(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const staff = readJson<StaffMember[]>('staff.json')
  const idx = staff.findIndex(m => m.id === body.id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  staff[idx] = { ...staff[idx], ...body }
  writeJson('staff.json', staff)
  return NextResponse.json(staff[idx])
}

export async function DELETE(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  const staff = readJson<StaffMember[]>('staff.json')
  writeJson('staff.json', staff.filter(m => m.id !== id))
  return NextResponse.json({ ok: true })
}
