import { useCallback, useEffect, useRef } from 'react'

/**
 * Create a debounced callback that defers execution until after a delay.
 *
 * @param callback - Function to debounce.
 * @param delay - Delay in milliseconds before invoking the callback.
 * @returns A stable function reference that debounces calls.
 */
export function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
): T {
  const callbackRef = useRef(callback)
  const timeoutId = useRef<number>()

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        window.clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return useCallback(<U extends Parameters<T>>(...args: U) => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current)
    }

    timeoutId.current = window.setTimeout(() => {
      callbackRef.current(...args)
    }, delay)
  }, [delay]) as T
}
