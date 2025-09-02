// src/components/ThreeScene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model } from "@/components/Model";
import React from "react";

export default function ThreeScene({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Text & Button ABOVE Canvas */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto">
        {children}
      </div>

      {/* 3D Canvas BELOW text */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 30 }}
          gl={{ alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={1.5} />
          <Environment preset="sunset" />
          <Model />
        </Canvas>
      </div>
    </>
  );
}
