// pages/Equipment.tsx
import { Card } from '../components/ui/Card';
import { FiFilter, FiDownload, FiPlus, FiTool } from 'react-icons/fi';
import { EquipmentTable } from '../components/equipment/EquipmentTable';
import { MaintenanceSchedule } from '../components/equipment/MaintenanceSchedule';
import { useState } from 'react';

export const Equipment = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Equipment Management</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 flex items-center">
          <FiPlus className="mr-2" /> Add Equipment
        </button>
      </div>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'inventory' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiTool className="inline mr-2" />
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'maintenance' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiTool className="inline mr-2" />
            Maintenance
          </button>
        </nav>
      </div>

      <Card>
        <div className="p-4">
          {activeTab === 'inventory' ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded-md text-sm bg-indigo-100 text-indigo-700">
                    All Equipment
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                    Cardio
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100">
                    Strength
                  </button>
                  <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
                    <FiFilter className="mr-1" /> Filter
                  </button>
                </div>
                <button className="px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100 flex items-center">
                  <FiDownload className="mr-1" /> Export
                </button>
              </div>
              <EquipmentTable />
            </>
          ) : (
            <MaintenanceSchedule />
          )}
        </div>
      </Card>
    </div>
  );
};