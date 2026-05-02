'use client'

import { useState } from 'react'
import { ExperienceItem } from '@/lib/data.server'
import { Card, Field, Input, Btn, showToast, useConfirm } from '@/components/admin/AdminUI'

export default function ExperienceManager({ initialItems }: { initialItems: ExperienceItem[] }) {
  const [items, setItems] = useState(initialItems)
  const [editing, setEditing] = useState<ExperienceItem | null>(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const { confirm, Dialog } = useConfirm()

  const emptyItem = { year: '', title: '', company: '', current: false }
  const [form, setForm] = useState<Partial<ExperienceItem>>(emptyItem)

  function openCreate() {
    setForm(emptyItem)
    setEditing(null)
    setCreating(true)
  }
  function openEdit(item: ExperienceItem) {
    setForm(item)
    setEditing(item)
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
        const res = await fetch('/api/admin/experience', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const newItem = await res.json()
          setItems((prev) => [...prev, newItem])
          showToast('Entry added')
          closeForm()
        } else showToast('Failed to create', 'error')
      } else if (editing) {
        const res = await fetch(`/api/admin/experience/${editing.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (res.ok) {
          const u = await res.json()
          setItems((prev) => prev.map((i) => (i.id === editing.id ? u : i)))
          showToast('Entry updated')
          closeForm()
        } else showToast('Failed to update', 'error')
      }
    } catch {
      showToast('Error', 'error')
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    const ok = await confirm('Delete this timeline entry?')
    if (!ok) return
    const res = await fetch(`/api/admin/experience/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      showToast('Entry deleted')
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
          Add Entry
        </Btn>
      </div>

      {(creating || editing) && (
        <Card style={{ marginBottom: 24, border: '1px solid rgba(115,89,255,0.3)' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f0f4ff', margin: '0 0 20px' }}>
            {creating ? 'New Timeline Entry' : 'Edit Entry'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16 }}>
            <Field label="Year">
              <Input
                value={form.year || ''}
                onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                placeholder="2024"
              />
            </Field>
            <Field label="Role / Title">
              <Input
                value={form.title || ''}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Senior Developer"
              />
            </Field>
          </div>
          <Field label="Company / Context">
            <Input
              value={form.company || ''}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              placeholder="Company name · description"
            />
          </Field>
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#8892a4',
              fontSize: 14,
              cursor: 'pointer',
              marginBottom: 20,
            }}
          >
            <input
              type="checkbox"
              checked={form.current || false}
              onChange={(e) => setForm((f) => ({ ...f, current: e.target.checked }))}
              style={{ accentColor: '#7359ff' }}
            />
            Current position (shown as active)
          </label>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn onClick={handleSave} loading={saving}>
              {creating ? 'Add Entry' : 'Save'}
            </Btn>
            <Btn variant="ghost" onClick={closeForm}>
              Cancel
            </Btn>
          </div>
        </Card>
      )}

      {/* Timeline visual */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 12,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'rgba(115,89,255,0.15)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.length === 0 && (
            <Card style={{ textAlign: 'center', color: '#8892a4', padding: 40 }}>
              No timeline entries yet.
            </Card>
          )}
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 20,
                paddingLeft: 36,
                paddingBottom: 20,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: item.current ? 'linear-gradient(135deg,#7359ff,#3399ff)' : '#1a2030',
                  border: `2px solid ${item.current ? '#7359ff' : 'rgba(115,89,255,0.2)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.current && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                )}
              </div>
              <Card
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '14px 18px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span
                      style={{
                        fontSize: 12,
                        color: '#7359ff',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {item.year}
                    </span>
                    {item.current && (
                      <span
                        style={{
                          fontSize: 11,
                          background: 'rgba(51,217,128,0.12)',
                          border: '1px solid rgba(51,217,128,0.25)',
                          color: '#4ade80',
                          borderRadius: 6,
                          padding: '1px 7px',
                          fontWeight: 600,
                        }}
                      >
                        NOW
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#f0f4ff', marginTop: 2 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#8892a4', marginTop: 2 }}>{item.company}</div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <Btn
                    variant="ghost"
                    onClick={() => openEdit(item)}
                    style={{ padding: '6px 12px', fontSize: 12 }}
                  >
                    Edit
                  </Btn>
                  <Btn
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                    style={{ padding: '6px 12px', fontSize: 12 }}
                  >
                    Delete
                  </Btn>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
