'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// --- MENU ITEMS ---
const menuItems = [
  { name: "HOME", href: "/" },
  { name: "PUZZLES FOR HER/HIM", href: "/custom-puzzles" },
  { name: "FAMILY PUZZLES", href: "/family-puzzles" },
  { name: "KIDS PUZZLES", href: "/kid-puzzles" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT US", href: "/contact" },
];

// --- PUZZLE OVERLAY ---
type PuzzleOverlayProps = {
  isOpen: boolean;
  gridSize?: number;
};

const PuzzleOverlay: React.FC<PuzzleOverlayProps> = ({ isOpen, gridSize = 12 }) => {
  const numCols = gridSize;
  const numRows = gridSize + 2;
  const totalPieces = numCols * numRows;
  const totalMenuItems = menuItems.length;

  return (
    <div
      className={`
        fixed inset-0 z-40 grid overflow-hidden w-full h-full
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      style={{
        gridTemplateColumns: `repeat(${numCols}, 1fr)`,
        gridTemplateRows: `repeat(${numRows}, 1fr)`,
      }}
    >
      {Array.from({ length: totalPieces }).map((_, i) => {
        const row = Math.floor(i / numCols);
        const col = i % numCols;
        const staggerDelay = (row + col) * 0.02;
        const closingBaseDelay = 0.15;

        return (
          <div
            key={i}
            className="bg-[#087b08] transition-transform duration-500 ease-in-out w-full h-full"
            style={{
              transitionDelay: `${
                isOpen ? staggerDelay : closingBaseDelay + staggerDelay
              }s`,
              transform: isOpen ? "scale(1)" : "scale(0)",
              transformOrigin: "center",
            }}
          ></div>
        );
      })}

      <div className="absolute inset-0 flex items-center justify-center">
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
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <Link
                  href={item.href}
                  className="text-gray-100 text-3xl md:text-8xl tracking-wider relative transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-1 after:bg-gray-100 after:transition-all after:duration-300 md:hover:after:w-full"
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

// --- HEADER ---
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className="relative z-50 flex justify-between items-center p-4 md:px-10 md:py-5 ">
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
};

// --- AUTH FORM ---
const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Submitting as ${isLogin ? "Login" : "Sign Up"}`);
  };

  return (
    <div className="flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Or " : ""}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#087b08] hover:text-[#065c06]"
            >
              {isLogin ? "create an account" : "sign in to your account"}
            </button>
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              required
              className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
            />

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-[#087b08] hover:text-[#065c06]">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-[#087b08] py-2 px-4 font-semibold text-white transition-colors hover:bg-[#065c06]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative flex items-center">
              <div className="w-full border-t border-gray-300" />
              <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
                Or continue with
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center rounded-md border bg-gray-100 py-2 px-4 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200">
                <Image src="/google.png" alt="Google logo" width={20} height={20} />
                <span className="ml-2">Google</span>
              </button>
              <button className="flex items-center justify-center rounded-md border bg-gray-100 py-2 px-4 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200">
                 <Image src="/facebook.png" alt="Facebook logo" width={20} height={20} />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PAGE ---
export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex items-center justify-center py-12">
        <AuthForm />
      </div>
    </div>
  );
}