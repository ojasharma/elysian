// pages/cart.tsx (or your file path)

import Header from "@/components/Header"; // 1. Import the Header

export default function CartPage() {
  return (
    // 2. Wrap in a container to stack elements vertically
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      
      {/* 3. Make the main content area fill the remaining space */}
      <main className="flex-1 flex items-center justify-center ">
        <h1 className="text-2xl font-semibold text-gray-600">
          This is a placeholder for account 🛒
        </h1>
      </main>
    </div>
  );
}