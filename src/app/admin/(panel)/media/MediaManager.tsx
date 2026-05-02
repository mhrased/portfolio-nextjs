'use client'

import { useState, useRef, useCallback } from 'react'
import { Card, Btn, showToast, useConfirm } from '@/components/admin/AdminUI'

export default function MediaManager({ initialFiles }: { initialFiles: string[] }) {
  const [files, setFiles] = useState(initialFiles)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [customName, setCustomName] = useState('')
  const [copied, setCopied] = useState<string | null>(null)
  const fileInput = useRef<HTMLInputElement>(null)
  const { confirm, Dialog } = useConfirm()

  const uploadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        showToast('Only image files are allowed', 'error')
        return
      }
      setUploading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        if (customName.trim()) formData.append('filename', customName.trim())
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        if (res.ok) {
          const { url } = await res.json()
          setFiles((prev) =>
            prev.includes(url) ? prev.map((f) => (f === url ? url : f)) : [...prev, url],
          )
          showToast('Image uploaded successfully')
          setCustomName('')
        } else {
          const err = await res.json()
          showToast(err.error || 'Upload failed', 'error')
        }
      } catch {
        showToast('Upload error', 'error')
      }
      setUploading(false)
    },
    [customName],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) uploadFile(file)
    },
    [uploadFile],
  )

  async function handleDelete(url: string) {
    const filename = url.split('/').pop()!
    if (!(await confirm(`Delete "${filename}"? This cannot be undone.`))) return
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),
    })
    if (res.ok) {
      setFiles((prev) => prev.filter((f) => f !== url))
      showToast('File deleted')
    } else showToast('Failed to delete', 'error')
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      <Dialog />
      {/* Upload area */}
      <Card style={{ marginBottom: 24 }}>
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 16px',
            letterSpacing: '-0.02em',
          }}
        >
          Upload Image
        </h3>
        <div style={{ marginBottom: 16 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#8892a4',
              marginBottom: 6,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Custom filename (optional)
          </label>
          <input
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="e.g. profile-photo (without extension) — leave blank to auto-name"
            style={{
              width: '100%',
              background: '#0b0f1a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              padding: '10px 12px',
              color: '#f0f4ff',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <p style={{ fontSize: 12, color: '#4a5568', marginTop: 5 }}>
            If a file with this name already exists, it will be replaced.
          </p>
        </div>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInput.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? '#7359ff' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 12,
            padding: '40px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? 'rgba(115,89,255,0.05)' : 'transparent',
            transition: 'all 0.15s',
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 10 }}>🖼</div>
          <p style={{ color: '#8892a4', fontSize: 14, margin: 0 }}>
            {uploading ? 'Uploading...' : 'Drop image here or click to browse'}
          </p>
          <p style={{ color: '#4a5568', fontSize: 12, marginTop: 6 }}>
            JPG, PNG, GIF, WebP, SVG, AVIF · Max 5MB
          </p>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) uploadFile(f)
            }}
          />
        </div>
      </Card>

      {/* Grid */}
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#8892a4',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        Library ({files.length} files)
      </h3>
      {files.length === 0 && (
        <Card style={{ textAlign: 'center', color: '#8892a4', padding: 40 }}>
          No images uploaded yet.
        </Card>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
        }}
      >
        {files.map((url) => {
          const name = url.split('/').pop()!
          return (
            <div
              key={url}
              style={{
                background: '#141827',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: 160,
                  background: '#0b0f1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: 12 }}>
                <p
                  style={{
                    fontSize: 12,
                    color: '#8892a4',
                    margin: '0 0 10px',
                    wordBreak: 'break-all',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {name}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn
                    variant="ghost"
                    onClick={() => copyUrl(url)}
                    style={{ padding: '5px 10px', fontSize: 11, flex: 1, justifyContent: 'center' }}
                  >
                    {copied === url ? '✓ Copied' : 'Copy URL'}
                  </Btn>
                  <Btn
                    variant="danger"
                    onClick={() => handleDelete(url)}
                    style={{ padding: '5px 10px', fontSize: 11 }}
                  >
                    Del
                  </Btn>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
