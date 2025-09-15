'use client';

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; 
import { signIn } from 'next-auth/react'; 

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import OtpForm from "./OtpForm";
import SocialLogins from "./SocialLogins";

const AuthForm: React.FC = () => {
  // All your existing state and logic is correct and stays the same
  const [isLogin, setIsLogin] = useState(true);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const router = useRouter(); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // All your handler functions are also correct and stay the same
  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setError(null);
    setSuccess(null);
    setShowOtpInput(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (isLogin) {
      try {
        const result = await signIn('credentials', {
          redirect: false,
          email: email,
          password: password,
        });

        if (result?.error) setError(result.error);
        else if (result?.ok) router.push('/test');
        
      } catch (err) {
        setError("An unexpected error occurred during login.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setShowOtpInput(true);
      setIsLoading(false); 

      try {
        const response = await fetch('/api/user/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Sign up failed.');
      } catch (err) {
        setShowOtpInput(false);
        if (err instanceof Error) setError(err.message);
        else setError('An unexpected error occurred during signup.');
      }
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    let verificationSucceeded = false;
    try {
      const response = await fetch('/api/user/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed.');

      verificationSucceeded = true;
      setSuccess(data.message);
      
      setTimeout(() => { window.location.reload(); }, 2000);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('An unexpected error occurred during OTP verification.');
    } finally {
      if (!verificationSucceeded) setIsLoading(false);
    }
  };


  if (showOtpInput) {
    return (
      <OtpForm
        email={email}
        otp={otp}
        setOtp={setOtp}
        isLoading={isLoading}
        error={error}
        success={success}
        onVerify={handleVerifyOtp}
        onBack={handleToggleForm}
      />
    );
  }

  // ✅ THIS IS THE FIX. No more flex, no more min-h-screen.
  // The component simply renders the form in a simple container.
  return (
    <div className="w-full max-w-md font-inter">
      <div className="rounded-lg bg-white p-8 shadow-lg space-y-6">
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

        {isLogin ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            error={error}
            success={success}
            onSubmit={handleSubmit}
          />
        ) : (
          <SignUpForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
            error={error}
            success={success}
            onSubmit={handleSubmit}
          />
        )}

        <SocialLogins />
      </div>
    </div>
  );
};

export default AuthForm;