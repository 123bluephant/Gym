import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';


const OnboardingStep1: React.FC<any> = ({ data, updateData, nextStep, userName }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isInitialized, setIsInitialized] = useState(false);

  // Auto-fill name if userName is available and name isn't set yet
  useEffect(() => {
    if (userName && !data.fullName && !isInitialized) {
      updateData({ fullName: userName });
      setIsInitialized(true);
    }
  }, [userName, data.fullName, isInitialized, updateData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!data.age) newErrors.age = 'Age is required';
    else if (data.age < 12 || data.age > 100) newErrors.age = 'Age must be between 12 and 100';
    if (!data.gender) newErrors.gender = 'Gender is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
          <User className="h-6 w-6 text-indigo-600" />
        </div>
        <h2 className="mt-3 text-xl font-semibold text-gray-900">Basic Information</h2>
        <p className="mt-1 text-sm text-gray-500">Let's start with some basic details about you</p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="fullName"
              type="text"
              value={data.fullName || ''}
              onChange={(e) => updateData({ fullName: e.target.value })}
              className={`block w-full rounded-md ${errors.fullName ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm p-2 border`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-2 text-sm text-red-600" id="fullName-error">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                id="age"
                type="number"
                min="12"
                max="100"
                value={data.age || ''}
                onChange={(e) => updateData({ age: parseInt(e.target.value) || undefined })}
                className={`block w-full rounded-md ${errors.age ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm p-2 border`}
                placeholder="Your age"
              />
            </div>
            {errors.age && (
              <p className="mt-2 text-sm text-red-600" id="age-error">
                {errors.age}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <select
                id="gender"
                value={data.gender || ''}
                onChange={(e) => updateData({ gender: e.target.value })}
                className={`block w-full rounded-md ${errors.gender ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'} shadow-sm p-2 border`}
              >
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-600" id="gender-error">
                {errors.gender}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Continue
            <svg className="ml-2 -mr-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingStep1;