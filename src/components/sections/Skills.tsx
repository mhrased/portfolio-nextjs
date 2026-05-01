import { SKILLS } from '@/lib/skills'
import type { SkillItem } from '@/lib/data.server'

const DELAYS = ['', 'delay-1', 'delay-2', '', 'delay-1', 'delay-2']

const ICONS: Record<string, React.ReactNode> = {
  web: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 3h18v18H3z" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  api: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M4 4h16v6H4zM4 14h16v6H4z" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="7" cy="17" r="1" fill="currentColor" />
    </svg>
  ),
  database: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
    </svg>
  ),
  mobile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" />
    </svg>
  ),
  devops: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M17 18a5 5 0 0 0 0-10 7 7 0 0 0-13-2 5 5 0 0 0-2 9" />
      <path d="M12 12v8M8 16l4 4 4-4" />
    </svg>
  ),
  cms: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M3 12h18" />
    </svg>
  ),
  design: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="3" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  default: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
}

interface Props {
  skills?: SkillItem[]
}

export default function Skills({ skills: skillsData }: Props) {
  const items = skillsData && skillsData.length > 0 ? skillsData : null

  return (
    <section id="skills" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">02 · Specializations</div>
      </div>
      <h2 className="section-title reveal">
        <span className="grad-text">Six stacks.<br />
        One <span className="accent-blue">fluent</span> engineer.</span>
      </h2>
      <p className="section-kicker reveal delay-1">
        I don&apos;t hand off. Whatever the layer — client, server, data, ops —
        I own it, ship it, and keep it running.
      </p>

      <div className="specs" style={{ marginTop: 64 }}>
        {items
          ? items.map((skill, i) => (
              <div
                key={skill.id}
                className={`spec-card reveal ${DELAYS[i % DELAYS.length]}`}
                style={{ '--lvl': skill.pct / 100 } as React.CSSProperties}
              >
                <div className="spec-head">
                  <span className="spec-num">{skill.num}</span>
                  <div className="spec-icon">{ICONS[skill.iconType] || ICONS.default}</div>
                </div>
                <h3 className="spec-title">{skill.title}</h3>
                <p className="spec-desc">{skill.desc}</p>
                <div className="spec-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="spec-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))
          : SKILLS.map((skill) => (
              <div
                key={skill.num}
                className={`spec-card reveal ${skill.delay}`}
                style={{ '--lvl': skill.lvl } as React.CSSProperties}
              >
                <div className="spec-head">
                  <span className="spec-num">{skill.num}</span>
                  <div className="spec-icon">{skill.icon}</div>
                </div>
                <h3 className="spec-title">{skill.title}</h3>
                <p className="spec-desc">{skill.desc}</p>
                <div className="spec-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="spec-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </section>
  )
}
