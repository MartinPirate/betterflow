'use client'

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fps: number
  memory: {
    used: number
    limit: number
    percentage: number
  } | null
  loadTime: number
  renderTime: number
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: null,
    loadTime: 0,
    renderTime: 0
  })

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    // FPS Counter
    const measureFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        frameCount = 0
        lastTime = currentTime

        setMetrics(prev => ({ ...prev, fps }))
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    // Memory Usage (Chrome only)
    const measureMemory = () => {
      if ('memory' in performance) {
        const memoryInfo = (performance as any).memory
        setMetrics(prev => ({
          ...prev,
          memory: {
            used: Math.round(memoryInfo.usedJSHeapSize / 1048576),
            limit: Math.round(memoryInfo.jsHeapSizeLimit / 1048576),
            percentage: Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100)
          }
        }))
      }
    }

    // Page Load Time
    const measureLoadTime = () => {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing
        const loadTime = timing.loadEventEnd - timing.navigationStart
        setMetrics(prev => ({ ...prev, loadTime }))
      }
    }

    // Component Render Time
    const measureRenderTime = () => {
      const renderStart = performance.now()
      requestAnimationFrame(() => {
        const renderEnd = performance.now()
        setMetrics(prev => ({ ...prev, renderTime: renderEnd - renderStart }))
      })
    }

    measureFPS()
    measureMemory()
    measureLoadTime()
    measureRenderTime()

    // Update memory every 5 seconds
    const memoryInterval = setInterval(measureMemory, 5000)

    return () => {
      cancelAnimationFrame(animationId)
      clearInterval(memoryInterval)
    }
  }, [])

  return metrics
}

// Web Vitals Hook
export function useWebVitals() {
  const [vitals, setVitals] = useState({
    lcp: 0, // Largest Contentful Paint
    fid: 0, // First Input Delay
    cls: 0, // Cumulative Layout Shift
    fcp: 0, // First Contentful Paint
    ttfb: 0 // Time to First Byte
  })

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          setVitals(prev => ({ ...prev, lcp: entry.startTime }))
        }
        if (entry.entryType === 'first-input') {
          const firstInput = entry as any
          setVitals(prev => ({ ...prev, fid: firstInput.processingStart - firstInput.startTime }))
        }
        if (entry.entryType === 'layout-shift') {
          const layoutShift = entry as any
          if (!layoutShift.hadRecentInput) {
            setVitals(prev => ({ ...prev, cls: prev.cls + layoutShift.value }))
          }
        }
      }
    })

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })

    // Get navigation timing
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing
      setVitals(prev => ({
        ...prev,
        ttfb: timing.responseStart - timing.navigationStart,
        fcp: timing.domContentLoadedEventStart - timing.navigationStart
      }))
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return vitals
}