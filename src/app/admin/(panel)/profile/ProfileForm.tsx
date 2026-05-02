'use client'

import { useState } from 'react'
import { SiteData, HeroData } from '@/lib/data.server'
import { Card, Field, Input, Textarea, Btn, showToast } from '@/components/admin/AdminUI'

export default function ProfileForm({
  site: init,
  hero: initHero,
}: {
  site: SiteData
  hero: HeroData
}) {
  const [site, setSite] = useState(init)
  const [hero, setHero] = useState(initHero)
  const [saving, setSaving] = useState(false)
  const [savingHero, setSavingHero] = useState(false)

  function updateSite(key: keyof SiteData, value: string) {
    setSite((prev) => ({ ...prev, [key]: value }))
  }

  async function saveSite() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/site', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(site),
      })
      if (res.ok) showToast('Profile saved successfully')
      else showToast('Failed to save profile', 'error')
    } catch {
      showToast('Error saving profile', 'error')
    }
    setSaving(false)
  }

  async function saveHero() {
    setSavingHero(true)
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hero),
      })
      if (res.ok) showToast('Hero section saved')
      else showToast('Failed to save hero', 'error')
    } catch {
      showToast('Error saving hero', 'error')
    }
    setSavingHero(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ── Identity ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Identity
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Full Name">
            <Input
              value={site.name}
              onChange={(e) => updateSite('name', e.target.value)}
              placeholder="Full name"
            />
          </Field>
          <Field label="Short Name">
            <Input
              value={site.shortName}
              onChange={(e) => updateSite('shortName', e.target.value)}
              placeholder="Nickname"
            />
          </Field>
          <Field label="Initials">
            <Input
              value={site.initials}
              onChange={(e) => updateSite('initials', e.target.value)}
              maxLength={3}
              placeholder="MR"
            />
          </Field>
          <Field label="Role / Title">
            <Input
              value={site.role}
              onChange={(e) => updateSite('role', e.target.value)}
              placeholder="Full-stack engineer"
            />
          </Field>
          <Field label="Year">
            <Input
              value={site.year}
              onChange={(e) => updateSite('year', e.target.value)}
              placeholder="2026"
            />
          </Field>
          <Field label="Status Badge" hint="Shown in hero and navbar">
            <Input
              value={site.status}
              onChange={(e) => updateSite('status', e.target.value)}
              placeholder="Available for new projects · Q2 2026"
            />
          </Field>
        </div>
      </Card>

      {/* ── Contact ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Contact
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Email">
            <Input
              type="email"
              value={site.email}
              onChange={(e) => updateSite('email', e.target.value)}
              placeholder="email@example.com"
            />
          </Field>
          <Field label="Phone">
            <Input
              value={site.phone}
              onChange={(e) => updateSite('phone', e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </Field>
          <Field label="Location">
            <Input
              value={site.location}
              onChange={(e) => updateSite('location', e.target.value)}
              placeholder="City, Country · Remote-first"
            />
          </Field>
          <Field label="Response Time">
            <Input
              value={site.responseTime}
              onChange={(e) => updateSite('responseTime', e.target.value)}
              placeholder="Within 24 hours"
            />
          </Field>
          <Field label="Resume URL">
            <Input
              value={site.resumeUrl}
              onChange={(e) => updateSite('resumeUrl', e.target.value)}
              placeholder="https://... or #"
            />
          </Field>
          <Field label="Nav CTA Text" hint="Button in navbar">
            <Input
              value={site.navAvailable}
              onChange={(e) => updateSite('navAvailable', e.target.value)}
              placeholder="Available"
            />
          </Field>
        </div>
      </Card>

      {/* ── Section: About ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          About Section
        </h2>
        <Field label="Section Title" hint="Shown as the large heading in the About section">
          <Input
            value={site.aboutTitle}
            onChange={(e) => updateSite('aboutTitle', e.target.value)}
            placeholder="Engineering full-stack products that scale."
          />
        </Field>
        <Field label="Bio — Paragraph 1">
          <Textarea
            rows={3}
            value={site.bio1}
            onChange={(e) => updateSite('bio1', e.target.value)}
          />
        </Field>
        <Field label="Bio — Paragraph 2">
          <Textarea
            rows={3}
            value={site.bio2}
            onChange={(e) => updateSite('bio2', e.target.value)}
          />
        </Field>
        <Field label="Bio — Paragraph 3">
          <Textarea
            rows={3}
            value={site.bio3}
            onChange={(e) => updateSite('bio3', e.target.value)}
          />
        </Field>
        <Field label="Bio — Paragraph 4">
          <Textarea
            rows={3}
            value={site.bio4}
            onChange={(e) => updateSite('bio4', e.target.value)}
          />
        </Field>
      </Card>

      {/* ── Section: Contact ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Contact Section
        </h2>
        <Field label="Section Heading">
          <Input
            value={site.contactTitle}
            onChange={(e) => updateSite('contactTitle', e.target.value)}
            placeholder="Got a product to build?"
          />
        </Field>
        <Field label="Section Kicker">
          <Textarea
            rows={2}
            value={site.contactKicker}
            onChange={(e) => updateSite('contactKicker', e.target.value)}
            placeholder="Whether it's an MVP..."
          />
        </Field>
      </Card>

      {/* ── Footer ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Footer
        </h2>
        <Field label="Footer Tagline" hint='Appears after "© Year Name — Role."'>
          <Input
            value={site.footerTagline}
            onChange={(e) => updateSite('footerTagline', e.target.value)}
            placeholder="Built from scratch."
          />
        </Field>
        <Btn onClick={saveSite} loading={saving}>
          Save All Profile Changes
        </Btn>
      </Card>

      {/* ── Integrations ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 6px',
            letterSpacing: '-0.02em',
          }}
        >
          Integrations
        </h2>
        <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 20px' }}>
          Third-party services. Changes take effect on the next page load.
        </p>
        <Field
          label="Google Analytics Measurement ID"
          hint="Format: G-XXXXXXXXXX — leave blank to disable"
        >
          <Input
            value={site.gaId ?? ''}
            onChange={(e) => updateSite('gaId', e.target.value)}
            placeholder="G-XXXXXXXXXX"
            style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.03em' }}
          />
        </Field>
        <Btn onClick={saveSite} loading={saving}>
          Save Integrations
        </Btn>
      </Card>

      {/* ── Hero ── */}
      <Card>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: '0 0 20px',
            letterSpacing: '-0.02em',
          }}
        >
          Hero Section
        </h2>
        <Field label="Hero Subtitle" hint="Sentence after your name in the hero">
          <Textarea
            rows={2}
            value={site.heroSubtitle}
            onChange={(e) => updateSite('heroSubtitle', e.target.value)}
            placeholder="I architect, build, and ship..."
          />
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
          <Field label="Primary CTA Button">
            <Input
              value={site.heroCta1}
              onChange={(e) => updateSite('heroCta1', e.target.value)}
              placeholder="See the work"
            />
          </Field>
          <Field label="Secondary CTA Button">
            <Input
              value={site.heroCta2}
              onChange={(e) => updateSite('heroCta2', e.target.value)}
              placeholder="Start a project"
            />
          </Field>
        </div>
        <Btn onClick={saveSite} loading={saving} style={{ marginBottom: 24 }}>
          Save Hero Text
        </Btn>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#8892a4',
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            Animated Headline Lines
          </h3>
          <Field label="Lines" hint="One per line — each line animates as a separate unit">
            <Textarea
              rows={6}
              value={hero.lines.join('\n')}
              onChange={(e) => setHero((h) => ({ ...h, lines: e.target.value.split('\n') }))}
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </Field>
          <h3
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#8892a4',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}
          >
            Stats (Value + Label pairs)
          </h3>
          {hero.stats.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                gap: 10,
                marginBottom: 10,
              }}
            >
              <Input
                value={s.value}
                placeholder="6+"
                onChange={(e) =>
                  setHero((h) => {
                    const stats = [...h.stats]
                    stats[i] = { ...stats[i], value: e.target.value }
                    return { ...h, stats }
                  })
                }
              />
              <Input
                value={s.label}
                placeholder="Years shipping"
                onChange={(e) =>
                  setHero((h) => {
                    const stats = [...h.stats]
                    stats[i] = { ...stats[i], label: e.target.value }
                    return { ...h, stats }
                  })
                }
              />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <Btn
              variant="ghost"
              onClick={() =>
                setHero((h) => ({ ...h, stats: [...h.stats, { value: '', label: '' }] }))
              }
              style={{ fontSize: 13 }}
            >
              + Add Stat
            </Btn>
            {hero.stats.length > 1 && (
              <Btn
                variant="ghost"
                onClick={() => setHero((h) => ({ ...h, stats: h.stats.slice(0, -1) }))}
                style={{ fontSize: 13 }}
              >
                − Remove Last
              </Btn>
            )}
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn onClick={saveHero} loading={savingHero}>
            Save Hero Data
          </Btn>
        </div>
      </Card>
    </div>
  )
}
