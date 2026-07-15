import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import * as THREE from "three"
import type { WorldLocation } from "@/data/universeData"
import { useGamification } from "@/contexts/GamificationContext"

interface Building3DProps {
  location: WorldLocation
  isActive: boolean
}

function BuildingGlow({ color, isActive }: { color: string; isActive: boolean }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 1.5
    }
  })

  return (
    <mesh ref={ref} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[2.5, 2.8, 6]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={isActive ? 0.6 : 0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function FloatingOrb({ color, position }: { color: string; position: [number, number, number] }) {
  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh position={position}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
    </Float>
  )
}

export default function Building3D({ location, isActive }: Building3DProps) {
  const roofRef = useRef<THREE.Mesh>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const { sectionsCompleted } = useGamification()
  const isCompleted = sectionsCompleted[location.id]

  const pos = useMemo(() => new THREE.Vector3(...location.position), [location.position])

  useFrame((_, delta) => {
    if (roofRef.current) {
      roofRef.current.rotation.y += delta * 0.5
    }
    // Pulse effect when active
    if (bodyRef.current && isActive) {
      const scale = 1 + Math.sin(Date.now() * 0.004) * 0.03
      bodyRef.current.scale.setScalar(scale)
    } else if (bodyRef.current) {
      bodyRef.current.scale.setScalar(1)
    }
  })

  return (
    <group position={pos}>
      {/* Base platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[2.5, 2.8, 0.2, 6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Main building body — semi-transparent when active to show interior */}
      <mesh ref={bodyRef} position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color={location.color}
          metalness={0.3}
          roughness={0.4}
          transparent={isActive}
          opacity={isActive ? 0.3 : 1}
        />
      </mesh>

      {/* Roof */}
      <mesh ref={roofRef} position={[0, 2.9, 0]} castShadow>
        <coneGeometry args={[1.6, 1.2, 6]} />
        <meshStandardMaterial
          color={isCompleted ? "#fbbf24" : "#475569"}
          metalness={0.6}
          roughness={0.3}
          emissive={isCompleted ? "#f59e0b" : "#000000"}
          emissiveIntensity={isCompleted ? 0.5 : 0}
        />
      </mesh>

      {/* Window */}
      <mesh position={[0.5, 1.5, 1.11]}>
        <boxGeometry args={[0.5, 0.5, 0.02]} />
        <meshStandardMaterial
          color="#e0f2fe"
          emissive="#38bdf8"
          emissiveIntensity={isActive ? 2.5 : 1.5}
        />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.55, 1.11]}>
        <boxGeometry args={[0.5, 0.9, 0.02]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>

      {/* Side panels */}
      <mesh position={[1.11, 1.3, 0]}>
        <boxGeometry args={[0.02, 1.8, 1.5]} />
        <meshStandardMaterial color={location.glowColor} transparent opacity={0.3} />
      </mesh>
      <mesh position={[-1.11, 1.3, 0]}>
        <boxGeometry args={[0.02, 1.8, 1.5]} />
        <meshStandardMaterial color={location.glowColor} transparent opacity={0.3} />
      </mesh>

      {/* Corner pillars */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([x, z], i) => (
        <mesh key={i} position={[x * 1.2, 1.3, z * 1.2]}>
          <cylinderGeometry args={[0.08, 0.08, 2.4, 6]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Glow ring */}
      <BuildingGlow color={location.glowColor} isActive={isActive} />

      {/* Floating orbs */}
      <FloatingOrb color={location.glowColor} position={[1.8, 2.5, 0]} />
      <FloatingOrb color={location.glowColor} position={[-1.8, 2.5, 0]} />

      {/* Building light — brighter when active */}
      <pointLight
        position={[0, 3, 0]}
        intensity={isActive ? 1.2 : 0.6}
        color={location.glowColor}
        distance={isActive ? 8 : 5}
      />

      {/* Label */}
      <Text
        position={[0, 4.2, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04}
        outlineColor="black"
      >
        {location.icon} {location.name}
      </Text>
    </group>
  )
}
