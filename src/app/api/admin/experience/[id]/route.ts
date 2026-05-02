import { NextRequest, NextResponse } from 'next/server'
import { getExperience, saveExperience } from '@/lib/data.server'
import { sanitizeExperienceBody, isValidUuid } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isValidUuid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const items = getExperience()
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const sanitized = sanitizeExperienceBody(body)
  items[idx] = { ...items[idx], ...sanitized, id }
  saveExperience(items)
  revalidatePath('/')
  return NextResponse.json(items[idx])
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!isValidUuid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }
  const items = getExperience().filter((i) => i.id !== id)
  saveExperience(items)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
