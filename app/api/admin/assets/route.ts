import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'assets', 'uploads')

export async function GET() {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const walk = (dir: string, base: string): { name: string; path: string; size: number; modified: string }[] => {
    const result: { name: string; path: string; size: number; modified: string }[] = []
    if (!fs.existsSync(dir)) return result
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      const rel = path.join(base, entry.name)
      if (entry.isDirectory()) {
        result.push(...walk(full, rel))
      } else {
        const stat = fs.statSync(full)
        result.push({
          name: entry.name,
          path: `/assets/uploads/${rel}`.replace(/\\/g, '/'),
          size: stat.size,
          modified: stat.mtime.toISOString(),
        })
      }
    }
    return result
  }

  const publicDir = path.join(process.cwd(), 'public', 'assets')
  const all: { name: string; path: string; size: number; modified: string }[] = []

  for (const subdir of fs.readdirSync(publicDir, { withFileTypes: true })) {
    if (subdir.isDirectory() && subdir.name !== 'uploads') {
      const subPath = path.join(publicDir, subdir.name)
      for (const file of fs.readdirSync(subPath, { withFileTypes: true })) {
        if (file.isFile()) {
          const full = path.join(subPath, file.name)
          const stat = fs.statSync(full)
          all.push({
            name: file.name,
            path: `/assets/${subdir.name}/${file.name}`,
            size: stat.size,
            modified: stat.mtime.toISOString(),
          })
        }
      }
    } else if (subdir.isFile()) {
      const full = path.join(publicDir, subdir.name)
      const stat = fs.statSync(full)
      all.push({
        name: subdir.name,
        path: `/assets/${subdir.name}`,
        size: stat.size,
        modified: stat.mtime.toISOString(),
      })
    }
  }

  all.push(...walk(UPLOADS_DIR, ''))
  return NextResponse.json(all)
}

export async function POST(req: Request) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contentType = req.headers.get('content-type') || ''

  if (contentType.includes('multipart/form-data')) {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer)
    return NextResponse.json({ path: `/assets/uploads/${filename}`, name: filename })
  }

  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'No URL' }, { status: 400 })
  const res = await fetch(url)
  if (!res.ok) return NextResponse.json({ error: 'Fetch failed' }, { status: 400 })
  const buffer = Buffer.from(await res.arrayBuffer())
  const ext = url.split('.').pop()?.split('?')[0] || 'png'
  if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true })
  const filename = `${Date.now()}-url-upload.${ext}`
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer)
  return NextResponse.json({ path: `/assets/uploads/${filename}`, name: filename })
}
