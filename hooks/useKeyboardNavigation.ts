'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface KeyboardNavigationOptions {
  enableArrowNavigation?: boolean
  enableTabNavigation?: boolean
  enableShortcuts?: boolean
}

export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const {
    enableArrowNavigation = true,
    enableTabNavigation = true,
    enableShortcuts = true
  } = options

  const router = useRouter()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't interfere with form inputs
    const target = e.target as HTMLElement
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
      return
    }

    // Arrow key navigation for lists and grids
    if (enableArrowNavigation) {
      const focusable = document.querySelectorAll(
        '[role="gridcell"], [role="row"], [role="option"], [role="menuitem"]'
      )
      const currentIndex = Array.from(focusable).indexOf(document.activeElement as HTMLElement)

      switch (e.key) {
        case 'ArrowDown':
          if (currentIndex < focusable.length - 1) {
            e.preventDefault()
            ;(focusable[currentIndex + 1] as HTMLElement).focus()
          }
          break
        case 'ArrowUp':
          if (currentIndex > 0) {
            e.preventDefault()
            ;(focusable[currentIndex - 1] as HTMLElement).focus()
          }
          break
        case 'Home':
          if (e.ctrlKey && focusable.length > 0) {
            e.preventDefault()
            ;(focusable[0] as HTMLElement).focus()
          }
          break
        case 'End':
          if (e.ctrlKey && focusable.length > 0) {
            e.preventDefault()
            ;(focusable[focusable.length - 1] as HTMLElement).focus()
          }
          break
      }
    }

    // Enhanced Tab navigation
    if (enableTabNavigation && e.key === 'Tab') {
      const focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )

      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      // Visual focus indicator
      document.body.classList.add('keyboard-navigating')
    }

    // Global shortcuts
    if (enableShortcuts) {
      // Alt + H for Home
      if (e.altKey && e.key === 'h') {
        e.preventDefault()
        router.push('/dashboard')
      }

      // Alt + S for Search
      if (e.altKey && e.key === 's') {
        e.preventDefault()
        const searchInput = document.querySelector('[aria-label="Search"]') as HTMLInputElement
        searchInput?.focus()
      }

      // Alt + N for Notifications
      if (e.altKey && e.key === 'n') {
        e.preventDefault()
        router.push('/notifications')
      }
    }
  }, [enableArrowNavigation, enableTabNavigation, enableShortcuts, router])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      // Remove visual indicator when not tabbing
      setTimeout(() => {
        document.body.classList.remove('keyboard-navigating')
      }, 100)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])
}

// CSS to add for keyboard navigation visual feedback
export const keyboardNavigationStyles = `
  .keyboard-navigating *:focus {
    outline: 2px solid #9152DE !important;
    outline-offset: 2px !important;
  }
`