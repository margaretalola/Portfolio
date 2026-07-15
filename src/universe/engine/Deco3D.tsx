import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Float } from "@react-three/drei"
import * as THREE from "three"
import type { Decoration } from "@/data/universeData"

interface Deco3DProps {
  decoration: Decoration
}

function Tree({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.2, 1.5, 6]} />
        <meshStandardMaterial color="#92400e" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[0.6, 1, 6]} />
        <meshStandardMaterial color="#166534" roughness={0.6} />
      </mesh>
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[0.45, 0.8, 6]} />
        <meshStandardMaterial color="#15803d" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3.0, 0]} castShadow>
        <coneGeometry args={[0.3, 0.6, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </mesh>
    </group>
  )
}

function Bush({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#16a34a" roughness={0.7} />
      </mesh>
      <mesh position={[0.3, 0.3, 0.2]} castShadow>
        <sphereGeometry args={[0.3, 6, 6]} />
        <meshStandardMaterial color="#15803d" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Rock({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <dodecahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#64748b" metalness={0.3} roughness={0.6} />
      </mesh>
      <mesh position={[0.3, 0.15, 0.2]} castShadow>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.3} roughness={0.6} />
      </mesh>
    </group>
  )
}

function Flower({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 4]} />
        <meshStandardMaterial color="#16a34a" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial color="#eab308" emissive="#eab308" emissiveIntensity={0.5} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.15, 0.4, Math.sin(angle) * 0.15]}>
            <sphereGeometry args={[0.06, 4, 4]} />
            <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.3} />
          </mesh>
        )
      })}
    </group>
  )
}

function Crystal({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.8
      ref.current.position.y = 0.6 + Math.sin(Date.now() * 0.002) * 0.2
    }
  })

  return (
    <group position={position} scale={scale}>
      <mesh ref={ref} position={[0, 0.6, 0]}>
        <octahedronGeometry args={[0.4, 0]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <pointLight position={[0, 0.6, 0]} intensity={0.8} color="#06b6d4" distance={3} />
    </group>
  )
}

function Lamp({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1.6, 6]} />
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, 1.7, 0]} intensity={1.2} color="#fbbf24" distance={4} />
    </group>
  )
}

function Portal({ position, scale }: { position: [number, number, number]; scale: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 2
    }
  })

  return (
    <group position={position} scale={scale}>
      <group ref={ref}>
        <mesh position={[0, 1.5, 0]}>
          <torusGeometry args={[0.8, 0.08, 6, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <torusGeometry args={[0.6, 0.05, 6, 16]} />
          <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1.5} transparent opacity={0.5} />
        </mesh>
      </group>
      <pointLight position={[0, 1.5, 0]} intensity={0.8} color="#8b5cf6" distance={4} />
    </group>
  )
}

function Fountain({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.2, 1.5, 0.3, 12]} />
        <meshStandardMaterial color="#1e40af" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 12]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.7} roughness={0.3} />
      </mesh>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.3, 10, 10]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={2} />
        </mesh>
      </Float>
      <pointLight position={[0, 2.2, 0]} intensity={1} color="#38bdf8" distance={5} />
    </group>
  )
}

export default function Deco3D({ decoration }: Deco3DProps) {
  const { type, position, scale } = decoration

  switch (type) {
    case "tree":
      return <Tree position={position} scale={scale} />
    case "bush":
      return <Bush position={position} scale={scale} />
    case "rock":
      return <Rock position={position} scale={scale} />
    case "flower":
      return <Flower position={position} scale={scale} />
    case "crystal":
      return <Crystal position={position} scale={scale} />
    case "lamp":
      return <Lamp position={position} scale={scale} />
    case "portal":
      return <Portal position={position} scale={scale} />
    case "fountain":
      return <Fountain position={position} scale={scale} />
    default:
      return null
  }
}
