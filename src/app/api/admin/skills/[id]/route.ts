import { NextRequest, NextResponse } from 'next/server'
import { getSkills, saveSkills } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const items = getSkills()
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  items[idx] = { ...items[idx], ...body, id }
  saveSkills(items)
  revalidatePath('/')
  return NextResponse.json(items[idx])
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const items = getSkills().filter((i) => i.id !== id)
  saveSkills(items)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
