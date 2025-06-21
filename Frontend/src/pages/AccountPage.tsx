import React, { useState } from 'react';
import { User, Settings, Activity, Heart, ShoppingBag, Award, Calendar, Bell, Lock, CreditCard } from 'lucide-react';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'activity', name: 'Activity', icon: Activity },
    { id: 'orders', name: 'Orders', icon: ShoppingBag },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const recentActivity = [
    { type: 'workout', title: 'HIIT Fat Burn Express', date: '2024-03-15', duration: '20 min' },
    { type: 'nutrition', title: 'Logged breakfast', date: '2024-03-15', calories: 320 },
    { type: 'achievement', title: 'Unlocked "30-Day Streak"', date: '2024-03-14' },
    { type: 'workout', title: 'Full Body Strength Builder', date: '2024-03-14', duration: '45 min' },
    { type: 'order', title: 'Premium Yoga Mat purchased', date: '2024-03-13', amount: '$89.99' }
  ];

  const orders = [
    {
      id: '#ORD-001',
      date: '2024-03-13',
      status: 'Delivered',
      total: 89.99,
      items: [{ name: 'Premium Yoga Mat', quantity: 1, price: 89.99 }]
    },
    {
      id: '#ORD-002',
      date: '2024-03-10',
      status: 'Shipped',
      total: 124.98,
      items: [
        { name: 'Athletic Leggings Set', quantity: 1, price: 45.99 },
        { name: 'Whey Protein Powder', quantity: 1, price: 54.99 },
        { name: 'Smart Water Bottle', quantity: 1, price: 39.99 }
      ]
    }
  ];

  const achievements = [
    { title: '30-Day Streak', description: 'Consistent daily workouts', unlocked: true, date: '2024-03-01' },
    { title: 'Strength Master', description: 'Complete 50 strength sessions', unlocked: true, date: '2024-02-15' },
    { title: 'Cardio Champion', description: 'Burn 10,000 calories', unlocked: true, date: '2024-01-20' },
    { title: 'Flexibility Pro', description: '100 hours of yoga', unlocked: false, progress: 76 }
  ];

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
              <h1 className="text-3xl font-bold text-gray-900">Sarah Johnson</h1>
              <p className="text-gray-600">Member since January 2024</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  Premium Member
                </span>
                <span className="text-sm text-gray-500">28-day streak 🔥</span>
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
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
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
                        value="Sarah"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value="Johnson"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value="sarah.johnson@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <button className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Save Changes
                  </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Fitness Goals</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Primary Goal</label>
                      <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        <option>Weight Loss</option>
                        <option>Muscle Gain</option>
                        <option>General Fitness</option>
                        <option>Endurance</option>
                      </select>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Weight (lbs)</label>
                        <input
                          type="number"
                          value="145"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Target Weight (lbs)</label>
                        <input
                          type="number"
                          value="135"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'workout' ? 'bg-purple-100 text-purple-600' :
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
                        <p className="text-sm text-gray-600">{activity.date}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {activity.duration && activity.duration}
                        {activity.calories && `${activity.calories} cal`}
                        {activity.amount && activity.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                        <p className="text-gray-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.status}
                        </span>
                        <p className="text-lg font-bold text-gray-900 mt-1">${order.total}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-t border-gray-100">
                          <span className="text-gray-700">{item.name} x{item.quantity}</span>
                          <span className="font-medium">${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Achievements</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-6 rounded-xl border-2 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          achievement.unlocked 
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
                        <p className="text-sm text-purple-600 font-medium">Unlocked {achievement.date}</p>
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
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Workout Reminders</h3>
                        <p className="text-sm text-gray-600">Get notified about scheduled workouts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">Progress Updates</h3>
                        <p className="text-sm text-gray-600">Weekly progress summaries</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">New Features</h3>
                        <p className="text-sm text-gray-600">Updates about new app features</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-purple-600" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;