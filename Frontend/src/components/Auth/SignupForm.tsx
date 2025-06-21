import React from 'react';
import Input from '../Ui/Input';
import Button from '../Ui/Button';

interface SignupFormProps {
  values: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    fullName?: string;
    acceptTerms?: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error?: string;
  primaryColor: string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  values,
  onChange,
  onSubmit,
  isLoading,
  error,
  primaryColor
}) => {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      <Input
        label="Username"
        name="username"
        value={values.username}
        onChange={onChange}
        autoComplete="username"
        required
        minLength={3}
      />

      <Input
        label="Full Name"
        name="fullName"
        value={values.fullName || ''}
        onChange={onChange}
        autoComplete="name"
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={onChange}
        autoComplete="email"
        required
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={onChange}
        autoComplete="new-password"
        required
        minLength={6}
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={onChange}
        autoComplete="new-password"
        required
      />

      <div className="flex items-center mb-4">
        <input
          id="accept-terms"
          name="acceptTerms"
          type="checkbox"
          checked={values.acceptTerms || false}
          onChange={onChange}
          className="h-4 w-4 rounded border-gray-300 focus:ring-2"
          style={{ 
            borderColor: primaryColor,
            color: primaryColor,
          }}
          required
        />
        <label htmlFor="accept-terms" className="ml-2 text-sm text-gray-700">
          I agree to the <a href="#" className="font-medium" style={{ color: primaryColor }}>Terms and Conditions</a>
        </label>
      </div>
      <Button
        type="submit"
        className="w-full"
        style={{ backgroundColor: primaryColor }}
        isLoading={isLoading}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignupForm;