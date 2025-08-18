"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// Define the sections for navigation
const navItems = [
  { id: "cases", label: "PORTFOLIO" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "careers", label: "CAREERS" },
  { id: "contact", label: "CONTACT" },
  // { id: "process", label: "프로세스" },
  // { id: "tech", label: "기술스택" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [isHeroAnimated, setIsHeroAnimated] = useState(false)
  const [isLogoAnimated, setIsLogoAnimated] = useState(false)

  // Handle hero animation timing
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setIsLogoAnimated(true)
    }, 1800)

    const backgroundTimer = setTimeout(() => {
      setIsHeroAnimated(true)
    }, 2000)

    return () => {
      clearTimeout(logoTimer)
      clearTimeout(backgroundTimer)
    }
  }, [])

  // Handle scroll events to update UI
  useEffect(() => {
    const handleScroll = () => {
      // Update header background when scrolled
      setIsScrolled(window.scrollY > 10)

      // Update active section based on scroll position
      const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)

      // Find the section that is currently in view
      const currentSection = sections.find((section) => {
        if (!section) return false
        const rect = section.getBoundingClientRect()
        // Consider a section "in view" if its top is within the top half of the viewport
        // or if we're near the bottom of the page and it's the last section
        return (
          (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) ||
          (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
            section === sections[sections.length - 1])
        )
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      } else if (window.scrollY < 100) {
        // If at the top of the page, don't highlight any section
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle smooth scrolling when clicking navigation items
  const scrollToSection = (id: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      // Smooth scroll to the element
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <>
      <header
        className={`main-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-sm main-header-scrolled" : isHeroAnimated ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="common-container">
            <div className="main-logo-wrap">
              <Link
                href="/"
                className="relative"
              >
                {/* 기본 흰색 로고 */}
                <svg className="main-logo" xmlns="http://www.w3.org/2000/svg" version="1.0" viewBox="0 0 883.000000 253.000000" preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,253.000000) scale(0.100000,-0.100000)" stroke="none" fill="#fff">
                  <path d="M963 2520 c-421 -44 -713 -222 -859 -525 -91 -188 -108 -325 -101 -812 5 -376 13 -446 70 -593 59 -156 174 -300 317 -397 343 -232 996 -256 1405 -50 141 71 276 187 350 303 73 113 125 284 125 408 0 42 -5 57 -23 74 -23 22 -28 22 -364 22 -394 0 -369 6 -408 -102 -48 -131 -107 -193 -214 -225 -61 -17 -196 -20 -249 -4 -57 17 -117 58 -146 100 -67 96 -80 203 -73 616 4 237 8 322 20 363 45 154 143 222 322 224 166 2 255 -51 314 -184 53 -120 62 -135 87 -147 17 -7 134 -11 359 -11 l334 0 20 26 c26 33 27 95 6 208 -29 153 -91 269 -205 386 -155 158 -358 257 -631 305 -104 19 -346 27 -456 15z"/>
                  <path d="M2384 2475 c-12 -8 -26 -27 -33 -42 -8 -21 -11 -329 -9 -1186 l3 -1159 28 -24 28 -24 299 0 299 0 28 24 28 24 5 550 5 550 355 -540 c195 -297 372 -555 393 -574 l37 -34 278 0 c310 0 313 1 332 68 6 24 10 420 10 1165 0 1207 1 1180 -48 1206 -14 7 -124 11 -316 11 l-295 0 -28 -24 -28 -24 -5 -583 -5 -583 -359 578 c-208 333 -374 589 -393 606 l-34 30 -277 0 c-227 0 -281 -3 -298 -15z"/>
                  <path d="M4694 2475 c-12 -8 -26 -27 -33 -42 -8 -21 -11 -329 -9 -1186 l3 -1159 28 -24 28 -24 584 0 c340 0 616 4 662 10 505 66 793 326 868 784 34 205 29 741 -9 916 -36 170 -112 308 -240 436 -158 158 -359 251 -621 289 -148 22 -1231 22 -1261 0z m1121 -599 c138 -36 214 -117 246 -261 18 -83 18 -625 0 -710 -16 -74 -55 -148 -96 -182 -16 -15 -55 -38 -85 -52 -53 -25 -64 -26 -262 -29 l-208 -4 0 626 0 626 178 0 c115 0 194 -5 227 -14z"/>
                  <path d="M6988 2465 c-14 -14 -28 -39 -32 -56 -8 -41 -8 -2247 0 -2288 4 -17 18 -42 32 -56 l25 -25 317 0 318 0 26 31 26 31 0 374 0 374 485 0 c517 0 539 2 564 48 7 13 11 112 11 275 l0 255 -31 26 -31 26 -499 0 -499 0 0 190 0 189 541 3 541 3 24 28 24 28 0 257 c-1 270 -2 276 -47 300 -16 9 -250 12 -896 12 l-874 0 -25 -25z"/>
                  </g>
                </svg>
                {/* 검정 로고 (아래부터 드러남) */}
                <svg 
                  className={`main-logo absolute top-0 left-0 transition-all duration-1000 ${
                    isScrolled || isLogoAnimated ? 'clip-path-reveal' : 'clip-path-hidden'
                  }`}
                  xmlns="http://www.w3.org/2000/svg" 
                  version="1.0" 
                  viewBox="0 0 883.000000 253.000000" 
                  preserveAspectRatio="xMidYMid meet"
                  style={{
                    clipPath: isScrolled || isLogoAnimated ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                    transition: 'clip-path 0.2s ease-in-out'
                  }}
                >
                  <g transform="translate(0.000000,253.000000) scale(0.100000,-0.100000)" stroke="none" fill="#000">
                  <path d="M963 2520 c-421 -44 -713 -222 -859 -525 -91 -188 -108 -325 -101 -812 5 -376 13 -446 70 -593 59 -156 174 -300 317 -397 343 -232 996 -256 1405 -50 141 71 276 187 350 303 73 113 125 284 125 408 0 42 -5 57 -23 74 -23 22 -28 22 -364 22 -394 0 -369 6 -408 -102 -48 -131 -107 -193 -214 -225 -61 -17 -196 -20 -249 -4 -57 17 -117 58 -146 100 -67 96 -80 203 -73 616 4 237 8 322 20 363 45 154 143 222 322 224 166 2 255 -51 314 -184 53 -120 62 -135 87 -147 17 -7 134 -11 359 -11 l334 0 20 26 c26 33 27 95 6 208 -29 153 -91 269 -205 386 -155 158 -358 257 -631 305 -104 19 -346 27 -456 15z"/>
                  <path d="M2384 2475 c-12 -8 -26 -27 -33 -42 -8 -21 -11 -329 -9 -1186 l3 -1159 28 -24 28 -24 299 0 299 0 28 24 28 24 5 550 5 550 355 -540 c195 -297 372 -555 393 -574 l37 -34 278 0 c310 0 313 1 332 68 6 24 10 420 10 1165 0 1207 1 1180 -48 1206 -14 7 -124 11 -316 11 l-295 0 -28 -24 -28 -24 -5 -583 -5 -583 -359 578 c-208 333 -374 589 -393 606 l-34 30 -277 0 c-227 0 -281 -3 -298 -15z"/>
                  <path d="M4694 2475 c-12 -8 -26 -27 -33 -42 -8 -21 -11 -329 -9 -1186 l3 -1159 28 -24 28 -24 584 0 c340 0 616 4 662 10 505 66 793 326 868 784 34 205 29 741 -9 916 -36 170 -112 308 -240 436 -158 158 -359 251 -621 289 -148 22 -1231 22 -1261 0z m1121 -599 c138 -36 214 -117 246 -261 18 -83 18 -625 0 -710 -16 -74 -55 -148 -96 -182 -16 -15 -55 -38 -85 -52 -53 -25 -64 -26 -262 -29 l-208 -4 0 626 0 626 178 0 c115 0 194 -5 227 -14z"/>
                  <path d="M6988 2465 c-14 -14 -28 -39 -32 -56 -8 -41 -8 -2247 0 -2288 4 -17 18 -42 32 -56 l25 -25 317 0 318 0 26 31 26 31 0 374 0 374 485 0 c517 0 539 2 564 48 7 13 11 112 11 275 l0 255 -31 26 -31 26 -499 0 -499 0 0 190 0 189 541 3 541 3 24 28 24 28 0 257 c-1 270 -2 276 -47 300 -16 9 -250 12 -896 12 l-874 0 -25 -25z"/>
                  </g>
                </svg>
              </Link>
            </div>

            <nav 
              className={`hidden md:flex items-center transition-all duration-500 ease-in-out ${
                isScrolled 
                  ? "gap-10 justify-end max-w-[600px] w-[600px]" 
                  : "justify-between ml-[100px] max-w-full w-full flex-1"
              }`} 
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-base font-medium relative group hover:text-gray-300 transition-colors duration-300 ${
                    isScrolled ? "text-black hover:text-gray-600" : isLogoAnimated ? "text-black hover:text-gray-600" : "text-white"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      activeSection === item.id ? "w-full" : "w-0"
                    } ${
                      isScrolled ? "bg-primary" : isLogoAnimated ? "bg-primary" : "bg-white"
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <button
                type="button"
                className={`inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 transition-colors duration-300 ${
                  isScrolled ? "text-black hover:text-gray-600" : isLogoAnimated ? "text-black hover:text-gray-600" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="sr-only">메뉴 열기</span>
                <Menu className="h-6 w-6" />
              </button>
            </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-[25px]">
          <Link href="/" className="text-secondary">
            <span style={{ fontFamily: 'NeueHaas, sans-serif', fontWeight: 800, fontSize: '70px', letterSpacing: '-4.9px' }}>CNDF</span>
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="sr-only">메뉴 닫기</span>
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="px-[25px] pt-4 pb-6 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`block w-full text-left text-lg font-medium transition-colors duration-200 ${
                activeSection === item.id ? "text-primary" : "text-gray-900 hover:text-secondary"
              }`}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-6">
            <Button
              className="w-full bg-primary text-white hover:bg-primary/90 font-medium"
              onClick={() => scrollToSection("contact")}
            >
              문의하기
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}

