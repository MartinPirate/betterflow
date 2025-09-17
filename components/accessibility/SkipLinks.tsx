'use client'

import { motion } from 'framer-motion'

export function SkipLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileFocus={{ opacity: 1, y: 0 }}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 space-y-2">
        <a
          href="#main-content"
          className="block px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded hover:bg-[#9152DE] hover:text-white focus:bg-[#9152DE] focus:text-white focus:outline-none transition-colors"
        >
          Skip to main content
        </a>
        <a
          href="#main-navigation"
          className="block px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded hover:bg-[#9152DE] hover:text-white focus:bg-[#9152DE] focus:text-white focus:outline-none transition-colors"
        >
          Skip to navigation
        </a>
        <a
          href="#footer"
          className="block px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded hover:bg-[#9152DE] hover:text-white focus:bg-[#9152DE] focus:text-white focus:outline-none transition-colors"
        >
          Skip to footer
        </a>
      </div>
    </motion.div>
  )
}