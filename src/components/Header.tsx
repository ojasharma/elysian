'use client'; // Required for using state and event listeners

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// --- Types and Data for the Menu ---
type PuzzleOverlayProps = {
  isOpen: boolean;
  gridSize?: number;
};

const menuItems = [
  { name: "HOME", href: "/" },
  { name: "CUSTOM PUZZLES", href: "/custom-puzzles" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

// --- Helper Component for the Puzzle Overlay and Menu ---
const PuzzleOverlay: React.FC<PuzzleOverlayProps> = ({ isOpen, gridSize = 12 }) => {
  // Increased grid size for better coverage
  const numCols = gridSize;
  const numRows = gridSize + 2; // Add extra rows to ensure full coverage
  const totalPieces = numCols * numRows;
  
  const totalMenuItems = menuItems.length;

  return (
    <div
      className={`
        fixed inset-0 z-40 grid overflow-hidden w-full h-full
        ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
      style={{
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      {/* --- Puzzle Piece Background --- */}
      {Array.from({ length: totalPieces }).map((_, i) => {
        const row = Math.floor(i / numCols);
        const col = i % numCols;
        const staggerDelay = (row + col) * 0.02; // Slightly reduced delay for smoother animation
        const closingBaseDelay = 0.15;

        return (
          <div
            key={i}
            className="bg-[#087b08] transition-transform duration-500 ease-in-out w-full h-full"
            style={{
              transitionDelay: `${isOpen ? staggerDelay : closingBaseDelay + staggerDelay}s`,
              transform: isOpen ? 'scale(1)' : 'scale(0)',
              transformOrigin: 'center',
            }}
          ></div>
        );
      })}

      {/* --- Centered Menu List --- */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full">
        <ul className="flex flex-col items-center gap-8 text-center">
          {menuItems.map((item, index) => {
            const openDelay = 0.45 + index * 0.075;
            const closeDelay = (totalMenuItems - 1 - index) * 0.05;

            return (
              <li
                key={item.name}
                className="transition-all duration-300 ease-out"
                style={{
                  transitionDelay: `${isOpen ? openDelay : closeDelay}s`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <Link
                  href={item.href}
                  className="text-gray-100 text-3xl md:text-8xl font-normal tracking-wider relative transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-1 after:bg-gray-100 after:transition-all after:duration-300 md:hover:after:w-full"
                  onClick={(e) => !isOpen && e.preventDefault()}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// --- Main Header Component ---
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="relative z-50 flex justify-between items-center p-4 md:px-10 md:py-5">
        <div className="flex items-center gap-3 md:gap-10">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-12 h-12 rounded-lg"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <div
                className={`w-6 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "bg-gray-100 rotate-45 translate-y-[5px]"
                    : "bg-[#087b08]"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "bg-gray-100 -rotate-45 -translate-y-[5px]"
                    : "bg-[#087b08]"
                }`}
              ></div>
            </div>
          </button>
          <Link href="/" className="cursor-pointer">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={208}
              height={60}
              className="w-28 md:w-52 h-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/account"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg hover:bg-gray-100 transition"
          >
            <Image
              src="/user.png"
              alt="User"
              width={24}
              height={24}
              className="w-6 h-6 md:w-8 md:h-8"
            />
          </Link>
          <Link
            href="/cart"
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg hover:bg-gray-100 transition"
          >
            <Image
              src="/cart.png"
              alt="Cart"
              width={28}
              height={28}
              className="w-7 h-7 md:w-9 md:h-9"
            />
          </Link>
        </div>
      </header>

      <PuzzleOverlay isOpen={isMenuOpen} />
    </>
  );
}