'use client';

import React, { useState } from "react";
import Image from "next/image";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Submitting as ${isLogin ? "Login" : "Sign Up"}`);
  };

  return (
    <div className="flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Or " : ""}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#087b08] hover:text-[#065c06]"
            >
              {isLogin ? "create an account" : "sign in to your account"}
            </button>
          </p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name field only for Sign Up */}
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                required
                className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
              />
            )}

            <input
              type="email"
              placeholder="Email"
              required
              className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
            />

            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-[#087b08] hover:text-[#065c06]">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-[#087b08] py-2 px-4 font-semibold text-white transition-colors hover:bg-[#065c06]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

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
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
