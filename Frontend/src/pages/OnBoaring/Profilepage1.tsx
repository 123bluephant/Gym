import React, { useState, useEffect } from 'react';
import { User, Settings, Activity, Heart, ShoppingBag, Award, Lock, CreditCard, Edit2, Target, AlertTriangle, Calendar } from 'lucide-react';

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
  fitnessGoals: FitnessGoals; // Make this required
  joinDate?: string;
  membershipType?: string;
  streak?: number;
}

// Create default fitness goals
const defaultFitnessGoals: FitnessGoals = {
  primaryGoal: 'General Fitness',
  currentWeight: 0,
  targetWeight: 0,
};

// Create default profile with all required fields
const defaultProfile: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  fitnessGoals: defaultFitnessGoals, // Ensure this is always defined
  joinDate: new Date().toISOString(),
  membershipType: 'Basic',
  streak: 0,
};

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');

    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);

        // Ensure fitnessGoals exists in parsed data
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
      // Handle nested fitnessGoals object
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

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

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

  // Format availability for display
  const formattedAvailability = (profile.availability || []).length > 0
    ? profile.availability?.map(day => `${day}s`).join(', ')
    : 'Not specified';

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <button
                onClick={() => setActiveTab('profile')}
                className="absolute -bottom-2 -right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md transition-all hover:scale-110"
              >
                <Edit2 className="w-4 h-4" />
              </button>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
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
            )}

            {/* Activity Tab - Simplified for localStorage only */}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No activity yet</h3>
                  <p className="mt-2 text-gray-600">Your workout history will appear here</p>
                </div>
              </div>
            )}

            {/* Achievements Tab - Simplified for localStorage only */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
                <div className="text-center py-12">
                  <Award className="w-12 h-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No achievements yet</h3>
                  <p className="mt-2 text-gray-600">Complete workouts to unlock achievements</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Membership Type</label>
                      <select
                        name="membershipType"
                        value={profile.membershipType || 'Basic'}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="Pro">Pro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Streak Count</label>
                      <input
                        type="number"
                        name="streak"
                        value={profile.streak || 0}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Security</h2>
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Change Password</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Payment Methods</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;