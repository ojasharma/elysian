'use client';

import React from "react";
import Header from "@/components/Header"; // ✅ Importing Header
import AuthForm from "@/components/AuthForm"; // ✅ Better to move AuthForm too if reusable

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
