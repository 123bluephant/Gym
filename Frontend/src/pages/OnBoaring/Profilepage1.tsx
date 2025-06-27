import React, { useState, useEffect } from 'react';
import { User, Settings, Activity, Heart, ShoppingBag, Award, Lock, CreditCard, Edit2, Target, AlertTriangle, Calendar, LogOut } from 'lucide-react';
import { useRecoilState } from 'recoil';
import userAtom from '../../atoms/UserAtom';
import { useNavigate } from 'react-router-dom';

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
}

interface WorkoutActivity {
  id: string;
  date: string;
  type: string;
  duration: string;
  caloriesBurned: number;
  completed: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  dateEarned?: string;
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
};

// Sample workout activities data
const sampleActivities: WorkoutActivity[] = [
  {
    id: '1',
    date: '2023-06-15',
    type: 'Strength Training',
    duration: '45 min',
    caloriesBurned: 320,
    completed: true
  },
  {
    id: '2',
    date: '2023-06-14',
    type: 'Cardio',
    duration: '30 min',
    caloriesBurned: 280,
    completed: true
  },
  {
    id: '3',
    date: '2023-06-12',
    type: 'Yoga',
    duration: '60 min',
    caloriesBurned: 180,
    completed: true
  },
  {
    id: '4',
    date: '2023-06-10',
    type: 'HIIT',
    duration: '25 min',
    caloriesBurned: 350,
    completed: true
  },
  {
    id: '5',
    date: '2023-06-08',
    type: 'Running',
    duration: '40 min',
    caloriesBurned: 420,
    completed: true
  }
];

// Sample achievements data
const sampleAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Workout',
    description: 'Completed your first workout',
    icon: '🏆',
    earned: true,
    dateEarned: '2023-05-01'
  },
  {
    id: '2',
    title: '5 Workouts',
    description: 'Completed 5 workouts',
    icon: '🔥',
    earned: true,
    dateEarned: '2023-05-15'
  },
  {
    id: '3',
    title: 'Consistency',
    description: 'Worked out 3 days in a row',
    icon: '⏱️',
    earned: true,
    dateEarned: '2023-05-20'
  },
  {
    id: '4',
    title: 'Marathoner',
    description: 'Run a total of 26.2 miles',
    icon: '🏃‍♂️',
    earned: false
  },
  {
    id: '5',
    title: 'Weight Master',
    description: 'Reached your target weight',
    icon: '⚖️',
    earned: false
  },
  {
    id: '6',
    title: 'Early Bird',
    description: 'Complete 5 morning workouts',
    icon: '🌅',
    earned: true,
    dateEarned: '2023-06-01'
  }
];

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [activities] = useState<WorkoutActivity[]>(sampleActivities);
  const [achievements] = useState<Achievement[]>(sampleAchievements);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
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

  const formattedAvailability = (profile.availability || []).length > 0
    ? profile.availability?.map(day => `${day}s`).join(', ')
    : 'Not specified';

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
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

              {/* Logout Button - styled like sidebar items */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                  <p className="text-gray-600 mt-1">Your workout history and progress</p>
                </div>

                <div className="divide-y divide-gray-200">
                  {activities.map((activity) => (
                    <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{activity.type}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(activity.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-sm text-gray-600">
                              <span className="font-medium">Duration:</span> {activity.duration}
                            </span>
                            <span className="text-sm text-gray-600">
                              <span className="font-medium">Calories:</span> {activity.caloriesBurned}
                            </span>
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          Completed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <h3 className="font-medium text-gray-900">Activity Summary</h3>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-500">Total Workouts</p>
                      <p className="text-2xl font-bold mt-1">{activities.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-500">Total Calories</p>
                      <p className="text-2xl font-bold mt-1">
                        {activities.reduce((sum, activity) => sum + activity.caloriesBurned, 0)}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-500">Current Streak</p>
                      <p className="text-2xl font-bold mt-1">{profile.streak || 0} days</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Your Achievements</h2>
                  <p className="text-gray-600 mt-1">Earned badges and accomplishments</p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${achievement.earned
                          ? 'bg-indigo-50 border-indigo-200'
                          : 'bg-gray-50 border-gray-200 opacity-70'}`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`text-3xl p-3 rounded-full ${achievement.earned
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-gray-100 text-gray-400'}`}>
                            {achievement.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                            {achievement.earned && achievement.dateEarned && (
                              <p className="text-xs text-indigo-600 mt-2">
                                Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                              </p>
                            )}
                            {!achievement.earned && (
                              <p className="text-xs text-gray-500 mt-2">Not yet earned</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-gray-900">Progress</h3>
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Achievements earned
                        </span>
                        <span className="text-sm font-medium text-indigo-600">
                          {achievements.filter(a => a.earned).length} of {achievements.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{
                            width: `${(achievements.filter(a => a.earned).length / achievements.length * 100)}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
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