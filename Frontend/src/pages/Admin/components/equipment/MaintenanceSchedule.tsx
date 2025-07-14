// components/equipment/MaintenanceSchedule.tsx
import { Card } from '../ui/Card';
import { FiAlertTriangle, FiCheckCircle, FiCalendar } from 'react-icons/fi';

export const MaintenanceSchedule = () => {
  const maintenanceTasks = [
    { 
      id: 1, 
      equipment: 'Treadmill Pro', 
      type: 'Lubrication', 
      dueDate: '2023-07-15', 
      status: 'pending',
      lastCompleted: '2023-06-15'
    },
    { 
      id: 2, 
      equipment: 'Elliptical Trainer', 
      type: 'Belt Adjustment', 
      dueDate: '2023-07-01', 
      status: 'overdue',
      lastCompleted: '2023-05-01'
    },
    { 
      id: 3, 
      equipment: 'Weight Bench', 
      type: 'Bolt Tightening', 
      dueDate: '2023-08-10', 
      status: 'pending',
      lastCompleted: '2023-06-10'
    },
    { 
      id: 4, 
      equipment: 'Leg Press Machine', 
      type: 'Hydraulic Check', 
      dueDate: '2023-06-25', 
      status: 'completed',
      lastCompleted: '2023-06-25'
    },
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800',
  };

  const statusIcons = {
    pending: <FiAlertTriangle className="h-4 w-4" />,
    overdue: <FiAlertTriangle className="h-4 w-4" />,
    completed: <FiCheckCircle className="h-4 w-4" />,
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">Maintenance Schedule</h2>
        <button className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700">
          Schedule Maintenance
        </button>
      </div>
      
      <div className="space-y-4">
        {maintenanceTasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${statusColors[task.status]}`}>
                {statusIcons[task.status]}
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-900">{task.equipment}</h3>
                <p className="text-sm text-gray-500">{task.type}</p>
              </div>
            </div>
            <div className="flex items-center">
              <FiCalendar className="h-4 w-4 text-gray-400 mr-1" />
              <span className={`text-sm ${task.status === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                Due: {task.dueDate}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Last: {task.lastCompleted}
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                {task.status === 'completed' ? 'View' : 'Complete'}
              </button>
              <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                Reschedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};