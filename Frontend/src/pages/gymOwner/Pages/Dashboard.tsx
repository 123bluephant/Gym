// src/pages/Dashboard/Overview.tsx
import React from 'react';
import StatCard from '../components/Dashboard/StatCard';
import MembersChart from '../components/Dashboard/MembersChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import WorkoutTrendChart from '../components/Dashboard/WorkoutTrendChart';
import MemberActivityTable from '../components/Dashboard/MemberActivityTable';
import { mockTrainers } from '../Data/mockTrainers';
import { mockUsers } from '../Data/mockUsers';
import { FiUsers, FiDollarSign, FiUserPlus, FiActivity, FiCalendar, FiTrendingUp } from 'react-icons/fi';

const DashboardOverview: React.FC = () => {
    // Enhanced mock stats data
    const stats = {
        totalMembers: mockUsers.length,
        activeMembers: mockUsers.filter(u => u.status === 'Active').length,
        activeTrainers: mockTrainers.filter(t => t.status === 'Available').length,
        monthlyRevenue: 12500,
        revenueChange: 12.5,
        newSignups: mockUsers.filter(u => new Date(u.joinDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
        signupChange: -2.3,
        avgSessions: 3.2,
        sessionChange: 4.1,
        memberGrowth: [
            { date: 'Jan', count: 120 },
            { date: 'Feb', count: 145 },
            { date: 'Mar', count: 180 },
            { date: 'Apr', count: 210 },
            { date: 'May', count: 240 },
            { date: 'Jun', count: 275 },
        ],
        revenueTrend: [
            { month: 'Jan', revenue: 8500 },
            { month: 'Feb', revenue: 9200 },
            { month: 'Mar', revenue: 10500 },
            { month: 'Apr', revenue: 11500 },
            { month: 'May', revenue: 12200 },
            { month: 'Jun', revenue: 12500 },
        ],
        workoutTrends: [
            { month: 'Jan', strength: 320, cardio: 280, yoga: 150 },
            { month: 'Feb', strength: 350, cardio: 310, yoga: 180 },
            { month: 'Mar', strength: 400, cardio: 340, yoga: 210 },
            { month: 'Apr', strength: 420, cardio: 380, yoga: 240 },
            { month: 'May', strength: 450, cardio: 410, yoga: 270 },
            { month: 'Jun', strength: 480, cardio: 440, yoga: 300 },
        ],
        recentActivities: mockUsers
            .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
            .slice(0, 5)
            .map(user => ({
                name: user.name,
                activity: user.lastActivityType || 'Workout',
                time: user.lastActivity,
                status: user.status
            }))
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your gym today.</p>
                </div>
                <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                    <FiCalendar className="text-gray-500" />
                    <span className="text-gray-700 font-medium">{new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                </div>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Members"
                    value={stats.totalMembers}
                    change={5.2}
                    icon={<FiUsers className="text-blue-500" size={24} />}
                    color="blue"
                />
                <StatCard
                    title="Active Members"
                    value={stats.activeMembers}
                    change={3.8}
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
            </div>

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Member Growth</h2>
                        <div className="flex items-center text-sm text-green-500">
                            <FiTrendingUp className="mr-1" />
                            <span>12% growth this month</span>
                        </div>
                    </div>
                    <MembersChart data={stats.memberGrowth.map(item => ({
                        month: item.date,
                        count: item.count,
                        type: 'total' // Adding required type property
                    }))} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Revenue Trend</h2>
                        <div className="flex items-center text-sm text-green-500">
                            <FiTrendingUp className="mr-1" />
                            <span>{stats.revenueChange}% from last month</span>
                        </div>
                    </div>
                    <RevenueChart data={stats.revenueTrend} />
                </div>
            </div>

            {/* Secondary Data Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Workout Trends</h2>
                    <WorkoutTrendChart data={stats.workoutTrends} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Avg. Sessions/Member</span>
                            <span className="font-semibold">{stats.avgSessions}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Active Trainers</span>
                            <span className="font-semibold">{stats.activeTrainers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Session Growth</span>
                            <span className={`font-semibold ${stats.sessionChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {stats.sessionChange > 0 ? '+' : ''}{stats.sessionChange}%
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Member Retention</span>
                            <span className="font-semibold text-green-500">92%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Member Activity</h2>
                <MemberActivityTable data={stats.recentActivities} />
            </div>
        </div>
    );
};

export default DashboardOverview;