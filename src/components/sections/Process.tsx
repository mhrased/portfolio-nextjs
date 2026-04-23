'use client'

import { useEffect, useRef } from 'react'
import { PROCESS_STEPS, COUNTERS } from '@/lib/process'

export default function Process() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stats = statsRef.current
    if (!stats) return

    const els = stats.querySelectorAll<HTMLElement>('[data-count]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const el = e.target as HTMLElement
          const target = parseInt(el.dataset.count!, 10)
          let cur = 0
          const step = Math.max(1, Math.floor(target / 40))
          const tick = () => {
            cur += step
            if (cur >= target) {
              el.textContent = target + (target === 99 ? '%+' : '+')
              return
            }
            el.textContent = cur + (target === 99 ? '%' : '+')
            requestAnimationFrame(tick)
          }
          tick()
          obs.unobserve(el)
        })
      },
      { threshold: 0.5 }
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="process" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">05 · How I work</div>
      </div>
      <h2 className="section-title reveal">
        <span className="grad-text">A process built<br />
        for <span className="accent-blue">shipping.</span></span>
      </h2>

      <div className="process-steps reveal delay-1" style={{ marginTop: 64 }}>
        {PROCESS_STEPS.map((s) => (
          <div key={s.num} className="process-step">
            <div className="ps-num">{s.num}</div>
            <div className="ps-title">{s.title}</div>
            <div className="ps-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="stats reveal delay-2" style={{ marginTop: 80 }} ref={statsRef}>
        {COUNTERS.map((c) => (
          <div key={c.label} className="stat">
            <div className="n" data-count={c.count ?? undefined}>
              {c.count === null ? '∞' : '0'}
            </div>
            <div className="l">{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
