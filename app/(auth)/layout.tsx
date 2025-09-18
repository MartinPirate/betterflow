'use client';

import { motion } from 'framer-motion';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Animated decorative color patches - Extended 2.5% into page */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-36 -left-36 w-64 h-64 bg-gradient-to-br from-[#9152DE] to-[#5F29A1] rounded-full opacity-20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -bottom-36 -right-36 w-64 h-64 bg-gradient-to-br from-[#204782] to-[#9152DE] rounded-full opacity-20 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -right-20 w-48 h-48 bg-gradient-to-br from-[#5F29A1] to-[#204782] rounded-full opacity-15 blur-3xl"
      />

      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 -left-20 w-48 h-48 bg-gradient-to-br from-[#9152DE] to-[#5F29A1] rounded-full opacity-15 blur-3xl"
      />

      {/* Additional patches for subtle depth */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/20 w-32 h-32 bg-gradient-to-br from-[#9152DE] to-[#204782] rounded-full opacity-10 blur-3xl"
      />

      {/* Minimal corner patches */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 45, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1 right-1/20 w-36 h-36 bg-gradient-to-br from-[#204782] to-[#5F29A1] rounded-full opacity-12 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -45, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1 left-1/20 w-36 h-36 bg-gradient-to-br from-[#5F29A1] to-[#9152DE] rounded-full opacity-12 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}