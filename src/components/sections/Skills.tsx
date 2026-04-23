import { SKILLS } from '@/lib/skills'

export default function Skills() {
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
        {SKILLS.map((skill) => (
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
