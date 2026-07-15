import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGamification } from "@/contexts/GamificationContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function FloatingGamificationButton() {
  const [open, setOpen] = useState(false)
  const { skillPoints, sectionsCompleted, badges, streak } = useGamification()

  const completedCount = Object.keys(sectionsCompleted).length
  const totalSections = 6
  const badgeCount = Object.values(badges).filter(Boolean).length

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-lg font-bold text-white shadow-lg shadow-orange-500/30"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
      >
        🏆
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 w-72"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Progress</span>
                  <Badge variant="secondary">⭐ {skillPoints} pts</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Sections explored</span>
                    <span>{completedCount}/{totalSections}</span>
                  </div>
                  <Progress value={(completedCount / totalSections) * 100} />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Badges</span>
                  <span className="font-medium">🏅 {badgeCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Streak</span>
                  <span className="font-medium">🔥 {streak}s</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
