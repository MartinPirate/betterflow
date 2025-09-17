'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedCollapseProps {
  isOpen: boolean
  children: ReactNode
  duration?: number
}

const AnimatedCollapse = ({ isOpen, children, duration = 0.3 }: AnimatedCollapseProps) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: {
                duration: duration,
                ease: [0.4, 0, 0.2, 1]
              },
              opacity: {
                duration: duration * 0.5
              }
            }
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: {
                duration: duration,
                ease: [0.4, 0, 0.6, 1]
              },
              opacity: {
                duration: duration * 0.5
              }
            }
          }}
          style={{ overflow: 'hidden' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AnimatedCollapse