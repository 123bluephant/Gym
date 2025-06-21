
import React, { useState } from 'react';
import { UserProfileData } from '../../pages/OnBoaring/OnboardingPage';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

interface Step3Props {
  data: Partial<UserProfileData>;
  updateData: (data: Partial<UserProfileData>) => void;
  prevStep: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const OnboardingStep3: React.FC<Step3Props> = ({ data, updateData, prevStep, onSubmit, isLoading }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleDay = (day: string) => {
    const currentDays = data.availability || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d: string) => d !== day)
      : [...currentDays, day];
    
    updateData({ availability: newDays });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.availability || data.availability.length === 0) {
      newErrors.availability = 'Select at least one day';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Workout Availability</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          When are you typically available to workout? (Select all that apply)
        </label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {daysOfWeek.map(day => (
            <label key={day} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={data.availability?.includes(day) || false}
                onChange={() => toggleDay(day)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
        {errors.availability && <p className="mt-1 text-sm text-red-600">{errors.availability}</p>}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-lg font-medium">Review Your Information</h3>
        <div className="mt-2 bg-gray-50 p-4 rounded-md">
          <p><span className="font-medium">Name:</span> {data.fullName}</p>
          <p><span className="font-medium">Age:</span> {data.age}</p>
          <p><span className="font-medium">Gender:</span> {data.gender}</p>
          <p><span className="font-medium">Fitness Level:</span> {data.fitnessLevel}</p>
          <p><span className="font-medium">Goals:</span> {data.goals?.join(', ')}</p>
          {data.injuries && <p><span className="font-medium">Health Notes:</span> {data.injuries}</p>}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Complete Profile'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep3;