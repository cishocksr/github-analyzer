// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>()

const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export function getCache<T>(key: string): T | null {
    const cached = cache.get(key)

    if (!cached) return null

    const age = Date.now() - cached.timestamp

    if (age > CACHE_DURATION) {
        cache.delete(key)
        return null
    }

    return cached.data as T
}

export function setCache(key: string, data: any): void {
    cache.set(key, {
        data,
        timestamp: Date.now(),
    })
}

export function clearCache(key?: string): void {
    if (key) {
        cache.delete(key)
    } else {
        cache.clear()
    }
}