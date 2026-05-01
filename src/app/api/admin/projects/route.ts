import { NextRequest, NextResponse } from 'next/server'
import { getProjects, saveProjects, ProjectItem } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  return NextResponse.json(getProjects())
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const items = getProjects()
  const newItem: ProjectItem = {
    id: uuidv4(),
    title: body.title || '',
    type: body.type || '',
    desc: body.desc || '',
    url: body.url || '',
    linkLabel: body.linkLabel || 'VISIT LIVE',
    tags: body.tags || [],
    image: body.image || null,
    wide: body.wide || false,
    order: items.length,
    colorTheme: body.colorTheme || 'purple',
  }
  items.push(newItem)
  saveProjects(items)
  revalidatePath('/')
  return NextResponse.json(newItem, { status: 201 })
}
