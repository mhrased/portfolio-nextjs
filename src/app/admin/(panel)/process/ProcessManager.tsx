'use client'

import { useState } from 'react'
import { ProcessData, ProcessStep, ProcessCounter } from '@/lib/data.server'
import { Card, Field, Input, Textarea, Btn, showToast } from '@/components/admin/AdminUI'
import { v4 as uuidv4 } from 'uuid'

export default function ProcessManager({ initialData }: { initialData: ProcessData }) {
  const [data, setData] = useState(initialData)
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/process', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) showToast('Process & stats saved')
      else showToast('Failed to save', 'error')
    } catch {
      showToast('Error saving', 'error')
    }
    setSaving(false)
  }

  function updateStep(i: number, key: keyof ProcessStep, value: string) {
    setData((d) => {
      const steps = [...d.steps]
      steps[i] = { ...steps[i], [key]: value }
      return { ...d, steps }
    })
  }

  function updateCounter(i: number, key: keyof ProcessCounter, value: string | number | null) {
    setData((d) => {
      const counters = [...d.counters]
      counters[i] = { ...counters[i], [key]: value }
      return { ...d, counters }
    })
  }

  function addStep() {
    const newStep: ProcessStep = {
      id: uuidv4(),
      num: String(data.steps.length + 1).padStart(2, '0'),
      title: '',
      desc: '',
      order: data.steps.length,
    }
    setData((d) => ({ ...d, steps: [...d.steps, newStep] }))
  }

  function removeStep(i: number) {
    setData((d) => ({ ...d, steps: d.steps.filter((_, idx) => idx !== i) }))
  }

  function addCounter() {
    const newCounter: ProcessCounter = { id: uuidv4(), count: 0, label: '', suffix: '+' }
    setData((d) => ({ ...d, counters: [...d.counters, newCounter] }))
  }

  function removeCounter(i: number) {
    setData((d) => ({ ...d, counters: d.counters.filter((_, idx) => idx !== i) }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Steps */}
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#f0f4ff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Process Steps
          </h2>
          <Btn variant="ghost" onClick={addStep} style={{ fontSize: 13, padding: '7px 12px' }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Step
          </Btn>
        </div>
        {data.steps.map((step, i) => (
          <div
            key={step.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 1fr auto',
              gap: 12,
              marginBottom: 16,
              alignItems: 'start',
            }}
          >
            <Field label="Num" style={{ marginBottom: 0 }}>
              <Input
                value={step.num}
                onChange={(e) => updateStep(i, 'num', e.target.value)}
                placeholder="01"
              />
            </Field>
            <Field label="Title" style={{ marginBottom: 0 }}>
              <Input
                value={step.title}
                onChange={(e) => updateStep(i, 'title', e.target.value)}
                placeholder="Discover"
              />
            </Field>
            <Field label="Description" style={{ marginBottom: 0 }}>
              <Textarea
                rows={2}
                value={step.desc}
                onChange={(e) => updateStep(i, 'desc', e.target.value)}
                placeholder="Step description..."
                style={{ minHeight: 60 }}
              />
            </Field>
            <div style={{ paddingTop: 24 }}>
              <Btn variant="danger" onClick={() => removeStep(i)} style={{ padding: '8px 10px' }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                </svg>
              </Btn>
            </div>
          </div>
        ))}
      </Card>

      {/* Counters */}
      <Card>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: '#f0f4ff',
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Animated Stats
          </h2>
          <Btn variant="ghost" onClick={addCounter} style={{ fontSize: 13, padding: '7px 12px' }}>
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Add Stat
          </Btn>
        </div>
        <p style={{ color: '#8892a4', fontSize: 13, marginTop: 0, marginBottom: 20 }}>
          Leave &ldquo;Count&rdquo; empty (or set to null) for an ∞ symbol.
        </p>
        {data.counters.map((c, i) => (
          <div
            key={c.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 80px auto',
              gap: 12,
              marginBottom: 12,
              alignItems: 'start',
            }}
          >
            <Field label="Count" style={{ marginBottom: 0 }}>
              <Input
                type="number"
                value={c.count === null ? '' : c.count}
                placeholder="∞ = empty"
                onChange={(e) =>
                  updateCounter(i, 'count', e.target.value === '' ? null : Number(e.target.value))
                }
              />
            </Field>
            <Field label="Label" style={{ marginBottom: 0 }}>
              <Input
                value={c.label}
                onChange={(e) => updateCounter(i, 'label', e.target.value)}
                placeholder="Years of experience"
              />
            </Field>
            <Field label="Suffix" style={{ marginBottom: 0 }}>
              <Input
                value={c.suffix}
                onChange={(e) => updateCounter(i, 'suffix', e.target.value)}
                placeholder="+"
              />
            </Field>
            <div style={{ paddingTop: 24 }}>
              <Btn
                variant="danger"
                onClick={() => removeCounter(i)}
                style={{ padding: '8px 10px' }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                </svg>
              </Btn>
            </div>
          </div>
        ))}
      </Card>

      <Btn onClick={handleSave} loading={saving}>
        Save Process & Stats
      </Btn>
    </div>
  )
}
