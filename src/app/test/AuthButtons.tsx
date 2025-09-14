// app/test/AuthButtons.tsx
"use client";

import { signIn, signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
    >
      Sign Out
    </button>
  );
}

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()} // Automatically redirects to your signIn page
      className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
    >
      Sign In
    </button>
  );
}