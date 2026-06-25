import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { dbGetProjects, dbGetProject, dbUpsertProject } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import type { Project } from '@/lib/projects-data'

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const projects = await dbGetProjects()
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json() as Project & { _duplicate?: string }

  if (body._duplicate) {
    const src = await dbGetProject(body._duplicate)
    if (!src) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const copy: Project = { ...src, slug: `${src.slug}-copy-${Date.now()}`, title: `${src.title} (Copy)` }
    await dbUpsertProject(copy)
    revalidatePath('/work')
    return NextResponse.json(copy)
  }

  if (!body.slug) body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  await dbUpsertProject(body)
  revalidatePath('/work')
  return NextResponse.json(body, { status: 201 })
}
