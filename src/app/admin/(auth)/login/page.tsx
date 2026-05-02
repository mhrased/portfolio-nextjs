'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      if (!credential.user) throw Object.assign(new Error(), { code: 'auth/null-user' })
      const idToken = await credential.user.getIdToken()

      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      })
      if (res.ok) {
        router.push('/admin/dashboard')
      } else {
        const data = await res.json().catch(() => ({}))
        setError((data as { error?: string }).error ?? 'Invalid email or password')
      }
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code
      if (
        code === 'auth/invalid-credential' ||
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password'
      ) {
        setError('Invalid email or password')
      } else {
        setError('Connection error. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0b0f1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              background: 'linear-gradient(135deg, #7359ff, #3399ff)',
              borderRadius: 14,
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'var(--font-display, system-ui)',
              marginBottom: 20,
              letterSpacing: '-0.02em',
            }}
          >
            MR
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: '#f0f4ff',
              margin: 0,
              fontFamily: 'var(--font-display, system-ui)',
              letterSpacing: '-0.03em',
            }}
          >
            Admin Panel
          </h1>
          <p style={{ color: '#8892a4', fontSize: 14, marginTop: 8 }}>
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#141827',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            padding: '32px',
          }}
        >
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#8892a4',
                  marginBottom: 8,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                style={{
                  width: '100%',
                  background: '#0b0f1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  color: '#f0f4ff',
                  fontSize: 15,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#7359ff')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#8892a4',
                  marginBottom: 8,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  background: '#0b0f1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  color: '#f0f4ff',
                  fontSize: 15,
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#7359ff')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(255, 92, 108, 0.1)',
                  border: '1px solid rgba(255, 92, 108, 0.3)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  color: '#ff7a8a',
                  fontSize: 13,
                  marginBottom: 20,
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#3a2d80' : 'linear-gradient(135deg, #7359ff, #5a44d4)',
                border: 'none',
                borderRadius: 10,
                padding: '13px',
                color: '#fff',
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '-0.01em',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', color: '#4a5568', fontSize: 12, marginTop: 24 }}>
          Portfolio Admin · Protected Route
        </p>
      </div>
    </div>
  )
}
