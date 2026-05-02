import React from 'react'

export const HERO_LINES = ['Full-stack.', 'End-to-end.', 'From scratch', 'to deployed.'] as const

export const HERO_STATS = [
  { value: '6+', label: 'Years shipping' },
  { value: '40+', label: 'Projects deployed' },
  { value: '6', label: 'Core stacks' },
] as const

const MobileIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="5" y="2" width="14" height="20" rx="3" />
    <line x1="9" y1="18.5" x2="15" y2="18.5" strokeLinecap="round" />
    <circle cx="12" cy="5" r="0.8" fill="currentColor" stroke="none" />
  </svg>
)

const DockerIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
  >
    <rect x="2" y="10" width="4" height="3" rx="0.5" />
    <rect x="7" y="10" width="4" height="3" rx="0.5" />
    <rect x="12" y="10" width="4" height="3" rx="0.5" />
    <rect x="7" y="6" width="4" height="3" rx="0.5" />
    <rect x="12" y="6" width="4" height="3" rx="0.5" />
    <path d="M2 13.5c0 0 1 3 5.5 3 5 0 9-2 12-2s2.5 1 2.5 1" strokeLinecap="round" />
    <path d="M20 12c0 0 1.5-1 2-1" strokeLinecap="round" />
  </svg>
)

export const HERO_STACK_CARDS: {
  icon: React.ReactNode
  color: string
  title: string
  sub: string
}[] = [
  { icon: '⚛', color: '#61DAFB', title: 'React · Next · Vue', sub: 'Frontend' },
  { icon: '◆', color: '#8CC84B', title: 'Node.js · Express', sub: 'Backend' },
  { icon: '⎔', color: 'var(--blue-2)', title: 'Postgres · MongoDB', sub: 'Database' },
  {
    icon: <MobileIcon />,
    color: 'var(--purple-3)',
    title: 'React Native · Flutter',
    sub: 'Mobile',
  },
  { icon: <DockerIcon />, color: '#2496ED', title: 'Docker · AWS · Terraform', sub: 'DevOps' },
]

export const HERO_COMMITS = [
  {
    hash: 'a4f9c21',
    msg: 'feat(api): rate limit',
    plus: '+42',
    minus: null,
    pos: { top: '12%', left: '6%' },
    delay: '',
  },
  {
    hash: 'b8e3117',
    msg: 'fix(auth): refresh token',
    plus: '+18',
    minus: '-6',
    pos: { top: '24%', right: '7%' } as Record<string, string>,
    delay: '2s',
  },
  {
    hash: 'd1f5b39',
    msg: 'refactor: db layer',
    plus: '+86',
    minus: '-120',
    pos: { bottom: '18%', right: '5%' } as Record<string, string>,
    delay: '1s',
  },
] as const
