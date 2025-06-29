import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Dumbbell,
  Activity as ActivityIcon,
  Flame as FlameIcon,
  HeartPulse as HeartPulseIcon,
  Award as AwardIcon
} from 'lucide-react';
import { useRecoilValue } from 'recoil';
import userAtom from '../../atoms/UserAtom';
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
import MetricsCard from '../../components/modal/MetricsCard';
import FitnessCalendar from '../../components/modal/FitnessCalendar';
import ActionButton from '../../components/modal/ActionButton';
import TrackProgressModal from '../../components/modal/TrackProgressModal';
import AskCoachModal from '../../components/modal/AskCoachModal';

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

export default function DashboardLayout() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [showTrackProgress, setShowTrackProgress] = useState(false);
  const [showAskCoach, setShowAskCoach] = useState(false);
  const [showTrainToday, setShowTrainToday] = useState(false);
  const [showEatToday, setShowEatToday] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(false);
  }, [user]);

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
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/workouts' && 'Workouts'}
              {location.pathname === '/nutrition' && 'Nutrition'}
              {location.pathname === '/tracking' && 'Tracking'}
              {location.pathname === '/profile' && 'Profile'}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <span className="sr-only">Notifications</span>
                <div className="w-2 h-2 bg-red-500 rounded-full absolute top-3 right-3"></div>
              </button>
              <div className="relative">
                <button 
                onClick={() => navigate('/profile')}
                className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    {user?.firstName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {location.pathname === '/dashboard' ? (
            <div className="max-w-7xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {user ? `Welcome back, ${user.username}!` : 'Welcome to FitPass!'}
                </h1>
                <p className="text-gray-600 mt-2">
                  Here's your personalized dashboard for {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Progress</h2>
                <MetricsCard metrics={metrics} />
              </div>

              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Your Fitness Overview</h1>
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    onClick={() => setTimeRange('week')}
                    className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                      timeRange === 'week' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    This Week
                  </button>
                  <button
                    onClick={() => setTimeRange('month')}
                    className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                      timeRange === 'month' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    This Month
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                        <stat.icon size={20} />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                        <div className="flex items-end">
                          <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                          <p className="ml-2 text-sm text-gray-500">{stat.unit}</p>
                        </div>
                        <p className="mt-1 text-sm text-green-600">{stat.change}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Calories Burned</h3>
                  <div className="h-64">
                    <Line data={caloriesChartData} options={chartOptions} />
                  </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Active Minutes</h3>
                  <div className="h-64">
                    <Bar data={workoutChartData} options={chartOptions} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <FitnessCalendar events={calendarEvents} />
              </div>

              <div className="grid grid-cols-2 gap-4">
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

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Workout Plan</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workout</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {workoutPlan.map((item) => (
                          <tr key={item.day}>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.day}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <Dumbbell className="h-4 w-4 text-indigo-600 mr-2" />
                                {item.workout}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.time}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.duration}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.completed
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}
                              >
                                {item.completed ? 'Completed' : 'Upcoming'}
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
          ) : (
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          )}
        </main>
      </div>

      <TrackProgressModal 
        open={showTrackProgress} 
        onClose={() => setShowTrackProgress(false)} 
      />
      <AskCoachModal 
        open={showAskCoach} 
        onClose={() => setShowAskCoach(false)} 
      />
      
      {showTrainToday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Today's Workout Plan</h2>
            <p>Your scheduled workout: Full Body HIIT</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowTrainToday(false)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
              >
                Start Workout
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showEatToday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Today's Meal Plan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Breakfast:</span>
                <span className="font-medium">High-Protein Oatmeal</span>
              </div>
              <div className="flex justify-between">
                <span>Lunch:</span>
                <span className="font-medium">Grilled Chicken Salad</span>
              </div>
              <div className="flex justify-between">
                <span>Dinner:</span>
                <span className="font-medium">Salmon with Vegetables</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowEatToday(false)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Close
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
              >
                View Full Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}