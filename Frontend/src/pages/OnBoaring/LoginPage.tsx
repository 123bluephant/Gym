import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout';
import LoginForm from '../../components/Auth/LoginForm';
import { AuthFormData } from '../../types/auth';
import Lottie from 'lottie-react';
import gymAnimation from '../../assets/gym-animation.json';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/UserAtom';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const setuser = useSetRecoilState(userAtom)

  // Define colors that can be used with Tailwind or inline styles
  const primaryColor = '#D68CE8';
  const primaryDark = '#B56DCE';
  const primaryLight = '#E8B5F2';

  
 const handleLogin = async (data: AuthFormData) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email.trim(),
          password: data.password,
        }),
      });

      const body = await response.json();

      if (response.ok) {
        setuser(body.user)
        localStorage.setItem('user',JSON.stringify(body.user))
        navigate('/onboarding');
      }
      setError(body.message || "Login failed");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Side - Gym Animation */}
      <div 
        className="hidden md:flex md:w-1/2 items-center justify-center p-8"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})` }}
      >
        <div className="max-w-md text-center">
          <Lottie 
            animationData={gymAnimation} 
            loop={true} 
            className="w-full h-64"
          />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome Back to FitLife
          </h2>
          <p className="mt-4 text-white text-opacity-90">
            Sign in to access your personalized workout plans and track your progress
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <AuthLayout
            title="Sign in to your account"
            subtitle="New to our platform? Start your journey today"
          >
            <LoginForm 
              onSubmit={handleLogin} 
              isLoading={isLoading} 
              error={error}
            />    
            {/* Social Login Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.786-1.667-4.166-2.698-6.735-2.698-5.522 0-10 4.477-10 10s4.478 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.201-1.955h-9.799z" />
                  </svg>
                  <span className="ml-2">Google</span>
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>

            {/* Additional Signup Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link 
                  to="/signup" 
                  style={{ color: primaryColor }}
                  className="font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </AuthLayout>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;