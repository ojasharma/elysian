"use client";
import React from 'react';

// --------------------------------------------------------------------------
// Internal Component to generate the SVG background
// --------------------------------------------------------------------------
function AbstractLines() {
  const numberOfLines = 35;
  const baseLineY = 550;
  const verticalStretch = 350;
  const fanningFactor = 125;
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g>
          {Array.from({ length: numberOfLines }).map((_, index) => {
            const t = index / (numberOfLines - 1);
            const fanningOffset = Math.pow(t, 2.5) * fanningFactor;
            const baseY = baseLineY + fanningOffset;
            const waveAmplitude = verticalStretch * Math.sin(t * Math.PI);
            const wavePeakY = baseY - waveAmplitude;
            
            const pathData = `
              M -100 ${baseY}
              C 440 ${wavePeakY},
                1000 ${wavePeakY},
                1540 ${baseY}
            `;
            
            return (
              <path
                key={index}
                d={pathData}
                // --- CHANGE IS HERE ---
                stroke="#087b08" // Changed from "#D1D5DB"
                strokeWidth="1.5"
                fill="none"
              />
            );
          })}
          
          {/* S-shaped curve */}
          <path
            d="M 100 200 
               C 300 150, 
                 500 250, 
                 700 200
               C 900 150,
                 1100 250,
                 1340 200"
            stroke="#e11d48"
            strokeWidth="2"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

// --------------------------------------------------------------------------
// The Main Page Export
// --------------------------------------------------------------------------
export default function SimpleWaveTestPage() {
  return (
    <main className="relative min-h-screen w-full bg-white">
      <AbstractLines />
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Simple Wave Effect
        </h1>
        <p className="mt-2 text-gray-600">
          A clean and symmetrical wave pattern with S-curve.
        </p>
      </div>
    </main>
  );
}