// components/LoginForm.tsx
import React from "react";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  isLoading: boolean;
  error: string | null;
  success: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email, setEmail, password, setPassword,
  isLoading, error, success, onSubmit
}) => {
  return (
    <form className="space-y-6" onSubmit={onSubmit}>
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
        placeholder="Password"
        required
      />

      <div className="text-right">
        <a href="#" className="text-sm text-[#087b08] hover:text-[#065c06]">
          Forgot password?
        </a>
      </div>
      
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <AuthButton type="submit" isLoading={isLoading} loadingText="Signing In...">
        Sign In
      </AuthButton>
    </form>
  );
};

export default LoginForm;