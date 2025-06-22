import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/UserAtom';
import OnboardingStep1 from '../../components/OnboardingSteps/Step1';
import OnboardingStep2 from '../../components/OnboardingSteps/Step2';
import OnboardingStep3 from '../../components/OnboardingSteps/Step3';
import ProgressBar from '../../components/Ui/ProcessBar';

interface UserProfileData {
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  injuries: string;
  availability: string[];
}

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfileData>>({});
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize form data with user's information
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        gender: user.gender // Use the gender from userAtom if available
      }));
    }
    setIsInitialized(true);
  }, [user]);

  const updateFormData = (newData: Partial<UserProfileData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData));
    navigate('/profile');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <OnboardingStep1 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            userName={formData.fullName || ''} 
          />
        );
      case 2:
        return (
          <OnboardingStep2 
            data={formData} 
            updateData={updateFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        );
      case 3:
        return (
          <OnboardingStep3 
            data={formData} 
            updateData={updateFormData} 
            prevStep={prevStep} 
            onSubmit={handleSubmit} 
            isLoading={false} 
          />
        );
      default:
        return null;
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p>Loading your information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">
            {user?.firstName ? `Welcome, ${user.firstName}!` : 'Welcome to FitLife!'}
          </h1>
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