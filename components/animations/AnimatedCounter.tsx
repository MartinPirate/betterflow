'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

const AnimatedCounter = ({
  value,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0
}: AnimatedCounterProps) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return decimals > 0
      ? latest.toFixed(decimals)
      : Math.round(latest).toString()
  })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    const controls = animate(count, value, {
      duration: duration,
      ease: [0.4, 0, 0.2, 1]
    })

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest)
    })

    return () => {
      controls.stop()
      unsubscribe()
    }
  }, [value, count, rounded, duration])

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {prefix}{displayValue}{suffix}
    </motion.span>
  )
}

export default AnimatedCounter