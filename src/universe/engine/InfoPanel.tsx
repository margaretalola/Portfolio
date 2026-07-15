import { motion, AnimatePresence } from "framer-motion"
import type { WorldLocation, RoomObject } from "@/data/universeData"

interface InfoPanelProps {
  location: WorldLocation | null
  onExit: () => void
}

function RoomObjectCard({ obj, color }: { obj: RoomObject; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm font-medium text-white">{obj.label}</span>
      </div>
      <p className="text-xs leading-relaxed text-white/60">{obj.description}</p>
    </motion.div>
  )
}

export default function InfoPanel({ location, onExit }: InfoPanelProps) {
  const hasRoomObjects = location?.roomObjects && location.roomObjects.length > 0

  return (
    <AnimatePresence>
      {location && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed right-4 top-20 z-20 w-80 max-h-[calc(100vh-6rem)] overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-950/95 shadow-2xl backdrop-blur-xl"
        >
          {/* Header with gradient */}
          <div
            className="relative px-5 py-4"
            style={{
              background: `linear-gradient(135deg, ${location.color}33, transparent)`,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{location.icon}</span>
              <div>
                <h3 className="text-lg font-bold text-white">{location.name}</h3>
                <p className="text-xs text-white/50">
                  {hasRoomObjects ? "Explore the room objects" : "Double-click to explore"}
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="max-h-96 overflow-y-auto">
            {/* Description */}
            <div className="px-5 py-3">
              <p className="text-sm leading-relaxed text-white/70">
                {location.description}
              </p>
            </div>

            {/* Room Objects — if available */}
            {hasRoomObjects && (
              <div className="px-5 pb-3">
                <p className="mb-2 text-xs font-medium text-white/40">ROOM OBJECTS</p>
                <div className="space-y-2">
                  {location.roomObjects!.map((obj) => (
                    <RoomObjectCard key={obj.id} obj={obj} color={location.glowColor} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular items — if no room objects */}
            {!hasRoomObjects && (
              <div className="px-5 pb-3">
                <p className="mb-2 text-xs font-medium text-white/40">CONTENTS</p>
                <div className="space-y-1.5">
                  {location.items.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-2 text-xs text-white/80 backdrop-blur"
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: location.glowColor }}
                      />
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-5 py-3">
            <button
              onClick={onExit}
              className="w-full rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              ← Exit Universe
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
