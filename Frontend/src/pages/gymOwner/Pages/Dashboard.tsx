// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/Dashboard/StatCard';
import MembersChart from '../components/Dashboard/MembersChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import WorkoutTrendChart from '../components/Dashboard/WorkoutTrendChart';
import { 
  FiUsers, FiDollarSign, FiUserPlus, FiActivity, 
  FiCalendar, FiTrendingUp, FiUser 
} from 'react-icons/fi';
import useMembers from '../hook/useMembers';
import useTrainers from '../hook/useTrainers';
import usePayments from '../hook/usePayments';
import useWorkouts from '../hook/useWorkouts';
import { 
  calculateMonthlyRevenue, 
  calculateMemberGrowth, 
  calculateWorkoutTrends 
} from '../utils/dashboardCalculations';
import { Member, Trainer } from '../types/types';
import {  mockWorkouts } from '../Data/MockWorkouts';
import {mockMeals} from '../Data/mockMeals'
import { mockTrainers } from '../Data/mockTrainers';
import { mockProducts, mockProductSales } from '../Data/mockProducts';
import { mockUsers } from '../Data/mockUsers';
const Dashboard: React.FC = () => {
  // Fetch real data from hooks
  const { members, loading: membersLoading } = useMembers();
  const { trainers, loading: trainersLoading } = useTrainers();
  const { payments, loading: paymentsLoading } = usePayments();
  const { workouts, loading: workoutsLoading } = useWorkouts();
  
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    activeTrainers: 0,
    monthlyRevenue: 0,
    revenueChange: 0,
    newSignups: 0,
    signupChange: 0,
    avgSessions: 0,
    sessionChange: 0,
    memberGrowth: [] as { date: string; count: number }[],
    revenueTrend: [] as { month: string; revenue: number }[],
    workoutTrends: [] as { month: string; strength: number; cardio: number; yoga: number }[],
    recentActivities: [] as { name: string; activity: string; time: string; status: string }[]
  });

  useEffect(() => {
    if (!membersLoading && !trainersLoading && !paymentsLoading && !workoutsLoading) {
      // Calculate all stats when data is loaded
      const activeMembers = members.filter((m: Member) => m.status === 'Active').length;
      const activeTrainers = trainers.filter((t: Trainer) => t.status === 'Active').length;
      
      // Calculate monthly revenue data
      const { monthlyRevenue, revenueTrend, revenueChange } = calculateMonthlyRevenue(payments);
      
      // Calculate member growth
      const memberGrowthData = calculateMemberGrowth(members);
      const { memberGrowth, newSignups, signupChange } = memberGrowthData || {
        memberGrowth: [],
        newSignups: 0,
        signupChange: 0
      };
      
      // Calculate workout trends
      const workoutTrendsData = calculateWorkoutTrends(workouts);
      const { workoutTrends, avgSessions, sessionChange } = workoutTrendsData || {
        workoutTrends: [],
        avgSessions: 0,
        sessionChange: 0
      };
      
      // Get recent activities
      const recentActivities = [...members]
        .sort((a, b) => {
          const dateA = a.lastActivity ? new Date(a.lastActivity.date).getTime() : 0;
          const dateB = b.lastActivity ? new Date(b.lastActivity.date).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5)
        .map((member: Member) => ({
          name: member.name || 'Unknown',
          activity: member.lastActivity || 'Workout',
          time: member.lastActivity || 'No activity',
          status: member.status || 'Inactive'
        }));

      setStats({
        totalMembers: members.length,
        activeMembers,
        activeTrainers,
        monthlyRevenue: monthlyRevenue || 0,
        revenueChange: revenueChange || 0,
        newSignups,
        signupChange,
        avgSessions,
        sessionChange,
        memberGrowth: memberGrowth || [],
        revenueTrend: revenueTrend || [],
        workoutTrends: workoutTrends || [],
        recentActivities: recentActivities.map(activity => ({
          name: activity.name,
          activity: typeof activity.activity === 'string' ? activity.activity : activity.activity.type,
          time: typeof activity.time === 'string' ? activity.time : activity.time.date,
          status: activity.status
        }))
      });
    }
  }, [members, trainers, payments, workouts, membersLoading, trainersLoading, paymentsLoading, workoutsLoading]);

  // Calculate additional stats from mock data (for sections not covered by real data)
  const busyTrainers = mockTrainers.filter(t => t.status === 'Active').length;
  const totalMeals = mockMeals.length;
  const beginnerWorkouts = mockWorkouts.filter(w => w.difficulty === 'Beginner').length;

  const membershipDistribution = [
    { type: 'Basic', count: mockUsers.filter(u => u.membershipType === 'Basic').length },
    { type: 'Premium', count: mockUsers.filter(u => u.membershipType === 'Premium').length },
    { type: 'VIP', count: mockUsers.filter(u => u.membershipType === 'VIP').length },
  ];

  const topSellingProducts = mockProducts
    .map(product => ({
      ...product,
      sales: mockProductSales.filter(sale => sale.productId === product.id).length
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // Calculate percentage changes safely
  const memberGrowthPercentage = stats.memberGrowth.length > 0 && stats.memberGrowth[0].count !== 0 
    ? Math.round((stats.totalMembers - stats.memberGrowth[0].count) / stats.memberGrowth[0].count * 100)
    : 0;

  const activeMembersPercentage = stats.totalMembers > 0
    ? Math.round((stats.activeMembers / stats.totalMembers) * 100)
    : 0;

  const activeTrainersPercentage = stats.activeTrainers > 0
    ? Math.round((stats.activeTrainers / stats.totalTrainers) * 100)
    : 0;

  if (membersLoading || trainersLoading || paymentsLoading || workoutsLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your gym today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <FiCalendar className="text-gray-500" />
            <span className="text-gray-700 font-medium">{new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link 
              to="/gym/members" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
              View Members
            </Link>
            <Link 
              to="/gym/trainers" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
              View Trainers
            </Link>
            <Link 
              to="/shop/manage-products" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
              Manage Products
            </Link>
            <Link 
              to="/gym/meals" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
              View Meals
            </Link>
            <Link 
              to="/gym/workouts" 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
              View Workouts
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          change={memberGrowthPercentage}
          icon={<FiUsers className="text-blue-500" size={24} />}
          color="blue"
        />
        <StatCard
          title="Active Members"
          value={stats.activeMembers}
          change={activeMembersPercentage}
          icon={<FiActivity className="text-green-500" size={24} />}
          color="green"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={<FiDollarSign className="text-purple-500" size={24} />}
          color="purple"
        />
        <StatCard
          title="New Signups"
          value={stats.newSignups}
          change={stats.signupChange}
          icon={<FiUserPlus className="text-orange-500" size={24} />}
          color="orange"
        />
        
        {/* Additional stat cards from Analytics */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Busy Trainers</p>
              <p className="text-2xl font-bold">{busyTrainers}</p>
            </div>
            <Link 
              to="/gym/trainers" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Meals</p>
              <p className="text-2xl font-bold">{totalMeals}</p>
            </div>
            <Link 
              to="/gym/meals" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beginner Workouts</p>
              <p className="text-2xl font-bold">{beginnerWorkouts}</p>
            </div>
            <Link 
              to="/gym/workouts" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Member Growth</h2>
            {stats.signupChange !== 0 && (
              <div className="flex items-center text-sm text-green-500">
                <FiTrendingUp className="mr-1" />
                <span>{stats.signupChange > 0 ? '+' : ''}{stats.signupChange}% growth this month</span>
              </div>
            )}
          </div>
          {stats.memberGrowth.length > 0 && (
            <MembersChart data={stats.memberGrowth.map(item => ({
              month: item.date,
              count: item.count,
              type: 'total'
            }))} />
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Revenue Trend</h2>
            {stats.revenueChange !== 0 && (
              <div className="flex items-center text-sm text-green-500">
                <FiTrendingUp className="mr-1" />
                <span>{stats.revenueChange > 0 ? '+' : ''}{stats.revenueChange}% from last month</span>
              </div>
            )}
          </div>
          {stats.revenueTrend.length > 0 && <RevenueChart data={stats.revenueTrend} />}
        </div>
      </div>

      {/* Secondary Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{index + 1}.</span>
                  <span>{product.name}</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {product.sales} sales
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Membership Distribution</h2>
          <div className="space-y-2">
            {membershipDistribution.map(item => (
              <div key={item.type} className="flex justify-between">
                <span>{item.type}</span>
                <span>{item.count} ({Math.round((item.count / mockUsers.length) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Trainer Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Trainers</span>
              <span>{mockTrainers.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating</span>
              <span>{(mockTrainers.reduce((sum: any, t: { rating: any; }) => sum + t.rating, 0) / mockTrainers.length).toFixed(1)}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Average Clients</span>
              <span>{(mockTrainers.reduce((sum: any, t: { clients: any; }) => sum + t.clients, 0) / mockTrainers.length).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Trends Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Workout Trends</h2>
        {stats.workoutTrends.length > 0 && <WorkoutTrendChart data={stats.workoutTrends} />}
      </div>

      {/* Quick Stats Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Avg. Sessions/Member</span>
            <span className="font-semibold text-lg">{stats.avgSessions.toFixed(1)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Active Trainers</span>
            <span className="font-semibold text-lg">{stats.activeTrainers}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Session Growth</span>
            <span className={`font-semibold text-lg ${stats.sessionChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.sessionChange > 0 ? '+' : ''}{stats.sessionChange}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 text-sm">Member Retention</span>
            <span className="font-semibold text-lg text-green-500">
              {members.length > 0 ? 
                Math.round((stats.activeMembers / members.filter((m: Member) => 
                  m.joinDate && new Date(m.joinDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length) * 100
                ) + '%' : '0%'}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <Link to="/gym/members" className="text-blue-500 hover:text-blue-700 text-sm">
            View All Activity
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Recent members */}
              {stats.recentActivities.slice(0, 3).map((activity, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Member</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                        <div className="text-sm text-gray-500">Member</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${activity.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
              
              {/* Example recent workouts */}
              {mockWorkouts.slice(0, 2).map((workout: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; difficulty: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                <tr key={workout.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Workout</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{workout.name}</div>
                    <div className="text-sm text-gray-500">{workout.difficulty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Added recently
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;