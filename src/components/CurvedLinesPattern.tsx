// src/components/CurvedLinesPattern.tsx

import React from 'react';

export default function CurvedLinesPattern() {
  // ✅ FIX: The unused 'total' parameter is removed
  const generateSCurve = (index: number) => {
    const intensity = (index + 1) * 10;

    const startX = -200;
    const startY = 100;
    const endX = 1800;
    const endY = 400;

    const control1X = 80;
    const control1Y = -startX;
    const control2X = 80;
    const control2Y = -intensity;

    return `M ${startX} ${startY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
  };

  const totalLines = 15;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        className="w-full h-full max-w-none"
      >
        {Array.from({ length: totalLines }, (_, index) => (
          <path
            key={`s-curve-${index}`}
            d={generateSCurve(index)}
            fill="none"
            stroke="#087b08"
            strokeWidth="1.6"
            opacity={0.7}
          />
        ))}
      </svg>
    </div>
  );
}