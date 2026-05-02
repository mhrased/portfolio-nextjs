import { NextRequest, NextResponse } from 'next/server'
import { getProjects, saveProjects } from '@/lib/data.server'
import { sanitizeProjectBody } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  return NextResponse.json(getProjects())
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const sanitized = sanitizeProjectBody(body)
  const items = getProjects()
  const newItem = { ...sanitized, id: uuidv4(), order: items.length }
  items.push(newItem)
  saveProjects(items)
  revalidatePath('/')
  return NextResponse.json(newItem, { status: 201 })
}
