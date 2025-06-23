// SignupPage.tsx
import React, { useState } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";
import SignupForm from "../../components/Auth/SignupForm";
import { SignupFormData } from "../../types/auth";
import Lottie from "lottie-react";
import gymAnimation from "../../assets/signup-animation.json";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import userAtom from "../../atoms/UserAtom";

const SignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [step, setStep] = useState<number>(1);
  const setUser = useSetRecoilState(userAtom);
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
    weight: 0,
    height: 0,
    dob: "",
    location: "",
    fitnessGoals: [],
    acceptTerms: false,
    role: "user", // default role
  });


  const primaryColor = "#D68CE8";
  const primaryDark = "#B56DCE";
  const primaryLight = "#E8B5F2";
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && type === "checkbox";

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? e.target.checked : value,
    }));
  };

  const handleCheckboxChange = (
    name: keyof SignupFormData,
    value: string,
    isChecked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: isChecked
        ? [...(prev[name] as string[]), value]
        : (prev[name] as string[]).filter((item) => item !== value),
    }));
  };

  const handleFormPartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError("Please fill all required fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!formData.acceptTerms) {
        setError("You must accept the terms");
        return;
      }
    }
    setStep((prev) => prev + 1);
    setError(undefined);
  };

  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const body = await response.json();
      if (response.ok) {
        setUser(body.user);
        localStorage.setItem("user", JSON.stringify(body.user));
        navigate("/dashboard");
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
          <h2 className="mt-6 text-3xl font-bold text-white">
            {step === 1
              ? "Join Our Community"
              : step === 2
                ? "Personalize Your Journey"
                : "Complete Your Profile"}
          </h2>
          <p className="mt-4 text-white text-opacity-90">
            {step === 1
              ? "Start your fitness transformation today"
              : step === 2
                ? "Help us create your perfect workout plan"
                : "Review your preferences and get started"}
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-2 w-8 rounded-full ${i <= step ? "bg-white" : "bg-white bg-opacity-30"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <AuthLayout
            title={
              step === 1
                ? "Create Account"
                : step === 2
                  ? "Your Preferences"
                  : "Membership Options"
            }
            subtitle={step < 3 ? `Step ${step} of 3` : "Final details"}
          >
            {/* Step 1 */}
            {step === 1 && (
              <SignupForm
                values={formData}
                onChange={handleInputChange}
                onSubmit={handleFormPartSubmit}
                isLoading={isLoading}
                error={error}
                primaryColor={primaryColor}
              />
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location (Nearest Branch)*
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200"
                    style={{ borderColor: primaryLight }}
                  >
                    <option value="" disabled>
                      Select your nearest branch
                    </option>
                    <option value="downtown">Downtown Fitness</option>
                    <option value="midtown">Midtown Gym</option>
                    <option value="uptown">Uptown Wellness</option>
                    <option value="suburbs">Suburban Fitness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Fitness Goals*
                  </label>
                  <div className="space-y-2">
                    {[
                      "Weight Loss",
                      "Muscle Building",
                      "General Fitness",
                      "Athletic Training",
                      "Rehabilitation",
                    ].map((goal) => {
                      const goalValue = goal.toLowerCase().replace(/ /g, "_");
                      return (
                        <label key={goal} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.fitnessGoals.includes(goalValue)}
                            onChange={(e) =>
                              handleCheckboxChange(
                                "fitnessGoals",
                                goalValue,
                                e.target.checked
                              )
                            }
                            className="h-4 w-4 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">{goal}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev + 1)}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                    disabled={
                      !formData.location || formData.fitnessGoals.length === 0
                    }
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div className="space-y-6">
                {/* GENDER SELECTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender*
                  </label>
                  <div className="flex space-x-4">
                    {["male", "female"].map((genderOption) => (
                      <label key={genderOption} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={genderOption}
                          checked={formData.gender === genderOption}
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {genderOption}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Optional fields (age, height, weight) */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      max={new Date().toISOString().split("T")[0]} // disallow future dates
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight || ""}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registering As*
                  </label>
                  <div className="space-y-2">
                    {["user", "gym_owner", "admin"].map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value={option}
                          checked={formData.role === option}
                          onChange={handleInputChange}
                          className="h-4 w-4 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700 capitalize">
                          {option.replace("_", " ")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="pt-4 space-y-4">
                  <button
                    type="button"
                    onClick={() => setStep((prev) => prev - 1)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="w-full px-4 py-2 rounded-md text-sm font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                    disabled={isLoading || !formData.gender}
                  >
                    {isLoading ? "Processing..." : "Complete Registration"}
                  </button>
                  {error && (
                    <div className="text-red-500 text-sm text-center mt-2">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            )}
          </AuthLayout>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
