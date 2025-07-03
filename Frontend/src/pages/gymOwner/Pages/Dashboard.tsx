import React, { useEffect, useState } from 'react';
import StatCard from '../components/Dashboard/StatCard';
import MembersChart from '../components/Dashboard/MembersChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import WorkoutTrendChart from '../components/Dashboard/WorkoutTrendChart';
import MemberActivityTable from '../components/Dashboard/MemberActivityTable';
import { FiUsers, FiDollarSign, FiUserPlus, FiActivity, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import useMembers from '../hook/useMembers';
import useTrainers from '../hook/useTrainers';
import usePayments from '../hook/usePayments';
import useWorkouts from '../hook/useWorkouts';
import { calculateMonthlyRevenue, calculateMemberGrowth, calculateWorkoutTrends } from '../utils/dashboardCalculations';
import { Member, Trainer } from '../types/types';

const DashboardOverview: React.FC = () => {
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
            
            // Calculate member growth - add null checks
            const memberGrowthData = calculateMemberGrowth(members);
            const { memberGrowth, newSignups, signupChange } = memberGrowthData || {
                memberGrowth: [],
                newSignups: 0,
                signupChange: 0
            };
            
            // Calculate workout trends - add null checks
            const workoutTrendsData = calculateWorkoutTrends(workouts);
            const { workoutTrends, avgSessions, sessionChange } = workoutTrendsData || {
                workoutTrends: [],
                avgSessions: 0,
                sessionChange: 0
            };
            
            // Get recent activities with null checks
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

    // Calculate percentage changes safely
    const memberGrowthPercentage = stats.memberGrowth.length > 0 && stats.memberGrowth[0].count !== 0 
        ? Math.round((stats.totalMembers - stats.memberGrowth[0].count) / stats.memberGrowth[0].count * 100)
        : 0;

    const activeMembersPercentage = stats.totalMembers > 0
        ? Math.round((stats.activeMembers / stats.totalMembers) * 100)
        : 0;

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
                <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Workout Trends</h2>
                    {stats.workoutTrends.length > 0 && <WorkoutTrendChart data={stats.workoutTrends} />}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Avg. Sessions/Member</span>
                            <span className="font-semibold">{stats.avgSessions.toFixed(1)}</span>
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
                            <span className="font-semibold text-green-500">
                                {members.length > 0 ? 
                                    Math.round((stats.activeMembers / members.filter((m: Member) => 
                                        m.joinDate && new Date(m.joinDate) < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length) * 100
                                    ) + '%' : '0%'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Member Activity</h2>
                {stats.recentActivities.length > 0 && <MemberActivityTable data={stats.recentActivities} />}
            </div>
        </div>
    );
};

export default DashboardOverview;