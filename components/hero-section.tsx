"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isAnimated, setIsAnimated] = useState(false)
  const [textVisible, setTextVisible] = useState(true)

  useEffect(() => {
    const textTimer = setTimeout(() => {
      setTextVisible(false)
    }, 800)

    const overlayTimer = setTimeout(() => {
      setIsAnimated(true)
    }, 1200)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(overlayTimer)
    }
  }, [])

  return (
    <section className="hero-section relative w-full min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#030E3B' }}>
      <div
        className={`absolute inset-0 transition-all duration-1000 ease-out ${
          isAnimated ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ backgroundColor: 'white' }}
      />
      <div className="relative z-10 w-full flex items-center justify-center">
        <div 
          className={`text-center transition-opacity duration-1000 ${
            textVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="text-yellow-400 text-xl md:text-xl lg:text-xl font-bold leading-tight px-4">
            타협 없는 품질과 보안으로, 당신을 성공으로 이끌어줄<br />
            IT 솔루션 파트너
          </h1>
        </div>
      </div>
    </section>
  )
}

