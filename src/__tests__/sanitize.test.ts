import { describe, it, expect } from 'vitest'
import {
  stripTags,
  sanitizeText,
  sanitizeUrl,
  sanitizeGaId,
  sanitizeNumber,
  sanitizeBoolean,
  sanitizeTags,
  isValidEmail,
  isValidUuid,
  sanitizeEnum,
  sanitizeSiteBody,
  sanitizeHeroBody,
  sanitizeProjectBody,
  sanitizeSkillBody,
  sanitizeExperienceBody,
  sanitizeProcessBody,
  COLOR_THEMES,
  ICON_TYPES,
} from '@/lib/sanitize'

// ─── stripTags ───────────────────────────────────────────────────────────────

describe('stripTags', () => {
  it('removes basic HTML tags', () => {
    expect(stripTags('<b>hello</b>')).toBe('hello')
    expect(stripTags('<div><p>text</p></div>')).toBe('text')
  })

  it('removes script tags along with their content', () => {
    expect(stripTags('<script>alert("xss")</script>hello')).toBe('hello')
    expect(stripTags('a<script src="evil.js"></script>b')).toBe('ab')
  })

  it('removes style blocks along with their content', () => {
    expect(stripTags('<style>body{color:red}</style>text')).toBe('text')
  })

  it('handles self-closing tags', () => {
    expect(stripTags('<img src=x onerror=alert(1) />')).toBe('')
    expect(stripTags('<br />')).toBe('')
  })

  it('returns empty string for non-string input', () => {
    expect(stripTags(null)).toBe('')
    expect(stripTags(undefined)).toBe('')
    expect(stripTags(42)).toBe('')
    expect(stripTags({})).toBe('')
  })

  it('preserves plain text', () => {
    expect(stripTags('Hello, World!')).toBe('Hello, World!')
  })
})

// ─── sanitizeText ────────────────────────────────────────────────────────────

describe('sanitizeText', () => {
  it('strips XSS payloads', () => {
    expect(sanitizeText('<img src=x onerror=alert(1)>')).toBe('')
    expect(sanitizeText('"><script>alert(1)</script>')).toBe('">')
    expect(sanitizeText("'; DROP TABLE users; --")).toBe("'; DROP TABLE users; --")
  })

  it('enforces maxLen', () => {
    const long = 'a'.repeat(600)
    expect(sanitizeText(long, 100)).toHaveLength(100)
  })

  it('removes C0 control characters', () => {
    expect(sanitizeText('hello\x00world')).toBe('helloworld')
    expect(sanitizeText('a\x07b')).toBe('ab')
  })

  it('preserves newlines and tabs (not stripped)', () => {
    // \t and \n are not in the C0 removal range we target
    expect(sanitizeText('line1\nline2')).toContain('line1')
  })

  it('passes clean text through unchanged', () => {
    expect(sanitizeText('Full-stack developer')).toBe('Full-stack developer')
  })

  it('handles non-string input gracefully', () => {
    expect(sanitizeText(null)).toBe('')
    expect(sanitizeText(undefined)).toBe('')
    expect(sanitizeText(42)).toBe('')
  })
})

// ─── sanitizeUrl ─────────────────────────────────────────────────────────────

describe('sanitizeUrl', () => {
  it('allows https and http URLs', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com')
    expect(sanitizeUrl('http://example.com/path')).toBe('http://example.com/path')
  })

  it('allows mailto: links', () => {
    expect(sanitizeUrl('mailto:user@example.com')).toBe('mailto:user@example.com')
  })

  it('allows tel: links', () => {
    expect(sanitizeUrl('tel:+1234567890')).toBe('tel:+1234567890')
  })

  it('allows relative paths and hash anchors', () => {
    expect(sanitizeUrl('/resume.pdf')).toBe('/resume.pdf')
    expect(sanitizeUrl('#contact')).toBe('#contact')
  })

  it('blocks javascript: protocol (case-insensitive)', () => {
    expect(sanitizeUrl('javascript:alert(1)')).toBe('#')
    expect(sanitizeUrl('JAVASCRIPT:alert(1)')).toBe('#')
    expect(sanitizeUrl('Javascript:void(0)')).toBe('#')
  })

  it('blocks data: URIs', () => {
    expect(sanitizeUrl('data:text/html,<h1>xss</h1>')).toBe('#')
    expect(sanitizeUrl('data:image/svg+xml;base64,abc')).toBe('#')
  })

  it('blocks vbscript:', () => {
    expect(sanitizeUrl('vbscript:msgbox(1)')).toBe('#')
  })

  it('returns # for empty or non-string input', () => {
    expect(sanitizeUrl('')).toBe('#')
    expect(sanitizeUrl(null)).toBe('#')
    expect(sanitizeUrl(undefined)).toBe('#')
    expect(sanitizeUrl(42)).toBe('#')
  })
})

