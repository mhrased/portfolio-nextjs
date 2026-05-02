import { NextRequest, NextResponse } from 'next/server'
import { getHeroData, saveHeroData } from '@/lib/data.server'
import { sanitizeHeroBody } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getHeroData())
}

export async function PUT(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const data = sanitizeHeroBody(body)
  if (!data.lines.length) {
    return NextResponse.json({ error: 'At least one headline line is required' }, { status: 400 })
  }
  saveHeroData(data)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
