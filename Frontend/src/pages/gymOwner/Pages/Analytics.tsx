// src/pages/Analytics.tsx
import React from 'react';
import MembersChart from '../components/Dashboard/MembersChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import { mockUsers } from '../Data/mockUsers';
import { mockTrainers } from '../Data/mockTrainers';

const AnalyticsPage: React.FC = () => {
  // Mock data
  const memberData = [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 145 },
    { month: 'Mar', count: 180 },
    { month: 'Apr', count: 210 },
    { month: 'May', count: 240 },
    { month: 'Jun', count: 275 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 10500 },
    { month: 'Apr', revenue: 11500 },
    { month: 'May', revenue: 12200 },
    { month: 'Jun', revenue: 12500 },
  ];

  const membershipDistribution = [
    { type: 'Basic', count: mockUsers.filter(u => u.membershipType === 'Basic').length },
    { type: 'Premium', count: mockUsers.filter(u => u.membershipType === 'Premium').length },
    { type: 'VIP', count: mockUsers.filter(u => u.membershipType === 'VIP').length },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Membership Growth</h2>
          <MembersChart data={memberData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
          <RevenueChart data={revenueData} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Membership Distribution</h2>
          <div className="space-y-2">
            {membershipDistribution.map(item => (
              <div key={item.type} className="flex justify-between">
                <span>{item.type}</span>
                <span>{item.count} ({Math.round((item.count / mockUsers.length) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Trainer Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Trainers</span>
              <span>{mockTrainers.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating</span>
              <span>{(mockTrainers.reduce((sum, t) => sum + t.rating, 0) / mockTrainers.length).toFixed(1)}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Average Clients</span>
              <span>{(mockTrainers.reduce((sum, t) => sum + t.clients, 0) / mockTrainers.length).toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Check-in Activity</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Today</span>
              <span>{Math.floor(mockUsers.length * 0.3)}</span>
            </div>
            <div className="flex justify-between">
              <span>This Week</span>
              <span>{Math.floor(mockUsers.length * 0.65)}</span>
            </div>
            <div className="flex justify-between">
              <span>This Month</span>
              <span>{Math.floor(mockUsers.length * 0.85)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;