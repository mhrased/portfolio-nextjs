import { NextRequest, NextResponse } from 'next/server'
import { getProcessData, saveProcessData, ProcessData } from '@/lib/data.server'
import { revalidatePath } from 'next/cache'

export async function GET() {
  return NextResponse.json(getProcessData())
}

export async function PUT(request: NextRequest) {
  const data = (await request.json()) as ProcessData
  saveProcessData(data)
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
