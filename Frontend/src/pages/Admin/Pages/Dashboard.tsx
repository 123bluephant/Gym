// pages/Dashboard.tsx
import { StatsCards } from '../components/dashboard/StatsCards';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import { UpcomingClasses } from '../components/dashboard/UpcomingClasses';
import { EquipmentStatus } from '../components/dashboard/EquipmentStatus';

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
            Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
            Export Data
          </button>
        </div>
      </div>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <RecentActivity />
          <UpcomingClasses />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <EquipmentStatus />
        </div>
      </div>
    </div>
  );
};