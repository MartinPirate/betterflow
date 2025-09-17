'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
  whileHover?: any
}

const AnimatedCard = ({
  children,
  className,
  delay = 0,
  hover = true,
  whileHover = {
    y: -4,
    scale: 1.02,
    transition: { duration: 0.2 }
  }
}: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={hover ? whileHover : undefined}
      className={cn("transition-shadow", className)}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedCard