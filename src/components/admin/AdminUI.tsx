'use client'

import { useState, useEffect, ReactNode } from 'react'

/* ─── Toast ─── */
interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

let toastId = 0
const listeners: ((t: Toast[]) => void)[] = []
let toasts: Toast[] = []

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  const id = ++toastId
  toasts = [...toasts, { id, message, type }]
  listeners.forEach((fn) => fn(toasts))
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    listeners.forEach((fn) => fn(toasts))
  }, 3500)
}

export function ToastContainer() {
  const [list, setList] = useState<Toast[]>([])
  useEffect(() => {
    listeners.push(setList)
    return () => {
      const i = listeners.indexOf(setList)
      if (i > -1) listeners.splice(i, 1)
    }
  }, [])
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {list.map((t) => (
        <div
          key={t.id}
          style={{
            background: t.type === 'success' ? '#1a2d1e' : '#2d1a1a',
            border: `1px solid ${t.type === 'success' ? 'rgba(51,229,128,0.3)' : 'rgba(255,92,108,0.3)'}`,
            borderRadius: 10,
            padding: '12px 18px',
            color: t.type === 'success' ? '#5dde8a' : '#ff7a8a',
            fontSize: 14,
            fontWeight: 500,
            minWidth: 240,
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {t.type === 'success' ? '✓ ' : '✕ '}
          {t.message}
        </div>
      ))}
    </div>
  )
}

/* ─── Page Header ─── */
export function PageHeader({
  title,
  desc,
  action,
}: {
  title: string
  desc?: string
  action?: ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 32,
        gap: 16,
      }}
    >
      <div>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: '#f0f4ff',
            margin: 0,
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-display)',
          }}
        >
          {title}
        </h1>
        {desc && <p style={{ color: '#8892a4', fontSize: 14, marginTop: 6 }}>{desc}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

/* ─── Card ─── */
export function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: '#141827',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: 24,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* ─── Form Field ─── */
export function Field({
  label,
  hint,
  children,
  style,
}: {
  label: string
  hint?: string
  children: ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div style={{ marginBottom: 20, ...style }}>
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 600,
          color: '#8892a4',
          marginBottom: 8,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </label>
      {children}
      {hint && <p style={{ color: '#4a5568', fontSize: 12, marginTop: 5 }}>{hint}</p>}
    </div>
  )
}

/* ─── Input ─── */
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
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
        transition: 'border-color 0.15s',
        ...props.style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#7359ff'
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
        props.onBlur?.(e)
      }}
    />
  )
}

/* ─── Textarea ─── */
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
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
        resize: 'vertical',
        minHeight: 90,
        fontFamily: 'inherit',
        transition: 'border-color 0.15s',
        ...props.style,
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#7359ff'
        props.onFocus?.(e)
      }}
      onBlur={(e) => {
        e.target.style.borderColor = 'rgba(255,255,255,0.1)'
        props.onBlur?.(e)
      }}
    />
  )
}

/* ─── Button ─── */
export function Btn({
  children,
  variant = 'primary',
  loading,
  style,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  loading?: boolean
}) {
  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 18px',
    borderRadius: 9,
    fontSize: 14,
    fontWeight: 600,
    cursor: props.disabled || loading ? 'not-allowed' : 'pointer',
    border: 'none',
    transition: 'all 0.15s',
    letterSpacing: '-0.01em',
    opacity: props.disabled || loading ? 0.6 : 1,
  }
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg,#7359ff,#5a44d4)', color: '#fff' },
    ghost: {
      background: 'rgba(255,255,255,0.06)',
      color: '#d0d8e8',
      border: '1px solid rgba(255,255,255,0.1)',
    },
    danger: {
      background: 'rgba(255,92,108,0.12)',
      color: '#ff7a8a',
      border: '1px solid rgba(255,92,108,0.25)',
    },
  }
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {loading ? 'Saving...' : children}
    </button>
  )
}

/* ─── Badge ─── */
export function Badge({ children, color = 'purple' }: { children: ReactNode; color?: string }) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    purple: { bg: 'rgba(115,89,255,0.12)', border: 'rgba(115,89,255,0.25)', text: '#a78bfa' },
    blue: { bg: 'rgba(51,153,255,0.12)', border: 'rgba(51,153,255,0.25)', text: '#60a5fa' },
    green: { bg: 'rgba(51,217,128,0.12)', border: 'rgba(51,217,128,0.25)', text: '#4ade80' },
    yellow: { bg: 'rgba(255,217,51,0.12)', border: 'rgba(255,217,51,0.25)', text: '#fbbf24' },
    pink: { bg: 'rgba(255,92,138,0.12)', border: 'rgba(255,92,138,0.25)', text: '#f472b6' },
  }
  const fallback = {
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.12)',
    text: '#8892a4',
  }
  const c = colors[color] || fallback
  return (
    <span
      style={{
        display: 'inline-block',
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        borderRadius: 6,
        padding: '2px 9px',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  )
}

/* ─── Confirm Dialog ─── */
export function useConfirm() {
  const [state, setState] = useState<{ message: string; resolve: (v: boolean) => void } | null>(
    null,
  )
  const confirm = (message: string) =>
    new Promise<boolean>((resolve) => setState({ message, resolve }))
  const Dialog = () =>
    !state ? null : (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <div
          style={{
            background: '#141827',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 14,
            padding: 28,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <p style={{ color: '#f0f4ff', fontSize: 15, marginTop: 0 }}>{state.message}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <Btn
              variant="danger"
              onClick={() => {
                state.resolve(true)
                setState(null)
              }}
            >
              Delete
            </Btn>
            <Btn
              variant="ghost"
              onClick={() => {
                state.resolve(false)
                setState(null)
              }}
            >
              Cancel
            </Btn>
          </div>
        </div>
      </div>
    )
  return { confirm, Dialog }
}
