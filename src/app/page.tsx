// app/page.tsx
import HeroText from "@/components/herotext";
import ThreeScene from "@/components/ThreeScene"; // Import the new component

export default function Page() {
  return (
    <div className="bg-gray-100 w-screen h-screen m-0 p-0 flex flex-col">
      <header className="flex justify-between items-center p-4 md:px-10 md:py-5">
        {/* Logo on the left */}
        <img
          src="/logo.svg"
          alt="Logo"
          className="w-32 md:w-52 h-auto"
        />

        {/* User and Cart on the right */}
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

      {/* This main area will contain the 3D scene and the text */}
      {/* 'relative' is crucial for positioning the scene correctly inside it */}
      <main className="relative flex-1">
        <ThreeScene>
          <HeroText />
        </ThreeScene>
      </main>

    </div>
  );
}