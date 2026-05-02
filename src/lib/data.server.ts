import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

function readJson<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename)
    if (!fs.existsSync(filePath)) return fallback
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function writeJson(filename: string, data: unknown): void {
  const filePath = path.join(DATA_DIR, filename)
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export interface SiteData {
  name: string
  shortName: string
  initials: string
  role: string
  year: string
  status: string
  email: string
  phone: string
  location: string
  responseTime: string
  resumeUrl: string
  bio1: string
  bio2: string
  bio3: string
  bio4: string
  heroSubtitle: string
  heroCta1: string
  heroCta2: string
  navAvailable: string
  aboutTitle: string
  contactTitle: string
  contactKicker: string
  footerTagline: string
  gaId: string
}

export interface HeroData {
  lines: string[]
  stats: { value: string; label: string }[]
}

export interface ExperienceItem {
  id: string
  year: string
  title: string
  company: string
  current: boolean
  order: number
}

export interface SkillItem {
  id: string
  num: string
  title: string
  desc: string
  tags: string[]
  pct: number
  iconType: string
  order: number
}

export interface ProjectItem {
  id: string
  title: string
  type: string
  desc: string
  url: string
  linkLabel: string
  tags: string[]
  image: string | null
  wide: boolean
  order: number
  colorTheme: string
}

export interface ProcessStep {
  id: string
  num: string
  title: string
  desc: string
  order: number
}

export interface ProcessCounter {
  id: string
  count: number | null
  label: string
  suffix: string
}

export interface ProcessData {
  title: string
  titleAccent: string
  steps: ProcessStep[]
  counters: ProcessCounter[]
}

const defaultSite: SiteData = {
  name: 'Mehedi Hasan Rashed',
  shortName: 'Rashed',
  initials: 'MR',
  role: 'Full-stack engineer',
  year: '2026',
  status: 'Available for new projects · Q2 2026',
  email: 'rasedr007@gmail.com',
  phone: '+880 1700-000000',
  location: 'Dhaka, Bangladesh · Remote-first',
  responseTime: 'Within 24 hours',
  resumeUrl: '#',
  bio1: "I'm a full-stack developer with 6+ years of experience shipping production-grade applications across web, mobile, and cloud.",
  bio2: 'My work spans the entire stack — from Vue/Next/React frontends, to Node.js APIs backed by Postgres and MongoDB, to React Native and Flutter apps published on Play Store and App Store.',
  bio3: 'On the infra side, I own CI/CD pipelines with Jenkins and GitHub Actions, container orchestration with Docker, and provision AWS infrastructure with Terraform.',
  bio4: 'I approach every project with a product mindset — one engineer, every layer, from an empty repo to a live deployment.',
  heroSubtitle: 'I architect, build, and ship production web and mobile products. Frontend, backend, database, DevOps — one engineer, the whole pipeline.',
  heroCta1: 'See the work',
  heroCta2: 'Start a project',
  navAvailable: 'Available',
  aboutTitle: 'Engineering full-stack products that scale.',
  contactTitle: 'Got a product to build?',
  contactKicker: "Whether it's an MVP, a scale-up, or a full-stack rebuild — tell me about it. I reply within 24 hours.",
  footerTagline: 'Built from scratch.',
  gaId: '',
}

const defaultHero: HeroData = {
  lines: ['Full-stack.', 'End-to-end.', 'From scratch', 'to deployed.'],
  stats: [
    { value: '6+', label: 'Years shipping' },
    { value: '40+', label: 'Projects deployed' },
    { value: '6', label: 'Core stacks' },
  ],
}

const defaultProcess: ProcessData = {
  title: 'A process built for shipping.',
  titleAccent: 'shipping.',
  steps: [
    { id: 's1', num: '01', title: 'Discover', desc: 'Understand the product, users, constraints. Map the scope. Align on what success looks like.', order: 0 },
    { id: 's2', num: '02', title: 'Architect', desc: 'Pick the stack. Design the data model. Sketch the API. Set up CI, infra, and environments.', order: 1 },
    { id: 's3', num: '03', title: 'Build & Ship', desc: 'Iterative delivery in small PRs. Demoable increments every week. Bug-fix in minutes, not days.', order: 2 },
    { id: 's4', num: '04', title: 'Operate', desc: 'Deploy, monitor, measure. Ongoing maintenance, perf tuning, feature additions as needed.', order: 3 },
  ],
  counters: [
    { id: 'c1', count: 6, label: 'Years of experience', suffix: '+' },
    { id: 'c2', count: 40, label: 'Projects shipped', suffix: '+' },
    { id: 'c3', count: 99, label: '% uptime average', suffix: '%' },
    { id: 'c4', count: null, label: 'Commits pushed', suffix: '' },
  ],
}

export function getSiteData(): SiteData {
  return readJson<SiteData>('site.json', defaultSite)
}

export function getHeroData(): HeroData {
  return readJson<HeroData>('hero.json', defaultHero)
}

export function getExperience(): ExperienceItem[] {
  return readJson<ExperienceItem[]>('experience.json', []).sort((a, b) => a.order - b.order)
}

export function getSkills(): SkillItem[] {
  return readJson<SkillItem[]>('skills.json', []).sort((a, b) => a.order - b.order)
}

export function getProjects(): ProjectItem[] {
  return readJson<ProjectItem[]>('projects.json', []).sort((a, b) => a.order - b.order)
}

export function getProcessData(): ProcessData {
  return readJson<ProcessData>('process.json', defaultProcess)
}

export function saveSiteData(data: SiteData): void {
  writeJson('site.json', data)
}

export function saveHeroData(data: HeroData): void {
  writeJson('hero.json', data)
}

export function saveExperience(data: ExperienceItem[]): void {
  writeJson('experience.json', data)
}

export function saveSkills(data: SkillItem[]): void {
  writeJson('skills.json', data)
}

export function saveProjects(data: ProjectItem[]): void {
  writeJson('projects.json', data)
}

export function saveProcessData(data: ProcessData): void {
  writeJson('process.json', data)
}

export function getUploads(): string[] {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) return []
    return fs
      .readdirSync(uploadsDir)
      .filter((f) => !f.startsWith('.') && /\.(jpg|jpeg|png|gif|webp|svg|avif)$/i.test(f))
      .map((f) => `/uploads/${f}`)
  } catch {
    return []
  }
}
