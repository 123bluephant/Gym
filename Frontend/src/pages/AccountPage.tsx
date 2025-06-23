import React, { useState, useEffect } from 'react';
import { User, Settings, Activity, Heart, ShoppingBag, Award, Lock, CreditCard } from 'lucide-react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/UserAtom';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: string;
  streak: number;
  fitnessGoals: {
    primaryGoal: string;
    currentWeight: number;
    targetWeight: number;
  };
}

interface ActivityItem {
  id: string;
  type: 'workout' | 'nutrition' | 'achievement' | 'order';
  title: string;
  date: string;
  duration?: string;
  calories?: number;
  amount?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  date?: string;
  progress?: number;
}

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userProfile = useRecoilValue(userAtom);
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [profileRes, activityRes, ordersRes, achievementsRes] = await Promise.all([
          axios.get('/api/user/profile'),
          axios.get('/api/user/activity'),
          axios.get('/api/orders'),
          axios.get('/api/achievements')
        ]);

        setRecentActivity(activityRes.data);
        setOrders(ordersRes.data);
        setAchievements(achievementsRes.data);

      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to load account data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async (updatedData: Partial<UserProfile>) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/user/profile', updatedData);
      setUserProfile(response.data);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm max-w-md">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold mb-2">Error Loading Account</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return null; // or redirect to login
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userProfile.fullName} {userProfile.lastName}
              </h1>
              <p className="text-gray-600">Member since {new Date(userProfile.joinDate).toLocaleDateString()}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {userProfile.membershipType} Member
                </span>
                {userProfile.streak > 0 && (
                  <span className="text-sm text-gray-500">
                    {userProfile.streak}-day streak 🔥
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
              <ProfileTab
                userProfile={userProfile}
                onUpdate={handleProfileUpdate}
                loading={loading}
              />
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <ActivityTab activities={recentActivity} />
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <OrdersTab orders={orders} />
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <AchievementsTab achievements={achievements} />
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <SettingsTab />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab: React.FC<{
  userProfile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
  loading: boolean;
}> = ({ userProfile, onUpdate, loading }) => {
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone,
    primaryGoal: userProfile.fitnessGoals.primaryGoal,
    currentWeight: userProfile.fitnessGoals.currentWeight,
    targetWeight: userProfile.fitnessGoals.targetWeight,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      fitnessGoals: {
        primaryGoal: formData.primaryGoal,
        currentWeight: Number(formData.currentWeight),
        targetWeight: Number(formData.targetWeight),
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Fitness Goals</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
            <select
              name="primaryGoal"
              value={formData.primaryGoal}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="General Fitness">General Fitness</option>
              <option value="Endurance">Endurance</option>
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Weight (lbs)</label>
              <input
                type="number"
                name="currentWeight"
                value={formData.currentWeight}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (lbs)</label>
              <input
                type="number"
                name="targetWeight"
                value={formData.targetWeight}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Activity Tab Component
const ActivityTab: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
    {activities.length === 0 ? (
      <p className="text-gray-500">No recent activity found</p>
    ) : (
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'workout' ? 'bg-purple-100 text-purple-600' :
                activity.type === 'nutrition' ? 'bg-green-100 text-green-600' :
                  activity.type === 'achievement' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
              }`}>
              {activity.type === 'workout' && <Activity className="w-5 h-5" />}
              {activity.type === 'nutrition' && <Heart className="w-5 h-5" />}
              {activity.type === 'achievement' && <Award className="w-5 h-5" />}
              {activity.type === 'order' && <ShoppingBag className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(activity.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {activity.duration && activity.duration}
              {activity.calories && `${activity.calories} cal`}
              {activity.amount && activity.amount}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Orders Tab Component
const OrdersTab: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <div className="space-y-6">
    {orders.length === 0 ? (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="mt-2 text-gray-600">Your purchase history will appear here</p>
      </div>
    ) : (
      orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
              <p className="text-gray-600">
                {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                }`}>
                {order.status}
              </span>
              <p className="text-lg font-bold text-gray-900 mt-1">${order.total.toFixed(2)}</p>
            </div>
          </div>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-t border-gray-100">
                <span className="text-gray-700">{item.name} x{item.quantity}</span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ))
    )}
  </div>
);

// Achievements Tab Component
const AchievementsTab: React.FC<{ achievements: Achievement[] }> = ({ achievements }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Achievements</h2>
    {achievements.length === 0 ? (
      <p className="text-gray-500">No achievements yet</p>
    ) : (
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className={`p-6 rounded-xl border-2 ${achievement.unlocked
              ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
              : 'bg-gray-50 border-gray-200'
            }`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${achievement.unlocked
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gray-300'
                }`}>
                <Award className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
            {achievement.unlocked ? (
              <p className="text-sm text-purple-600 font-medium">
                Unlocked {achievement.date && new Date(achievement.date).toLocaleDateString()}
              </p>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{achievement.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
);

// Settings Tab Component
const SettingsTab = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    workoutReminders: true,
    progressUpdates: true,
    newFeatures: false,
  });

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Workout Reminders</h3>
              <p className="text-sm text-gray-600">Get notified about scheduled workouts</p>
            </div>
            <input
              type="checkbox"
              name="workoutReminders"
              checked={notificationSettings.workoutReminders}
              onChange={handleNotificationChange}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Progress Updates</h3>
              <p className="text-sm text-gray-600">Weekly progress summaries</p>
            </div>
            <input
              type="checkbox"
              name="progressUpdates"
              checked={notificationSettings.progressUpdates}
              onChange={handleNotificationChange}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">New Features</h3>
              <p className="text-sm text-gray-600">Updates about new app features</p>
            </div>
            <input
              type="checkbox"
              name="newFeatures"
              checked={notificationSettings.newFeatures}
              onChange={handleNotificationChange}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
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
          <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Data & Privacy</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;