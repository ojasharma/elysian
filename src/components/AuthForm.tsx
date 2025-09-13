'use client';

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import for redirection

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  // UI feedback state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
  };

  // --- Main Form Submission (Login / Signup) ---
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (isLogin) {
      // --- Login Logic ---
      console.log("Submitting as Login");
      setError("Login functionality is not yet implemented.");
      setIsLoading(false);
    } else {
      // --- Sign Up Logic ---
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }
        
        setSuccess(data.message);
        setShowOtpInput(true); // Switch to OTP view on success

      } catch (err) {
        // ✅ FIX: Properly handle the error type
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // --- OTP Verification Submission ---
  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'OTP verification failed.');
      }

      setSuccess(data.message);
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 2000);

    } catch (err) {
      // ✅ FIX: Properly handle the error type
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during OTP verification.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  // --- Render OTP Verification Form ---
  if (showOtpInput) {
    return (
       <div className="flex items-center justify-center p-4 font-inter">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
                <p className="mt-2 text-sm text-gray-600">
                    An OTP has been sent to <strong>{email}</strong>
                </p>
            </div>
             <div className="rounded-lg bg-white p-8 shadow-lg">
                <form className="space-y-6" onSubmit={handleVerifyOtp}>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 6-digit OTP"
                        required
                        className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
                    />
                    {/* Feedback Messages */}
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    {success && <p className="text-sm text-green-600">{success}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-[#087b08] py-2 px-4 font-semibold text-white transition-colors hover:bg-[#065c06] disabled:bg-gray-400"
                    >
                        {isLoading ? "Verifying..." : "Verify Account"}
                    </button>
                </form>
            </div>
        </div>
       </div>
    );
  }

  // --- Render Main Login/Signup Form ---
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
              onClick={handleToggleForm}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
                className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "Password" : "Create Password"}
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
            
            {/* Feedback Messages */}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-[#087b08] py-2 px-4 font-semibold text-white transition-colors hover:bg-[#065c06] disabled:bg-gray-400"
            >
              {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            </button>
          </form>

          {/* Social Logins */}
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