'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useResponsive } from '@/hooks/useResponsive'

interface ResponsiveTableProps {
  children: ReactNode
  className?: string
  mobileColumns?: number
}

export function ResponsiveTable({
  children,
  className,
  mobileColumns = 2
}: ResponsiveTableProps) {
  const { isMobile } = useResponsive()

  if (isMobile) {
    return (
      <div className={cn("w-full", className)}>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg", className)}>
      {children}
    </div>
  )
}

interface ResponsiveTableCellProps {
  children: ReactNode
  className?: string
  label?: string
  hideOnMobile?: boolean
}

export function ResponsiveTableCell({
  children,
  className,
  label,
  hideOnMobile = false
}: ResponsiveTableCellProps) {
  const { isMobile } = useResponsive()

  if (isMobile && hideOnMobile) {
    return null
  }

  if (isMobile && label) {
    return (
      <div className={cn("px-3 py-2", className)}>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}: </span>
        <span className="text-sm">{children}</span>
      </div>
    )
  }

  return (
    <td className={cn("px-3 py-4 text-sm", className)}>
      {children}
    </td>
  )
}