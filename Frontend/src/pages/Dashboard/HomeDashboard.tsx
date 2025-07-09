import React, { useState, useEffect } from 'react';
import {
  Dumbbell,
  Activity as ActivityIcon,
  Flame as FlameIcon,
  HeartPulse as HeartPulseIcon,
  Award as AwardIcon,
  Plus,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ResponsivePageLayout from '../../components/Dashboard/PageLayout';
import userAtom from '../../atoms/UserAtom';
import { useRecoilValue } from 'recoil';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock user data
const mockUser = {
  username: 'Alex Johnson',
  email: 'alex@example.com'
};

// MetricsCard Component
const MetricsCard = ({ metrics }: { metrics: any[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {metrics.map((metric, index) => (
      <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
          <span className="text-xs text-gray-500">{metric.progress}%</span>
        </div>
        <div className="flex items-end justify-between mb-3">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">{metric.value}</span>
          <span className="text-sm text-gray-500">/ {metric.target}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      </div>
    ))}
  </div>
);

// FitnessCalendar Component
const FitnessCalendar = ({ events }: { events: any[] }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  
  const days = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }
  
  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </h3>
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs sm:text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
              day === today.getDate()
                ? 'bg-indigo-600 text-white font-medium'
                : day
                ? 'hover:bg-gray-100 text-gray-900'
                : ''
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium text-gray-700">Today's Schedule</h4>
        {events.slice(0, 3).map((event, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className={`w-2 h-2 rounded-full mr-2 ${
              event.completed ? 'bg-green-500' : 'bg-yellow-500'
            }`} />
            <span className="text-gray-600">{event.time} - {event.details}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ActionButton Component
const ActionButton = ({ label, icon, color, onClick }: { label: string; icon: string; color: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
  >
    <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
    <span className="text-sm sm:text-base font-medium text-gray-800">{label}</span>
  </button>
);

// Modal Components
const TrackProgressModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Track Your Progress</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight (lbs)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter current weight"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Fat %</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter body fat percentage"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Energy Level (1-10)</label>
            <input
              type="range"
              min="1"
              max="10"
              className="w-full"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Save Progress
          </button>
        </div>
      </div>
    </div>
  );
};

const AskCoachModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold">Ask Your AI Coach</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Ask me anything about fitness, nutrition, or wellness..."
            />
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Be specific about your goals, current fitness level, and any concerns you have.
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Ask Coach
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardLayout() {
  const user = useRecoilValue(userAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [showTrackProgress, setShowTrackProgress] = useState(false);
  const [showAskCoach, setShowAskCoach] = useState(false);
  const [showTrainToday, setShowTrainToday] = useState(false);
  const [showEatToday, setShowEatToday] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [activityForm, setActivityForm] = useState({
    type: 'running',
    duration: 30,
    intensity: 'moderate',
    calories: 0,
    notes: ''
  });

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  const handleActivityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivityForm(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'calories' ? parseInt(value) || 0 : value
    }));
  };

  const handleActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Activity submitted:', activityForm);
    setShowAddActivity(false);
    setActivityForm({
      type: 'running',
      duration: 30,
      intensity: 'moderate',
      calories: 0,
      notes: ''
    });
  };

  // Stats data
  const stats = [
    { name: 'Workouts', value: '5', icon: ActivityIcon, change: '+2', unit: 'sessions' },
    { name: 'Calories', value: '2,850', icon: FlameIcon, change: '+12%', unit: 'burned' },
    { name: 'Active Minutes', value: '210', icon: HeartPulseIcon, change: '+25', unit: 'minutes' },
    { name: 'Current Streak', value: '7', icon: AwardIcon, change: '+2', unit: 'days' },
  ];

  // Metrics data
  const metrics = [
    { label: "Steps", value: "7,500", progress: 75, target: "10,000" },
    { label: "Calories", value: "1,850", progress: 62, target: "3,000" },
    { label: "Active Minutes", value: "42", progress: 84, target: "50" }
  ];

  // Workout plan data
  const workoutPlan = [
    { day: 'Mon', workout: 'Full Body HIIT', time: '7:30 AM', duration: '30 min', completed: true },
    { day: 'Tue', workout: 'Yoga Flow', time: '6:00 AM', duration: '45 min', completed: true },
    { day: 'Wed', workout: 'Strength Training', time: '7:00 AM', duration: '40 min', completed: false },
    { day: 'Thu', workout: 'Cardio & Core', time: '6:30 AM', duration: '35 min', completed: false },
    { day: 'Fri', workout: 'Active Recovery', time: '7:00 AM', duration: '20 min', completed: false },
  ];

  // Calendar events
  const calendarEvents = [
    {
      date: new Date().toISOString(),
      type: "Workout",
      details: "Full Body HIIT",
      time: "9:00 AM",
      completed: true
    },
    {
      date: new Date().toISOString(),
      type: "Meal",
      details: "High-Protein Breakfast",
      time: "8:00 AM",
      completed: true
    },
    {
      date: new Date(Date.now() + 86400000).toISOString(),
      type: "Workout",
      details: "Yoga & Stretching",
      time: "7:00 AM",
      completed: false
    }
  ];

  // Performance data for charts
  const performanceData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      calories: [320, 450, 380, 420, 500, 280, 350],
      workouts: [30, 45, 40, 35, 20, 0, 0],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      calories: [1850, 2100, 1950, 2200],
      workouts: [180, 210, 195, 225],
    }
  };

  // Chart configurations
  const caloriesChartData = {
    labels: performanceData[timeRange as keyof typeof performanceData].labels,
    datasets: [
      {
        label: 'Calories Burned',
        data: performanceData[timeRange as keyof typeof performanceData].calories,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const workoutChartData = {
    labels: performanceData[timeRange as keyof typeof performanceData].labels,
    datasets: [
      {
        label: 'Active Minutes',
        data: performanceData[timeRange as keyof typeof performanceData].workouts,
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ResponsivePageLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="space-y-4 sm:space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 pt-16">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {user ? `Welcome back, ${user.username}` : 'Welcome to FitFlow!'}
                </h1>
                <p className="text-gray-600 mt-2 text-sm sm:text-base">
                  Here's your personalized dashboard for {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <button
                onClick={() => setShowAddActivity(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors w-full sm:w-auto"
              >
                <Plus size={18} />
                Add Activity
              </button>
            </div>
          </div>

          {/* Today's Progress */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Today's Progress</h2>
            <MetricsCard metrics={metrics} />
          </div>

          {/* Fitness Overview */}
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 space-y-4 sm:space-y-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Fitness Overview</h1>
              <div className="flex w-full sm:w-auto">
                <button
                  onClick={() => setTimeRange('week')}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-l-lg ${
                    timeRange === 'week' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-r-lg ${
                    timeRange === 'month' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  This Month
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-gradient-to-br from-white to-indigo-50 shadow rounded-lg p-4 sm:p-6 border border-gray-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                      <stat.icon size={20} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                      <div className="flex items-end">
                        <p className="text-xl sm:text-2xl font-semibold text-gray-900">{stat.value}</p>
                        <p className="ml-2 text-xs sm:text-sm text-gray-500">{stat.unit}</p>
                      </div>
                      <p className="mt-1 text-xs sm:text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Calories Burned</h3>
                <div className="h-48 sm:h-64">
                  <Line data={caloriesChartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-4 sm:p-6 border border-gray-100">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Active Minutes</h3>
                <div className="h-48 sm:h-64">
                  <Bar data={workoutChartData} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* Calendar and Workout Plan */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <FitnessCalendar events={calendarEvents} />
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900">Your Workout Plan</h3>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                    View all <ChevronRight size={16} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Time</th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {workoutPlan.map((item) => (
                        <tr key={item.day} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-sm">{item.day}</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Dumbbell className="h-4 w-4 text-indigo-600 mr-2 flex-shrink-0" />
                              <span className="text-sm truncate">{item.workout}</span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-gray-500 text-sm hidden sm:table-cell">{item.time}</td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                item.completed
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {item.completed ? 'Done' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <ActionButton
              label="Train Today"
              icon="💪"
              color="#00b894"
              onClick={() => setShowTrainToday(true)}
            />
            <ActionButton
              label="Eat Today"
              icon="🍽️"
              color="#fdcb6e"
              onClick={() => setShowEatToday(true)}
            />
            <ActionButton
              label="Ask Coach"
              icon="🤖"
              color="#0984e3"
              onClick={() => setShowAskCoach(true)}
            />
            <ActionButton
              label="Track Progress"
              icon="📈"
              color="#6c5ce7"
              onClick={() => setShowTrackProgress(true)}
            />
          </div>
        </div>

        {/* Modals */}
        <TrackProgressModal
          open={showTrackProgress}
          onClose={() => setShowTrackProgress(false)}
        />
        <AskCoachModal
          open={showAskCoach}
          onClose={() => setShowAskCoach(false)}
        />

        {/* Add Activity Modal */}
        {showAddActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Add New Activity</h2>
                <button onClick={() => setShowAddActivity(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleActivitySubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                    <select
                      name="type"
                      value={activityForm.type}
                      onChange={handleActivityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      <option value="running">Running</option>
                      <option value="cycling">Cycling</option>
                      <option value="swimming">Swimming</option>
                      <option value="strength-training">Strength Training</option>
                      <option value="yoga">Yoga</option>
                      <option value="walking">Walking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                    <input
                      type="number"
                      name="duration"
                      value={activityForm.duration}
                      onChange={handleActivityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Intensity</label>
                    <select
                      name="intensity"
                      value={activityForm.intensity}
                      onChange={handleActivityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="moderate">Moderate</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned</label>
                    <input
                      type="number"
                      name="calories"
                      value={activityForm.calories || ''}
                      onChange={handleActivityChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                      min="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      name="notes"
                      value={activityForm.notes}
                      onChange={handleActivityChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddActivity(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                  >
                    Save Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Train Today Modal */}
        {showTrainToday && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Today's Workout Plan</h2>
                <button onClick={() => setShowTrainToday(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-indigo-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Full Body HIIT</h3>
                    <p className="text-sm text-gray-500">30 minutes • High Intensity</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">This workout includes cardio and strength exercises to maximize calorie burn.</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowTrainToday(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowTrainToday(false)}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Start Workout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Eat Today Modal */}
        {showEatToday && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold">Today's Meal Plan</h2>
                <button onClick={() => setShowEatToday(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4 mb-6">
                <div className="border-b pb-4">
                  <h3 className="font-medium text-gray-900">Breakfast</h3>
                  <p className="text-gray-600 text-sm">High-Protein Oatmeal with Almonds and Berries</p>
                  <p className="text-xs text-gray-500">~450 kcal</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium text-gray-900">Lunch</h3>
                  <p className="text-gray-600 text-sm">Grilled Chicken Salad with Avocado</p>
                  <p className="text-xs text-gray-500">~550 kcal</p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium text-gray-900">Dinner</h3>
                  <p className="text-gray-600 text-sm">Salmon with Roasted Vegetables</p>
                  <p className="text-xs text-gray-500">~600 kcal</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Snacks</h3>
                  <p className="text-gray-600 text-sm">Greek Yogurt with Nuts</p>
                  <p className="text-xs text-gray-500">~250 kcal</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => setShowEatToday(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => setShowEatToday(false)}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
                >
                  View Full Plan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ResponsivePageLayout>
  );
}