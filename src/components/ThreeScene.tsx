// src/components/ThreeScene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "@/components/Model"; // Make sure the path to your model is correct
import React from 'react';

// This component now takes children (like your HeroText) and renders them behind the 3D canvas
export default function ThreeScene({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Position the children (HeroText) behind the 3D model */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {children}
      </div>

      {/* Position the Canvas on top with a transparent background */}
      <div className="absolute inset-0 z-10">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 30 }}
          gl={{ alpha: true }} // Enable transparency
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1.5} />
          <Environment preset="sunset" />
          <Model />
     
        </Canvas>
      </div>
    </>
  );
}