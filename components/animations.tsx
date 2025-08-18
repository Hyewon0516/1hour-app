"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  duration?: number
  className?: string
  once?: boolean
  distance?: number
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className = "",
  once = true,
  distance = 50,
}: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const getDirectionVariants = () => {
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    }

    if (direction === "none") return variants

    const axis = direction === "up" || direction === "down" ? "y" : "x"
    const sign = direction === "down" || direction === "right" ? 1 : -1

    return {
      hidden: {
        opacity: 0,
        [axis]: sign * distance,
      },
      visible: {
        opacity: 1,
        [axis]: 0,
        transition: {
          duration,
          delay,
          ease: [0.215, 0.61, 0.355, 1],
        },
      },
    }
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getDirectionVariants()} className={className}>
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  delay?: number
  staggerChildren?: number
  className?: string
  once?: boolean
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerChildren = 0.1,
  className = "",
  once = true,
}: StaggerContainerProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScaleOnHover({
  children,
  className = "",
  scale = 1.05,
}: {
  children: ReactNode
  className?: string
  scale?: number
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxScroll({
  children,
  className = "",
  speed = 0.5,
}: {
  children: ReactNode
  className?: string
  speed?: number
}) {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const y = scrollY * speed

  return (
    <div ref={ref} className={`relative ${className}`} style={{ transform: `translateY(${y}px)` }}>
      {children}
    </div>
  )
}

export function TextReveal({
  text,
  className = "",
  once = true,
  delay = 0,
}: {
  text: string
  className?: string
  once?: boolean
  delay?: number
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const words = text.split(" ")

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.215, 0.61, 0.355, 1],
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function CountUp({
  end,
  duration = 1.5,
  className = "",
  once = true,
  prefix = "",
  suffix = "",
}: {
  end: number
  duration?: number
  className?: string
  once?: boolean
  prefix?: string
  suffix?: string
}) {
  // 항상 0에서 시작
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  // IntersectionObserver를 사용하여 요소가 화면에 보이는지 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current)
      }
    }
  }, [])

  // 요소가 화면에 보이면 애니메이션 시작
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)

      // 애니메이션 시작
      let startTime: number | null = null
      let animationFrameId: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

        // 이징 함수 적용 (easeOutQuad)
        const easedProgress = 1 - (1 - progress) * (1 - progress)

        setCount(Math.floor(easedProgress * end))

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate)
        } else {
          setCount(end) // 애니메이션 완료 시 정확한 최종값 설정
        }
      }

      animationFrameId = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(animationFrameId)
        setCount(end) // 컴포넌트 언마운트 시 최종값 설정
      }
    }
  }, [isVisible, hasAnimated, end, duration])

  // 컴포넌트가 언마운트되거나 end 값이 변경될 때 최종값으로 설정
  useEffect(() => {
    return () => {
      setCount(end)
    }
  }, [end])

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

