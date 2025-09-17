'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AriaLiveContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void
}

const AriaLiveContext = createContext<AriaLiveContextType | undefined>(undefined)

export function AriaLiveProvider({ children }: { children: ReactNode }) {
  const [announcement, setAnnouncement] = useState('')
  const [priority, setPriority] = useState<'polite' | 'assertive'>('polite')

  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setPriority(priority)
    setAnnouncement(message)
    // Clear the announcement after it's been read
    setTimeout(() => setAnnouncement(''), 1000)
  }

  return (
    <AriaLiveContext.Provider value={{ announce }}>
      {children}
      <div
        role="status"
        aria-live={priority}
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
    </AriaLiveContext.Provider>
  )
}

export function useAriaLive() {
  const context = useContext(AriaLiveContext)
  if (!context) {
    throw new Error('useAriaLive must be used within AriaLiveProvider')
  }
  return context
}