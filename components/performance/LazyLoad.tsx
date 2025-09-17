'use client'

import dynamic from 'next/dynamic'
import { ComponentType, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface LazyLoadProps {
  fallback?: ReactNode
}

// Loading component
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="h-8 w-8 animate-spin text-[#9152DE]" />
  </div>
)

// Lazy load wrapper function
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: ReactNode = <LoadingSpinner />
) {
  return dynamic(importFunc, {
    loading: () => <>{fallback}</>,
    ssr: false // Disable SSR for heavy components
  })
}

// Pre-built lazy loaded components
export const LazyChart = lazyLoad(
  () => import('@/components/ui/chart').then(mod => ({ default: mod.Chart })),
  <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
)

export const LazyCalendar = lazyLoad(
  () => import('@/components/ui/calendar').then(mod => ({ default: mod.Calendar })),
  <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
)

export const LazyDataTable = lazyLoad(
  () => import('@/components/ui/data-table').then(mod => ({ default: mod.DataTable })),
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
    ))}
  </div>
)