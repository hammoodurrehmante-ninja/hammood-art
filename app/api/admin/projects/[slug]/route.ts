import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { PROJECTS } from '@/lib/projects'
import { revalidatePath } from 'next/cache'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json')

function getProjects() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
  }
  return PROJECTS
}

function saveProjects(projects: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(projects, null, 2))
}

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const projects = getProjects()
  const project = projects.find((p: { slug: string }) => p.slug === slug)
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(project)
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const body = await req.json()
  const projects = getProjects()
  const idx = projects.findIndex((p: { slug: string }) => p.slug === slug)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  projects[idx] = { ...projects[idx], ...body }
  saveProjects(projects)
  revalidatePath('/work')
  revalidatePath(`/work/${slug}`)
  return NextResponse.json(projects[idx])
}

export async function DELETE(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { slug } = await params
  const projects = getProjects()
  const filtered = projects.filter((p: { slug: string }) => p.slug !== slug)
  saveProjects(filtered)
  revalidatePath('/work')
  return NextResponse.json({ ok: true })
}
