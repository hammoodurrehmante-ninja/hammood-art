import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject, getNextProject } from '@/lib/projects'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: `${project.title} — Case Study`,
    description: project.tagline,
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(slug)

  return (
    <main>
      <div className="container">

        {/* Back nav */}
        <Link href="/work" className="proj-back">
          ← All Projects
        </Link>

        {/* Hero */}
        <div className="proj-hero-section reveal">
          <div className="proj-cats">
            {project.categories.map(cat => (
              <span key={cat} className="project-cat">{cat}</span>
            ))}
          </div>
          <h1 className="proj-title">{project.title}</h1>
          <p className="proj-tagline">{project.tagline}</p>

          <div
            className="proj-hero-img-frame"
            style={{ background: `linear-gradient(135deg, ${project.accentColor}1a 0%, var(--bg-2) 100%)` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.heroImg}
              alt={`${project.title} — hero screenshot`}
            />
          </div>

          <div className="proj-meta-strip">
            <div className="proj-meta-cell">
              <div className="proj-meta-label">Role</div>
              <div className="proj-meta-value">{project.role}</div>
            </div>
            <div className="proj-meta-cell">
              <div className="proj-meta-label">Year</div>
              <div className="proj-meta-value">{project.year}</div>
            </div>
            <div className="proj-meta-cell">
              <div className="proj-meta-label">Duration</div>
              <div className="proj-meta-value">{project.duration}</div>
            </div>
            <div className="proj-meta-cell">
              <div className="proj-meta-label">Industry</div>
              <div className="proj-meta-value">{project.industry}</div>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="proj-section reveal">
          <div className="proj-section-label">Overview</div>
          <h2 className="proj-section-title">The Project</h2>
          <div className="proj-body">
            {project.overview.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="project-tags" style={{ marginTop: '1.5rem' }}>
            {project.tools.map(t => <span key={t} className="project-tag">{t}</span>)}
          </div>
        </div>

        {/* Challenge */}
        <div className="proj-section reveal">
          <div className="proj-section-label">The Challenge</div>
          <h2 className="proj-section-title">What needed solving</h2>
          <div className="proj-body">
            <p>{project.challenge}</p>
          </div>
        </div>

        {/* Approach */}
        <div className="proj-section reveal">
          <div className="proj-section-label">My Approach</div>
          <h2 className="proj-section-title">How I worked through it</h2>
          <div className="proj-approach-grid">
            {project.approach.map((step, i) => (
              <div key={i} className="proj-approach-step" style={{ '--step-accent': project.accentColor } as React.CSSProperties}>
                <div className="proj-approach-num">0{i + 1}</div>
                <div className="proj-approach-title">{step.step}</div>
                <div className="proj-approach-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Screens */}
        <div className="proj-section reveal">
          <div className="proj-section-label">Key Screens</div>
          <h2 className="proj-section-title">Selected design work</h2>
          <div className="proj-screens-grid">
            {project.screens.map((screen, i) => (
              <div key={i}>
                <div
                  className="proj-screen-frame"
                  style={{ background: `${project.accentColor}12` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screen.src} alt={screen.caption} />
                </div>
                <p className="proj-screen-caption">{screen.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="proj-section reveal">
          <div className="proj-section-label">Outcome</div>
          <h2 className="proj-section-title">What was delivered</h2>
          <div className="proj-outcome-box">
            <p className="proj-outcome-text">{project.outcome}</p>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                style={{ marginTop: '1.5rem', display: 'inline-flex' }}
              >
                View Live Project <span className="lk-arrow">→</span>
              </a>
            )}
          </div>
        </div>

        {/* Next project */}
        {next && (
          <div className="proj-next-section reveal">
            <span className="proj-section-label" style={{ display: 'block', marginBottom: '1.25rem' }}>Up Next</span>
            <Link href={`/work/${next.slug}`} className="proj-next-card">
              <div>
                <div className="proj-next-label">{next.categories[0]}</div>
                <div className="proj-next-title">{next.title}</div>
              </div>
              <span className="proj-next-arrow">→</span>
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}
