import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/lib/firebase/admin'
import { createSession } from '@/lib/auth/session'
import { checkRateLimit, resetRateLimit } from '@/lib/auth/rate-limit'

export async function POST(request: NextRequest) {
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
  const idToken = typeof raw?.idToken === 'string' ? raw.idToken : null

  if (!idToken) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  try {
    const decoded = await adminAuth.verifyIdToken(idToken)
    resetRateLimit(ip)
    await createSession(decoded.email ?? '')
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }
}
