import { NextRequest, NextResponse } from 'next/server'
import { getProcessData, saveProcessData } from '@/lib/data.server'
import { sanitizeProcessBody } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getProcessData())
}

export async function PUT(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const data = sanitizeProcessBody(body)
  saveProcessData(data)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
