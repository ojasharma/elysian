"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "@/components/Model";
import HeroText from "@/components/herotext";

export default function Home() {
  return (
    <main className="relative w-screen h-screen">
      {/* Position the HeroText component behind the 3D model */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <HeroText />
      </div>

      {/* Position the Canvas on top with a transparent background */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          camera={{ position: [0, 0, 15], fov: 30 }}
          gl={{ alpha: true }} // Enable transparency
          style={{ background: 'transparent' }}
        >
          {/* Adds soft, general lighting to the whole scene */}
          <ambientLight intensity={1.5} />

          {/* This adds a realistic lighting environment */}
          <Environment preset="sunset" />
          
          {/* Your 3D model component */}
          <Model />

          {/* Allows you to rotate the model, but not zoom */}
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </main>
  );
}