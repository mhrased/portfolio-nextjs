import { NextRequest, NextResponse } from 'next/server'
import { getExperience, saveExperience } from '@/lib/data.server'
import { sanitizeExperienceBody } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  return NextResponse.json(getExperience())
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const sanitized = sanitizeExperienceBody(body)
  const items = getExperience()
  const newItem = { ...sanitized, id: uuidv4(), order: items.length }
  items.push(newItem)
  saveExperience(items)
  revalidatePath('/')
  return NextResponse.json(newItem, { status: 201 })
}
