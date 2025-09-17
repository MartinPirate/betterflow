'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw, Home, Bug } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl" />
              <div className="relative bg-red-100 dark:bg-red-900/30 rounded-full p-6">
                <AlertCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Something Went Wrong!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
              An unexpected error occurred while processing your request.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't worry, our team has been notified and is working on it.
            </p>
          </motion.div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <details className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Bug className="h-4 w-4 mr-2" />
                  Error Details (Development Mode)
                </summary>
                <pre className="mt-4 text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-40 whitespace-pre-wrap">
                  {error.message}
                  {error.stack && '\n\nStack trace:\n' + error.stack}
                </pre>
              </details>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={reset}
              size="lg"
              className="bg-[#9152DE] hover:bg-[#5F29A1] text-white group"
            >
              <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Try Again
            </Button>

            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 dark:border-gray-600"
              >
                <Home className="h-5 w-5 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </motion.div>

          {/* Support Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help?{' '}
              <Link
                href="/help"
                className="text-[#9152DE] hover:text-[#5F29A1] font-medium underline"
              >
                Contact Support
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute top-10 right-10 w-24 h-24 bg-red-200/20 dark:bg-red-700/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute bottom-10 left-10 w-32 h-32 bg-orange-200/20 dark:bg-orange-700/10 rounded-full blur-2xl"
        />
      </div>
    </div>
  )
}