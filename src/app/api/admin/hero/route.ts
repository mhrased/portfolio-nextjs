import { NextRequest, NextResponse } from 'next/server'
import { getHeroData, saveHeroData, HeroData } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getHeroData())
}

export async function PUT(request: NextRequest) {
  const data = (await request.json()) as HeroData
  saveHeroData(data)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
