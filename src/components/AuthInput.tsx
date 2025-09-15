// components/AuthInput.tsx
import React from "react";

// Use all standard HTML input props
type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const AuthInput: React.FC<AuthInputProps> = (props) => {
  return (
    <input
      {...props}
      className="text-black w-full rounded-md border border-gray-300 px-3 py-2 placeholder:text-gray-500 focus:border-[#087b08] focus:ring-1 focus:ring-[#087b08]"
    />
  );
};

export default AuthInput;