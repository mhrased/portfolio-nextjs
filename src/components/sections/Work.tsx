import type { ProjectItem } from '@/lib/data.server'

const THEME_COLORS: Record<string, { primary: string; bg: string; border: string }> = {
  purple: { primary: '#7359ff', bg: 'rgba(115,89,255,0.15)', border: 'rgba(115,89,255,0.3)' },
  blue: { primary: '#33a6ff', bg: 'rgba(51,166,255,0.15)', border: 'rgba(51,166,255,0.3)' },
  green: { primary: '#33d980', bg: 'rgba(51,217,128,0.15)', border: 'rgba(51,217,128,0.3)' },
  yellow: { primary: '#ffd933', bg: 'rgba(255,217,51,0.15)', border: 'rgba(255,217,51,0.3)' },
  pink: { primary: '#ff5c8a', bg: 'rgba(255,92,138,0.15)', border: 'rgba(255,92,138,0.3)' },
}

const DEFAULT_FALLBACK_PROJECTS: ProjectItem[] = [
  {
    id: 'p1',
    title: 'Kriyakarak',
    type: 'Web · Full-stack',
    desc: 'Service-marketplace platform with provider onboarding, booking flow, payments and admin console. Built and deployed end-to-end.',
    url: 'https://kriyakarak.com/',
    linkLabel: 'VISIT LIVE',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
    image: null,
    wide: true,
    order: 0,
    colorTheme: 'purple',
  },
  {
    id: 'p2',
    title: 'Filmd',
    type: 'Web · WordPress',
    desc: 'Creative studio site — custom WordPress theme, video-heavy layouts, performance tuned for UK users.',
    url: 'https://www.filmd.co.uk/',
    linkLabel: 'VISIT LIVE',
    tags: ['WordPress', 'ACF', 'GSAP'],
    image: null,
    wide: false,
    order: 1,
    colorTheme: 'blue',
  },
  {
    id: 'p3',
    title: 'Manage',
    type: 'Web · SaaS',
    desc: 'Team and project management SaaS — real-time collaboration, task flows, permissions, analytics.',
    url: 'https://mapage.net/',
    linkLabel: 'VISIT LIVE',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.IO'],
    image: null,
    wide: false,
    order: 2,
    colorTheme: 'green',
  },
  {
    id: 'p4',
    title: 'edotco VMS',
    type: 'Mobile · Android',
    desc: 'Vendor-management mobile app for telecom tower operations — site check-ins, work orders, offline sync.',
    url: 'https://play.google.com/',
    linkLabel: 'PLAY STORE',
    tags: ['React Native', 'REST API', 'Offline Sync'],
    image: null,
    wide: false,
    order: 3,
    colorTheme: 'yellow',
  },
  {
    id: 'p5',
    title: 'Bhojon POS',
    type: 'Mobile + Web',
    desc: 'Full restaurant POS suite — mobile ordering app paired with web admin, kitchen display, reporting, multi-branch support.',
    url: 'https://play.google.com/',
    linkLabel: 'PLAY STORE',
    tags: ['React Native', 'Laravel', 'MySQL', 'Socket.IO'],
    image: null,
    wide: true,
    order: 4,
    colorTheme: 'pink',
  },
]

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)

function ProjectMock({ project }: { project: ProjectItem }) {
  const c = THEME_COLORS[project.colorTheme] || THEME_COLORS.purple
  const isMobile = project.type.toLowerCase().includes('mobile')

  if (project.image) {
    return (
      <div className="proj-mock" style={{ justifyContent: 'center' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          style={{ maxWidth: '100%', maxHeight: 220, objectFit: 'contain', borderRadius: 8 }}
        />
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="proj-mock">
        <div className="phone-mock" style={{ width: 130 }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              background: `linear-gradient(180deg, ${c.bg.replace('0.15', '0.25')}, #06090F)`,
              borderRadius: 16,
              padding: '18px 10px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 13,
                color: c.primary,
                textAlign: 'center',
                letterSpacing: '-0.02em',
              }}
            >
              {project.title}
            </div>
            <div
              style={{
                fontSize: 7,
                color: 'var(--text-3)',
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {project.type}
            </div>
            <div
              style={{
                background: c.bg,
                border: `1px solid ${c.border}`,
                borderRadius: 8,
                padding: '8px 10px',
                marginTop: 4,
              }}
            >
              <div
                style={{
                  fontSize: 6,
                  color: 'var(--text-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                LIVE
              </div>
              <div style={{ fontSize: 16, color: '#fff', fontWeight: 700, marginTop: 2 }}>●</div>
            </div>
            {project.tags.slice(0, 3).map((t) => (
              <div
                key={t}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 5,
                  padding: '4px 6px',
                  fontSize: 7,
                  color: 'var(--text-2)',
                }}
              >
                ✓ {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="proj-mock">
      <div className="browser-mock" style={{ maxWidth: project.wide ? 640 : 400 }}>
        <div className="bar">
          <span className="d" style={{ background: '#FF5C6C' }} />
          <span className="d" style={{ background: '#FFD933' }} />
          <span className="d" style={{ background: '#33E580' }} />
          <span className="url mono">
            {project.url.replace('https://', '').replace('http://', '').split('/')[0]}
          </span>
        </div>
        <div
          className="content"
          style={{
            background: `linear-gradient(180deg, ${c.bg.replace('0.15', '0.12')}, #06090F)`,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 18,
              color: '#fff',
              letterSpacing: '-0.02em',
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 10,
              color: c.primary,
              marginTop: 3,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {project.type}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: project.wide ? '1fr 1fr 1fr' : '1fr 1fr',
              gap: 6,
              marginTop: 12,
            }}
          >
            {project.tags.slice(0, project.wide ? 3 : 2).map((t) => (
              <div
                key={t}
                style={{
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  borderRadius: 6,
                  padding: 8,
                }}
              >
                <div style={{ fontSize: 8, color: 'var(--text-3)', marginBottom: 2 }}>Stack</div>
                <div style={{ fontSize: 11, color: '#fff', fontWeight: 700 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface Props {
  projects?: ProjectItem[]
}

export default function Work({ projects: projectsData }: Props) {
  const items = projectsData && projectsData.length > 0 ? projectsData : DEFAULT_FALLBACK_PROJECTS

  return (
    <section id="work" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">04 · Featured Work</div>
      </div>
      <h2 className="section-title reveal">
        <span className="grad-text">
          Shipped, live,
          <br />
          and <span className="accent-blue">in users&apos; hands.</span>
        </span>
      </h2>
      <p className="section-kicker reveal delay-1">
        A snapshot of recent products — from production web platforms to apps running on thousands
        of devices.
      </p>

      <div className="projects" style={{ marginTop: 64 }}>
        {items.map((project, i) => (
          <a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card${project.wide ? ' wide' : ''} reveal${i % 2 === 1 ? ' delay-1' : ''}`}
          >
            <div className={`project-preview proj-${project.id}`}>
              <ProjectMock project={project} />
            </div>
            <div className="project-body">
              <div className="project-meta">
                <span className="project-type">{project.type}</span>
              </div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((t) => (
                  <span key={t} className="project-tag">
                    {t}
                  </span>
                ))}
              </div>
              <span className="project-link">
                {project.linkLabel} <ArrowIcon />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
