export const HERO_LINES = [
  'Full-stack.',
  'End-to-end.',
  'From scratch',
  'to deployed.',
] as const

export const HERO_STATS = [
  { value: '6+',  label: 'Years shipping' },
  { value: '40+', label: 'Projects deployed' },
  { value: '6',   label: 'Core stacks' },
] as const

export const HERO_STACK_CARDS = [
  { icon: '⚛', color: '#61DAFB',          title: 'React · Next · Vue',       sub: 'Frontend' },
  { icon: '◆', color: '#8CC84B',          title: 'Node.js · Express',        sub: 'Backend' },
  { icon: '⎔', color: 'var(--blue-2)',    title: 'Postgres · MongoDB',       sub: 'Database' },
  { icon: '▲', color: 'var(--purple-3)',  title: 'React Native · Flutter',   sub: 'Mobile' },
  { icon: '☁', color: '#FF9933',          title: 'AWS · Docker · Terraform', sub: 'DevOps' },
] as const

export const HERO_COMMITS = [
  { hash: 'a4f9c21', msg: 'feat(api): rate limit',    plus: '+42',  minus: null,   pos: { top: '12%', left: '6%' },                         delay: '' },
  { hash: 'b8e3117', msg: 'fix(auth): refresh token', plus: '+18',  minus: '-6',   pos: { top: '24%', right: '7%' } as Record<string,string>, delay: '2s' },
  { hash: 'd1f5b39', msg: 'refactor: db layer',        plus: '+86',  minus: '-120', pos: { bottom: '18%', right: '5%' } as Record<string,string>, delay: '1s' },
] as const
