// components/SignUpForm.tsx
import React from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface SignUpFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  name, setName, email, setEmail, password, setPassword,
  isLoading, error, success, onSubmit
}) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <AuthInput
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <AuthInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <AuthInput
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Create Password"
        required
      />
      
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <AuthButton type="submit" isLoading={isLoading} loadingText="Creating...">
        Create Account
      </AuthButton>
    </form>
  );
};

export default SignUpForm;