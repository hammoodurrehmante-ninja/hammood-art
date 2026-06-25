import { Pool } from 'pg'
import { PROJECTS, type Project } from './projects-data'

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    let connectionString = process.env.DATABASE_URL || ''
    try {
      const url = new URL(connectionString)
      url.searchParams.delete('sslmode')
      url.searchParams.delete('channel_binding')
      connectionString = url.toString()
    } catch {}
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
    })
  }
  return pool
}

// ─── Schema + Seed ─────────────────────────────────────────

let initialized = false

export async function initDb(): Promise<void> {
  if (initialized) return
  const client = await getPool().connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS settings (
        id INT PRIMARY KEY DEFAULT 1,
        data JSONB NOT NULL
      );
      CREATE TABLE IF NOT EXISTS staff (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL
      );
      CREATE TABLE IF NOT EXISTS analytics (
        id INT PRIMARY KEY DEFAULT 1,
        page_views JSONB NOT NULL DEFAULT '{}',
        daily_views JSONB NOT NULL DEFAULT '{}',
        total_views INT NOT NULL DEFAULT 0,
        unique_visitors INT NOT NULL DEFAULT 0
      );
      CREATE TABLE IF NOT EXISTS projects (
        slug TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    const settingsCount  = await client.query('SELECT COUNT(*) FROM settings')
    const analyticsCount = await client.query('SELECT COUNT(*) FROM analytics')
    const projectsCount  = await client.query('SELECT COUNT(*) FROM projects')

    if (parseInt(settingsCount.rows[0].count) === 0) {
      await client.query('INSERT INTO settings (id, data) VALUES (1, $1)', [
        JSON.stringify({
          contact: { email: 'hire@hammood.com', phone: '+923302616738', location: 'Lahore, Pakistan' },
          social: { linkedin: 'https://www.linkedin.com/in/hammood-ur-rehman/', behance: 'https://www.behance.net/hammood', twitter: '', instagram: '', github: '' },
          whatsapp: { enabled: true, number: '923302616738', position: 'bottom-left' },
          site: { name: 'Hammood Ur Rehman', tagline: 'Lead Product Designer', domain: 'https://hammood.com', resumeUrl: '/assets/resume/Hammood-Resume.pdf' },
        }),
      ])
    }

    if (parseInt(analyticsCount.rows[0].count) === 0) {
      await client.query('INSERT INTO analytics (id) VALUES (1)')
    }

    if (parseInt(projectsCount.rows[0].count) === 0) {
      for (let i = 0; i < PROJECTS.length; i++) {
        await client.query(
          'INSERT INTO projects (slug, data, sort_order) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING',
          [PROJECTS[i].slug, JSON.stringify(PROJECTS[i]), i],
        )
      }
    }

    initialized = true
  } finally {
    client.release()
  }
}

// ─── Settings ──────────────────────────────────────────────

export async function dbGetSettings(): Promise<Record<string, unknown>> {
  await initDb()
  const res = await getPool().query('SELECT data FROM settings WHERE id = 1')
  return (res.rows[0]?.data ?? {}) as Record<string, unknown>
}

export async function dbSaveSettings(data: unknown): Promise<void> {
  await initDb()
  await getPool().query(
    'INSERT INTO settings (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data',
    [JSON.stringify(data)],
  )
}

// ─── Staff ─────────────────────────────────────────────────

export async function dbGetStaff(): Promise<unknown[]> {
  await initDb()
  const res = await getPool().query("SELECT data FROM staff ORDER BY data->>'joinedAt' ASC")
  return res.rows.map(r => r.data)
}

export async function dbAddStaff(member: Record<string, unknown>): Promise<Record<string, unknown>> {
  await initDb()
  await getPool().query('INSERT INTO staff (id, data) VALUES ($1, $2)', [member.id, JSON.stringify(member)])
  return member
}

export async function dbUpdateStaff(member: Record<string, unknown>): Promise<Record<string, unknown> | null> {
  await initDb()
  const res = await getPool().query(
    'UPDATE staff SET data = $2 WHERE id = $1 RETURNING data',
    [member.id, JSON.stringify(member)],
  )
  return (res.rows[0]?.data ?? null) as Record<string, unknown> | null
}

export async function dbDeleteStaff(id: string): Promise<void> {
  await initDb()
  await getPool().query('DELETE FROM staff WHERE id = $1', [id])
}

// ─── Analytics ─────────────────────────────────────────────

export async function dbGetAnalytics() {
  await initDb()
  const res = await getPool().query(
    'SELECT page_views, daily_views, total_views, unique_visitors FROM analytics WHERE id = 1',
  )
  const row = res.rows[0]
  if (!row) return { pageViews: {}, dailyViews: {}, totalViews: 0, uniqueVisitors: 0 }
  return {
    pageViews: row.page_views as Record<string, number>,
    dailyViews: row.daily_views as Record<string, number>,
    totalViews: row.total_views as number,
    uniqueVisitors: row.unique_visitors as number,
  }
}

export async function dbTrackView(pathname: string): Promise<void> {
  await initDb()
  const today = new Date().toISOString().slice(0, 10)
  await getPool().query(
    `UPDATE analytics SET
       total_views = total_views + 1,
       page_views  = jsonb_set(page_views,  ARRAY[$1], to_jsonb(COALESCE((page_views->$1)::int,  0) + 1)),
       daily_views = jsonb_set(daily_views, ARRAY[$2], to_jsonb(COALESCE((daily_views->$2)::int, 0) + 1))
     WHERE id = 1`,
    [pathname, today],
  )
}

// ─── Projects ──────────────────────────────────────────────

export async function dbGetProjects(): Promise<Project[]> {
  await initDb()
  const res = await getPool().query('SELECT data FROM projects ORDER BY sort_order ASC, created_at ASC')
  return res.rows.map(r => r.data as Project)
}

export async function dbGetProject(slug: string): Promise<Project | null> {
  await initDb()
  const res = await getPool().query('SELECT data FROM projects WHERE slug = $1', [slug])
  return (res.rows[0]?.data ?? null) as Project | null
}

export async function dbUpsertProject(project: Project, sortOrder?: number): Promise<Project> {
  await initDb()
  if (sortOrder !== undefined) {
    await getPool().query(
      'INSERT INTO projects (slug, data, sort_order) VALUES ($1, $2, $3) ON CONFLICT (slug) DO UPDATE SET data = EXCLUDED.data, sort_order = EXCLUDED.sort_order',
      [project.slug, JSON.stringify(project), sortOrder],
    )
  } else {
    await getPool().query(
      'INSERT INTO projects (slug, data) VALUES ($1, $2) ON CONFLICT (slug) DO UPDATE SET data = EXCLUDED.data',
      [project.slug, JSON.stringify(project)],
    )
  }
  return project
}

export async function dbDeleteProject(slug: string): Promise<void> {
  await initDb()
  await getPool().query('DELETE FROM projects WHERE slug = $1', [slug])
}
