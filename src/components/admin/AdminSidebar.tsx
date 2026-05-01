'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  {
    href: '/admin/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: '/admin/profile',
    label: 'Profile',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
  },
  {
    href: '/admin/projects',
    label: 'Projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M2 7h20M2 12h20M2 17h20" />
      </svg>
    ),
  },
  {
    href: '/admin/skills',
    label: 'Skills',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    href: '/admin/experience',
    label: 'Experience',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    href: '/admin/process',
    label: 'Process',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    href: '/admin/media',
    label: 'Media',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside style={{
      width: collapsed ? 64 : 240,
      background: '#0f1322',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.25s ease',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '20px 0' : '20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        justifyContent: collapsed ? 'center' : 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, #7359ff, #3399ff)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: '#fff',
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
          }}>MR</div>
          {!collapsed && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f4ff', letterSpacing: '-0.02em' }}>Admin</div>
              <div style={{ fontSize: 11, color: '#8892a4' }}>Portfolio CMS</div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{ background: 'none', border: 'none', color: '#8892a4', cursor: 'pointer', padding: 4, borderRadius: 6 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{ position: 'absolute', right: 8, top: 26, background: 'none', border: 'none', color: '#8892a4', cursor: 'pointer', padding: 4 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: collapsed ? '10px 0' : '10px 20px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                color: active ? '#f0f4ff' : '#8892a4',
                background: active ? 'rgba(115, 89, 255, 0.12)' : 'transparent',
                borderLeft: active ? '2px solid #7359ff' : '2px solid transparent',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                transition: 'all 0.15s',
                marginBottom: 2,
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.color = '#d0d8e8'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#8892a4'
                }
              }}
            >
              <span style={{ color: active ? '#7359ff' : 'inherit', flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer actions */}
      <div style={{
        padding: collapsed ? '16px 0' : '16px 20px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        <Link
          href="/"
          target="_blank"
          title={collapsed ? 'View Portfolio' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            color: '#8892a4',
            textDecoration: 'none',
            fontSize: 13,
            padding: collapsed ? '8px 0' : '8px 10px',
            borderRadius: 8,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#d0d8e8' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#8892a4' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" /><path d="M12 2a14 14 0 0 1 0 20M12 2a14 14 0 0 0 0 20M2 12h20" />
          </svg>
          {!collapsed && <span>View Portfolio</span>}
        </Link>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title={collapsed ? 'Logout' : undefined}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            justifyContent: collapsed ? 'center' : 'flex-start',
            color: '#ff7a8a',
            background: 'none',
            border: 'none',
            fontSize: 13,
            padding: collapsed ? '8px 0' : '8px 10px',
            borderRadius: 8,
            cursor: 'pointer',
            width: '100%',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,92,108,0.08)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          {!collapsed && <span>{loggingOut ? 'Logging out...' : 'Logout'}</span>}
        </button>
      </div>
    </aside>
  )
}
