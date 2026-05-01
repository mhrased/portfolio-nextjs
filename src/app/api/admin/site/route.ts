import { NextRequest, NextResponse } from 'next/server'
import { getSiteData, saveSiteData, SiteData } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getSiteData())
}

export async function PUT(request: NextRequest) {
  const data = (await request.json()) as SiteData
  saveSiteData(data)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
