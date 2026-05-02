import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth/session'
import { checkRateLimit, resetRateLimit } from '@/lib/auth/rate-limit'
import { isValidEmail, sanitizeText } from '@/lib/sanitize'

export async function POST(request: NextRequest) {
  // Rate limit by IP — 5 attempts per 15 minutes
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in 15 minutes.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const raw = body as Record<string, unknown>
  const email = sanitizeText(raw?.email, 320)
  const password = sanitizeText(raw?.password, 128)

  if (!isValidEmail(email) || !password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const validEmail = process.env.ADMIN_EMAIL ?? 'admin@example.com'
  const validPassword = process.env.ADMIN_PASSWORD ?? 'admin123'

  if (email.toLowerCase() !== validEmail.toLowerCase() || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  resetRateLimit(ip)
  await createSession(email)
  return NextResponse.json({ success: true })
}
