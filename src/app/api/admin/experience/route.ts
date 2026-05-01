import { NextRequest, NextResponse } from 'next/server'
import { getExperience, saveExperience, ExperienceItem } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  return NextResponse.json(getExperience())
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const items = getExperience()
  const newItem: ExperienceItem = {
    id: uuidv4(),
    year: body.year || '',
    title: body.title || '',
    company: body.company || '',
    current: body.current || false,
    order: items.length,
  }
  items.push(newItem)
  saveExperience(items)
  revalidatePath('/')
  return NextResponse.json(newItem, { status: 201 })
}
