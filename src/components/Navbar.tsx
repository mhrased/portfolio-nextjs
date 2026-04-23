'use client'

import { useEffect, useRef } from 'react'
import { NAV_LINKS } from '@/constants/nav'

export default function Navbar() {
  const shellRef = useRef<HTMLDivElement>(null)
  const linksWrapRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const shell = shellRef.current
    const linksWrap = linksWrapRef.current
    const indicator = indicatorRef.current
    if (!shell || !linksWrap || !indicator) return

    const links = linksWrap.querySelectorAll<HTMLAnchorElement>('.nav-link')
    const sections = document.querySelectorAll<HTMLElement>('[data-section]')

    function moveIndicator(link: HTMLAnchorElement) {
      if (!linksWrap || !indicator) return
      const wrapRect = linksWrap.getBoundingClientRect()
      const linkRect = link.getBoundingClientRect()
      indicator.style.left = linkRect.left - wrapRect.left + 'px'
      indicator.style.width = linkRect.width + 'px'
      indicator.style.opacity = '1'
    }

    requestAnimationFrame(() => {
      const active = linksWrap.querySelector<HTMLAnchorElement>('.nav-link.active')
      if (active) moveIndicator(active)
    })

    links.forEach((link) => {
      link.addEventListener('mouseenter', () => moveIndicator(link))
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href')
        if (href?.startsWith('#')) {
          e.preventDefault()
          const target = document.querySelector<HTMLElement>(href)
          if (target) window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' })
        }
      })
    })

    linksWrap.addEventListener('mouseleave', () => {
      const active = linksWrap.querySelector<HTMLAnchorElement>('.nav-link.active')
      if (active) moveIndicator(active)
    })

    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).id
            links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + id))
            const active = linksWrap.querySelector<HTMLAnchorElement>('.nav-link.active')
            if (active) moveIndicator(active)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px' }
    )
    sections.forEach((s) => navObs.observe(s))

    const onResize = () => {
      const active = linksWrap.querySelector<HTMLAnchorElement>('.nav-link.active')
      if (active) moveIndicator(active)
    }
    window.addEventListener('resize', onResize)

    return () => {
      navObs.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="nav-shell" id="nav-shell" ref={shellRef}>
      <nav className="nav" id="nav">
        <div className="nav-brand">
          <div className="nav-logo">MR</div>
          <div className="nav-name-wrap">
            <div className="nav-name">Rasel</div>
            <div className="nav-role">Full-stack</div>
          </div>
        </div>

        <div className="nav-links" id="nav-links" ref={linksWrapRef}>
          <div className="nav-indicator" id="nav-indicator" ref={indicatorRef} />
          {NAV_LINKS.map((link, i) => (
            <a key={link.href} href={link.href} className={`nav-link${i === 0 ? ' active' : ''}`}>
              <span>{link.label}</span>
            </a>
          ))}
        </div>

        <div className="nav-divider" />
        <a href="#contact" className="nav-cta">
          <span className="dot" /> Available
        </a>
      </nav>
    </div>
  )
}
