// components/equipment/EquipmentTable.tsx
import { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiAlertTriangle, FiTool } from 'react-icons/fi';

type Equipment = {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  purchaseDate: string;
  status: 'operational' | 'maintenance' | 'out of service';
  lastMaintenance: string;
};

export const EquipmentTable = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([
    {
      id: '1',
      name: 'Treadmill Pro',
      type: 'Cardio',
      serialNumber: 'TRD-2022-001',
      purchaseDate: '2022-01-15',
      status: 'operational',
      lastMaintenance: '2023-06-01'
    },
    {
      id: '2',
      name: 'Elliptical Trainer',
      type: 'Cardio',
      serialNumber: 'ELP-2022-002',
      purchaseDate: '2022-03-10',
      status: 'maintenance',
      lastMaintenance: '2023-05-15'
    },
    {
      id: '3',
      name: 'Weight Bench',
      type: 'Strength',
      serialNumber: 'WB-2021-005',
      purchaseDate: '2021-11-05',
      status: 'operational',
      lastMaintenance: '2023-06-10'
    },
    {
      id: '4',
      name: 'Leg Press Machine',
      type: 'Strength',
      serialNumber: 'LP-2023-001',
      purchaseDate: '2023-02-20',
      status: 'out of service',
      lastMaintenance: '2023-04-01'
    },
  ]);

  const statusColors = {
    operational: 'bg-green-100 text-green-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    'out of service': 'bg-red-100 text-red-800',
  };

  const handleDelete = (id: string) => {
    setEquipment(equipment.filter(item => item.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Serial Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Maintenance
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipment.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <FiTool className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">Purchased {item.purchaseDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.serialNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[item.status]}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.lastMaintenance}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                  <FiEye />
                </button>
                <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                  <FiEdit />
                </button>
                <button 
                  className="text-red-600 hover:text-red-900"
                  onClick={() => handleDelete(item.id)}
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};