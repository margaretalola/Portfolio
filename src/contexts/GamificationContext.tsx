import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface GamificationState {
  skillPoints: number
  sectionsCompleted: Record<string, boolean>
  badges: Record<string, boolean>
  lastActive: number
  streak: number
}

interface GamificationContextValue extends GamificationState {
  completeSection: (sectionId: string) => void
  addPoints: (points: number) => void
  unlockBadge: (badgeId: string) => void
}

const GamificationContext = createContext<GamificationContextValue | null>(null)

const STORAGE_KEY = "portfolio-gamification"

function loadState(): GamificationState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return {
    skillPoints: 0,
    sectionsCompleted: {},
    badges: {},
    lastActive: Date.now(),
    streak: 0,
  }
}

function saveState(state: GamificationState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function GamificationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GamificationState>(loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const completeSection = useCallback((sectionId: string) => {
    setState((prev) => {
      if (prev.sectionsCompleted[sectionId]) return prev
      return {
        ...prev,
        sectionsCompleted: { ...prev.sectionsCompleted, [sectionId]: true },
        skillPoints: prev.skillPoints + 10,
        lastActive: Date.now(),
      }
    })
  }, [])

  const addPoints = useCallback((points: number) => {
    setState((prev) => ({
      ...prev,
      skillPoints: prev.skillPoints + points,
      lastActive: Date.now(),
    }))
  }, [])

  const unlockBadge = useCallback((badgeId: string) => {
    setState((prev) => {
      if (prev.badges[badgeId]) return prev
      return {
        ...prev,
        badges: { ...prev.badges, [badgeId]: true },
        skillPoints: prev.skillPoints + 25,
      }
    })
  }, [])

  return (
    <GamificationContext.Provider
      value={{ ...state, completeSection, addPoints, unlockBadge }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const ctx = useContext(GamificationContext)
  if (!ctx) throw new Error("useGamification must be used within GamificationProvider")
  return ctx
}
