import { NextRequest, NextResponse } from 'next/server'
import { getSkills, saveSkills } from '@/lib/data.server'
import { sanitizeSkillBody } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  return NextResponse.json(getSkills())
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const sanitized = sanitizeSkillBody(body)
  const items = getSkills()
  const newItem = {
    ...sanitized,
    id: uuidv4(),
    num: `/ ${String(items.length + 1).padStart(2, '0')}`,
    order: items.length,
  }
  items.push(newItem)
  saveSkills(items)
  revalidatePath('/')
  return NextResponse.json(newItem, { status: 201 })
}
