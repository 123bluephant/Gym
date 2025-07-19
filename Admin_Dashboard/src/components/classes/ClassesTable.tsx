import { FiEdit, FiTrash2, FiEye, FiUser } from 'react-icons/fi';

type GymClass = {
  id: string;
  name: string;
  instructor: string;
  time: string;
  capacity: number;
  booked: number;
  status: 'scheduled' | 'completed' | 'cancelled';
};

export const ClassesTable = () => {
  const classes: GymClass[] = [
    {
      id: '1',
      name: 'Morning Yoga',
      instructor: 'Sarah Johnson',
      time: 'Mon, Wed, Fri 7:00 AM',
      capacity: 20,
      booked: 18,
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'HIIT Workout',
      instructor: 'Mike Smith',
      time: 'Tue, Thu 6:00 PM',
      capacity: 15,
      booked: 15,
      status: 'scheduled'
    },
    {
      id: '3',
      name: 'Zumba',
      instructor: 'Emily Wilson',
      time: 'Sat 10:00 AM',
      capacity: 25,
      booked: 22,
      status: 'scheduled'
    },
    {
      id: '4',
      name: 'Spin Class',
      instructor: 'David Brown',
      time: 'Sun 9:00 AM',
      capacity: 12,
      booked: 8,
      status: 'cancelled'
    },
  ];

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Instructor
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Schedule
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Attendance
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cls.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cls.instructor}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cls.time}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FiUser className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">
                    {cls.booked}/{cls.capacity}
                  </span>
                  <div className="ml-2 w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[cls.status]}`}>
                  {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                  <FiEye />
                </button>
                <button className="text-yellow-600 hover:text-yellow-900 mr-3">
                  <FiEdit />
                </button>
                <button className="text-red-600 hover:text-red-900">
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