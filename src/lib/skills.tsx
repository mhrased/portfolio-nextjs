export const SKILLS = [
  {
    num: '/ 01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M3 3h18v18H3z" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Web Development',
    desc: 'Modern SPAs and SSR apps — React, Next.js, Vue. Type-safe, accessible, performant by default.',
    tags: ['React', 'Next.js', 'Vue 3', 'TypeScript', 'Tailwind'],
    lvl: 0.95,
    pct: '95%',
    delay: '',
  },
  {
    num: '/ 02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M4 4h16v6H4zM4 14h16v6H4z" />
        <circle cx="7" cy="7" r="1" fill="currentColor" />
        <circle cx="7" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    title: 'Backend & APIs',
    desc: 'Node.js services, REST + GraphQL, queue-based async work, auth, rate-limiting, observability.',
    tags: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'Redis'],
    lvl: 0.93,
    pct: '93%',
    delay: 'delay-1',
  },
  {
    num: '/ 03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6" />
      </svg>
    ),
    title: 'Databases',
    desc: 'Relational schema design, query tuning, indexing strategy. NoSQL for scale and flexibility.',
    tags: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'MySQL'],
    lvl: 0.9,
    pct: '90%',
    delay: 'delay-2',
  },
  {
    num: '/ 04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" />
      </svg>
    ),
    title: 'Mobile Development',
    desc: 'Cross-platform apps for iOS and Android — native feel, shared codebase, deep platform API integrations.',
    tags: ['React Native', 'Flutter', 'Expo', 'Firebase'],
    lvl: 0.92,
    pct: '92%',
    delay: '',
  },
  {
    num: '/ 05',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M17 18a5 5 0 0 0 0-10 7 7 0 0 0-13-2 5 5 0 0 0-2 9" />
        <path d="M12 12v8M8 16l4 4 4-4" />
      </svg>
    ),
    title: 'DevOps & Cloud',
    desc: 'CI/CD pipelines, containerized deployments, infra-as-code, zero-downtime releases, monitoring.',
    tags: ['AWS', 'Docker', 'Terraform', 'Jenkins', 'GitHub Actions'],
    lvl: 0.88,
    pct: '88%',
    delay: 'delay-1',
  },
  {
    num: '/ 06',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M3 12h18" />
      </svg>
    ),
    title: 'WordPress / CMS',
    desc: 'Custom themes and plugins, headless WordPress, WooCommerce storefronts, performance tuning.',
    tags: ['WordPress', 'WooCommerce', 'Custom Plugins', 'ACF'],
    lvl: 0.94,
    pct: '94%',
    delay: 'delay-2',
  },
]
