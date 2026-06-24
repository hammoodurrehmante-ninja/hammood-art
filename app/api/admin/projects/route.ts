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

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json(getProjects())
}

export async function POST(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const projects = getProjects()

  if (body._duplicate) {
    const src = projects.find((p: { slug: string }) => p.slug === body._duplicate)
    if (!src) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const copy = { ...src, slug: `${src.slug}-copy-${Date.now()}`, title: `${src.title} (Copy)` }
    projects.push(copy)
    saveProjects(projects)
    revalidatePath('/work')
    return NextResponse.json(copy)
  }

  if (!body.slug) body.slug = body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  projects.push(body)
  saveProjects(projects)
  revalidatePath('/work')
  return NextResponse.json(body, { status: 201 })
}
