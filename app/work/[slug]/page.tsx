import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROJECTS, getProject, getNextProject } from '@/lib/projects'

interface Props { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROJECTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  const url = `https://hammood.com/work/${slug}`
  return {
    title: `${project.title} — ${project.role} Case Study`,
    description: `${project.tagline} ${project.industry} · ${project.duration} · Tools: ${project.tools.slice(0,4).join(', ')}.`,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${project.title} Case Study | Hammood Ur Rehman`,
      description: project.tagline,
      images: [{ url: project.heroImg, width: 1200, height: 630, alt: `${project.title} design by Hammood` }],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()
  const next = await getNextProject(slug)

  const durationNum = project.duration.match(/\d+/)?.[0] ?? '3'
  const screensMatch = project.outcome.match(/(\d+)\+?\s*screen/i)
  const screensNum = screensMatch ? `${screensMatch[1]}+` : `${project.screens.length * 20}+`
  const toolsPreview = project.tools.slice(0, 3).join(', ') + (project.tools.length > 3 ? ` +${project.tools.length - 3}` : '')

  return (
    <main className="proj-detail">

      {/* ── Hero ───────────────────────────────────────── */}
      <section
        className="pd-hero"
        style={{ '--proj-accent': project.accentColor } as React.CSSProperties}
      >
        <div
          className="pd-hero-glow"
          style={{ background: `radial-gradient(ellipse 80% 70% at 75% 40%, ${project.accentColor}28 0%, transparent 65%)` }}
        />
        <div
          className="pd-hero-grid-overlay"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor}07 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor}07 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="container pd-hero-inner">
          <Link href="/work" className="pd-back">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Projects
          </Link>

          <div className="pd-hero-body">
            <div className="pd-cats">
              {project.categories.map(cat => (
                <span key={cat} className="pd-cat">{cat}</span>
              ))}
              <span className="pd-year-chip">{project.year}</span>
            </div>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-tagline">{project.tagline}</p>
          </div>
        </div>

        <div className="pd-meta-bar">
          <div className="container">
            <div className="pd-meta-row">
              {[
                { label: 'Role',     value: project.role },
                { label: 'Industry', value: project.industry },
                { label: 'Timeline', value: project.duration },
                { label: 'Tools',    value: toolsPreview },
              ].map(({ label, value }) => (
                <div key={label} className="pd-meta-item">
                  <div className="pd-meta-label">{label}</div>
                  <div className="pd-meta-value">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MacBook Showcase ───────────────────────────── */}
      <section className="pd-showcase">
        <div className="pd-mac-wrap">
          <div className="pd-mac">
            <div className="pd-mac-lid">
              <div className="pd-mac-cam" />
              <div className="pd-mac-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.heroImg} alt={`${project.title} hero`} />
                <div
                  className="pd-mac-fallback"
                  style={{ background: `linear-gradient(135deg, ${project.accentColor}20 0%, #050508 100%)` }}
                />
              </div>
            </div>
            <div className="pd-mac-base">
              <div className="pd-mac-chin" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats + Overview ───────────────────────────── */}
      <section className="pd-section">
        <div className="container">
          <div className="pd-overview-grid">

            <div className="pd-overview-left">
              <div className="pd-bracket-label">[ Overview ]</div>
              <div className="pd-stats-strip">
                <div className="pd-stat-item">
                  <div className="pd-big-num" style={{ color: project.accentColor }}>{durationNum}</div>
                  <div className="pd-stat-lbl">Month{durationNum !== '1' ? 's' : ''}</div>
                </div>
                <div className="pd-stat-sep" />
                <div className="pd-stat-item">
                  <div className="pd-big-num" style={{ color: project.accentColor }}>{project.tools.length}</div>
                  <div className="pd-stat-lbl">Tools</div>
                </div>
                <div className="pd-stat-sep" />
                <div className="pd-stat-item">
                  <div className="pd-big-num" style={{ color: project.accentColor }}>{screensNum}</div>
                  <div className="pd-stat-lbl">Screens</div>
                </div>
              </div>
              <div className="project-tags">
                {project.tools.map(t => <span key={t} className="project-tag">{t}</span>)}
              </div>
            </div>

            <div className="pd-overview-right">
              {project.overview.split('\n\n').map((para, i) => (
                <p key={i} className="pd-body-text">{para}</p>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Challenge ──────────────────────────────────── */}
      <section
        className="pd-challenge-section"
        style={{ '--proj-accent': project.accentColor } as React.CSSProperties}
      >
        <div className="container">
          <div className="pd-bracket-label">[ The Challenge ]</div>
          <blockquote className="pd-challenge-quote">{project.challenge}</blockquote>
        </div>
      </section>

      {/* ── Approach ───────────────────────────────────── */}
      <section className="pd-section">
        <div className="container">
          <div className="pd-bracket-label">[ My Approach ]</div>
          <h2 className="pd-section-h2">How I worked through it</h2>
          <div className="pd-steps">
            {project.approach.map((step, i) => (
              <div
                key={i}
                className="pd-step"
                style={{ '--step-color': project.accentColor } as React.CSSProperties}
              >
                <div className="pd-step-num">0{i + 1}</div>
                <div className="pd-step-body">
                  <div className="pd-step-title">{step.step}</div>
                  <div className="pd-step-desc">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screen Gallery ─────────────────────────────── */}
      <section className="pd-gallery-section">
        <div className="container">
          <div className="pd-bracket-label">[ Design Work ]</div>
          <h2 className="pd-section-h2">Selected Screens</h2>
        </div>
        <div className="pd-gallery">
          {project.screens.map((screen, i) => (
            <div key={i} className={`pd-gallery-item${i === 0 ? ' pd-gallery-item--large' : ''}`}>
              <div className="pd-browser">
                <div className="pd-browser-bar">
                  <div className="pd-browser-dots">
                    <span className="pbd pbd-r" />
                    <span className="pbd pbd-y" />
                    <span className="pbd pbd-g" />
                  </div>
                  <div className="pd-browser-url-bar" />
                  <div style={{ width: 24 }} />
                </div>
                <div className="pd-browser-screen">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={screen.src} alt={screen.caption} />
                  <div
                    className="pd-browser-fallback"
                    style={{ background: `linear-gradient(145deg, ${project.accentColor}16 0%, #0a0a12 100%)` }}
                  />
                </div>
              </div>
              <p className="pd-screen-cap">{screen.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Outcome ────────────────────────────────────── */}
      <section className="pd-outcome-section">
        <div className="container">
          <div className="pd-bracket-label">[ Outcome ]</div>
          <p className="pd-outcome-text">{project.outcome}</p>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="pd-live-btn">
              View Live Project
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
      </section>

      {/* ── Next Project ───────────────────────────────── */}
      {next && (
        <section className="pd-next-section">
          <Link
            href={`/work/${next.slug}`}
            className="pd-next-card"
            style={{ '--next-accent': next.accentColor } as React.CSSProperties}
          >
            <div className="container pd-next-inner">
              <div className="pd-next-label">Next Project</div>
              <div className="pd-next-cat">{next.categories[0]}</div>
              <div className="pd-next-title">{next.title}</div>
            </div>
            <span className="pd-next-arrow">→</span>
          </Link>
        </section>
      )}

    </main>
  )
}
