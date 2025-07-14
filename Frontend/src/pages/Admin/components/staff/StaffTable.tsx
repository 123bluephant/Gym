// components/staff/StaffTable.tsx
import { useState } from 'react';
import { FiEdit, FiTrash2, FiEye, FiClock } from 'react-icons/fi';

type Staff = {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  hireDate: string;
  status: 'active' | 'on leave' | 'terminated';
  nextShift: string;
};

export const StaffTable = () => {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      role: 'Head Trainer',
      email: 'alex@example.com',
      phone: '(555) 123-4567',
      hireDate: '2021-05-15',
      status: 'active',
      nextShift: 'Today, 9:00 AM'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      role: 'Yoga Instructor',
      email: 'maria@example.com',
      phone: '(555) 987-6543',
      hireDate: '2022-02-10',
      status: 'active',
      nextShift: 'Today, 5:30 PM'
    },
    {
      id: '3',
      name: 'David Kim',
      role: 'Reception',
      email: 'david@example.com',
      phone: '(555) 456-7890',
      hireDate: '2022-08-05',
      status: 'on leave',
      nextShift: 'June 25, 8:00 AM'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      role: 'Personal Trainer',
      email: 'sarah@example.com',
      phone: '(555) 789-0123',
      hireDate: '2023-01-20',
      status: 'active',
      nextShift: 'Tomorrow, 7:00 AM'
    },
  ]);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    'on leave': 'bg-yellow-100 text-yellow-800',
    terminated: 'bg-red-100 text-red-800',
  };

  const handleDelete = (id: string) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Staff Member
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Next Shift
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staff.map((member) => (
            <tr key={member.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">Hired {member.hireDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{member.email}</div>
                <div className="text-sm text-gray-500">{member.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[member.status]}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <FiClock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">{member.nextShift}</span>
                </div>
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
                  onClick={() => handleDelete(member.id)}
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