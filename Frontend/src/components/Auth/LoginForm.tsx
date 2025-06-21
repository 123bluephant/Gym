import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormData } from '../../types/auth';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onSubmit: (data: AuthFormData) => void;
  isLoading?: boolean;
  error?: string;
  primaryColor?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading, 
  error,
  primaryColor = '#D68CE8' 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid },
    watch
  } = useForm<AuthFormData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  });
  return (
    <form 
      className="space-y-6" 
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e).catch(err => {
          console.error('Form submission error:', err);
        });
      }}
    >
      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
          }
        })}
      />

      <Input
        label="Password"
        type="password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            {...register('rememberMe')}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link 
            to="/forgot-password" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <Button
          type="submit"
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;