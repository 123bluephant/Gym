// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/Dashboard/StatCard';
import MembersChart from '../components/Dashboard/MembersChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import WorkoutTrendChart from '../components/Dashboard/WorkoutTrendChart';
import {
  FiUsers, FiDollarSign, FiUserPlus, FiActivity,
  FiCalendar, FiTrendingUp, FiUser, FiMenu,
  FiPackage, FiAward
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
import { mockWorkouts } from '../Data/MockWorkouts';
import { mockMeals } from '../Data/mockMeals';
import { mockTrainers } from '../Data/mockTrainers';
import { mockProducts, mockProductSales } from '../Data/mockProducts';
import { mockUsers } from '../Data/mockUsers';

const Dashboard: React.FC = () => {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch real data from hooks
  const { members, loading: membersLoading } = useMembers();
  const { trainers, loading: trainersLoading } = useTrainers();
  const { payments, loading: paymentsLoading } = usePayments();
  const { workouts, loading: workoutsLoading } = useWorkouts();

  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    activeTrainers: 0,
    totalTrainers: 0,
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
          activity: member.lastActivity?.type || 'Workout',
          time: member.lastActivity?.date || 'No activity',
          status: member.status || 'Inactive'
        }));

      setStats({
        totalMembers: members.length,
        activeMembers,
        activeTrainers,
        totalTrainers: trainers.length,
        monthlyRevenue: monthlyRevenue || 0,
        revenueChange: revenueChange || 0,
        newSignups,
        signupChange,
        avgSessions,
        sessionChange,
        memberGrowth: memberGrowth || [],
        revenueTrend: revenueTrend || [],
        workoutTrends: workoutTrends || [],
        recentActivities
      });
    }
  }, [members, trainers, payments, workouts, membersLoading, trainersLoading, paymentsLoading, workoutsLoading]);

  // Calculate additional stats from mock data
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
  const memberGrowthPercentage = stats.memberGrowth.length > 1
    ? Math.round((stats.newSignups / stats.memberGrowth[stats.memberGrowth.length - 2].count) * 100)
    : 0;

  const activeMembersPercentage = stats.totalMembers > 0
    ? Math.round((stats.activeMembers / stats.totalMembers) * 100)
    : 0;

  const activeTrainersPercentage = stats.totalTrainers > 0
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
    <div className="bg-gray-50 min-h-screen">

      <div className="p-4 lg:p-6">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your gym today.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto">
              <FiCalendar className="text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium text-sm">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <Link
                to="/gym/members"
                className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm"
              >
                Members
              </Link>
              <Link
                to="/gym/trainers"
                className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm"
              >
                Trainers
              </Link>
              <Link
                to="/shop/manage-products"
                className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-xs sm:text-sm"
              >
                Products
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            change={memberGrowthPercentage}
            icon={<FiUsers className="text-blue-500" size={20} />}
            color="blue"
            compact
          />
          <StatCard
            title="Active Members"
            value={stats.activeMembers}
            change={activeMembersPercentage}
            icon={<FiActivity className="text-green-500" size={20} />}
            color="green"
            compact
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(1)}k`}
            change={stats.revenueChange}
            icon={<FiDollarSign className="text-purple-500" size={20} />}
            color="purple"
            compact
          />
          <StatCard
            title="New Signups"
            value={stats.newSignups}
            change={stats.signupChange}
            icon={<FiUserPlus className="text-orange-500" size={20} />}
            color="orange"
            compact
          />
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-xs text-gray-500 mb-1">Busy Trainers</p>
            <p className="font-bold text-lg">{busyTrainers}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-xs text-gray-500 mb-1">Available Meals</p>
            <p className="font-bold text-lg">{totalMeals}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-xs text-gray-500 mb-1">Beginner Workouts</p>
            <p className="font-bold text-lg">{beginnerWorkouts}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-xs text-gray-500 mb-1">Avg. Sessions</p>
            <p className="font-bold text-lg">{stats.avgSessions.toFixed(1)}</p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-xs text-gray-500 mb-1">Session Growth</p>
            <p className={`font-bold text-lg ${stats.sessionChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.sessionChange > 0 ? '+' : ''}{stats.sessionChange}%
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg shadow text-center">
            <p className="text-xs text-gray-500 mb-1">Member Retention</p>
            <p className="font-bold text-lg text-green-500">
              {members.length > 0 ?
                Math.round((stats.activeMembers / members.filter((m: Member) =>
                  m.joinDate && new Date(m.joinDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length) * 100
                ) + '%' : '0%'}
            </p>
          </div>
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Member Growth</h2>
              {stats.signupChange !== 0 && (
                <div className="flex items-center text-xs sm:text-sm text-green-500">
                  <FiTrendingUp className="mr-1" />
                  <span>{stats.signupChange > 0 ? '+' : ''}{stats.signupChange}% growth</span>
                </div>
              )}
            </div>
            <div className="h-64">
              {stats.memberGrowth.length > 0 && (
                <MembersChart data={stats.memberGrowth.map(item => ({
                  month: item.date,
                  count: item.count,
                  type: 'total'
                }))} />
              )}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Revenue Trend</h2>
              {stats.revenueChange !== 0 && (
                <div className="flex items-center text-xs sm:text-sm text-green-500">
                  <FiTrendingUp className="mr-1" />
                  <span>{stats.revenueChange > 0 ? '+' : ''}{stats.revenueChange}%</span>
                </div>
              )}
            </div>
            <div className="h-64">
              {stats.revenueTrend.length > 0 && <RevenueChart data={stats.revenueTrend} />}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Top Selling Products */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Top Products</h2>
              <Link to="/shop/manage-products" className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {topSellingProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center truncate">
                    <span className="font-medium mr-2 text-sm">{index + 1}.</span>
                    <span className="truncate text-sm">{product.name}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {product.sales} sales
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Membership Distribution */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Membership Types</h2>
            <div className="space-y-2">
              {membershipDistribution.map(item => (
                <div key={item.type} className="flex justify-between items-center">
                  <span className="text-sm">{item.type}</span>
                  <div className="flex items-center">
                    <span className="font-medium text-sm mr-2">{item.count}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round((item.count / mockUsers.length) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Recent Activity</h2>
              <Link to="/gym/members" className="text-blue-500 hover:text-blue-700 text-xs sm:text-sm">
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {stats.recentActivities.slice(0, 4).map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <FiUser className="text-gray-600 text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.name}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {activity.activity} • {activity.time}
                    </p>
                  </div>
                  <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${activity.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'}`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workout Trends - Full width on mobile, 2/3 on desktop */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm lg:col-span-2 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Workout Trends</h2>
          <div className="h-64">
            {stats.workoutTrends.length > 0 && <WorkoutTrendChart data={stats.workoutTrends} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;