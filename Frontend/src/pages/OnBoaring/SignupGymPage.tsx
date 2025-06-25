import React, { useState } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";
import SignupForm from "../../components/Auth/SignupForm";
import { SignupFormData } from "../../types/auth";
import Lottie from "lottie-react";
import gymAnimation from "../../assets/signup-animation.json";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/UserAtom";

const SignupGymPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
    dob: "",
    acceptTerms: false,
    role: "user",
  });

  const primaryColor = "#D68CE8";
  const primaryDark = "#B56DCE";

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? e.target.checked : value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/user/register/gym_owner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const body = await response.json();
      if (response.ok) {
        setUser(body.user);
        localStorage.setItem("user", JSON.stringify(body.user));
        navigate("/");
        return;
      }

      setError(body.message || "Something went wrong. Please try again.");
    } catch (err: any) {
      setError(err.message || "Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div
        className="hidden md:flex md:w-1/2 items-center justify-center p-8"
        style={{
          background: `linear-gradient(135deg, ${primaryColor}, ${primaryDark})`,
        }}
      >
        <div className="max-w-md text-center">
          <Lottie animationData={gymAnimation} loop className="w-full h-64" />
          <h2 className="mt-6 text-3xl font-bold text-white">Join Our Community</h2>
          <p className="mt-4 text-white text-opacity-90">
            Start your fitness transformation today
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <AuthLayout title="Create Account" subtitle="Start your journey">
            <SignupForm
              values={formData}
              onChange={handleInputChange}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              error={error}
              primaryColor={primaryColor}
            />
          </AuthLayout>
        </div>
      </div>
    </div>
  );
};

export default SignupGymPage;
