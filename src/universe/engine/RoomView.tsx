import { useRef, useEffect, useCallback } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import type { WorldLocation } from "@/data/universeData"

interface RoomViewProps {
  location: WorldLocation
  onExit: () => void
}

const ROOM_W = 16
const ROOM_D = 14
const WALL_H = 5
const HALF_W = ROOM_W / 2
const HALF_D = ROOM_D / 2

export default function RoomView({ location, onExit }: RoomViewProps) {
  const { camera } = useThree()
  const keys = useRef<Record<string, boolean>>({})
  const velocity = useRef(new THREE.Vector3())

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = true
    if (e.key === "Escape") onExit()
  }, [onExit])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = false
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    camera.position.set(0, 2.5, 5)
    camera.lookAt(0, 2, 0)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [camera, handleKeyDown, handleKeyUp])

  useFrame((_, delta) => {
    const speed = 5 * delta
    const dir = new THREE.Vector3()
    if (keys.current["w"] || keys.current["arrowup"]) dir.z -= speed
    if (keys.current["s"] || keys.current["arrowdown"]) dir.z += speed
    if (keys.current["a"] || keys.current["arrowleft"]) dir.x -= speed
    if (keys.current["d"] || keys.current["arrowright"]) dir.x += speed
    if (dir.lengthSq() > 0) dir.normalize().multiplyScalar(speed)
    velocity.current.lerp(dir, 0.15)

    const pos = camera.position
    pos.x = THREE.MathUtils.clamp(pos.x + velocity.current.x, -HALF_W + 1.5, HALF_W - 1.5)
    pos.z = THREE.MathUtils.clamp(pos.z + velocity.current.z, -HALF_D + 1.5, HALF_D - 1.5)
    pos.y = 2.5
  })

  const roomItems = location.roomObjects?.filter((o) => o.label) ?? []
  const screenColor = location.glowColor ?? "#38bdf8"

  return (
    <group>
      {/* ========= FLOOR ========= */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_W, ROOM_D]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>
      {/* Floor grid lines */}
      {Array.from({ length: Math.floor(ROOM_W / 2) + 1 }).map((_, i) => {
        const x = -HALF_W + i * 2
        return (
          <mesh key={`fx${i}`} position={[x, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.02, ROOM_D]} />
            <meshBasicMaterial color="#2a2a4a" transparent opacity={0.5} />
          </mesh>
        )
      })}
      {Array.from({ length: Math.floor(ROOM_D / 2) + 1 }).map((_, i) => {
        const z = -HALF_D + i * 2
        return (
          <mesh key={`fz${i}`} position={[0, 0.003, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[ROOM_W, 0.02]} />
            <meshBasicMaterial color="#2a2a4a" transparent opacity={0.5} />
          </mesh>
        )
      })}

      {/* ========= CEILING ========= */}
      <mesh position={[0, WALL_H, 0]}>
        <boxGeometry args={[ROOM_W, 0.15, ROOM_D]} />
        <meshStandardMaterial color="#0f0f1a" roughness={0.9} />
      </mesh>

      {/* ========= WALLS ========= */}
      {/* Back wall — dark with accent stripe */}
      <mesh position={[0, WALL_H / 2, -HALF_D]}>
        <boxGeometry args={[ROOM_W, WALL_H, 0.2]} />
        <meshStandardMaterial color="#16213e" roughness={0.7} />
      </mesh>
      {/* Accent stripe on back wall */}
      <mesh position={[0, 0.3, -HALF_D + 0.12]}>
        <boxGeometry args={[ROOM_W, 0.6, 0.02]} />
        <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-HALF_W, WALL_H / 2, 0]}>
        <boxGeometry args={[0.2, WALL_H, ROOM_D]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>

      {/* Right wall */}
      <mesh position={[HALF_W, WALL_H / 2, 0]}>
        <boxGeometry args={[0.2, WALL_H, ROOM_D]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.7} />
      </mesh>

      {/* Front wall — left */}
      <mesh position={[-4.5, WALL_H / 2, HALF_D]}>
        <boxGeometry args={[7, WALL_H, 0.2]} />
        <meshStandardMaterial color="#16213e" roughness={0.7} />
      </mesh>
      {/* Front wall — right */}
      <mesh position={[4.5, WALL_H / 2, HALF_D]}>
        <boxGeometry args={[7, WALL_H, 0.2]} />
        <meshStandardMaterial color="#16213e" roughness={0.7} />
      </mesh>
      {/* Front wall — above door */}
      <mesh position={[0, 4, HALF_D]}>
        <boxGeometry args={[2, 2, 0.2]} />
        <meshStandardMaterial color="#16213e" roughness={0.7} />
      </mesh>

      {/* ========= DOOR ========= */}
      <mesh position={[-0.8, 1.2, HALF_D - 0.15]}>
        <boxGeometry args={[1, 2.4, 0.12]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh position={[0.8, 1.2, HALF_D - 0.15]}>
        <boxGeometry args={[1, 2.4, 0.12]} />
        <meshStandardMaterial color="#2d2d44" />
      </mesh>
      <mesh position={[0.3, 1.2, HALF_D + 0.02]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.9} />
      </mesh>

      {/* Door label */}
      <Text position={[0, 3.2, HALF_D - 0.25]} fontSize={0.2} color="#64748b" anchorX="center">
        [ESC] Exit
      </Text>

      {/* ========= LIGHTING ========= */}
      <ambientLight intensity={0.3} />
      {/* Ceiling light */}
      <mesh position={[0, WALL_H - 0.3, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 0.2, 8]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.8} roughness={0.2} />
      </mesh>
      <pointLight position={[0, WALL_H - 0.5, 0]} intensity={4} color="#fef3c7" distance={14} decay={2} />
      {/* Screen glow */}
      <pointLight position={[0, 2.5, -HALF_D + 1]} intensity={3} color={screenColor} distance={10} decay={2} />

      {/* ========= BIG SCREEN ON BACK WALL ========= */}
      <group position={[0, 2.8, -HALF_D + 0.2]}>
        {/* Screen frame */}
        <mesh>
          <boxGeometry args={[10, 3.5, 0.1]} />
          <meshStandardMaterial color="#0f0f1a" />
        </mesh>
        {/* Screen surface */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[9.6, 3.1]} />
          <meshStandardMaterial
            color="#0a0a1a"
            emissive={screenColor}
            emissiveIntensity={0.15}
          />
        </mesh>

        {/* Location title */}
        <Text
          position={[0, 1.2, 0.15]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.03}
          outlineColor="black"
        >
          {location.icon} {location.name}
        </Text>

        {/* Divider line */}
        <mesh position={[0, 0.85, 0.12]}>
          <boxGeometry args={[8, 0.02, 0.01]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={1} />
        </mesh>

        {/* Info items — displayed on screen */}
        {roomItems.map((item, i) => {
          const totalItems = roomItems.length
          const startY = totalItems <= 4 ? 0.5 : 0.6
          const spacing = totalItems <= 4 ? 0.45 : 0.35
          const y = startY - i * spacing
          return (
            <group key={item.id} position={[0, y, 0.15]}>
              {/* Item title */}
              <Text
                position={[-3.5, 0, 0]}
                fontSize={0.18}
                color={item.accentColor || screenColor}
                anchorX="left"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="black"
              >
                {item.label}
              </Text>
              {/* Item description */}
              <Text
                position={[-3.5, -0.2, 0]}
                fontSize={0.1}
                color="#94a3b8"
                anchorX="left"
                anchorY="middle"
                maxWidth={7}
              >
                {item.description.length > 120
                  ? item.description.slice(0, 120) + "..."
                  : item.description}
              </Text>
            </group>
          )
        })}

        {/* Screen border glow */}
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[10.2, 3.7, 0.02]} />
          <meshStandardMaterial
            color={screenColor}
            emissive={screenColor}
            emissiveIntensity={0.8}
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* ========= SIDE WALL DECORATIONS ========= */}
      {/* Left wall — small info panels */}
      <group position={[-HALF_W + 0.2, 2.5, -2]}>
        <mesh>
          <boxGeometry args={[0.05, 1.5, 2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <planeGeometry args={[0.01, 1.3]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
      </group>
      <group position={[-HALF_W + 0.2, 2.5, 2]}>
        <mesh>
          <boxGeometry args={[0.05, 1.5, 2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.04, 0, 0]}>
          <planeGeometry args={[0.01, 1.3]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Right wall — small info panels */}
      <group position={[HALF_W - 0.2, 2.5, -2]}>
        <mesh>
          <boxGeometry args={[0.05, 1.5, 2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.04, 0, 0]}>
          <planeGeometry args={[0.01, 1.3]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
      </group>
      <group position={[HALF_W - 0.2, 2.5, 2]}>
        <mesh>
          <boxGeometry args={[0.05, 1.5, 2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[-0.04, 0, 0]}>
          <planeGeometry args={[0.01, 1.3]} />
          <meshStandardMaterial color={screenColor} emissive={screenColor} emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
      </group>

      {/* ========= CAMERA CONTROLS ========= */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={8}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 2, 0]}
        mouseButtons={{
          LEFT: 0,
          MIDDLE: 2,
          RIGHT: undefined,
        }}
      />
    </group>
  )
}
