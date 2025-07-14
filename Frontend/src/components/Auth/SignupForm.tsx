import React from 'react';
import Input from '../Ui/Input';
import Button from '../Ui/Button';

interface SignupFormProps {
  values: {
    dob: string;
    gender: string;
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gender*
        </label>
        <div className="grid grid-cols-2 gap-4">
          {["male", "female"].map((genderOption) => {
            const isSelected = values.gender === genderOption;
            return (
              <label
                key={genderOption}
                className={`flex items-center justify-center border px-4 py-3 rounded-lg cursor-pointer transition-all
            ${isSelected
                    ? "border-purple-600 bg-purple-100 text-purple-800 font-semibold"
                    : "border-gray-300 bg-white text-gray-700 hover:border-purple-300"
                  }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={genderOption}
                  checked={isSelected}
                  onChange={onChange}
                  className="hidden"
                />
                <span className="capitalize">{genderOption}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          value={values.dob}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          max={new Date().toISOString().split("T")[0]}
        />
      </div>
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