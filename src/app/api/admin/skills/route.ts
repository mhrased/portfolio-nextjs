import { NextRequest, NextResponse } from 'next/server'
import { getSkills, saveSkills, SkillItem } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  return NextResponse.json(getSkills())
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const items = getSkills()
  const newItem: SkillItem = {
    id: uuidv4(),
    num: `/ ${String(items.length + 1).padStart(2, '0')}`,
    title: body.title || '',
    desc: body.desc || '',
    tags: body.tags || [],
    pct: body.pct || 80,
    iconType: body.iconType || 'default',
    order: items.length,
  }
  items.push(newItem)
  saveSkills(items)
  revalidatePath('/')
  return NextResponse.json(newItem, { status: 201 })
}
