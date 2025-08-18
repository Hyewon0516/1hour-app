"use client"

import type React from "react"

import type { ReactNode } from "react"

interface SmoothScrollProps {
  children: ReactNode
  to: string
  offset?: number
  duration?: number
  className?: string
  onClick?: () => void
}

export default function SmoothScroll({
  children,
  to,
  offset = 0,
  duration = 800,
  className = "",
  onClick,
}: SmoothScrollProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    // Call additional onClick handler if provided
    if (onClick) onClick()

    const targetElement = document.getElementById(to)

    if (!targetElement) return

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset
    const startPosition = window.scrollY
    const distance = targetPosition - startPosition
    let startTime: number | null = null

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / duration, 1)

      // Easing function: easeInOutQuad
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

      window.scrollTo(0, startPosition + distance * ease(progress))

      if (timeElapsed < duration) {
        requestAnimationFrame(animation)
      }
    }

    requestAnimationFrame(animation)
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}

