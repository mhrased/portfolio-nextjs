import { TIMELINE } from '@/lib/about'

export default function About() {
  return (
    <section id="about" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">01 · About</div>
      </div>
      <h2 className="section-title reveal">
        <span className="grad-text">Engineering <span className="accent">full-stack</span><br />
        products that scale.</span>
      </h2>

      <div className="about" style={{ marginTop: 64 }}>
        <div className="about-intro reveal delay-1">
          <p>
            I&apos;m a <strong>full-stack developer</strong> with 6+ years of experience shipping
            production-grade applications across web, mobile, and cloud.
          </p>
          <p>
            My work spans the entire stack — from <strong>Vue/Next/React</strong> frontends, to{' '}
            <strong>Node.js</strong> APIs backed by <strong>Postgres</strong> and{' '}
            <strong>MongoDB</strong>, to <strong>React Native</strong> and <strong>Flutter</strong>{' '}
            apps published on Play Store and App Store.
          </p>
          <p>
            On the infra side, I own CI/CD pipelines with <strong>Jenkins</strong> and GitHub
            Actions, container orchestration with <strong>Docker</strong>, and provision AWS
            infrastructure with <strong>Terraform</strong>.
          </p>
          <p>
            I approach every project with a product mindset — one engineer, every layer, from an
            empty repo to a live deployment.
          </p>
        </div>

        <div className="about-timeline reveal delay-2">
          <div className="chip" style={{ marginBottom: 20 }}>
            <span className="dot" />
            JOURNEY
          </div>
          <div className="timeline">
            {TIMELINE.map((item) => (
              <div key={item.year} className={`timeline-item${item.current ? ' current' : ''}`}>
                <div className="yr">{item.year}</div>
                <div className="ti">{item.title}</div>
                <div className="co">{item.company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