// ─── sanitizeGaId ────────────────────────────────────────────────────────────

describe('sanitizeGaId', () => {
  it('accepts valid GA4 measurement IDs', () => {
    expect(sanitizeGaId('G-ABCD1234')).toBe('G-ABCD1234')
    expect(sanitizeGaId('G-ABC12345XY')).toBe('G-ABC12345XY')
  })

  it('normalises to uppercase', () => {
    expect(sanitizeGaId('g-abcd1234')).toBe('G-ABCD1234')
  })

  it('rejects legacy Universal Analytics IDs', () => {
    expect(sanitizeGaId('UA-12345-1')).toBe('')
  })

  it('rejects IDs that are too short', () => {
    expect(sanitizeGaId('G-AB')).toBe('')
    expect(sanitizeGaId('G-')).toBe('')
  })

  it('rejects injection attempts', () => {
    expect(sanitizeGaId('<script>')).toBe('')
    expect(sanitizeGaId('G-"; DROP')).toBe('')
  })

  it('returns empty string for blank input', () => {
    expect(sanitizeGaId('')).toBe('')
    expect(sanitizeGaId(null)).toBe('')
    expect(sanitizeGaId(undefined)).toBe('')
  })
})

// ─── sanitizeNumber ───────────────────────────────────────────────────────────

describe('sanitizeNumber', () => {
  it('passes valid numbers through', () => {
    expect(sanitizeNumber(50, 0, 100, 80)).toBe(50)
  })

  it('clamps to max', () => {
    expect(sanitizeNumber(150, 0, 100, 80)).toBe(100)
  })

  it('clamps to min', () => {
    expect(sanitizeNumber(-5, 0, 100, 80)).toBe(0)
  })

  it('rounds to integer', () => {
    expect(sanitizeNumber(42.9, 0, 100, 0)).toBe(43)
    expect(sanitizeNumber(42.1, 0, 100, 0)).toBe(42)
  })

  it('uses fallback for NaN', () => {
    expect(sanitizeNumber('abc', 0, 100, 50)).toBe(50)
    // Number(null) === 0 in JS — it's a valid numeric value, clamped to min
    expect(sanitizeNumber(null, 0, 100, 50)).toBe(0)
  })

  it('uses fallback for Infinity', () => {
    expect(sanitizeNumber(Infinity, 0, 100, 50)).toBe(50)
    expect(sanitizeNumber(-Infinity, 0, 100, 50)).toBe(50)
  })
})

// ─── sanitizeBoolean ─────────────────────────────────────────────────────────

describe('sanitizeBoolean', () => {
  it('passes actual booleans through', () => {
    expect(sanitizeBoolean(true)).toBe(true)
    expect(sanitizeBoolean(false)).toBe(false)
  })

  it('coerces truthy string/number values', () => {
    expect(sanitizeBoolean('true')).toBe(true)
    expect(sanitizeBoolean('1')).toBe(true)
    expect(sanitizeBoolean(1)).toBe(true)
  })

  it('coerces falsy string/number values', () => {
    expect(sanitizeBoolean('false')).toBe(false)
    expect(sanitizeBoolean('0')).toBe(false)
    expect(sanitizeBoolean(0)).toBe(false)
  })

  it('uses fallback for unrecognised input', () => {
    expect(sanitizeBoolean('maybe', false)).toBe(false)
    expect(sanitizeBoolean(null, true)).toBe(true)
    expect(sanitizeBoolean(undefined, false)).toBe(false)
  })
})

