'use client'

import { useEffect, useRef } from 'react'

export function useFocusTrap(isActive: boolean = true) {
  const rootRef = useRef<HTMLDivElement>(null)
  const firstFocusableRef = useRef<HTMLElement | null>(null)
  const lastFocusableRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isActive || !rootRef.current) return

    const root = rootRef.current
    const focusableElements = root.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const focusableArray = Array.from(focusableElements) as HTMLElement[]

    if (focusableArray.length === 0) return

    firstFocusableRef.current = focusableArray[0]
    lastFocusableRef.current = focusableArray[focusableArray.length - 1]

    // Focus first element
    firstFocusableRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault()
          lastFocusableRef.current?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault()
          firstFocusableRef.current?.focus()
        }
      }
    }

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Trigger close action if provided
        const closeButton = root.querySelector('[aria-label="Close"]') as HTMLElement
        closeButton?.click()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isActive])

  return rootRef
}