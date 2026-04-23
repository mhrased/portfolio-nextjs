export const PROCESS_STEPS = [
  { num: '01', title: 'Discover',     desc: 'Understand the product, users, constraints. Map the scope. Align on what success looks like.' },
  { num: '02', title: 'Architect',    desc: 'Pick the stack. Design the data model. Sketch the API. Set up CI, infra, and environments.' },
  { num: '03', title: 'Build & Ship', desc: 'Iterative delivery in small PRs. Demoable increments every week. Bug-fix in minutes, not days.' },
  { num: '04', title: 'Operate',      desc: 'Deploy, monitor, measure. Ongoing maintenance, perf tuning, feature additions as needed.' },
] as const

export const COUNTERS = [
  { count: 6,    label: 'Years of experience' },
  { count: 40,   label: 'Projects shipped' },
  { count: 99,   label: '% uptime average' },
  { count: null, label: 'Commits pushed' },
] as const
