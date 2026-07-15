import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import type { RoomObject } from "@/data/universeData"

interface RoomInterior3DProps {
  objects: RoomObject[]
  isVisible: boolean
}

function Label({ text, position }: { text: string; position: [number, number, number] }) {
  if (!text) return null
  return (
    <Text
      position={position}
      fontSize={0.12}
      color="white"
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.02}
      outlineColor="black"
      maxWidth={1.5}
      textAlign="center"
    >
      {text}
    </Text>
  )
}

function Sofa({ obj }: { obj: RoomObject }) {
  const rot = obj.rotation ?? [0, 0, 0]
  return (
    <group position={obj.position} rotation={rot}>
      {/* Base/seat */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.4, 0.3, 0.6]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.55, -0.25]} castShadow>
        <boxGeometry args={[1.4, 0.4, 0.15]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      {/* Left armrest */}
      <mesh position={[-0.65, 0.4, 0]} castShadow>
        <boxGeometry args={[0.12, 0.3, 0.6]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      {/* Right armrest */}
      <mesh position={[0.65, 0.4, 0]} castShadow>
        <boxGeometry args={[0.12, 0.3, 0.6]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      {/* Cushions */}
      <mesh position={[-0.35, 0.42, 0.05]}>
        <boxGeometry args={[0.55, 0.08, 0.45]} />
        <meshStandardMaterial color={obj.accentColor ?? "#818cf8"} roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 0.42, 0.05]}>
        <boxGeometry args={[0.55, 0.08, 0.45]} />
        <meshStandardMaterial color={obj.accentColor ?? "#818cf8"} roughness={0.8} />
      </mesh>
      {/* Legs */}
      {[[-0.6, -0.2], [0.6, -0.2], [-0.6, 0.2], [0.6, 0.2]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.03, 0.03, 0.12, 6]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
      ))}
      <Label text={obj.label} position={[0, 0.85, -0.25]} />
    </group>
  )
}

function TV({ obj }: { obj: RoomObject }) {
  const screenRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.2 + Math.sin(Date.now() * 0.002) * 0.3
    }
  })

  return (
    <group position={obj.position}>
      {/* Wall mount */}
      <mesh position={[0, -0.4, 0.02]}>
        <boxGeometry args={[0.1, 0.15, 0.04]} />
        <meshStandardMaterial color="#374151" metalness={0.7} />
      </mesh>
      {/* TV frame */}
      <mesh>
        <boxGeometry args={[1.0, 0.6, 0.04]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.025]}>
        <planeGeometry args={[0.9, 0.52]} />
        <meshStandardMaterial
          color={obj.accentColor ?? "#38bdf8"}
          emissive={obj.accentColor ?? "#38bdf8"}
          emissiveIntensity={1.2}
        />
      </mesh>
      <Label text={obj.label} position={[0, -0.45, 0]} />
    </group>
  )
}

function Vase({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Table/surface under vase */}
      <mesh position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.3, 8]} />
        <meshStandardMaterial color="#d6d3d1" roughness={0.3} />
      </mesh>
      {/* Vase body */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.3, 8]} />
        <meshStandardMaterial color={obj.color} roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Vase neck */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 0.1, 8]} />
        <meshStandardMaterial color={obj.color} roughness={0.2} />
      </mesh>
      {/* Flowers */}
      {[
        { x: 0, y: 0.5, z: 0, color: obj.accentColor ?? "#ec4899" },
        { x: 0.06, y: 0.55, z: 0.03, color: "#f43f5e" },
        { x: -0.05, y: 0.52, z: -0.02, color: "#fb7185" },
      ].map((f, i) => (
        <group key={i}>
          <mesh position={[f.x, f.y - 0.1, f.z]}>
            <cylinderGeometry args={[0.008, 0.008, 0.15, 4]} />
            <meshStandardMaterial color="#16a34a" />
          </mesh>
          <mesh position={[f.x, f.y, f.z]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshStandardMaterial color={f.color} emissive={f.color} emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}
      <Label text={obj.label} position={[0, 0.75, 0]} />
    </group>
  )
}

function CoffeeTable({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Table top */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[0.8, 0.06, 0.5]} />
        <meshStandardMaterial color={obj.color} roughness={0.5} />
      </mesh>
      {/* Lower shelf */}
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.7, 0.04, 0.4]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      {/* Legs */}
      {[[-0.35, -0.2], [0.35, -0.2], [-0.35, 0.2], [0.35, 0.2]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.14, z]}>
          <boxGeometry args={[0.04, 0.28, 0.04]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
      ))}
      {/* Book on table */}
      <mesh position={[-0.15, 0.34, 0]} rotation={[0, 0.2, 0]}>
        <boxGeometry args={[0.2, 0.03, 0.15]} />
        <meshStandardMaterial color="#3b82f6" />
      </mesh>
      {/* Cup on table */}
      <mesh position={[0.2, 0.35, 0.05]}>
        <cylinderGeometry args={[0.04, 0.035, 0.06, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <Label text={obj.label} position={[0, 0.5, 0]} />
    </group>
  )
}

