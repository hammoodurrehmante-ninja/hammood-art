import { dbGetSettings, dbSaveSettings, dbGetAnalytics, dbTrackView } from './db'

export type Settings = {
  contact: { email: string; phone: string; location: string }
  social: { linkedin: string; behance: string; twitter: string; instagram: string; github: string }
  whatsapp: { enabled: boolean; number: string; position: string }
  site: { name: string; tagline: string; domain: string; resumeUrl: string }
}

export async function readSettings(): Promise<Settings> {
  return dbGetSettings() as Promise<Settings>
}

export async function writeSettings(data: Settings): Promise<void> {
  await dbSaveSettings(data)
}

export async function readAnalytics() {
  return dbGetAnalytics()
}

export async function trackView(pathname: string): Promise<void> {
  try {
    await dbTrackView(pathname)
  } catch {}
}
