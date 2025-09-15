'use client';

import React from "react";
import Header from "@/components/Header";
import AuthForm from "@/components/AuthForm";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-grow items-center justify-center p-4">
        {/* ✅ Increased the bottom margin again */}
        <div className="mb-64">
          <AuthForm />
        </div>
      </main>
    </div>
  );
}