import React from 'react';

export default function CurvedLinesPattern() {
  // Generate S-shaped curves with more spacing
  const generateSCurve = (index : number, total : number) => {
    const intensity = (index + 1) * 10; // Increased spacing between curves
    
    const startX = -200;
    const startY = 100;
    const endX = 1800;
    const endY = 400;
    
    // S-curve control points with more spacing
    const control1X = 80;
    const control1Y =  -startX ;
    const control2X = 80;
    const control2Y = -intensity;
    
    return `M ${startX} ${startY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
  };

  const totalLines = 15; // Reduced number of lines for better spacing

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <svg 
        width="100%"
    height="100%"
    viewBox="0 0 800 600"
    className="w-full h-full max-w-none"
      >
        {/* S-shaped curves */}
        {Array.from({ length: totalLines }, (_, index) => (
          <path
            key={`s-curve-${index}`}
            d={generateSCurve(index, totalLines)}
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