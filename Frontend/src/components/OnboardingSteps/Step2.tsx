import React, { useState } from 'react';
import { UserProfileData } from '../../pages/OnBoaring/OnboardingPage';

interface Step2Props {
  data: Partial<UserProfileData>;
  updateData: (data: Partial<UserProfileData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const fitnessLevels = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

const fitnessGoals = [
  'Weight Loss',
  'Muscle Gain',
  'Strength Training',
  'Cardio Fitness',
  'Flexibility',
  'General Health'
];

const OnboardingStep2: React.FC<Step2Props> = ({ data, updateData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleGoal = (goal: string) => {
    const currentGoals = data.goals || [];
    const newGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g: string) => g !== goal)
      : [...currentGoals, goal];
    
    updateData({ goals: newGoals });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!data.fitnessLevel) newErrors.fitnessLevel = 'Fitness level is required';
    if (!data.goals || data.goals.length === 0) newErrors.goals = 'Select at least one goal';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Fitness Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
        <div className="mt-2 space-y-2">
          {fitnessLevels.map(level => (
            <label key={level.value} className="inline-flex items-center">
              <input
                type="radio"
                name="fitnessLevel"
                checked={data.fitnessLevel === level.value}
                onChange={() => updateData({ fitnessLevel: level.value as any })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <span className="ml-2">{level.label}</span>
            </label>
          ))}
        </div>
        {errors.fitnessLevel && <p className="mt-1 text-sm text-red-600">{errors.fitnessLevel}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Fitness Goals (Select all that apply)</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {fitnessGoals.map(goal => (
            <label key={goal} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={data.goals?.includes(goal) || false}
                onChange={() => toggleGoal(goal)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2">{goal}</span>
            </label>
          ))}
        </div>
        {errors.goals && <p className="mt-1 text-sm text-red-600">{errors.goals}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Any injuries or health concerns?</label>
        <textarea
          value={data.injuries || ''}
          onChange={(e) => updateData({ injuries: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
          placeholder="E.g., Knee pain, asthma, etc."
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OnboardingStep2;