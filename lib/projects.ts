export type { ProjectScreen, ProjectStep, Project } from './projects-data'
export { PROJECTS } from './projects-data'

import { dbGetProjects, dbGetProject } from './db'
import type { Project } from './projects-data'

export async function getAllProjects(): Promise<Project[]> {
  return dbGetProjects()
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const p = await dbGetProject(slug)
  return p ?? undefined
}

export async function getNextProject(slug: string): Promise<Project | undefined> {
  const projects = await dbGetProjects()
  const idx = projects.findIndex(p => p.slug === slug)
  if (idx === -1) return undefined
  return projects[(idx + 1) % projects.length]
}
