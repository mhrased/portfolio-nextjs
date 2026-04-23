const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)

export default function Work() {
  return (
    <section id="work" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">04 · Featured Work</div>
      </div>
      <h2 className="section-title reveal">
        <span className="grad-text">Shipped, live,<br />
        and <span className="accent-blue">in users&apos; hands.</span></span>
      </h2>
      <p className="section-kicker reveal delay-1">
        A snapshot of recent products — from production web platforms to apps running on thousands
        of devices.
      </p>

      <div className="projects" style={{ marginTop: 64 }}>
        {/* Kriyakarak — wide */}
        <a
          href="https://kriyakarak.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-card wide reveal"
        >
          <div className="project-preview proj-kriyakarak">
            <div className="proj-mock">
              <div className="browser-mock" style={{ maxWidth: 640 }}>
                <div className="bar">
                  <span className="d" style={{ background: '#FF5C6C' }} />
                  <span className="d" style={{ background: '#FFD933' }} />
                  <span className="d" style={{ background: '#33E580' }} />
                  <span className="url mono">kriyakarak.com</span>
                </div>
                <div className="content" style={{ background: 'linear-gradient(180deg,#140F24,#0A0E18)' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 20, color: '#fff', letterSpacing: '-0.02em' }}>Kriyakarak</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Service marketplace · Full-stack platform</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginTop: 12 }}>
                    <div style={{ background: 'rgba(115,89,255,0.15)', border: '1px solid rgba(115,89,255,0.3)', borderRadius: 6, padding: 10 }}><div style={{ fontSize: 8, color: 'var(--text-3)' }}>Services</div><div style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>240+</div></div>
                    <div style={{ background: 'rgba(51,153,255,0.15)', border: '1px solid rgba(51,153,255,0.3)', borderRadius: 6, padding: 10 }}><div style={{ fontSize: 8, color: 'var(--text-3)' }}>Providers</div><div style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>1.2k</div></div>
                    <div style={{ background: 'rgba(51,217,128,0.15)', border: '1px solid rgba(51,217,128,0.3)', borderRadius: 6, padding: 10 }}><div style={{ fontSize: 8, color: 'var(--text-3)' }}>Bookings</div><div style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>8.6k</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-body">
            <div className="project-meta"><span className="project-type">Web · Full-stack</span></div>
            <h3 className="project-title">Kriyakarak</h3>
            <p className="project-desc">Service-marketplace platform with provider onboarding, booking flow, payments and admin console. Built and deployed end-to-end.</p>
            <div className="project-tags">
              {['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'].map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
            <span className="project-link">VISIT LIVE <ArrowIcon /></span>
          </div>
        </a>

        {/* Filmd */}
        <a href="https://www.filmd.co.uk/" target="_blank" rel="noopener noreferrer" className="project-card reveal">
          <div className="project-preview proj-filmd">
            <div className="proj-mock">
              <div className="browser-mock">
                <div className="bar">
                  <span className="d" style={{ background: '#FF5C6C' }} /><span className="d" style={{ background: '#FFD933' }} /><span className="d" style={{ background: '#33E580' }} />
                  <span className="url mono">filmd.co.uk</span>
                </div>
                <div className="content" style={{ background: 'linear-gradient(180deg,#0F1C2E,#06090F)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '-0.02em' }}>FILMD</div>
                  <div style={{ fontSize: 10, color: '#33A6FF', marginTop: 2, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Video · Creative · Studio</div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 14, justifyContent: 'center' }}>
                    <div style={{ width: 60, height: 40, background: 'rgba(51,166,255,0.2)', borderRadius: 4 }} />
                    <div style={{ width: 60, height: 40, background: 'rgba(51,166,255,0.3)', borderRadius: 4 }} />
                    <div style={{ width: 60, height: 40, background: 'rgba(51,166,255,0.2)', borderRadius: 4 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-body">
            <div className="project-meta"><span className="project-type">Web · WordPress</span></div>
            <h3 className="project-title">Filmd</h3>
            <p className="project-desc">Creative studio site — custom WordPress theme, video-heavy layouts, performance tuned for UK users.</p>
            <div className="project-tags">
              {['WordPress', 'ACF', 'GSAP'].map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
            <span className="project-link">VISIT LIVE <ArrowIcon /></span>
          </div>
        </a>

        {/* Manage */}
        <a href="https://mapage.net/" target="_blank" rel="noopener noreferrer" className="project-card reveal delay-1">
          <div className="project-preview proj-manage">
            <div className="proj-mock">
              <div className="browser-mock">
                <div className="bar">
                  <span className="d" style={{ background: '#FF5C6C' }} /><span className="d" style={{ background: '#FFD933' }} /><span className="d" style={{ background: '#33E580' }} />
                  <span className="url mono">mapage.net</span>
                </div>
                <div className="content" style={{ background: 'linear-gradient(180deg,#0F2E1C,#06090F)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 16, color: '#fff' }}>Manage</div>
                    <div style={{ fontSize: 9, color: '#33D980', background: 'rgba(51,217,128,0.15)', padding: '3px 8px', borderRadius: 999, border: '1px solid rgba(51,217,128,0.3)' }}>LIVE</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 4, marginTop: 10 }}>
                    <div style={{ background: 'rgba(51,217,128,0.1)', border: '1px solid rgba(51,217,128,0.25)', borderRadius: 4, padding: 8 }}><div style={{ fontSize: 7, color: 'var(--text-3)' }}>TEAMS</div><div style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>18</div></div>
                    <div style={{ background: 'rgba(51,217,128,0.1)', border: '1px solid rgba(51,217,128,0.25)', borderRadius: 4, padding: 8 }}><div style={{ fontSize: 7, color: 'var(--text-3)' }}>TASKS</div><div style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>342</div></div>
                    <div style={{ background: 'rgba(51,217,128,0.1)', border: '1px solid rgba(51,217,128,0.25)', borderRadius: 4, padding: 8 }}><div style={{ fontSize: 7, color: 'var(--text-3)' }}>DONE</div><div style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>89%</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-body">
            <div className="project-meta"><span className="project-type">Web · SaaS</span></div>
            <h3 className="project-title">Manage / Mapage</h3>
            <p className="project-desc">Team and project management SaaS — real-time collaboration, task flows, permissions, analytics.</p>
            <div className="project-tags">
              {['Vue.js', 'Node.js', 'MongoDB', 'Socket.IO'].map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
            <span className="project-link">VISIT LIVE <ArrowIcon /></span>
          </div>
        </a>

        {/* edotco */}
        <a href="https://play.google.com/store/apps/details?id=com.e.co&pli=1" target="_blank" rel="noopener noreferrer" className="project-card reveal">
          <div className="project-preview proj-edotco">
            <div className="proj-mock">
              <div className="phone-mock" style={{ width: 120 }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#2E1A0F,#06090F)', borderRadius: 14, padding: '18px 8px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 11, color: '#FFD933', textAlign: 'center' }}>edotco VMS</div>
                  <div style={{ fontSize: 7, color: 'var(--text-3)', textAlign: 'center' }}>Vendor Management</div>
                  <div style={{ background: 'rgba(255,217,51,0.1)', border: '1px solid rgba(255,217,51,0.3)', borderRadius: 6, padding: 6, marginTop: 4 }}>
                    <div style={{ fontSize: 6, color: 'var(--text-3)' }}>ACTIVE SITES</div>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 700 }}>847</div>
                  </div>
                  <div style={{ background: 'rgba(255,217,51,0.08)', borderRadius: 4, padding: 4, fontSize: 6, color: 'var(--text-2)' }}>✓ Site check-in</div>
                  <div style={{ background: 'rgba(255,217,51,0.08)', borderRadius: 4, padding: 4, fontSize: 6, color: 'var(--text-2)' }}>✓ Work order</div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-body">
            <div className="project-meta"><span className="project-type">Mobile · Android</span></div>
            <h3 className="project-title">edotco VMS</h3>
            <p className="project-desc">Vendor-management mobile app for telecom tower operations — site check-ins, work orders, offline sync.</p>
            <div className="project-tags">
              {['React Native', 'REST API', 'Offline Sync'].map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
            <span className="project-link">PLAY STORE <ArrowIcon /></span>
          </div>
        </a>

        {/* Bhojon — wide */}
        <a href="https://play.google.com/store/apps/details?id=com.bdtask.bhojonpos" target="_blank" rel="noopener noreferrer" className="project-card wide reveal delay-1">
          <div className="project-preview proj-bhojon">
            <div className="proj-mock" style={{ gap: 20 }}>
              <div className="phone-mock" style={{ width: 130 }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg,#2E0F1A,#06090F)', borderRadius: 16, padding: '18px 8px 8px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, color: '#FF5C8A', textAlign: 'center' }}>Bhojon POS</div>
                  <div style={{ fontSize: 7, color: 'var(--text-3)', textAlign: 'center' }}>Restaurant</div>
                  <div style={{ background: 'rgba(255,92,138,0.1)', border: '1px solid rgba(255,92,138,0.3)', borderRadius: 6, padding: 6, marginTop: 4 }}>
                    <div style={{ fontSize: 6, color: 'var(--text-3)' }}>TODAY&apos;S SALES</div>
                    <div style={{ fontSize: 13, color: '#fff', fontWeight: 700 }}>৳24,890</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                    <div style={{ background: 'rgba(255,92,138,0.08)', borderRadius: 4, padding: 4, fontSize: 6, color: 'var(--text-2)' }}>DINE IN</div>
                    <div style={{ background: 'rgba(255,92,138,0.08)', borderRadius: 4, padding: 4, fontSize: 6, color: 'var(--text-2)' }}>TAKEAWAY</div>
                  </div>
                </div>
              </div>
              <div className="browser-mock" style={{ maxWidth: 380, alignSelf: 'stretch', display: 'flex', flexDirection: 'column' }}>
                <div className="bar">
                  <span className="d" style={{ background: '#FF5C6C' }} /><span className="d" style={{ background: '#FFD933' }} /><span className="d" style={{ background: '#33E580' }} />
                  <span className="url mono">admin.bhojon.app</span>
                </div>
                <div className="content" style={{ background: 'linear-gradient(180deg,#1A0915,#06090F)', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div style={{ fontSize: 11, color: '#fff', fontWeight: 600 }}>Orders</div>
                    <div style={{ fontSize: 9, color: '#FF5C8A' }}>● 24 active</div>
                  </div>
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: 'rgba(255,92,138,0.1)', borderRadius: 4, fontSize: 8, color: 'var(--text-2)' }}><span>#1247 · Table 4</span><span style={{ color: '#33E580' }}>Ready</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: 'rgba(255,92,138,0.08)', borderRadius: 4, fontSize: 8, color: 'var(--text-2)' }}><span>#1248 · Takeaway</span><span style={{ color: '#FFD933' }}>Cooking</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 8px', background: 'rgba(255,92,138,0.08)', borderRadius: 4, fontSize: 8, color: 'var(--text-2)' }}><span>#1249 · Table 2</span><span style={{ color: '#33A6FF' }}>New</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="project-body">
            <div className="project-meta"><span className="project-type">Mobile + Web · POS system</span></div>
            <h3 className="project-title">Bhojon Restaurant POS</h3>
            <p className="project-desc">Full restaurant POS suite — mobile ordering app paired with web admin, kitchen display, reporting, multi-branch support.</p>
            <div className="project-tags">
              {['React Native', 'Laravel', 'MySQL', 'Socket.IO'].map((t) => <span key={t} className="project-tag">{t}</span>)}
            </div>
            <span className="project-link">PLAY STORE <ArrowIcon /></span>
          </div>
        </a>
      </div>
    </section>
  )
}
