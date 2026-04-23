'use client'

import { useEffect, useRef } from 'react'
import { PIPELINE_NODES, TERM_SCRIPT } from '@/lib/pipeline'

export default function Pipeline() {
  const cardRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const termLines = termRef.current
    if (!card || !termLines) return

    let started = false
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true
            card.classList.add('in')
            let i = 0
            const step = () => {
              if (i >= TERM_SCRIPT.length) return
              const line = TERM_SCRIPT[i]
              const el = document.createElement('div')
              el.className = 'line ' + (line.cls || '')
              el.textContent = line.t
              termLines.appendChild(el)
              i++
              setTimeout(step, 220 + Math.random() * 200)
            }
            step()
          }
        })
      },
      { threshold: 0.3 }
    )

    obs.observe(card)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="pipeline" className="section" data-section="">
      <div className="section-head reveal">
        <div className="section-index">03 · Build → Deploy</div>
      </div>
      <h2 className="section-title reveal">
        <span className="grad-text">From empty repo<br />
        to <span className="accent">live in production.</span></span>
      </h2>
      <p className="section-kicker reveal delay-1">
        I own the whole delivery pipeline. Code, build, test, containerize, deploy, monitor — all
        of it, end-to-end.
      </p>

      <div className="pipeline reveal delay-2" id="pipeline-card" style={{ marginTop: 64 }} ref={cardRef}>
        <div className="pipeline-nodes">
          {PIPELINE_NODES.map((node) => (
            <div key={node.title} className={`pipe-node${node.active ? ' active' : ''}`}>
              <div className="pn-icon">{node.icon}</div>
              <div className="pn-label">{node.label}</div>
              <div className="pn-title">{node.title}</div>
              <div className="pn-tools">{node.tools}</div>
            </div>
          ))}
        </div>

        <div className="pipeline-flow">
          <div className="pipeline-flow-fill" />
          <div className="packet" />
        </div>

        <div className="pipeline-terminal">
          <div className="term-head">
            <div className="dots"><span /><span /><span /></div>
            <span className="path">~/deploy.log — run #1247</span>
          </div>
          <div id="term-lines" ref={termRef} />
        </div>
      </div>
    </section>
  )
}