// ─── sanitizeTags ────────────────────────────────────────────────────────────

describe('sanitizeTags', () => {
  it('returns sanitized string array', () => {
    expect(sanitizeTags(['React', 'Node.js'])).toEqual(['React', 'Node.js'])
  })

  it('enforces maxItems limit', () => {
    const tags = Array.from({ length: 30 }, (_, i) => `tag${i}`)
    expect(sanitizeTags(tags)).toHaveLength(20)
  })

  it('strips HTML from each tag', () => {
    expect(sanitizeTags(['<script>bad</script>', 'good'])).toEqual(['good'])
  })

  it('filters out empty strings after sanitization', () => {
    expect(sanitizeTags(['<b></b>', 'valid'])).toEqual(['valid'])
  })

  it('handles non-array input', () => {
    expect(sanitizeTags('not-an-array')).toEqual([])
    expect(sanitizeTags(null)).toEqual([])
    expect(sanitizeTags({})).toEqual([])
  })
})

// ─── isValidEmail ────────────────────────────────────────────────────────────

describe('isValidEmail', () => {
  it('accepts valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('user+tag@sub.domain.org')).toBe(true)
    expect(isValidEmail('a@b.io')).toBe(true)
  })

  it('rejects malformed emails', () => {
    expect(isValidEmail('notanemail')).toBe(false)
    expect(isValidEmail('@domain.com')).toBe(false)
    expect(isValidEmail('user@')).toBe(false)
    expect(isValidEmail('user @example.com')).toBe(false)
  })

  it('rejects injection attempts', () => {
    expect(isValidEmail('<script>@x.com')).toBe(false)
    expect(isValidEmail("'; DROP TABLE users; --@x.com")).toBe(false)
  })

  it('rejects non-string input', () => {
    expect(isValidEmail(null)).toBe(false)
    expect(isValidEmail(42)).toBe(false)
  })
})

// ─── isValidUuid ─────────────────────────────────────────────────────────────

describe('isValidUuid', () => {
  it('accepts valid v4 UUIDs', () => {
    expect(isValidUuid('f47ac10b-58cc-4372-a567-0e02b2c3d479')).toBe(true)
    expect(isValidUuid('550e8400-e29b-4d4a-a716-446655440000')).toBe(true)
  })

  it('rejects path traversal attempts', () => {
    expect(isValidUuid('../../../etc/passwd')).toBe(false)
    expect(isValidUuid('../../sensitive')).toBe(false)
  })

  it('rejects injection strings', () => {
    expect(isValidUuid('<script>alert(1)</script>')).toBe(false)
    expect(isValidUuid("'; DROP TABLE")).toBe(false)
  })

  it('rejects non-UUID strings', () => {
    expect(isValidUuid('not-a-uuid')).toBe(false)
    expect(isValidUuid('')).toBe(false)
  })

  it('rejects non-string input', () => {
    expect(isValidUuid(null)).toBe(false)
    expect(isValidUuid(42)).toBe(false)
  })
})

// ─── sanitizeEnum ────────────────────────────────────────────────────────────

describe('sanitizeEnum', () => {
  it('returns the value when it is in the allowed list', () => {
    expect(sanitizeEnum('blue', COLOR_THEMES, 'purple')).toBe('blue')
    expect(sanitizeEnum('green', COLOR_THEMES, 'purple')).toBe('green')
  })

  it('falls back for unlisted values', () => {
    expect(sanitizeEnum('red', COLOR_THEMES, 'purple')).toBe('purple')
    expect(sanitizeEnum('rainbow', COLOR_THEMES, 'purple')).toBe('purple')
  })

  it('falls back for injection attempts', () => {
    expect(sanitizeEnum('<script>', COLOR_THEMES, 'purple')).toBe('purple')
    expect(sanitizeEnum("'; DROP TABLE", COLOR_THEMES, 'purple')).toBe('purple')
  })

  it('falls back for non-string input', () => {
    expect(sanitizeEnum(null, COLOR_THEMES, 'purple')).toBe('purple')
    expect(sanitizeEnum(undefined, COLOR_THEMES, 'purple')).toBe('purple')
    expect(sanitizeEnum(42, COLOR_THEMES, 'purple')).toBe('purple')
  })
})