function Rug({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.2, 1.8]} />
        <meshStandardMaterial color={obj.color} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Border pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.8, 0.85, 4]} />
        <meshStandardMaterial color={obj.accentColor ?? "#a78bfa"} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function Bookshelf({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Frame */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[0.7, 1.6, 0.25]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      {/* Shelves */}
      {[0.2, 0.55, 0.9, 1.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]}>
          <boxGeometry args={[0.65, 0.04, 0.2]} />
          <meshStandardMaterial color="#a16207" roughness={0.5} />
        </mesh>
      ))}
      {/* Books */}
      {[
        { pos: [-0.2, 0.35, 0.03], size: [0.1, 0.22, 0.15], color: "#ef4444" },
        { pos: [0, 0.35, 0.03], size: [0.08, 0.22, 0.15], color: "#3b82f6" },
        { pos: [0.15, 0.35, 0.03], size: [0.1, 0.22, 0.15], color: "#22c55e" },
        { pos: [-0.1, 0.7, 0.03], size: [0.12, 0.22, 0.15], color: "#f59e0b" },
        { pos: [0.1, 0.7, 0.03], size: [0.08, 0.22, 0.15], color: "#8b5cf6" },
        { pos: [-0.15, 1.05, 0.03], size: [0.1, 0.22, 0.15], color: "#06b6d4" },
        { pos: [0.05, 1.05, 0.03], size: [0.12, 0.22, 0.15], color: "#ec4899" },
      ].map((book, i) => (
        <mesh key={i} position={book.pos as [number, number, number]}>
          <boxGeometry args={book.size as [number, number, number]} />
          <meshStandardMaterial color={book.color} roughness={0.4} />
        </mesh>
      ))}
      <Label text={obj.label} position={[0, 1.8, 0]} />
    </group>
  )
}

function Lamp({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.04, 8]} />
        <meshStandardMaterial color="#44403c" metalness={0.6} />
      </mesh>
      {/* Pole */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.65, 6]} />
        <meshStandardMaterial color="#78716c" metalness={0.7} />
      </mesh>
      {/* Shade */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.18, 8]} />
        <meshStandardMaterial color="#fef3c7" transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Bulb glow */}
      <mesh position={[0, 0.68, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={3} />
      </mesh>
      <pointLight position={[0, 0.68, 0]} intensity={0.8} color="#fbbf24" distance={3} />
    </group>
  )
}

function Plant({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Pot */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 8]} />
        <meshStandardMaterial color="#92400e" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 8]} />
        <meshStandardMaterial color="#44403c" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={obj.color} roughness={0.6} />
      </mesh>
      <mesh position={[0.08, 0.5, 0.03]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#22c55e" roughness={0.6} />
      </mesh>
      <mesh position={[-0.06, 0.48, -0.02]}>
        <sphereGeometry args={[0.06, 6, 6]} />
        <meshStandardMaterial color="#16a34a" roughness={0.6} />
      </mesh>
    </group>
  )
}

function Frame({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Outer frame */}
      <mesh>
        <boxGeometry args={[0.45, 0.35, 0.03]} />
        <meshStandardMaterial color={obj.color} metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Picture */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.38, 0.28]} />
        <meshStandardMaterial color={obj.accentColor ?? "#6366f1"} />
      </mesh>
    </group>
  )
}

function Desk({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Top */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.9, 0.05, 0.5]} />
        <meshStandardMaterial color={obj.color} roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[[-0.4, -0.2], [0.4, -0.2], [-0.4, 0.2], [0.4, 0.2]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <boxGeometry args={[0.04, 0.4, 0.04]} />
          <meshStandardMaterial color={obj.color} roughness={0.5} />
        </mesh>
      ))}
      <Label text={obj.label} position={[0, 0.55, 0]} />
    </group>
  )
}

