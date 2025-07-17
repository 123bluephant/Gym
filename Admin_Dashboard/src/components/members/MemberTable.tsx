// components/members/MemberTable.tsx
import { useState } from 'react';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';

type Member = {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  status: 'active' | 'expired' | 'pending';
  lastVisit: string;
};

export const MemberTable = () => {
  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      membershipType: 'Premium',
      joinDate: '2023-01-15',
      status: 'active',
      lastVisit: '2023-06-20'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '(555) 987-6543',
      membershipType: 'Basic',
      joinDate: '2023-03-10',
      status: 'active',
      lastVisit: '2023-06-18'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      membershipType: 'Premium',
      joinDate: '2022-11-05',
      status: 'expired',
      lastVisit: '2023-05-15'
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      phone: '(555) 789-0123',
      membershipType: 'Basic',
      joinDate: '2023-06-01',
      status: 'pending',
      lastVisit: '2023-06-01'
    },
  ]);

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  const handleDelete = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Membership
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Visit
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
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
                    <div className="text-sm text-gray-500">Joined {member.joinDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{member.email}</div>
                <div className="text-sm text-gray-500">{member.phone}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.membershipType}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[member.status]}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {member.lastVisit}
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