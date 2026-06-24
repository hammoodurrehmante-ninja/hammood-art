import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

export function readJson<T>(filename: string): T {
  const file = path.join(DATA_DIR, filename)
  const raw = fs.readFileSync(file, 'utf-8')
  return JSON.parse(raw) as T
}

export function writeJson(filename: string, data: unknown) {
  const file = path.join(DATA_DIR, filename)
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8')
}

export function readSettings() {
  return readJson<{
    contact: { email: string; phone: string; location: string }
    social: { linkedin: string; behance: string; twitter: string; instagram: string; github: string }
    whatsapp: { enabled: boolean; number: string; position: string }
    site: { name: string; tagline: string; domain: string; resumeUrl: string }
  }>('settings.json')
}

export function readAnalytics() {
  return readJson<{
    pageViews: Record<string, number>
    dailyViews: Record<string, number>
    totalViews: number
    uniqueVisitors: number
  }>('analytics.json')
}

export function trackView(pathname: string) {
  try {
    const data = readAnalytics()
    data.totalViews = (data.totalViews || 0) + 1
    data.pageViews[pathname] = (data.pageViews[pathname] || 0) + 1
    const today = new Date().toISOString().slice(0, 10)
    data.dailyViews[today] = (data.dailyViews[today] || 0) + 1
    writeJson('analytics.json', data)
  } catch {}
}
