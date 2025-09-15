// components/AuthButton.tsx
import React from "react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  isLoading,
  loadingText = "Processing...",
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className="w-full rounded-md bg-[#087b08] py-2 px-4 font-semibold text-white transition-colors hover:bg-[#065c06] disabled:bg-gray-400"
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default AuthButton;