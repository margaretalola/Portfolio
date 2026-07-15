import { useRef, useEffect, useCallback, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { worldLocations, playerStart, PROXIMITY_THRESHOLD } from "@/data/universeData"

interface Player3DProps {
  onNearLocation: (locationId: string | null) => void
  disabled?: boolean
}

function PlayerTrail() {
  const ref = useRef<THREE.Points>(null)
  const trailLen = 20
  const positions = useMemo(() => new Float32Array(trailLen * 3), [])
  const idx = useRef(0)
  const frameCount = useRef(0)

  useFrame((_, _delta) => {
    if (!ref.current) return
    const parent = ref.current.parent
    if (!parent) return

    frameCount.current++
    if (frameCount.current % 2 !== 0) return

    const parentPos = parent.position
    const i = idx.current
    positions[i * 3] = parentPos.x
    positions[i * 3 + 1] = parentPos.y + 0.3
    positions[i * 3 + 2] = parentPos.z
    idx.current = (idx.current + 1) % trailLen

    const attr = ref.current.geometry.attributes.position as THREE.BufferAttribute
    attr.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#22d3ee" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

export default function Player3D({ onNearLocation, disabled }: Player3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const { camera } = useThree()
  const velocity = useRef(new THREE.Vector3())
  const keys = useRef<Record<string, boolean>>({})
  const lastNear = useRef<string | null>(null)
  const isMoving = useRef(false)
  const camLookTarget = useRef(new THREE.Vector3())

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = true
  }, [])

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    keys.current[e.key.toLowerCase()] = false
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    // Skip movement and camera when disabled (inside a room)
    if (disabled) return

    // Movement
    const speed = 0.12 * delta * 60
    const dir = new THREE.Vector3()

    if (keys.current["w"] || keys.current["arrowup"]) dir.z -= speed
    if (keys.current["s"] || keys.current["arrowdown"]) dir.z += speed
    if (keys.current["a"] || keys.current["arrowleft"]) dir.x -= speed
    if (keys.current["d"] || keys.current["arrowright"]) dir.x += speed

    isMoving.current = dir.lengthSq() > 0

    if (isMoving.current) {
      dir.normalize().multiplyScalar(speed)
    }

    velocity.current.lerp(dir, 0.18)

    const pos = groupRef.current.position
    pos.x = THREE.MathUtils.clamp(pos.x + velocity.current.x, -20, 20)
    pos.z = THREE.MathUtils.clamp(pos.z + velocity.current.z, -20, 20)

    // Bob animation
    if (bodyRef.current && headRef.current) {
      const bob = isMoving.current ? Math.sin(Date.now() * 0.012) * 0.08 : 0
      bodyRef.current.position.y = 0.6 + bob
      headRef.current.position.y = 1.35 + bob
    }

    // Camera follow — faster lerp for smoothness
    const camOffset = new THREE.Vector3(pos.x, pos.y + 12, pos.z + 12)
    camera.position.lerp(camOffset, 0.08)

    camLookTarget.current.lerp(
      new THREE.Vector3(pos.x, pos.y + 1, pos.z),
      0.1
    )
    camera.lookAt(camLookTarget.current)

    // Proximity detection — reuse vector
    let nearest: string | null = null
    let nearestDist = Infinity
    for (const loc of worldLocations) {
      const dx = pos.x - loc.position[0]
      const dz = pos.z - loc.position[2]
      const d = Math.sqrt(dx * dx + dz * dz)
      if (d < PROXIMITY_THRESHOLD && d < nearestDist) {
        nearest = loc.id
        nearestDist = d
      }
    }

    if (nearest !== lastNear.current) {
      lastNear.current = nearest
      onNearLocation(nearest)
    }
  })

  return (
    <group ref={groupRef} position={playerStart}>
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0.6, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.4}
          roughness={0.3}
          emissive="#0891b2"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Head */}
      <mesh ref={headRef} position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.4}
          roughness={0.3}
          emissive="#0891b2"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.08, 1.38, 0.2]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.08, 1.38, 0.2]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      {/* Player glow */}
      <pointLight position={[0, 1, 0]} intensity={1.5} color="#22d3ee" distance={5} />

      {/* Trail effect */}
      <PlayerTrail />
    </group>
  )
}
