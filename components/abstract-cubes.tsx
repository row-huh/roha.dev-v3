"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Box, OrbitControls, Environment } from "@react-three/drei"
import { useRef } from "react"
import type { Mesh } from "three"

function AnimatedBox() {
  const meshRef = useRef<Mesh>(null!)
  const speed = Math.random() * 0.5 + 0.1 // Random speed for each box

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed
      meshRef.current.rotation.y += 0.005 * speed
      meshRef.current.rotation.z += 0.005 * speed
    }
  })

  return (
    <Box args={[1, 1, 1]} ref={meshRef}>
      <meshStandardMaterial color="#8a2be2" roughness={0.5} metalness={0.8} />
    </Box>
  )
}

export default function AbstractCubes() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Environment preset="warehouse" /> {/* Provides realistic lighting */}
      {/* Render multiple animated boxes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <AnimatedBox key={i} />
      ))}
      {/* Add a subtle light source that moves to create glazing effect */}
      <MovingLight />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}

function MovingLight() {
  const lightRef = useRef<any>(null!)
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime()
      lightRef.current.position.x = Math.sin(t * 0.5) * 5
      lightRef.current.position.y = Math.cos(t * 0.5) * 5
      lightRef.current.position.z = Math.sin(t * 0.7) * 3 + 2
    }
  })
  return <pointLight ref={lightRef} intensity={2} color="#a78bfa" />
}
