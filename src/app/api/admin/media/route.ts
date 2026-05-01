import { NextRequest, NextResponse } from 'next/server'
import { unlink } from 'fs/promises'
import path from 'path'
import { getUploads } from '@/lib/data.server'

export async function GET() {
  return NextResponse.json(getUploads())
}

export async function DELETE(request: NextRequest) {
  const { filename } = await request.json()
  if (!filename || filename.includes('..') || filename.includes('/')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
  }
  const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
  try {
    await unlink(filePath)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
