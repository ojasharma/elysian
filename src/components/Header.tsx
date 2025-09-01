// src/components/Header.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 md:px-10 md:py-5">
      {/* Logo on the left */}
      <Link href="/" className="cursor-pointer">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={208}
          height={60}
          className="w-32 md:w-52 h-auto"
          priority
        />
      </Link>

      {/* User and Cart on the right */}
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
  );
}
