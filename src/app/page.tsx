// app/page.tsx

import HeroText from "@/components/herotext";
import ThreeScene from "@/components/ThreeScene";
import Ribbon from "@/components/tape";
import CurvedLinesPattern from "@/components/CurvedLinesPattern";

export default function Page() {
  return (
    // This parent div allows the page to be scrollable
    <div className="bg-gray-100 h-[200vh]">
      
      {/* This div contains all the content for the first screen */}
      <div className="w-screen h-[100vh] m-0 p-0 flex flex-col">
        <header className="flex justify-between items-center p-4 md:px-10 md:py-5">
          <img
            src="/logo.svg"
            alt="Logo"
            className="w-32 md:w-52 h-auto"
          />
          <div className="flex items-center gap-6 md:gap-5">
            <img
              src="/user.png"
              alt="User"
              className="w-6 h-6 md:w-9 md:h-9"
            />
            <img
              src="/cart.png"
              alt="Cart"
              className="w-7 h-7 md:w-10 md:h-10"
            />
          </div>
        </header>

        <Ribbon />

        <main className="relative flex-1 -mt-70 md:-mt-20">
          <ThreeScene>
            <HeroText />
          </ThreeScene>
        </main>
      </div>

      <div className="absolute inset-x-0 z-0 top-[20vh] md:top-[75vh]">
  <CurvedLinesPattern />
</div>




    </div>
  );
}