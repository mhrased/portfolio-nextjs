interface Entry {
  count: number
  resetAt: number
}

const store = new Map<string, Entry>()

/**
 * Returns true if the request is allowed, false if the limit is exceeded.
 * Uses a fixed window per key.
 */
export function checkRateLimit(key: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now()
  const entry = store.get(key)
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

/** Reset a key's counter (call on successful login). */
export function resetRateLimit(key: string): void {
  store.delete(key)
}

/** Test helper — wipe all state. */
export function _clearRateLimitStore(): void {
  store.clear()
}
