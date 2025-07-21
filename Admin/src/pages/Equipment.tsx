// pages/Equipment.tsx
import { Card } from '../components/ui/card';
import { FiFilter, FiDownload, FiPlus, FiTool } from 'react-icons/fi';
import { EquipmentTable } from '../components/equipment/EquipmentTable';
import { MaintenanceSchedule } from '../components/equipment/MaintenanceSchedule';
import { useState } from 'react';

export const Equipment = () => {
  const [activeTab, setActiveTab] = useState('inventory');

  return (
    <div className="space-y-6">



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