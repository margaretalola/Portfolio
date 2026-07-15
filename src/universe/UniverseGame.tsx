import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import World3D from "@/universe/engine/World3D"
import InfoPanel from "@/universe/engine/InfoPanel"
import { worldLocations } from "@/data/universeData"

interface UniverseGameProps {
  onExit: () => void
}

function Minimap({ activeLocationId }: { activeLocationId: string | null }) {
  const mapSize = 140
  const worldSize = 50

  const toMap = (pos: [number, number, number]) => ({
    x: ((pos[0] + worldSize / 2) / worldSize) * mapSize,
    y: ((pos[2] + worldSize / 2) / worldSize) * mapSize,
  })

  return (
    <div className="absolute bottom-4 right-4 z-10">
      <div
        className="overflow-hidden rounded-lg border border-white/20 bg-slate-900/80 backdrop-blur-md"
        style={{ width: mapSize, height: mapSize }}
      >
        {/* Grid */}
        <svg width={mapSize} height={mapSize} className="absolute inset-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <g key={i}>
              <line
                x1={(i / 6) * mapSize}
                y1={0}
                x2={(i / 6) * mapSize}
                y2={mapSize}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={0.5}
              />
              <line
                x1={0}
                y1={(i / 6) * mapSize}
                x2={mapSize}
                y2={(i / 6) * mapSize}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth={0.5}
              />
            </g>
          ))}
        </svg>

        {/* Buildings */}
        {worldLocations.map((loc) => {
          const pos = toMap(loc.position)
          const isActive = loc.id === activeLocationId
          return (
            <div
              key={loc.id}
              className="absolute flex items-center justify-center"
              style={{
                left: pos.x - 5,
                top: pos.y - 5,
                width: 10,
                height: 10,
              }}
            >
              <div
                className="rounded-sm"
                style={{
                  width: isActive ? 8 : 5,
                  height: isActive ? 8 : 5,
                  backgroundColor: isActive ? loc.glowColor : loc.color,
                  boxShadow: isActive ? `0 0 8px ${loc.glowColor}` : "none",
                  transition: "all 0.2s",
                }}
              />
            </div>
          )
        })}
      </div>
      <p className="mt-1 text-center text-[9px] text-white/40">MAP</p>
    </div>
  )
}

export default function UniverseGame({ onExit }: UniverseGameProps) {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null)
  const [enteredRoomId, setEnteredRoomId] = useState<string | null>(null)
  const [showHelp, setShowHelp] = useState(true)

  const activeLocation = worldLocations.find((l) => l.id === activeLocationId) ?? null

  const canEnter = activeLocationId !== null && worldLocations.find((l) => l.id === activeLocationId)?.roomObjects
    && activeLocationId !== enteredRoomId

  const handlePlayerNear = useCallback((locationId: string | null) => {
    setActiveLocationId(locationId)
  }, [])

  const handleEnterRoom = useCallback((locationId: string) => {
    setEnteredRoomId(locationId)
    setShowHelp(false)
  }, [])

  const handleExitRoom = useCallback(() => {
    setEnteredRoomId(null)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canEnter && activeLocationId) {
        handleEnterRoom(activeLocationId)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [canEnter, activeLocationId, handleEnterRoom])

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left — Title + Controls */}
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md">
              🌌 Portfolio Universe
            </span>
            <div className="hidden items-center gap-3 text-xs text-white/50 sm:flex">
              <span className="flex items-center gap-1">
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">W</kbd>
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">A</kbd>
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">S</kbd>
                <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">D</kbd>
                <span className="ml-1">Move</span>
              </span>
              <span>·</span>
              <span>🖱️ Rotate</span>
              <span>·</span>
              <span>🔍 Zoom</span>
            </div>
          </div>

          {/* Right — Exit */}
          <button
            onClick={onExit}
            className="rounded-lg bg-white/10 px-4 py-1.5 text-sm text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
          >
            ✕ Exit
          </button>
        </div>
      </div>

      {/* Enter room prompt */}
      <AnimatePresence>
        {canEnter && !enteredRoomId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-32 left-1/2 z-10 -translate-x-1/2"
          >
            <button
              onClick={() => activeLocationId && handleEnterRoom(activeLocationId)}
              className="flex items-center gap-2 rounded-xl border border-white/20 bg-slate-900/90 px-6 py-3 text-sm text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-slate-800/90"
            >
              <span className="text-lg">🚪</span>
              Enter {activeLocation?.name}
              <kbd className="ml-2 rounded border border-white/30 px-1.5 py-0.5 font-mono text-[10px] text-white/60">ENTER</kbd>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* In-room exit hint */}
      <AnimatePresence>
        {enteredRoomId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-5 py-2.5 text-xs text-white/60 backdrop-blur-md">
              <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd>
              Exit room
              <span className="mx-1 text-white/20">|</span>
              <kbd className="rounded border border-white/20 px-1.5 py-0.5 font-mono text-[10px]">WASD</kbd>
              Look around
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help overlay */}
      <AnimatePresence>
        {showHelp && !enteredRoomId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-20 left-1/2 z-10 -translate-x-1/2"
          >
            <div className="rounded-xl border border-white/10 bg-slate-900/90 px-6 py-4 text-center backdrop-blur-md">
              <p className="mb-2 text-sm text-white/80">Walk near a building to explore it</p>
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/50">
                <span>🏢 Projects</span>
                <span>💼 Experience</span>
                <span>⚡ Skills</span>
                <span>👤 About</span>
                <span>🏅 Certifications</span>
                <span>📮 Contact</span>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="mt-3 text-xs text-white/40 hover:text-white/60"
              >
                Got it, dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D World */}
      <World3D
        onPlayerNear={handlePlayerNear}
        activeLocationId={activeLocationId}
        enteredRoomId={enteredRoomId}
        onExitRoom={handleExitRoom}
      />

      {/* Minimap */}
      <Minimap activeLocationId={activeLocationId} />

      {/* Info Panel */}
      <InfoPanel location={activeLocation} onExit={onExit} />
    </motion.div>
  )
}
