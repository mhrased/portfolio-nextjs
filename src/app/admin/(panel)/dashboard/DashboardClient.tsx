'use client'

import Link from 'next/link'
import { Card } from '@/components/admin/AdminUI'

interface Stat {
  label: string
  value: number
  href: string
  color: string
}

interface QuickLink {
  href: string
  label: string
  desc: string
}

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}
    >
      {stats.map((s) => (
        <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
          <Card style={{ padding: '20px 24px', cursor: 'pointer' }}>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: s.color,
                fontFamily: 'var(--font-display)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: '#8892a4', marginTop: 8, fontWeight: 500 }}>
              {s.label}
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export function QuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 12,
      }}
    >
      {links.map((l) => (
        <Link key={l.href} href={l.href} style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: '#141827',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 12,
              padding: '16px 20px',
              cursor: 'pointer',
              transition: 'border-color 0.15s, background 0.15s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(115,89,255,0.4)'
              e.currentTarget.style.background = 'rgba(115,89,255,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.background = '#141827'
            }}
          >
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff', marginBottom: 4 }}>
                {l.label}
              </div>
              <div style={{ fontSize: 12, color: '#8892a4' }}>{l.desc}</div>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#7359ff"
              strokeWidth={2}
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  )
}
