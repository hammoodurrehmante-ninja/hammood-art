import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { dbGetProject, dbUpsertProject, dbDeleteProject } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const project = await dbGetProject(slug)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const body = await req.json()
  const existing = await dbGetProject(slug)
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const updated = { ...existing, ...body }
  await dbUpsertProject(updated)
  revalidatePath('/work')
  revalidatePath(`/work/${slug}`)
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  await dbDeleteProject(slug)
  revalidatePath('/work')
  return NextResponse.json({ ok: true })
}
