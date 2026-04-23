import { SITE } from '@/constants/site'
import { FOOTER_LINKS } from '@/constants/nav'

export default function Footer() {
  return (
    <footer className="footer">
      <div>© {SITE.year} {SITE.name} — {SITE.role}. Built from scratch.</div>
      <div className="footer-links">
        {FOOTER_LINKS.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </div>
    </footer>
  )
}
