'use client'

import { useState } from 'react'
import { ProjectItem } from '@/lib/data.server'
import {
  Card,
  Field,
  Input,
  Textarea,
  Btn,
  Badge,
  showToast,
  useConfirm,
} from '@/components/admin/AdminUI'

const COLOR_THEMES = ['purple', 'blue', 'green', 'yellow', 'pink'] as const

export default function ProjectsManager({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [projects, setProjects] = useState(initialProjects)
  const [editing, setEditing] = useState<ProjectItem | null>(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const { confirm, Dialog } = useConfirm()

  const emptyProject: Omit<ProjectItem, 'id' | 'order'> = {
    title: '',
    type: '',
    desc: '',
    url: '',
    linkLabel: 'VISIT LIVE',
    tags: [],
    image: null,
    wide: false,
    colorTheme: 'purple',
  }
  const [form, setForm] = useState<Partial<ProjectItem>>(emptyProject)

  function openCreate() {
    setForm(emptyProject)
    setEditing(null)
    setCreating(true)
  }

  function openEdit(p: ProjectItem) {
    setForm(p)
    setEditing(p)
    setCreating(false)
  }

  function closeForm() {
    setEditing(null)
    setCreating(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      if (creating) {
        const res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, tags: parseTags(form.tags) }),
        })
        if (res.ok) {
          const newP = await res.json()
          setProjects((prev) => [...prev, newP])
          showToast('Project created')
          closeForm()
        } else showToast('Failed to create project', 'error')
      } else if (editing) {
        const res = await fetch(`/api/admin/projects/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, tags: parseTags(form.tags) }),
        })
        if (res.ok) {
          const updated = await res.json()
          setProjects((prev) => prev.map((p) => (p.id === editing.id ? updated : p)))
          showToast('Project updated')
          closeForm()
        } else showToast('Failed to update', 'error')
      }
    } catch {
      showToast('Error saving project', 'error')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const ok = await confirm('Delete this project? This cannot be undone.')
    if (!ok) return
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id))
      showToast('Project deleted')
    } else showToast('Failed to delete', 'error')
  }

  function parseTags(tags: unknown): string[] {
    if (Array.isArray(tags)) return tags
    if (typeof tags === 'string')
      return tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    return []
  }

  return (
    <>
      <Dialog />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <Btn onClick={openCreate}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Project
        </Btn>
      </div>

      {/* Form */}
      {(creating || editing) && (
        <Card style={{ marginBottom: 24, border: '1px solid rgba(115,89,255,0.3)' }}>
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#f0f4ff',
              margin: '0 0 20px',
              letterSpacing: '-0.02em',
            }}
          >
            {creating ? 'New Project' : `Editing: ${editing?.title}`}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Title">
              <Input
                value={form.title || ''}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Project name"
              />
            </Field>
            <Field label="Type / Category">
              <Input
                value={form.type || ''}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                placeholder="Web · Full-stack"
              />
            </Field>
            <Field label="URL">
              <Input
                value={form.url || ''}
                onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                placeholder="https://..."
              />
            </Field>
            <Field label="Link Label">
              <Input
                value={form.linkLabel || ''}
                onChange={(e) => setForm((f) => ({ ...f, linkLabel: e.target.value }))}
                placeholder="VISIT LIVE"
              />
            </Field>
          </div>
          <Field label="Description">
            <Textarea
              rows={3}
              value={form.desc || ''}
              onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
              placeholder="Short project description..."
            />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <Field label="Tags" hint="Comma-separated: React, Node.js, AWS">
              <Input
                value={
                  Array.isArray(form.tags)
                    ? form.tags.join(', ')
                    : (form.tags as unknown as string) || ''
                }
                onChange={(e) =>
                  setForm((f) => ({ ...f, tags: e.target.value as unknown as string[] }))
                }
                placeholder="React, Node.js, PostgreSQL"
              />
            </Field>
            <Field label="Color Theme">
              <select
                value={form.colorTheme || 'purple'}
                onChange={(e) => setForm((f) => ({ ...f, colorTheme: e.target.value }))}
                style={{
                  width: '100%',
                  background: '#0b0f1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  color: '#f0f4ff',
                  fontSize: 14,
                  outline: 'none',
                }}
              >
                {COLOR_THEMES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#8892a4',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={form.wide || false}
                onChange={(e) => setForm((f) => ({ ...f, wide: e.target.checked }))}
                style={{ accentColor: '#7359ff' }}
              />
              Full-width card (wide layout)
            </label>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={handleSave} loading={saving}>
              {creating ? 'Create Project' : 'Save Changes'}
            </Btn>
            <Btn variant="ghost" onClick={closeForm}>
              Cancel
            </Btn>
          </div>
        </Card>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.length === 0 && (
          <Card style={{ textAlign: 'center', color: '#8892a4', padding: 40 }}>
            No projects yet. Add your first project above.
          </Card>
        )}
        {projects.map((p) => (
          <Card
            key={p.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#f0f4ff' }}>{p.title}</span>
                {p.wide && <Badge color="purple">Wide</Badge>}
                <Badge color={p.colorTheme as 'purple' | 'blue' | 'green' | 'yellow'}>
                  {p.type}
                </Badge>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: '#8892a4',
                  margin: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {p.desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 11,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 5,
                      padding: '2px 8px',
                      color: '#8892a4',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              <Btn variant="ghost" onClick={() => openEdit(p)} style={{ padding: '7px 14px' }}>
                Edit
              </Btn>
              <Btn
                variant="danger"
                onClick={() => handleDelete(p.id)}
                style={{ padding: '7px 14px' }}
              >
                Delete
              </Btn>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
