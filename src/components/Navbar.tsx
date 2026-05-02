'use client'

import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '@/constants/nav'
import type { SiteData } from '@/lib/data.server'

export default function Navbar({ site }: { site?: SiteData }) {
  const shellRef = useRef<HTMLDivElement>(null)
  const linksWrapRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  // Sync theme state from DOM on mount
  useEffect(() => {
    setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close on resize to desktop
  useEffect(() => {
    function onResize() { if (window.innerWidth > 900) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  function handleNavClick(href: string) {
    setMenuOpen(false)
    if (href.startsWith('#')) {
      setTimeout(() => {
        const target = document.querySelector<HTMLElement>(href)
        if (target) window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' })
      }, 300) // wait for menu close animation
    }
  }

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
    <>
      <div className="nav-shell" id="nav-shell" ref={shellRef}>
        <nav className="nav" id="nav">
          <div className="nav-brand">
            <div className="nav-logo">{site?.initials || 'MR'}</div>
            <div className="nav-name-wrap">
              <div className="nav-name">{site?.shortName || 'Rasel'}</div>
              <div className="nav-role">{site?.role?.split(' ')[0] || 'Full-stack'}</div>
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
            <span className="dot" /> {site?.navAvailable || 'Available'}
          </a>

          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            className={`nav-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      {/* Mobile full-screen menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
            >
              <span className="mobile-nav-num">0{i + 1}</span>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mobile-cta"
            style={{ transitionDelay: menuOpen ? `${NAV_LINKS.length * 60}ms` : '0ms' }}
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact') }}
          >
            <span className="dot" /> {site?.navAvailable || 'Available for projects'}
          </a>
        </div>
      </div>
    </>
  )
}
