// app/page.tsx

import HeroText from "@/components/herotext";
import ThreeScene from "@/components/ThreeScene";
import Ribbon from "@/components/tape";
import CurvedLinesPattern from "@/components/CurvedLinesPattern";
import Header from "@/components/Header";

export default function Page() {
  return (
    <div className="bg-gray-100 h-[200vh] relative">
      <div className="relative w-screen h-[100vh] m-0 p-0 flex flex-col">
        {/* Ensure header is always on top */}
        <div className="relative z-50">
          <Header />
        </div>

        <Ribbon />

        <main className="relative flex-1 -mt-70 md:-mt-20 z-10">
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
