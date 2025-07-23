import { Card } from '../components/ui/Card';
import { FiFilter, FiDownload, FiPlus, FiCalendar } from 'react-icons/fi';
import { ClassesTable } from '../components/classes/ClassesTable';
import { ClassSchedule } from '../components/classes/ClassSchedule';
import { useState } from 'react';

export const Classes = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [classes, setClasses] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Classes & Schedule</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
          <FiPlus className="mr-2" /> Add Class
        </button>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'schedule' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiCalendar className="inline mr-2" />
            Schedule
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'classes' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiCalendar className="inline mr-2" />
            All Classes
          </button>
        </nav>
      </div>

      <Card>
        <div className="p-4">
          {activeTab === 'schedule' ? (
            <ClassSchedule />
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded-md text-sm bg-indigo-100 text-indigo-700">
                    All Classes
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                    Upcoming
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                    Past
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
                    <FiFilter className="mr-1" /> Filter
                  </button>
                </div>
                <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
                  <FiDownload className="mr-1" /> Export
                </button>
              </div>
              <ClassesTable />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};