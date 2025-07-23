// components/dashboard/EquipmentStatus.tsx
import { Card } from '../ui/Card';
import { FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';

export const EquipmentStatus = () => {
  const equipment = [
    { id: 1, name: 'Treadmill A', status: 'operational', lastMaintenance: '2 weeks ago' },
    { id: 2, name: 'Elliptical B', status: 'maintenance', lastMaintenance: '3 months ago' },
    { id: 3, name: 'Weight Bench', status: 'operational', lastMaintenance: '1 month ago' },
    { id: 4, name: 'Rowing Machine', status: 'repair', lastMaintenance: '4 months ago' },
  ];

  const statusColors = {
    operational: 'text-green-500',
    maintenance: 'text-yellow-500',
    repair: 'text-red-500',
  };

  const statusIcons = {
    operational: <FiCheckCircle />,
    maintenance: <FiAlertTriangle />,
    repair: <FiAlertTriangle />,
  };

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">Equipment Status</h2>
        <div className="mt-4 space-y-3">
          {equipment.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`h-5 w-5 ${statusColors[item.status]}`}>
                  {statusIcons[item.status]}
                </span>
                <span className="ml-2 text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-xs text-gray-500">{item.lastMaintenance}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/equipment" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View Equipment Inventory
          </a>
        </div>
      </div>
    </Card>
  );
};