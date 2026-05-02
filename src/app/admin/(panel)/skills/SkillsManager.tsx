'use client'

import { useState } from 'react'
import { SkillItem } from '@/lib/data.server'
import {
  Card,
  Field,
  Input,
  Textarea,
  Btn,
  showToast,
  useConfirm,
} from '@/components/admin/AdminUI'

export default function SkillsManager({ initialSkills }: { initialSkills: SkillItem[] }) {
  const [skills, setSkills] = useState(initialSkills)
  const [editing, setEditing] = useState<SkillItem | null>(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const { confirm, Dialog } = useConfirm()

  const ICON_TYPES = ['web', 'api', 'database', 'mobile', 'devops', 'cms', 'design', 'default']
  const emptySkill = { title: '', desc: '', tags: [] as string[], pct: 80, iconType: 'default' }
  const [form, setForm] = useState<Partial<SkillItem>>(emptySkill)

  function openCreate() {
    setForm(emptySkill)
    setEditing(null)
    setCreating(true)
  }
  function openEdit(s: SkillItem) {
    setForm(s)
    setEditing(s)
    setCreating(false)
  }
  function closeForm() {
    setEditing(null)
    setCreating(false)
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

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, tags: parseTags(form.tags), pct: Number(form.pct) }
      if (creating) {
        const res = await fetch('/api/admin/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const newSkill = await res.json()
          setSkills((prev) => [...prev, newSkill])
          showToast('Skill created')
          closeForm()
        } else showToast('Failed to create', 'error')
      } else if (editing) {
        const res = await fetch(`/api/admin/skills/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          const u = await res.json()
          setSkills((prev) => prev.map((s) => (s.id === editing.id ? u : s)))
          showToast('Skill updated')
          closeForm()
        } else showToast('Failed to update', 'error')
      }
    } catch {
      showToast('Error', 'error')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const ok = await confirm('Delete this skill?')
    if (!ok) return
    const res = await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setSkills((prev) => prev.filter((s) => s.id !== id))
      showToast('Skill deleted')
    } else showToast('Failed to delete', 'error')
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
          Add Skill
        </Btn>
      </div>

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
            {creating ? 'New Skill' : `Editing: ${editing?.title}`}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 16 }}>
            <Field label="Skill Title">
              <Input
                value={form.title || ''}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Web Development"
              />
            </Field>
            <Field label="Proficiency %">
              <Input
                type="number"
                min={0}
                max={100}
                value={form.pct || 80}
                onChange={(e) => setForm((f) => ({ ...f, pct: Number(e.target.value) }))}
              />
            </Field>
          </div>
          <Field label="Description">
            <Textarea
              rows={3}
              value={form.desc || ''}
              onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
              placeholder="Brief description of this skill area..."
            />
          </Field>
          <Field label="Tags" hint="Comma-separated">
            <Input
              value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags || ''}
              onChange={(e) =>
                setForm((f) => ({ ...f, tags: e.target.value as unknown as string[] }))
              }
              placeholder="React, TypeScript, Tailwind"
            />
          </Field>
          <Field label="Icon Type">
            <select
              value={form.iconType || 'default'}
              onChange={(e) => setForm((f) => ({ ...f, iconType: e.target.value }))}
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
              {ICON_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={handleSave} loading={saving}>
              {creating ? 'Create' : 'Save'}
            </Btn>
            <Btn variant="ghost" onClick={closeForm}>
              Cancel
            </Btn>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {skills.length === 0 && (
          <Card style={{ textAlign: 'center', color: '#8892a4', padding: 40 }}>No skills yet.</Card>
        )}
        {skills.map((s) => (
          <Card
            key={s.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>{s.title}</span>
                <span style={{ fontSize: 12, color: '#7359ff', fontWeight: 700 }}>{s.pct}%</span>
              </div>
              {/* Progress bar */}
              <div
                style={{
                  height: 4,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: 2,
                  marginBottom: 8,
                  maxWidth: 300,
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${s.pct}%`,
                    background: 'linear-gradient(90deg,#7359ff,#3399ff)',
                    borderRadius: 2,
                  }}
                />
              </div>
              <p style={{ fontSize: 12, color: '#8892a4', margin: '0 0 6px' }}>{s.desc}</p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {s.tags.map((t) => (
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
              <Btn variant="ghost" onClick={() => openEdit(s)} style={{ padding: '7px 14px' }}>
                Edit
              </Btn>
              <Btn
                variant="danger"
                onClick={() => handleDelete(s.id)}
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
