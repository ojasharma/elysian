'use client';

import React from 'react';
import Image from 'next/image';

const PuzzleButton: React.FC = () => {
  return (
    <button
      className="
        group
        relative
        inline-flex items-center justify-center
        h-10 px-5 text-sm /* Smaller default for mobile */
        sm:h-14 sm:px-8 sm:text-base /* Larger on bigger screens */
        font-semibold
        text-[#087b08]
        rounded-full
        overflow-hidden
        transition-all duration-300 ease-out
        hover:shadow-xl
        border-none
        focus:outline-none focus:ring-2 focus:ring-[#087b08] focus:ring-opacity-50
      "
    >
      {/* Background/Stroke Layer */}
      <span
        aria-hidden="true"
        className="
          absolute inset-0
          rounded-full
          border-2 border-[#087b08]
          transition-all duration-500 ease-out
          group-hover:bg-[#087b08]
        "
      ></span>

      {/* Puzzle Piece Icon */}
      <Image
        src="/puzzlepiece.png"
        alt=""
        width={32}
        height={32}
        className="
          absolute left-0 top-1/2
          h-5 w-5 sm:h-7 sm:w-7 /* Smaller on mobile */
          -translate-y-1/2 -translate-x-full
          scale-75 opacity-0
          transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          group-hover:translate-x-3 group-hover:opacity-100 group-hover:scale-100
        "
        aria-hidden="true"
      />

      {/* Text + Arrow */}
      <span
        className="
          relative flex items-center gap-1 sm:gap-2
          transition-all duration-300 ease-out delay-100
          group-hover:translate-x-4 group-hover:text-white
        "
      >
        <span>Shop Now</span> {/* shorter for mobile look */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5" /* smaller on mobile */
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </span>
    </button>
  );
};

export default PuzzleButton;
