// pages/Reports.tsx
import { Card } from '../components/ui/Card';
import { FiFilter, FiDownload, FiPieChart, FiUsers, FiCalendar } from 'react-icons/fi';
import { MembershipGrowthChart } from '../components/reports/MembershipGrowthChart';
import { ClassAttendanceChart } from '../components/reports/ClassAttendanceChart';
import { useState } from 'react';
import { RevenueChart } from '../components/payments/RevenueChart';

export const Reports = () => {
  const [activeReport, setActiveReport] = useState('membership');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
            <FiFilter className="mr-2" /> Custom Report
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setActiveReport('membership')}
          className={`p-4 rounded-lg text-left ${activeReport === 'membership' ? 'bg-indigo-100 border-indigo-500 border-2' : 'bg-white border border-gray-200'}`}
        >
          <FiUsers className="h-6 w-6 text-indigo-600 mb-2" />
          <h3 className="font-medium text-gray-900">Membership Growth</h3>
          <p className="text-sm text-gray-500">Track member acquisition</p>
        </button>
        <button
          onClick={() => setActiveReport('attendance')}
          className={`p-4 rounded-lg text-left ${activeReport === 'attendance' ? 'bg-indigo-100 border-indigo-500 border-2' : 'bg-white border border-gray-200'}`}
        >
          <FiCalendar className="h-6 w-6 text-indigo-600 mb-2" />
          <h3 className="font-medium text-gray-900">Class Attendance</h3>
          <p className="text-sm text-gray-500">Popular classes & trends</p>
        </button>
        <button
          onClick={() => setActiveReport('revenue')}
          className={`p-4 rounded-lg text-left ${activeReport === 'revenue' ? 'bg-indigo-100 border-indigo-500 border-2' : 'bg-white border border-gray-200'}`}
        >
          <FiPieChart className="h-6 w-6 text-indigo-600 mb-2" />
          <h3 className="font-medium text-gray-900">Revenue Analysis</h3>
          <p className="text-sm text-gray-500">Income sources & trends</p>
        </button>
        <button
          onClick={() => setActiveReport('equipment')}
          className={`p-4 rounded-lg text-left ${activeReport === 'equipment' ? 'bg-indigo-100 border-indigo-500 border-2' : 'bg-white border border-gray-200'}`}
        >
          <FiPieChart className="h-6 w-6 text-indigo-600 mb-2" />
          <h3 className="font-medium text-gray-900">Equipment Usage</h3>
          <p className="text-sm text-gray-500">Machine utilization stats</p>
        </button>
      </div>

      <Card>
        <div className="p-4">
          {activeReport === 'membership' && <MembershipGrowthChart />}
          {activeReport === 'attendance' && <ClassAttendanceChart />}
          {activeReport === 'revenue' && <RevenueChart />}
          {/* Equipment usage chart would go here */}
        </div>
      </Card>
    </div>
  );
};