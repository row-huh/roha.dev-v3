"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type * as THREE from "three"

function FloatingCube({
  position,
  scale,
  color,
}: { position: [number, number, number]; scale: number; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transparent
        opacity={0.8}
        roughness={0.1}
        metalness={0.5}
      />
    </mesh>
  )
}

function GlazingLight() {
  const lightRef = useRef<THREE.SpotLight>(null)

  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 5
    }
  })

  return (
    <>
      <spotLight
        ref={lightRef}
        position={[5, 5, 5]}
        angle={0.6}
        penumbra={1}
        intensity={2}
        color="#8b5cf6"
        castShadow
      />
      <spotLight position={[-5, 5, -5]} angle={0.6} penumbra={1} intensity={1.5} color="#ec4899" />
      <ambientLight intensity={0.2} />
    </>
  )
}

export default function AnimatedCuboids() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="w-full h-full">
      <GlazingLight />

      {/* Multiple floating cuboids */}
      <FloatingCube position={[0, 0, 0]} scale={1.2} color="#8b5cf6" />
      <FloatingCube position={[-3, -1, -2]} scale={0.8} color="#ec4899" />
      <FloatingCube position={[3, 1, -1]} scale={0.6} color="#3b82f6" />
      <FloatingCube position={[-1, 2, 1]} scale={0.4} color="#8b5cf6" />
      <FloatingCube position={[2, -2, 2]} scale={0.5} color="#ec4899" />
      <FloatingCube position={[0, -3, -3]} scale={0.7} color="#3b82f6" />

      {/* Wireframe cubes for depth */}
      <mesh position={[4, 0, -4]} scale={1.5}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe opacity={0.3} transparent />
      </mesh>

      <mesh position={[-4, 1, -5]} scale={1.2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#ec4899" wireframe opacity={0.2} transparent />
      </mesh>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}
