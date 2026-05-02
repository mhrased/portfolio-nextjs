'use client'

import { useEffect, useRef } from 'react'
import { PROCESS_STEPS, COUNTERS } from '@/lib/process'
import type { ProcessData } from '@/lib/data.server'

interface Props {
  process?: ProcessData
}

export default function Process({ process: processData }: Props) {
  const statsRef = useRef<HTMLDivElement>(null)
  const steps = processData?.steps?.length
    ? processData.steps
    : [...PROCESS_STEPS].map((s, i) => ({
        id: s.num,
        num: s.num,
        title: s.title,
        desc: s.desc,
        order: i,
      }))
  const counters = processData?.counters?.length
    ? processData.counters
    : COUNTERS.map((c, i) => ({
        id: String(i),
        count: c.count,
        label: c.label,
        suffix: c.count === 99 ? '%' : '+',
      }))

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
          const suffix = el.dataset.suffix || '+'
          let cur = 0
          const step = Math.max(1, Math.floor(target / 40))
          const tick = () => {
            cur += step
            if (cur >= target) {
              el.textContent = target + suffix
              return
            }
            el.textContent = cur + suffix
            requestAnimationFrame(tick)
          }
          tick()
          obs.unobserve(el)
        })
      },
      { threshold: 0.5 },
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
        <span className="grad-text">
          A process built
          <br />
          for <span className="accent-blue">shipping.</span>
        </span>
      </h2>

      <div className="process-steps reveal delay-1" style={{ marginTop: 64 }}>
        {steps.map((s) => (
          <div key={s.id} className="process-step">
            <div className="ps-num">{s.num}</div>
            <div className="ps-title">{s.title}</div>
            <div className="ps-desc">{s.desc}</div>
          </div>
        ))}
      </div>

      <div className="stats reveal delay-2" style={{ marginTop: 80 }} ref={statsRef}>
        {counters.map((c) => (
          <div key={c.id} className="stat">
            <div className="n" data-count={c.count ?? undefined} data-suffix={c.suffix}>
              {c.count === null ? '∞' : '0'}
            </div>
            <div className="l">{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
