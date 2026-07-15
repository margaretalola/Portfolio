import { useEffect, useRef } from "react"
import { useGamification } from "@/contexts/GamificationContext"

const SECTIONS = [
  { id: "hero", points: 10 },
  { id: "about", points: 15 },
  { id: "experience", points: 20 },
  { id: "projects", points: 25 },
  { id: "skills", points: 20 },
  { id: "certifications", points: 15 },
  { id: "contact", points: 50 },
]

export default function SectionTracker() {
  const { completeSection, sectionsCompleted } = useGamification()
  const tracked = useRef<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !tracked.current.has(entry.target.id)) {
            tracked.current.add(entry.target.id)
            const section = SECTIONS.find((s) => s.id === entry.target.id)
            if (section && !sectionsCompleted[section.id]) {
              completeSection(section.id)
            }
          }
        }
      },
      { threshold: 0.4 }
    )

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [completeSection, sectionsCompleted])

  return null
}
