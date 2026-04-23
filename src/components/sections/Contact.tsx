import { SITE } from '@/constants/site'

export default function Contact() {
  return (
    <section id="contact" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">06 · Contact</div>
      </div>

      <div className="contact">
        <div className="reveal">
          <h2 className="section-title" style={{ fontSize: 64 }}>
            <span className="grad-text">Got a product<br />
            to <span className="accent">build?</span></span>
          </h2>
          <p className="section-kicker">
            Whether it&apos;s an MVP, a scale-up, or a full-stack rebuild — tell me about it. I reply
            within 24 hours.
          </p>
          <div className="hero-actions" style={{ marginTop: 32 }}>
            <a href={`mailto:${SITE.email}`} className="btn btn-primary">
              Start a conversation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#" className="btn btn-ghost">Download resume</a>
          </div>
        </div>

        <div className="contact-card reveal delay-1">
          <div className="contact-row">
            <div className="ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" />
              </svg>
            </div>
            <div>
              <div className="label">Email</div>
              <div className="val">{SITE.email}</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.79.64 2.64a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.44-1.2a2 2 0 0 1 2.11-.45c.85.3 1.74.52 2.64.64A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <div className="label">Phone</div>
              <div className="val">{SITE.phone}</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="label">Location</div>
              <div className="val">{SITE.location}</div>
            </div>
          </div>
          <div className="contact-row">
            <div className="ic">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <div className="label">Response time</div>
              <div className="val">{SITE.responseTime}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
