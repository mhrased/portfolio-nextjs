import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, resetRateLimit, _clearRateLimitStore } from '@/lib/auth/rate-limit'

beforeEach(() => {
  _clearRateLimitStore()
})

describe('checkRateLimit', () => {
  it('allows requests within the limit', () => {
    expect(checkRateLimit('ip1', 3)).toBe(true)
    expect(checkRateLimit('ip1', 3)).toBe(true)
    expect(checkRateLimit('ip1', 3)).toBe(true)
  })

  it('blocks after the limit is reached', () => {
    checkRateLimit('ip2', 3)
    checkRateLimit('ip2', 3)
    checkRateLimit('ip2', 3)
    expect(checkRateLimit('ip2', 3)).toBe(false)
    expect(checkRateLimit('ip2', 3)).toBe(false)
  })

  it('tracks different keys independently', () => {
    checkRateLimit('a', 2)
    checkRateLimit('a', 2)
    expect(checkRateLimit('a', 2)).toBe(false)
    expect(checkRateLimit('b', 2)).toBe(true)
  })

  it('resets after the window expires', () => {
    // Use a 1 ms window so it expires immediately
    checkRateLimit('ip3', 2, 1)
    checkRateLimit('ip3', 2, 1)
    // Wait for window to expire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(checkRateLimit('ip3', 2, 1)).toBe(true)
        resolve()
      }, 10)
    })
  })
})

describe('resetRateLimit', () => {
  it('resets the counter for a key', () => {
    checkRateLimit('ip4', 2)
    checkRateLimit('ip4', 2)
    expect(checkRateLimit('ip4', 2)).toBe(false)
    resetRateLimit('ip4')
    expect(checkRateLimit('ip4', 2)).toBe(true)
  })

  it('is a no-op for unknown keys', () => {
    expect(() => resetRateLimit('nonexistent')).not.toThrow()
  })
})
