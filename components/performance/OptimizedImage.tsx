'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onLoad
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setError(true)
  }

  // Generate a shimmer placeholder
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  const dataUrl = `data:image/svg+xml;base64,${toBase64(
    shimmer(width || 700, height || 475)
  )}`

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-200 dark:bg-gray-700",
          className
        )}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center p-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-500">Failed to load image</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ zIndex: 1 }}
        />
      )}

      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes || '100vw'}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL || dataUrl}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "duration-700 ease-in-out",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
            className
          )}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={quality}
          priority={priority}
          placeholder={placeholder}
          blurDataURL={blurDataURL || dataUrl}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "duration-700 ease-in-out",
            isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
            className
          )}
        />
      )}
    </div>
  )
}

// Avatar component with optimized image loading
export function OptimizedAvatar({
  src,
  alt,
  size = 40,
  className
}: {
  src?: string
  alt: string
  size?: number
  className?: string
}) {
  const initials = alt
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-[#9152DE] to-[#5F29A1] text-white font-medium rounded-full",
          className
        )}
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("rounded-full", className)}
      quality={90}
    />
  )
}