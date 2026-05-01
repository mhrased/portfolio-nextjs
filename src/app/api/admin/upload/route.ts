import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const filename = formData.get('filename') as string | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }

  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadsDir, { recursive: true })

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const targetName = filename
    ? `${filename.replace(/[^a-zA-Z0-9-_]/g, '-')}.${ext}`
    : `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(path.join(uploadsDir, targetName), buffer)

  return NextResponse.json({ url: `/uploads/${targetName}`, name: targetName })
}
