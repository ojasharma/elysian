// components/SocialLogins.tsx
import React from "react";
import Image from "next/image";

const SocialLogins: React.FC = () => {
  return (
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
  );
};

export default SocialLogins;