import React from 'react';
import { Users, UserCheck, Dumbbell, Utensils, DollarSign, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatsCard } from './StatsCard';

export const DashboardOverview: React.FC = () => {
  const { dashboardStats, users } = useApp();

  const recentMembers = users.slice(-3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Members"
          value={dashboardStats.totalUsers}
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="[#A856B2]"
        />
        <StatsCard
          title="Active Members"
          value={dashboardStats.activeUsers}
          change="+8% from last month"
          changeType="increase"
          icon={UserCheck}
          color="[#D4A4C8]"
        />
        <StatsCard
          title="Total Trainers"
          value={dashboardStats.totalTrainers}
          change="No change"
          changeType="neutral"
          icon={UserCheck}
          color="[#A856B2]"
        />
        <StatsCard
          title="Monthly Revenue"
          value={`$${dashboardStats.monthlyRevenue.toLocaleString()}`}
          change="+15% from last month"
          changeType="increase"
          icon={DollarSign}
          color="[#D4A4C8]"
        />
        <StatsCard
          title="Workout Plans"
          value={dashboardStats.totalWorkouts}
          change="+3 new this week"
          changeType="increase"
          icon={Dumbbell}
          color="[#F4E1F0]"
        />
        <StatsCard
          title="Diet Plans"
          value={dashboardStats.totalDietPlans}
          change="+2 new this week"
          changeType="increase"
          icon={Utensils}
          color="[#F4E1F0]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#000000] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#000000]">Recent Members</h3>
            <button className="text-[#A856B2] hover:text-[#D4A4C8] text-sm font-medium">
              View all
            </button>
          </div>
          <div className="space-y-3">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-3 p-3 bg-[#F4E1F0] rounded-lg">
                <div className="bg-[#A856B2] p-2 rounded-full">
                  <Users className="h-4 w-4 text-[#FFFFFF]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-[#000000]">{member.name}</p>
                  <p className="text-sm text-[#000000]">{member.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  member.status === 'Active' 
                    ? 'bg-[#D4A4C8] text-[#FFFFFF]' 
                    : 'bg-[#F4E1F0] text-[#000000]'
                }`}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#000000] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#000000]">Quick Actions</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center p-4 bg-[#F4E1F0] border border-[#D4A4C8] rounded-lg hover:bg-[#D4A4C8] transition-colors">
              <div className="text-center">
                <Users className="h-6 w-6 text-[#A856B2] mx-auto mb-2" />
                <span className="text-sm font-medium text-[#A856B2]">Add Member</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 bg-[#F4E1F0] border border-[#D4A4C8] rounded-lg hover:bg-[#D4A4C8] transition-colors">
              <div className="text-center">
                <Dumbbell className="h-6 w-6 text-[#A856B2] mx-auto mb-2" />
                <span className="text-sm font-medium text-[#A856B2]">New Workout</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 bg-[#F4E1F0] border border-[#D4A4C8] rounded-lg hover:bg-[#D4A4C8] transition-colors">
              <div className="text-center">
                <Utensils className="h-6 w-6 text-[#A856B2] mx-auto mb-2" />
                <span className="text-sm font-medium text-[#A856B2]">Diet Plan</span>
              </div>
            </button>
            <button className="flex items-center justify-center p-4 bg-[#F4E1F0] border border-[#D4A4C8] rounded-lg hover:bg-[#D4A4C8] transition-colors">
              <div className="text-center">
                <TrendingUp className="h-6 w-6 text-[#A856B2] mx-auto mb-2" />
                <span className="text-sm font-medium text-[#A856B2]">Analytics</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};