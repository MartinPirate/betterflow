'use client'

import { useState, useEffect } from 'react'

export const breakpoints = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
  wide: 1536
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  })

  const [device, setDevice] = useState<'mobile' | 'tablet' | 'desktop' | 'wide'>('desktop')

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (windowSize.width < breakpoints.mobile) {
      setDevice('mobile')
    } else if (windowSize.width < breakpoints.tablet) {
      setDevice('tablet')
    } else if (windowSize.width < breakpoints.desktop) {
      setDevice('desktop')
    } else {
      setDevice('wide')
    }
  }, [windowSize.width])

  return {
    windowSize,
    device,
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop' || device === 'wide',
    isTouch: typeof window !== 'undefined' && 'ontouchstart' in window
  }
}