function Chair({ obj }: { obj: RoomObject }) {
  const rot = obj.rotation ?? [0, 0, 0]
  return (
    <group position={obj.position} rotation={rot}>
      {/* Seat */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.35]} />
        <meshStandardMaterial color={obj.color} roughness={0.5} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.45, -0.16]}>
        <boxGeometry args={[0.35, 0.4, 0.04]} />
        <meshStandardMaterial color={obj.color} roughness={0.5} />
      </mesh>
      {/* Legs */}
      {[[-0.14, -0.14], [0.14, -0.14], [-0.14, 0.14], [0.14, 0.14]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]}>
          <cylinderGeometry args={[0.015, 0.015, 0.24, 6]} />
          <meshStandardMaterial color="#44403c" />
        </mesh>
      ))}
    </group>
  )
}

function Clock({ obj }: { obj: RoomObject }) {
  const handRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (handRef.current) {
      handRef.current.rotation.z -= 0.01
    }
  })

  return (
    <group position={obj.position}>
      {/* Clock face */}
      <mesh>
        <circleGeometry args={[0.15, 16]} />
        <meshStandardMaterial color={obj.accentColor ?? "#f8fafc"} />
      </mesh>
      {/* Border */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[0.14, 0.16, 16]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
      {/* Hour hand */}
      <mesh ref={handRef} position={[0, 0.04, 0.01]}>
        <boxGeometry args={[0.015, 0.08, 0.01]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
    </group>
  )
}

function Cabinet({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.6, 1.0, 0.35]} />
        <meshStandardMaterial color={obj.color} roughness={0.5} />
      </mesh>
      {/* Doors */}
      <mesh position={[-0.15, 0.5, 0.18]}>
        <boxGeometry args={[0.28, 0.9, 0.02]} />
        <meshStandardMaterial color="#4b5563" roughness={0.4} />
      </mesh>
      <mesh position={[0.15, 0.5, 0.18]}>
        <boxGeometry args={[0.28, 0.9, 0.02]} />
        <meshStandardMaterial color="#4b5563" roughness={0.4} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.02, 0.5, 0.2]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.8} />
      </mesh>
      <mesh position={[0.02, 0.5, 0.2]}>
        <sphereGeometry args={[0.015, 6, 6]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.8} />
      </mesh>
      <Label text={obj.label} position={[0, 1.15, 0]} />
    </group>
  )
}

function Door({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      <mesh castShadow>
        <boxGeometry args={[0.5, 0.9, 0.04]} />
        <meshStandardMaterial color={obj.color} roughness={0.5} />
      </mesh>
      <mesh position={[0.18, 0, 0.03]}>
        <sphereGeometry args={[0.025, 6, 6]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.8} />
      </mesh>
    </group>
  )
}

function Window({ obj }: { obj: RoomObject }) {
  return (
    <group position={obj.position}>
      {/* Frame */}
      <mesh>
        <boxGeometry args={[0.5, 0.4, 0.03]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[0.44, 0.34]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.4} />
      </mesh>
      {/* Cross */}
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[0.44, 0.02, 0.01]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
      <mesh position={[0, 0, 0.025]}>
        <boxGeometry args={[0.02, 0.34, 0.01]} />
        <meshStandardMaterial color={obj.color} />
      </mesh>
    </group>
  )
}

const objectComponents: Record<string, React.ComponentType<{ obj: RoomObject }>> = {
  sofa: Sofa,
  tv: TV,
  vase: Vase,
  coffeeTable: CoffeeTable,
  rug: Rug,
  bookshelf: Bookshelf,
  lamp: Lamp,
  plant: Plant,
  frame: Frame,
  desk: Desk,
  chair: Chair,
  clock: Clock,
  cabinet: Cabinet,
  door: Door,
  window: Window,
}

export default function RoomInterior3D({ objects, isVisible }: RoomInterior3DProps) {
  if (!isVisible || !objects) return null

  return (
    <group>
      {objects.map((obj) => {
        const Component = objectComponents[obj.type]
        if (!Component) return null
        return <Component key={obj.id} obj={obj} />
      })}
    </group>
  )
}
