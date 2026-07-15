import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Float } from "@react-three/drei"
import * as THREE from "three"
import { useEffect } from "react"
import Building3D from "@/universe/engine/Building3D"
import Deco3D from "@/universe/engine/Deco3D"
import Player3D from "@/universe/engine/Player3D"
import RoomView from "@/universe/engine/RoomView"
import { worldLocations, decorations, pathways } from "@/data/universeData"

interface World3DProps {
  onPlayerNear: (locationId: string | null) => void
  activeLocationId: string | null
  enteredRoomId: string | null
  onExitRoom: () => void
}

function Stars() {
  const ref = useRef<THREE.Points>(null)
  const count = 1200

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100
      pos[i * 3 + 1] = Math.random() * 30 + 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#e0f2fe" transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

function Ground() {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#0c4a6e" />
      </mesh>

      {/* Grid */}
      <gridHelper args={[80, 40, "#0ea5e9", "#0ea5e9"]} position={[0, 0.001, 0]} material-transparent material-opacity={0.08} />
    </group>
  )
}

function Pathways() {
  const meshData = useMemo(() => {
    return pathways.map((path) => {
      const start = new THREE.Vector3(...path.from)
      const end = new THREE.Vector3(...path.to)
      const mid = start.clone().add(end).multiplyScalar(0.5)
      const length = start.distanceTo(end)
      const angle = Math.atan2(end.x - start.x, end.z - start.z)
      return { mid, length, angle }
    })
  }, [])

  return (
    <group>
      {meshData.map((data, i) => (
        <group key={i}>
          <mesh position={[data.mid.x, 0.01, data.mid.z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.6, data.length]} />
            <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
          </mesh>
          <mesh position={[data.mid.x, 0.02, data.mid.z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.8, data.length]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function CenterFountain() {
  const orbRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={[0, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.5, 0.3, 16]} />
          <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[1, 1, 0.1, 16]} />
          <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh ref={orbRef} position={[0, 2, 0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={2} />
        </mesh>
        <pointLight position={[0, 2, 0]} intensity={1.5} color="#38bdf8" distance={6} />
      </group>
    </Float>
  )
}

function CameraSetup({ inRoom }: { inRoom: boolean }) {
  const { camera } = useThree()
  useEffect(() => {
    if (inRoom) {
      camera.position.set(0, 1.6, 0)
      camera.lookAt(0, 1.2, -1)
    } else {
      camera.position.set(0, 20, 20)
      camera.lookAt(0, 0, 0)
    }
  }, [inRoom, camera])
  return null
}

export default function World3D({ onPlayerNear, activeLocationId, enteredRoomId, onExitRoom }: World3DProps) {
  const enteredLocation = enteredRoomId ? worldLocations.find((l) => l.id === enteredRoomId) ?? null : null
  const inRoom = !!enteredRoomId

  return (
    <Canvas
      camera={{ position: [0, 20, 20], fov: 50 }}
      className="h-full w-full"
      shadows
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      {/* Background — indoor or outdoor */}
      <color attach="background" args={[inRoom ? "#0f172a" : "#020617"]} />
      <fog attach="fog" args={[inRoom ? "#0f172a" : "#020617", inRoom ? 20 : 30, inRoom ? 50 : 60]} />

      {/* Camera setup */}
      <CameraSetup inRoom={inRoom} />

      {/* === OUTDOOR WORLD (hidden when inside room) === */}
      {!inRoom && (
        <>
          {/* Lighting — outdoor */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 15, 10]} intensity={1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          <pointLight position={[-8, 5, -8]} intensity={0.6} color="#8b5cf6" distance={15} />
          <pointLight position={[8, 5, 8]} intensity={0.6} color="#06b6d4" distance={15} />

          {/* Stars */}
          <Stars />

          {/* Ground */}
          <Ground />

          {/* Pathways */}
          <Pathways />

          {/* Center fountain */}
          <CenterFountain />

          {/* Buildings */}
          {worldLocations.map((loc) => (
            <Building3D key={loc.id} location={loc} isActive={loc.id === activeLocationId} />
          ))}

          {/* Decorations */}
          {decorations.map((deco, i) => (
            <Deco3D key={i} decoration={deco} />
          ))}

          {/* Player */}
          <Player3D onNearLocation={onPlayerNear} />

          {/* Camera controls — full 360° rotation */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={50}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            mouseButtons={{
              LEFT: 0,
              MIDDLE: 2,
              RIGHT: undefined,
            }}
          />
        </>
      )}

      {/* === INDOOR ROOM (shown when inside) === */}
      {inRoom && enteredLocation && (
        <>
          {/* Indoor lighting */}
          <ambientLight intensity={0.8} />

          {/* Room interior — at world origin */}
          <RoomView location={enteredLocation} onExit={onExitRoom} />
        </>
      )}
    </Canvas>
  )
}
