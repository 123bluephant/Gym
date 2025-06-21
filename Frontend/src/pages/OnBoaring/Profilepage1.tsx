import React from 'react';
import { User, Edit2, Activity, Target, AlertTriangle, Calendar } from 'lucide-react';

interface UserProfileData {
  fullName: string;
  age: number;
  gender: string;
  fitnessLevel: string;
  goals: string[];
  injuries: string;
  availability: string[];
}

const ProfilePage: React.FC = () => {
  // Retrieve profile data from localStorage
  const profileData: UserProfileData = JSON.parse(localStorage.getItem('userProfile') || JSON.stringify({
    fullName: '',
    age: 0,
    gender: '',
    fitnessLevel: '',
    goals: [],
    injuries: '',
    availability: []
  }));

  // Format availability for better display
  const formattedAvailability = profileData.availability?.length > 0 
    ? profileData.availability.map(day => `${day}s`).join(', ')
    : 'Not specified';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white shadow-lg">
              <User className="w-12 h-12 text-indigo-600" />
            </div>
            <button 
              onClick={() => window.location.href = '/onboarding'}
              className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md transition-all hover:scale-110"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">{profileData.fullName || 'Your Profile'}</h1>
          <p className="mt-2 text-gray-600 max-w-md">
            {profileData.fitnessLevel 
              ? `${profileData.fitnessLevel} fitness level` 
              : 'Update your fitness profile'}
          </p>
        </div>

        {/* Profile Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</p>
                <p className="mt-1 text-gray-800 font-medium">
                  {profileData.fullName || 'Not provided'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Age</p>
                  <p className="mt-1 text-gray-800 font-medium">
                    {profileData.age || 'Not provided'}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</p>
                  <p className="mt-1 text-gray-800 font-medium">
                    {profileData.gender || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fitness Level Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Fitness Level</h2>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Current Level</p>
              <p className="mt-1 text-gray-800 font-medium capitalize">
                {profileData.fitnessLevel || 'Not provided'}
              </p>
            </div>
          </div>

          {/* Goals Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Target className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Fitness Goals</h2>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your Targets</p>
              {profileData.goals?.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {profileData.goals.map((goal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-2 w-2 mt-2 mr-2 bg-indigo-600 rounded-full flex-shrink-0"></span>
                      <span className="text-gray-800 capitalize">{goal}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-gray-500">No goals set</p>
              )}
            </div>
          </div>

          {/* Health & Availability Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-5 h-5 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Health & Availability</h2>
            </div>
            <div className="space-y-4">
              {profileData.injuries && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Injuries/Concerns</p>
                  <p className="mt-1 text-gray-800">{profileData.injuries}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</p>
                <div className="mt-2 flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <p className="text-gray-800">{formattedAvailability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button - Mobile */}
        <div className="mt-8 md:hidden flex justify-center">
          <button
            onClick={() => window.location.href = '/onboarding'}
            className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <Edit2 className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;