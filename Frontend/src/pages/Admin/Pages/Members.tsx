// pages/Members.tsx
import { Card } from '../components/ui/Card';
import { FiFilter, FiDownload, FiPlus } from 'react-icons/fi';
import { MemberTable } from '../components/members/MemberTable';

export const AdminMembers = () => {
  const filters = ['All', 'Active', 'Expired', 'Pending'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Members Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
          <FiPlus className="mr-2" /> Add Member
        </button>
      </div>
      
      <Card>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              {filters.map(filter => (
                <button 
                  key={filter}
                  className={`px-3 py-1 rounded-md text-sm ${filter === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {filter}
                </button>
              ))}
              <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
                <FiFilter className="mr-1" /> More Filters
              </button>
            </div>
            <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
              <FiDownload className="mr-1" /> Export
            </button>
          </div>
          
          <MemberTable />
        </div>
      </Card>
    </div>
  );
};