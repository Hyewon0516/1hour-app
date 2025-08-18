"use client"

import { useEffect, useState, useRef } from "react"

interface FullscreenOverlayProps {
  children?: React.ReactNode
  className?: string
}

export default function FullscreenOverlay({ children, className = "" }: FullscreenOverlayProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [showAnimation, setShowAnimation] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [letterPositions, setLetterPositions] = useState<{x: number, y: number}[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    setIsVisible(true)
    
    // 글자 초기 위치 계산 - 왼쪽 상단에 배치 (즉시 실행)
    const calculatePositions = () => {
      // 대략적인 글자 크기 계산 (15vw 기준)
      const fontSize = Math.min(window.innerWidth * 0.15, 200)
      const letterWidth = fontSize * 0.6 // 대략적인 글자 너비
      
      // 더 왼쪽 상단에서 시작
      const startX = 16 // 1rem = 16px
      const startY = 16 // 1rem = 16px
      
      const positions = []
      for (let i = 0; i < 10; i++) {
        positions.push({
          x: startX + letterWidth * i,
          y: startY
        })
      }
      setLetterPositions(positions)
    }
    
    // 즉시 위치 계산
    calculatePositions()
    
    // 1초 후 애니메이션 시작
    const timer1 = setTimeout(() => {
      setShowAnimation(true)
    }, 1000)

    // ACTORY 애니메이션이 끝날 때 fade out 시작 (마지막 ACTORY 글자 애니메이션 완료 시점)
    const timer2 = setTimeout(() => {
      setFadeOut(true)
    }, 1000 + 300 + (5 * 80) + 800) // 시작(1000) + ACTORY 지연(300) + 마지막 글자 지연(5*80) + ACTORY 애니메이션 시간(800)

    // fade out 완료 후 오버레이 완전 제거
    const timer3 = setTimeout(() => {
      setIsVisible(false)
    }, 1000 + 300 + (5 * 80) + 800 + 1000) // fade out 시작 + fade out 시간(1000ms)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      } ${className}`}
      style={{ 
        backgroundColor: '#030E3B',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999
      }}
    >
      <div className="relative w-full h-full">
        {letterPositions.length > 0 && 'CNDFACTORY'.split('').map((letter, index) => (
          <span
            key={`letter-${index}`}
            ref={(el) => { letterRefs.current[index] = el }}
            className="absolute transition-all select-none text-white"
            style={{
              fontFamily: 'NeueHaas',
              fontWeight: 900,
              fontSize: 'min(15vw, 200px)',
              lineHeight: 0.9,
              left: letterPositions[index]?.x || 0,
              top: letterPositions[index]?.y || 0,
              transitionDuration: index < 4 ? `${1000}ms` : `${800 + (index - 4) * 80}ms`,
              transitionDelay: index < 4 ? `${index * 150}ms` : `${300 + (index - 4) * 80}ms`,
              transitionTimingFunction: index < 4 
                ? 'cubic-bezier(0.23, 1, 0.32, 1)' 
                : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              transform: showAnimation
                ? index < 4
                  ? `translate(${8 + index * 32}px, 8px) scale(0.5)` // CNDF - 훨씬 더 왼쪽 상단
                  : `translate(${(80 + (index - 4) * 15) * window.innerWidth / 100}px, ${(-10 + Math.sin(index - 4) * 20) * window.innerHeight / 100}px) rotate(${45 + (index - 4) * 30}deg) scale(0.3)` // ACTORY - 튕겨나감
                : 'translate(0, 0) scale(1) rotate(0deg)',
              opacity: showAnimation && index >= 4 ? 0 : 1,
              transformOrigin: 'top left',
              zIndex: index < 4 && showAnimation ? 10001 : 1,
              willChange: 'transform, opacity'
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
} 