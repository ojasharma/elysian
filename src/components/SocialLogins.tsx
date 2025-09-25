'use client'; // ✅ Make it a client component

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react"; // ✅ Import the signIn function

const SocialLogins: React.FC = () => {
  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    signIn(provider, {
      callbackUrl: '/test' // Redirect to this page after successful login
    });
  };

  return (
    <div className="mt-6">
      <div className="relative flex items-center">
        <div className="w-full border-t border-gray-300" />
        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-sm text-gray-500">
          Or continue with
        </span>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {/* ✅ Add onClick handler for Google */}
        <button
          onClick={() => handleSocialLogin('google')}
          className="flex items-center justify-center rounded-md border bg-gray-100 py-2 px-4 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
        >
          <Image src="/google.png" alt="Google logo" width={20} height={20} />
          <span className="ml-2">Google</span>
        </button>
        {/* ✅ Add onClick handler for Facebook */}
        <button
          onClick={() => handleSocialLogin('facebook')}
          className="flex items-center justify-center rounded-md border bg-gray-100 py-2 px-4 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
        >
          <Image src="/facebook.png" alt="Facebook logo" width={20} height={20} />
          <span className="ml-2">Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogins;