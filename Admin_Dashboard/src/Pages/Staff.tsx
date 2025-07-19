// pages/Staff.tsx
import { Card } from '../components/ui/Card';
import { FiFilter, FiDownload, FiPlus } from 'react-icons/fi';
import { StaffTable } from '../components/staff/StaffTable';

export const Staff = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 flex items-center">
            <FiDownload className="mr-2" /> Export
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
            <FiPlus className="mr-2" /> Add Staff
          </button>
        </div>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="px-3 py-1 rounded-md text-sm bg-indigo-100 text-indigo-700">
                  All Staff
                </button>
                <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                  Trainers
                </button>
                <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                  Reception
                </button>
                <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
                  <FiFilter className="mr-1" /> Filter
                </button>
              </div>
              <input
                type="text"
                placeholder="Search staff..."
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          
          <StaffTable />
        </div>
      </Card>
    </div>
  );
};