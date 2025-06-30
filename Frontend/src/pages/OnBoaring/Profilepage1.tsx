import React, { useState, useEffect } from 'react';
import { User, Edit2, AlertTriangle } from 'lucide-react';
import Sidebar from '../../components/Dashboard/sidebar'; // Import the Sidebar component

interface FitnessGoals {
  primaryGoal: string;
  currentWeight: number;
  targetWeight: number;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  fitnessLevel?: string;
  goals?: string[];
  injuries?: string;
  availability?: string[];
  fitnessGoals: FitnessGoals;
  joinDate?: string;
  membershipType?: string;
  streak?: number;
  profilePicture?: string;
}

const defaultFitnessGoals: FitnessGoals = {
  primaryGoal: 'General Fitness',
  currentWeight: 0,
  targetWeight: 0,
};

const defaultProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  fitnessGoals: defaultFitnessGoals,
  joinDate: new Date().toISOString(),
  membershipType: 'Basic',
  streak: 0,
  profilePicture: '',
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        const mergedProfile = {
          ...defaultProfile,
          ...parsed,
          fitnessGoals: {
            ...defaultFitnessGoals,
            ...(parsed.fitnessGoals || {})
          }
        };
        setProfile(mergedProfile);
      } catch (e) {
        console.error("Error parsing profile data", e);
        setProfile(defaultProfile);
      }
    } else {
      localStorage.setItem('userProfile', JSON.stringify(defaultProfile));
    }
    setLoading(false);
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => {
      if (name.startsWith('fitnessGoals.')) {
        const goalField = name.split('.')[1];
        const updatedProfile = {
          ...prev,
          fitnessGoals: {
            ...prev.fitnessGoals,
            [goalField]: value
          }
        };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        return updatedProfile;
      }
      const updatedProfile = {
        ...prev,
        [name]: value
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  const handleGoalsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setProfile(prev => {
      let updatedGoals = [...(prev.goals || [])];
      if (checked) {
        updatedGoals.push(value);
      } else {
        updatedGoals = updatedGoals.filter(goal => goal !== value);
      }
      const updatedProfile = {
        ...prev,
        goals: updatedGoals
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  const handleAvailabilityChange = (day: string) => {
    setProfile(prev => {
      let updatedAvailability = [...(prev.availability || [])];
      if (updatedAvailability.includes(day)) {
        updatedAvailability = updatedAvailability.filter(d => d !== day);
      } else {
        updatedAvailability.push(day);
      }
      const updatedProfile = {
        ...prev,
        availability: updatedAvailability
      };
      localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
      return updatedProfile;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfile(prev => {
          const updatedProfile = {
            ...prev,
            profilePicture: imageUrl
          };
          localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
          return updatedProfile;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const formattedAvailability = (profile.availability || []).length > 0
    ? profile.availability?.map(day => `${day}s`).join(', ')
    : 'Not specified';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Scrollable Main Content */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}
        style={{ maxHeight: '100vh' }}
      >
        {/* Header */}
        <section className="bg-white border-b border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {profile.firstName.charAt(0).toUpperCase()}
                    {profile.lastName.charAt(0).toUpperCase()}
                  </div>
                )}
                <label className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md transition-all hover:scale-110 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Edit2 className="w-4 h-4" />
                </label>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h1>
                <p className="text-gray-600">
                  Member since {profile.joinDate ? new Date(profile.joinDate).toLocaleDateString() : 'recently'}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {profile.membershipType || 'Basic'} Member
                  </span>
                  {profile.streak && profile.streak > 0 && (
                    <span className="text-sm text-gray-500">
                      {profile.streak}-day streak 🔥
                    </span>
                  )}
                  {profile.fitnessLevel && (
                    <span className="text-sm text-gray-500 capitalize">
                      {profile.fitnessLevel} level
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the profile page content remains the same */}
        {/* Main Content - Profile Section */}
        <div className="flex-1">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={profile.age || ''}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"
                    value={profile.gender || ''}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Rest of the profile sections remain unchanged */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fitness Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                  <select
                    name="fitnessGoals.primaryGoal"
                    value={profile.fitnessGoals?.primaryGoal || 'General Fitness'}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="General Fitness">General Fitness</option>
                    <option value="Endurance">Endurance</option>
                    <option value="Flexibility">Flexibility</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Weight (lbs)</label>
                  <input
                    type="number"
                    name="fitnessGoals.currentWeight"
                    value={profile.fitnessGoals?.currentWeight || 0}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (lbs)</label>
                  <input
                    type="number"
                    name="fitnessGoals.targetWeight"
                    value={profile.fitnessGoals?.targetWeight || 0}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Fitness Goals</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Weight Loss', 'Muscle Gain', 'Cardio', 'Strength', 'Flexibility', 'Endurance'].map((goal) => (
                    <div key={goal} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`goal-${goal}`}
                        value={goal}
                        checked={profile.goals?.includes(goal) || false}
                        onChange={handleGoalsChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`goal-${goal}`} className="ml-2 text-sm text-gray-700 capitalize">
                        {goal.toLowerCase()}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-5 h-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-800">Health & Availability</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Injuries/Health Concerns</label>
                  <textarea
                    name="injuries"
                    value={profile.injuries || ''}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Any injuries or health conditions we should know about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Weekly Availability</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <div key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`day-${day}`}
                          checked={profile.availability?.includes(day) || false}
                          onChange={() => handleAvailabilityChange(day)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                          {day}
                        </label>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    Current availability: {formattedAvailability}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;