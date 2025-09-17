'use client'

import { useRef, useState, useEffect, useCallback, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface VirtualListProps<T> {
  items: T[]
  height: number
  itemHeight: number
  renderItem: (item: T, index: number) => ReactNode
  overscan?: number
  className?: string
  emptyState?: ReactNode
}

export function VirtualList<T>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 3,
  className,
  emptyState
}: VirtualListProps<T>) {
  const scrollElementRef = useRef<HTMLDivElement>(null)
  const [scrollTop, setScrollTop] = useState(0)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + height) / itemHeight) + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  const handleScroll = useCallback(() => {
    if (scrollElementRef.current) {
      setScrollTop(scrollElementRef.current.scrollTop)
    }
  }, [])

  useEffect(() => {
    const scrollElement = scrollElementRef.current
    if (!scrollElement) return

    scrollElement.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  if (items.length === 0 && emptyState) {
    return <>{emptyState}</>
  }

  return (
    <div
      ref={scrollElementRef}
      className={cn("overflow-auto", className)}
      style={{ height }}
      role="list"
      aria-label="Virtual scrolling list"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
              role="listitem"
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Hook for infinite scrolling with virtual list
export function useInfiniteScroll(
  callback: () => void,
  options: {
    threshold?: number
    enabled?: boolean
  } = {}
) {
  const { threshold = 100, enabled = true } = options
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback()
        }
      },
      { rootMargin: `${threshold}px` }
    )

    observerRef.current = observer

    if (targetRef.current) {
      observer.observe(targetRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [callback, threshold, enabled])

  return targetRef
}