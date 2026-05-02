import { NextRequest, NextResponse } from 'next/server'
import { getSiteData, saveSiteData } from '@/lib/data.server'
import { sanitizeSiteBody } from '@/lib/sanitize'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getSiteData())
}

export async function PUT(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const data = sanitizeSiteBody(body)
  saveSiteData(data)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
