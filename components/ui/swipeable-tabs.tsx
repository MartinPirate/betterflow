'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipe } from '@/hooks/useSwipe'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SwipeableTabsProps {
  tabs: Array<{
    id: string
    label: string
    content: React.ReactNode
  }>
  defaultTab?: string
  className?: string
}

export function SwipeableTabs({ tabs, defaultTab, className }: SwipeableTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentIndex = tabs.findIndex(tab => tab.id === activeTab)

  const goToNext = () => {
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  useSwipe(containerRef, {
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
  })

  return (
    <div className={cn("w-full", className)}>
      {/* Tab Headers */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-[#9152DE] focus:ring-offset-2",
                activeTab === tab.id
                  ? "text-[#9152DE] border-b-2 border-[#9152DE]"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
              aria-selected={activeTab === tab.id}
              role="tab"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile navigation arrows */}
        <div className="flex gap-1 md:hidden">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={cn(
              "p-1 rounded",
              currentIndex === 0
                ? "text-gray-300 dark:text-gray-600"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            aria-label="Previous tab"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === tabs.length - 1}
            className={cn(
              "p-1 rounded",
              currentIndex === tabs.length - 1
                ? "text-gray-300 dark:text-gray-600"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
            aria-label="Next tab"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        role="tabpanel"
        aria-labelledby={activeTab}
      >
        <AnimatePresence mode="wait">
          {tabs.map((tab) => (
            activeTab === tab.id && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {tab.content}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Tab indicators for mobile */}
      <div className="flex justify-center gap-1 mt-4 md:hidden">
        {tabs.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-8 bg-[#9152DE]"
                : "w-1.5 bg-gray-300 dark:bg-gray-600"
            )}
          />
        ))}
      </div>
    </div>
  )
}