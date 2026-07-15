import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ExploreButtonProps {
  onClick: () => void
}

export default function ExploreButton({ onClick }: ExploreButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 animate-ping opacity-30" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 text-2xl shadow-lg shadow-purple-500/30">
          🌌
        </div>
        <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-black shadow">
          ✨
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="rounded-lg bg-background/80 px-3 py-1.5 text-sm font-medium text-foreground shadow-md backdrop-blur"
          >
            Explore My World
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
