import React from "react";

export default function Ribbon() {
  const ribbonText = (
    <>
      🔥 Get Special Discount of <strong className="font-bold">30% OFF!</strong> 🔥 Use Code:{" "}
      <em className="italic">✨ELYSAVE✨</em>
    </>
  );

  // Repeat the JSX content 5 times to create a long block
  const repeatedTexts = Array(5).fill(ribbonText);

  const keyframes = `
    @keyframes scroll {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-50%);
      }
    }
  `;

  // A small helper component to render our long block of text
  const ContentBlock = () => (
    <div className="flex-shrink-0 flex items-center">
      {repeatedTexts.map((text, index) => (
        <span
          key={index}
          className="mx-4 text-lg font-medium" // changed from font-semibold → font-medium
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <>
      {/* Import Inter font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          ${keyframes}
        `}
      </style>

      <div className="bg-[#087b08] text-black py-0 w-full overflow-hidden flex whitespace-nowrap">
        <div
          className="flex"
          style={{ animation: "scroll 40s linear infinite" }}
        >
          {/* Render long block twice for seamless loop */}
          <ContentBlock />
          <ContentBlock />
        </div>
      </div>
    </>
  );
}
