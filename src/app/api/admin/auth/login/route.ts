import { NextRequest, NextResponse } from 'next/server'
import { createSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  const validEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const validPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (email !== validEmail || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await createSession(email)
  return NextResponse.json({ success: true })
}
