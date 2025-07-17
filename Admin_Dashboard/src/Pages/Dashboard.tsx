import { memo } from 'react';
import { StatsCards } from '../components/dashboard/StatsCards';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { QuickActions } from '../components/dashboard/QuickActions';
import { UpcomingClasses } from '../components/dashboard/UpcomingClasses';
import { EquipmentStatus } from '../components/dashboard/EquipmentStatus';

// Memoize child components to prevent unnecessary re-renders
const MemoStatsCards = memo(StatsCards);
const MemoRecentActivity = memo(RecentActivity);
const MemoQuickActions = memo(QuickActions);
const MemoUpcomingClasses = memo(UpcomingClasses);
const MemoEquipmentStatus = memo(EquipmentStatus);

// Button component extracted for reusability and performance
const DashboardButton = memo(({ 
  children, 
  variant = 'primary',
  onClick 
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) => {
  const baseClasses = 'px-4 py-2 rounded-md text-sm transition-colors duration-200';
  const variantClasses = variant === 'primary' 
    ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
    : 'border border-gray-300 hover:bg-gray-50';

  return (
    <button 
      className={`${baseClasses} ${variantClasses}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export const Dashboard = memo(() => {
  const handleGenerateReport = () => {
    console.log('Generating report...');
    // Report generation logic
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // Data export logic
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex gap-2">
          <DashboardButton 
            variant="primary" 
            onClick={handleGenerateReport}
          >
            Generate Report
          </DashboardButton>
          <DashboardButton 
            variant="secondary" 
            onClick={handleExportData}
          >
            Export Data
          </DashboardButton>
        </div>
      </header>
      
      <MemoStatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MemoRecentActivity />
          <MemoUpcomingClasses />
        </div>
        <div className="space-y-6">
          <MemoQuickActions />
          <MemoEquipmentStatus />
        </div>
      </div>
    </div>
  );
});