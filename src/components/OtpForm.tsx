// components/OtpForm.tsx
import React from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface OtpFormProps {
  email: string;
  otp: string;
  setOtp: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  onVerify: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({
  email, otp, setOtp, isLoading, error, success, onVerify, onBack
}) => {
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
          <form className="space-y-6" onSubmit={onVerify}>
            <AuthInput
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              required
              maxLength={6}
            />
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <AuthButton type="submit" isLoading={isLoading} loadingText="Verifying...">
              Verify Account
            </AuthButton>

            <p className="text-center text-sm">
              <button type="button" onClick={onBack} className="text-[#087b08] hover:underline">
                Back to Sign Up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;