import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { dbGetStaff, dbAddStaff, dbUpdateStaff, dbDeleteStaff } from '@/lib/db'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const staff = await dbGetStaff()
  return NextResponse.json(staff)
}

export async function POST(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const member = { ...body, id: Date.now().toString(), joinedAt: new Date().toISOString() }
  await dbAddStaff(member)
  return NextResponse.json(member, { status: 201 })
}

export async function PUT(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const updated = await dbUpdateStaff(body)
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await dbDeleteStaff(id)
  return NextResponse.json({ ok: true })
}
