// ─── Base utilities ──────────────────────────────────────────────────────────

/** Remove script/style blocks then all remaining HTML tags. No DOM needed. */
export function stripTags(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#x27;/gi, "'")
    .replace(/&#x2F;/gi, '/')
    .trim()
}

/** Strip tags, remove C0 control chars, enforce max length. */
export function sanitizeText(input: unknown, maxLen = 500): string {
  return stripTags(input)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .slice(0, maxLen)
    .trim()
}

/** Allow only safe URL protocols; collapse everything else to `#`. */
const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/|#)/i
export function sanitizeUrl(input: unknown): string {
  if (typeof input !== 'string') return '#'
  const t = input.trim()
  if (!t) return '#'
  if (!SAFE_URL.test(t)) return '#'
  return sanitizeText(t, 500)
}

/** Validate Google Analytics 4 Measurement ID (G-XXXXXXXX). */
const GA_RE = /^G-[A-Z0-9]{4,12}$/
export function sanitizeGaId(input: unknown): string {
  if (typeof input !== 'string') return ''
  const up = input.trim().toUpperCase()
  return GA_RE.test(up) ? up : ''
}

/** Clamp and round a number to [min, max]; return fallback for non-finite. */
export function sanitizeNumber(input: unknown, min: number, max: number, fallback: number): number {
  const n = Number(input)
  if (!isFinite(n) || isNaN(n)) return fallback
  return Math.max(min, Math.min(max, Math.round(n)))
}

/** Coerce to boolean; return fallback for unrecognised values. */
export function sanitizeBoolean(input: unknown, fallback = false): boolean {
  if (typeof input === 'boolean') return input
  if (input === 1 || input === '1' || input === 'true') return true
  if (input === 0 || input === '0' || input === 'false') return false
  return fallback
}

/** Sanitize an array of strings. */
export function sanitizeTags(input: unknown, maxItems = 20, maxItemLen = 60): string[] {
  if (!Array.isArray(input)) return []
  return input
    .slice(0, maxItems)
    .map((t) => sanitizeText(t, maxItemLen))
    .filter(Boolean)
}

/** Basic structural email validation (no DNS check). */
const EMAIL_RE = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
export function isValidEmail(input: unknown): boolean {
  if (typeof input !== 'string') return false
  const t = input.trim()
  return t.length <= 320 && EMAIL_RE.test(t)
}

/** UUID v4 check (used to validate route :id params). */
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
export function isValidUuid(input: unknown): boolean {
  return typeof input === 'string' && UUID_RE.test(input)
}

/** Whitelist enum — falls back to `fallback` for any unknown value. */
export function sanitizeEnum<T extends string>(
  input: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return typeof input === 'string' && (allowed as readonly string[]).includes(input)
    ? (input as T)
    : fallback
}

// ─── Resource sanitizers ─────────────────────────────────────────────────────

import type {
  SiteData,
  HeroData,
  ProjectItem,
  SkillItem,
  ExperienceItem,
  ProcessData,
} from './data.server'

export const COLOR_THEMES = ['purple', 'blue', 'green', 'yellow', 'pink'] as const

export const ICON_TYPES = [
  'web',
  'api',
  'database',
  'mobile',
  'devops',
  'cms',
  'design',
  'default',
] as const

function body(raw: unknown): Record<string, unknown> {
  return raw && typeof raw === 'object' && !Array.isArray(raw)
    ? (raw as Record<string, unknown>)
    : {}
}

export function sanitizeSiteBody(raw: unknown): SiteData {
  const b = body(raw)
  return {
    name: sanitizeText(b.name, 100),
    shortName: sanitizeText(b.shortName, 50),
    initials: sanitizeText(b.initials, 3),
    role: sanitizeText(b.role, 100),
    year: sanitizeText(b.year, 10),
    status: sanitizeText(b.status, 200),
    email: isValidEmail(b.email) ? (b.email as string).trim().toLowerCase() : '',
    phone: sanitizeText(b.phone, 30),
    location: sanitizeText(b.location, 200),
    responseTime: sanitizeText(b.responseTime, 100),
    resumeUrl: sanitizeUrl(b.resumeUrl),
    bio1: sanitizeText(b.bio1, 2000),
    bio2: sanitizeText(b.bio2, 2000),
    bio3: sanitizeText(b.bio3, 2000),
    bio4: sanitizeText(b.bio4, 2000),
    heroSubtitle: sanitizeText(b.heroSubtitle, 500),
    heroCta1: sanitizeText(b.heroCta1, 50),
    heroCta2: sanitizeText(b.heroCta2, 50),
    navAvailable: sanitizeText(b.navAvailable, 100),
    aboutTitle: sanitizeText(b.aboutTitle, 200),
    contactTitle: sanitizeText(b.contactTitle, 200),
    contactKicker: sanitizeText(b.contactKicker, 500),
    footerTagline: sanitizeText(b.footerTagline, 200),
    gaId: sanitizeGaId(b.gaId),
  }
}

export function sanitizeHeroBody(raw: unknown): HeroData {
  const b = body(raw)
  const lines = Array.isArray(b.lines)
    ? b.lines
        .slice(0, 10)
        .map((l) => sanitizeText(l, 100))
        .filter(Boolean)
    : []
  const stats = Array.isArray(b.stats)
    ? b.stats.slice(0, 10).map((s) => {
        const o = body(s)
        return {
          value: sanitizeText(o.value, 20),
          label: sanitizeText(o.label, 50),
        }
      })
    : []
  return { lines, stats }
}

export function sanitizeProjectBody(
  raw: unknown,
): Omit<ProjectItem, 'id' | 'order'> & { order?: number } {
  const b = body(raw)
  return {
    title: sanitizeText(b.title, 100),
    type: sanitizeText(b.type, 100),
    desc: sanitizeText(b.desc, 1000),
    url: sanitizeUrl(b.url),
    linkLabel: sanitizeText(b.linkLabel, 50),
    tags: sanitizeTags(b.tags),
    image: typeof b.image === 'string' && b.image ? sanitizeText(b.image, 500) : null,
    wide: sanitizeBoolean(b.wide),
    order: sanitizeNumber(b.order, 0, 9999, 0),
    colorTheme: sanitizeEnum(b.colorTheme, COLOR_THEMES, 'purple'),
  }
}

export function sanitizeSkillBody(
  raw: unknown,
): Omit<SkillItem, 'id' | 'num' | 'order'> & { order?: number } {
  const b = body(raw)
  return {
    title: sanitizeText(b.title, 100),
    desc: sanitizeText(b.desc, 500),
    tags: sanitizeTags(b.tags),
    pct: sanitizeNumber(b.pct, 0, 100, 80),
    iconType: sanitizeEnum(b.iconType, ICON_TYPES, 'default'),
    order: sanitizeNumber(b.order, 0, 9999, 0),
  }
}

export function sanitizeExperienceBody(
  raw: unknown,
): Omit<ExperienceItem, 'id' | 'order'> & { order?: number } {
  const b = body(raw)
  return {
    year: sanitizeText(b.year, 20),
    title: sanitizeText(b.title, 100),
    company: sanitizeText(b.company, 100),
    current: sanitizeBoolean(b.current),
    order: sanitizeNumber(b.order, 0, 9999, 0),
  }
}

export function sanitizeProcessBody(raw: unknown): ProcessData {
  const b = body(raw)
  const steps = Array.isArray(b.steps)
    ? b.steps.slice(0, 20).map((s) => {
        const o = body(s)
        return {
          id: isValidUuid(o.id) ? (o.id as string) : '',
          num: sanitizeText(o.num, 10),
          title: sanitizeText(o.title, 100),
          desc: sanitizeText(o.desc, 500),
          order: sanitizeNumber(o.order, 0, 99, 0),
        }
      })
    : []
  const counters = Array.isArray(b.counters)
    ? b.counters.slice(0, 10).map((c) => {
        const o = body(c)
        return {
          id: isValidUuid(o.id) ? (o.id as string) : '',
          count: o.count === null ? null : sanitizeNumber(o.count, 0, 999999, 0),
          label: sanitizeText(o.label, 100),
          suffix: sanitizeText(o.suffix, 10),
        }
      })
    : []
  return {
    title: sanitizeText(b.title, 200),
    titleAccent: sanitizeText(b.titleAccent, 100),
    steps,
    counters,
  }
}