// ─── sanitizeSiteBody ────────────────────────────────────────────────────────

describe('sanitizeSiteBody', () => {
  it('sanitizes a clean payload without change', () => {
    const input = {
      name: 'John Doe',
      shortName: 'John',
      initials: 'JD',
      role: 'Dev',
      year: '2025',
      status: 'Available',
      email: 'john@example.com',
      phone: '+1 234 567',
      location: 'NYC',
      responseTime: '24h',
      resumeUrl: 'https://example.com/resume.pdf',
      bio1: 'Bio 1',
      bio2: 'Bio 2',
      bio3: 'Bio 3',
      bio4: 'Bio 4',
      heroSubtitle: 'Sub',
      heroCta1: 'See work',
      heroCta2: 'Hire me',
      navAvailable: 'Available',
      aboutTitle: 'About',
      contactTitle: 'Contact',
      contactKicker: 'Kicker',
      footerTagline: 'Built.',
      gaId: 'G-ABCD1234',
    }
    const out = sanitizeSiteBody(input)
    expect(out.name).toBe('John Doe')
    expect(out.email).toBe('john@example.com')
    expect(out.gaId).toBe('G-ABCD1234')
  })

  it('strips HTML from text fields', () => {
    const out = sanitizeSiteBody({ name: '<script>evil()</script>John' })
    expect(out.name).toBe('John')
  })

  it('blocks javascript: in resumeUrl', () => {
    const out = sanitizeSiteBody({ resumeUrl: 'javascript:alert(1)' })
    expect(out.resumeUrl).toBe('#')
  })

  it('rejects invalid email', () => {
    const out = sanitizeSiteBody({ email: 'not-an-email' })
    expect(out.email).toBe('')
  })

  it('rejects invalid gaId', () => {
    const out = sanitizeSiteBody({ gaId: 'INVALID' })
    expect(out.gaId).toBe('')
  })

  it('handles completely empty body', () => {
    const out = sanitizeSiteBody({})
    expect(out.name).toBe('')
    expect(out.gaId).toBe('')
  })

  it('handles non-object body', () => {
    const out = sanitizeSiteBody(null)
    expect(out.name).toBe('')
  })
})

// ─── sanitizeHeroBody ────────────────────────────────────────────────────────

describe('sanitizeHeroBody', () => {
  it('sanitizes valid hero data', () => {
    const out = sanitizeHeroBody({
      lines: ['Full-stack.', 'End-to-end.'],
      stats: [{ value: '6+', label: 'Years' }],
    })
    expect(out.lines).toEqual(['Full-stack.', 'End-to-end.'])
    expect(out.stats[0].value).toBe('6+')
  })

  it('strips HTML from lines', () => {
    const out = sanitizeHeroBody({ lines: ['<b>Hello</b>'] })
    expect(out.lines).toEqual(['Hello'])
  })

  it('limits lines to 10', () => {
    const lines = Array.from({ length: 15 }, (_, i) => `line${i}`)
    const out = sanitizeHeroBody({ lines })
    expect(out.lines).toHaveLength(10)
  })

  it('returns empty arrays for missing fields', () => {
    const out = sanitizeHeroBody({})
    expect(out.lines).toEqual([])
    expect(out.stats).toEqual([])
  })
})

// ─── sanitizeProjectBody ─────────────────────────────────────────────────────

