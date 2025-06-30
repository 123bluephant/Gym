// src/pages/AnalyticsPage.tsx
import React from 'react';
import { BarChart3, Target, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/sidebar'; // Import your sidebar component

interface MonthlyStat {
  label: string;
  value: number | string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AnalyticsPage = () => {
  const navigate = useNavigate();

  // Sample data
  const monthlyStats: MonthlyStat[] = [
    {
      label: "Workouts",
      value: 28,
      change: "+12%",
      icon: BarChart3
    },
    {
      label: "Calories Burned",
      value: "12,450",
      change: "+8%",
      icon: Target
    }
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 mt-16"> {/* Adjust ml-64 to match your sidebar width */}
        <div className="container mx-auto px-4 py-8">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your fitness progress and performance</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {monthlyStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
                <p className={`text-sm mt-2 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} from last month
                </p>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Performance Trends Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Average Session Duration</span>
                    <span className="font-semibold">42 minutes</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Most Active Day</span>
                    <span className="font-semibold">Friday</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Preferred Workout Time</span>
                    <span className="font-semibold">6:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Weekly Consistency</span>
                    <span className="font-semibold">85%</span>
                  </div>
                </div>
              </div>

              {/* Goal Progress Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Goal Progress</h3>
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Monthly Workout Goal</span>
                      <span className="font-semibold">28/30 sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Strength Training Goal</span>
                      <span className="font-semibold">24/25 sessions</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Cardio Minutes Goal</span>
                      <span className="font-semibold">1,460/1,500 min</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workout History Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Workout History</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['January', 'February', 'March'].map((month) => (
                  <div key={month} className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{month} 2024</h4>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Sessions</span>
                      <span>24</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Calories</span>
                      <span>12,450</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Duration</span>
                      <span>18h 42m</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;