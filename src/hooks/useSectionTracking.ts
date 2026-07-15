import { useEffect, useRef } from "react"
import { useGamification } from "@/contexts/GamificationContext"

const SECTION_IDS = ["about", "experience", "projects", "skills", "certifications", "contact"]

export function useSectionTracking() {
  const { completeSection } = useGamification()
  const observed = useRef<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !observed.current.has(entry.target.id)) {
            observed.current.add(entry.target.id)
            if (SECTION_IDS.includes(entry.target.id)) {
              completeSection(entry.target.id)
            }
          }
        }
      },
      { threshold: 0.3 }
    )

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [completeSection])
}
