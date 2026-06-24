'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProjectForm, { type ProjectData } from '../ProjectForm'

export default function EditProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/projects/${slug}`)
      .then(r => r.json())
      .then(d => { setProject(d); setLoading(false) })
  }, [slug])

  if (loading) return <div style={{ color: 'var(--ad-t3)', padding: 40, textAlign: 'center' }}>Loading…</div>
  if (!project) return <div style={{ color: '#ef4444', padding: 40 }}>Project not found</div>

  return (
    <div>
      <div className="ad-page-head">
        <div>
          <h1>Edit: {project.title}</h1>
          <p>/work/{slug}</p>
        </div>
      </div>
      <ProjectForm initial={project} />
    </div>
  )
}
