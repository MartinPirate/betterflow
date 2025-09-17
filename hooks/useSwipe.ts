'use client'

import { useState, useRef, useEffect } from 'react'

interface SwipeOptions {
  threshold?: number
  preventDefaultTouchmoveEvent?: boolean
  trackMouse?: boolean
  trackTouch?: boolean
  rotationAngle?: number
}

interface SwipeHandlers {
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right') => void
}

export function useSwipe(
  ref: React.RefObject<HTMLElement>,
  handlers: SwipeHandlers,
  options: SwipeOptions = {}
) {
  const {
    threshold = 50,
    preventDefaultTouchmoveEvent = false,
    trackMouse = false,
    trackTouch = true,
  } = options

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const minSwipeDistance = threshold

  const onTouchStart = (e: TouchEvent | MouseEvent) => {
    setTouchEnd(null)
    if ('touches' in e) {
      setTouchStart({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      })
    } else {
      setTouchStart({
        x: e.clientX,
        y: e.clientY
      })
    }
  }

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    if ('touches' in e) {
      setTouchEnd({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY
      })
    } else {
      setTouchEnd({
        x: e.clientX,
        y: e.clientY
      })
    }

    if (preventDefaultTouchmoveEvent) {
      e.preventDefault()
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distanceX = touchStart.x - touchEnd.x
    const distanceY = touchStart.y - touchEnd.y
    const isLeftSwipe = distanceX > minSwipeDistance
    const isRightSwipe = distanceX < -minSwipeDistance
    const isUpSwipe = distanceY > minSwipeDistance
    const isDownSwipe = distanceY < -minSwipeDistance

    if (isLeftSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      handlers.onSwipeLeft?.()
      handlers.onSwipe?.('left')
    }
    if (isRightSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      handlers.onSwipeRight?.()
      handlers.onSwipe?.('right')
    }
    if (isUpSwipe && Math.abs(distanceY) > Math.abs(distanceX)) {
      handlers.onSwipeUp?.()
      handlers.onSwipe?.('up')
    }
    if (isDownSwipe && Math.abs(distanceY) > Math.abs(distanceX)) {
      handlers.onSwipeDown?.()
      handlers.onSwipe?.('down')
    }
  }

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (trackTouch) {
      element.addEventListener('touchstart', onTouchStart as any)
      element.addEventListener('touchmove', onTouchMove as any)
      element.addEventListener('touchend', onTouchEnd)
    }

    if (trackMouse) {
      element.addEventListener('mousedown', onTouchStart as any)
      element.addEventListener('mousemove', onTouchMove as any)
      element.addEventListener('mouseup', onTouchEnd)
    }

    return () => {
      if (trackTouch) {
        element.removeEventListener('touchstart', onTouchStart as any)
        element.removeEventListener('touchmove', onTouchMove as any)
        element.removeEventListener('touchend', onTouchEnd)
      }

      if (trackMouse) {
        element.removeEventListener('mousedown', onTouchStart as any)
        element.removeEventListener('mousemove', onTouchMove as any)
        element.removeEventListener('mouseup', onTouchEnd)
      }
    }
  }, [touchStart, touchEnd, trackMouse, trackTouch])

  return {
    touchStart,
    touchEnd,
    swipeDirection: touchStart && touchEnd ? getSwipeDirection(touchStart, touchEnd, minSwipeDistance) : null
  }
}

function getSwipeDirection(
  start: { x: number; y: number },
  end: { x: number; y: number },
  threshold: number
): 'up' | 'down' | 'left' | 'right' | null {
  const distanceX = start.x - end.x
  const distanceY = start.y - end.y

  if (Math.abs(distanceX) > Math.abs(distanceY)) {
    if (distanceX > threshold) return 'left'
    if (distanceX < -threshold) return 'right'
  } else {
    if (distanceY > threshold) return 'up'
    if (distanceY < -threshold) return 'down'
  }

  return null
}