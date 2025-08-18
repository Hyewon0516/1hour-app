"use client"

import { useState, useEffect } from "react"

interface UseScrollSpyOptions {
  sectionIds: string[]
  offset?: number
}

export function useScrollSpy({ sectionIds, offset = 0 }: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

      if (sections.length === 0) return

      // Get current scroll position
      const scrollY = window.scrollY

      // Find the section that is currently in view
      let currentSection: HTMLElement | undefined

      // Special case for when we're at the top of the page
      if (scrollY < 100) {
        setActiveId("")
        return
      }

      // Special case for when we're at the bottom of the page
      if (window.innerHeight + scrollY >= document.body.offsetHeight - 100) {
        setActiveId(sectionIds[sectionIds.length - 1])
        return
      }

      // Otherwise find the section that's in view
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const sectionTop = section.offsetTop - offset
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          currentSection = section
          break
        }
      }

      // Update active section
      if (currentSection) {
        setActiveId(currentSection.id)
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial check
    handleScroll()

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, offset])

  return activeId
}

