import { useEffect, useState } from 'react'

// Like useState, but remembered in the browser. Never throws: if storage is
// blocked (private mode, some iframes) it just behaves like normal state.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key)
      if (raw === null) return initialValue
      const parsed = JSON.parse(raw)
      // Merge so newly added settings get defaults for returning users.
      return typeof initialValue === 'object' && initialValue !== null
        ? { ...initialValue, ...parsed }
        : parsed
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable: ignore */
    }
  }, [key, value])

  return [value, setValue]
}