describe('sanitizeProjectBody', () => {
  it('sanitizes a valid project', () => {
    const out = sanitizeProjectBody({
      title: 'MyApp',
      type: 'Web',
      desc: 'A project',
      url: 'https://example.com',
      linkLabel: 'VISIT',
      tags: ['React', 'Node.js'],
      wide: true,
      colorTheme: 'blue',
    })
    expect(out.title).toBe('MyApp')
    expect(out.url).toBe('https://example.com')
    expect(out.colorTheme).toBe('blue')
    expect(out.wide).toBe(true)
  })

  it('blocks javascript: in url', () => {
    const out = sanitizeProjectBody({ url: 'javascript:alert(1)' })
    expect(out.url).toBe('#')
  })

  it('falls back to purple for unknown colorTheme', () => {
    const out = sanitizeProjectBody({ colorTheme: 'neon' })
    expect(out.colorTheme).toBe('purple')
  })

  it('strips HTML from title and desc', () => {
    const out = sanitizeProjectBody({
      title: '<img onerror=alert(1)>Project',
      desc: '<script>evil()</script>Description',
    })
    expect(out.title).toBe('Project')
    expect(out.desc).toBe('Description')
  })

  it('clamps pct-like numeric fields', () => {
    // order should be clamped to [0, 9999]
    const out = sanitizeProjectBody({ order: 99999 })
    expect(out.order).toBe(9999)
  })
})

// ─── sanitizeSkillBody ───────────────────────────────────────────────────────

describe('sanitizeSkillBody', () => {
  it('sanitizes a valid skill', () => {
    const out = sanitizeSkillBody({
      title: 'React',
      desc: 'Frontend',
      tags: ['JSX'],
      pct: 90,
      iconType: 'web',
    })
    expect(out.title).toBe('React')
    expect(out.pct).toBe(90)
    expect(out.iconType).toBe('web')
  })

  it('clamps pct to [0, 100]', () => {
    expect(sanitizeSkillBody({ pct: 150 }).pct).toBe(100)
    expect(sanitizeSkillBody({ pct: -10 }).pct).toBe(0)
  })

  it('falls back to default for unknown iconType', () => {
    expect(sanitizeSkillBody({ iconType: 'unknown' }).iconType).toBe('default')
  })

  it('accepts all valid iconTypes', () => {
    ICON_TYPES.forEach((t) => {
      expect(sanitizeSkillBody({ iconType: t }).iconType).toBe(t)
    })
  })
})

// ─── sanitizeExperienceBody ──────────────────────────────────────────────────

describe('sanitizeExperienceBody', () => {
  it('sanitizes a valid experience entry', () => {
    const out = sanitizeExperienceBody({
      year: '2020–2023',
      title: 'Senior Dev',
      company: 'Acme',
      current: false,
    })
    expect(out.year).toBe('2020–2023')
    expect(out.title).toBe('Senior Dev')
    expect(out.current).toBe(false)
  })

  it('strips HTML from title and company', () => {
    const out = sanitizeExperienceBody({
      title: '<b>Lead</b>',
      company: '<script>evil()</script>Corp',
    })
    expect(out.title).toBe('Lead')
    expect(out.company).toBe('Corp')
  })
})

// ─── sanitizeProcessBody ─────────────────────────────────────────────────────

describe('sanitizeProcessBody', () => {
  it('sanitizes valid process data', () => {
    const out = sanitizeProcessBody({
      title: 'A process',
      titleAccent: 'process',
      steps: [
        {
          id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          num: '01',
          title: 'Discover',
          desc: 'Research',
          order: 0,
        },
      ],
      counters: [
        { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', count: 6, label: 'Years', suffix: '+' },
      ],
    })
    expect(out.title).toBe('A process')
    expect(out.steps).toHaveLength(1)
    expect(out.counters[0].count).toBe(6)
  })

  it('allows null count in counters', () => {
    const out = sanitizeProcessBody({
      title: '',
      titleAccent: '',
      counters: [
        { id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', count: null, label: 'Commits', suffix: '' },
      ],
      steps: [],
    })
    expect(out.counters[0].count).toBeNull()
  })

  it('strips HTML from step titles', () => {
    const out = sanitizeProcessBody({
      title: '',
      titleAccent: '',
      steps: [
        {
          id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
          num: '01',
          title: '<b>Step</b>',
          desc: '',
          order: 0,
        },
      ],
      counters: [],
    })
    expect(out.steps[0].title).toBe('Step')
  })
})
