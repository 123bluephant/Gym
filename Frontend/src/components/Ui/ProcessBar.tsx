import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span key={i} className={i + 1 <= currentStep ? 'text-indigo-600 font-medium' : ''}>
            Step {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;