import { SITE } from '@/constants/site'
import { FOOTER_LINKS } from '@/constants/nav'
import type { SiteData } from '@/lib/data.server'

export default function Footer({ site }: { site?: SiteData }) {
  const year = site?.year || SITE.year
  const name = site?.name || SITE.name
  const role = site?.role || SITE.role
  const tagline = site?.footerTagline || 'Built from scratch.'
  return (
    <footer className="footer">
      <div>© {year} {name} — {role}. {tagline}</div>
      <div className="footer-links">
        {FOOTER_LINKS.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </div>
    </footer>
  )
}
