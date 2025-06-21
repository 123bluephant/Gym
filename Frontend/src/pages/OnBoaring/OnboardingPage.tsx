import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingStep1 from '../../components/OnboardingSteps/Step1';
import OnboardingStep2 from '../../components/OnboardingSteps/Step2';
import OnboardingStep3 from '../../components/OnboardingSteps/Step3';
import ProgressBar from '../../components/Ui/ProcessBar';

interface UserProfileData {
  fullName: string;
  age: number;
  gender: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  injuries: string;
  availability: string[];
}

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfileData>>({});
  const navigate = useNavigate();

  const updateFormData = (newData: Partial<UserProfileData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/profile');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <OnboardingStep1 data={formData} updateData={updateFormData} nextStep={nextStep} />;
      case 2:
        return <OnboardingStep2 data={formData} updateData={updateFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <OnboardingStep3 data={formData} updateData={updateFormData} prevStep={prevStep} onSubmit={handleSubmit} isLoading={false} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">Welcome to FitLife!</h1>
          <p className="mt-2 text-gray-600">Let's set up your profile</p>
        </div>
        
        <ProgressBar currentStep={step} totalSteps={3} />
        
        <div className="mt-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;