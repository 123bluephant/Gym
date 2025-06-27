import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { AddUserModal } from '../modals/AddUserModal';

export const UserManagement: React.FC = () => {
  const { users, trainers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getTrainerName = (trainerId?: string) => {
    if (!trainerId) return 'Unassigned';
    const trainer = trainers.find(t => t.id === trainerId);
    return trainer ? trainer.name : 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000000]">Member Management</h2>
          <p className="text-[#D4A4C8]">Manage your gym members and their details</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#A856B2] hover:bg-[#D4A4C8] text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#D4A4C8]">
        <div className="p-6 border-b border-[#D4A4C8]">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#000000] h-4 w-4" />
              <input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-[#D4A4C8]" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-[#D4A4C8] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F4E1F0]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                  Trainer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#000000] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#FFFFFF] divide-y divide-[#D4A4C8]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#F4E1F0]">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-[#A856B2] p-2 rounded-full mr-3">
                        <UserPlus className="h-4 w-4 text-[#FFFFFF]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#000000]">{user.name}</div>
                        <div className="text-sm text-[#D4A4C8]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.membershipType === 'VIP' 
                        ? 'bg-[#A856B2] text-[#FFFFFF]'
                        : user.membershipType === 'Premium'
                        ? 'bg-[#D4A4C8] text-[#FFFFFF]'
                        : 'bg-[#F4E1F0] text-[#000000]'
                    }`}>
                      {user.membershipType}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-[#D4A4C8] text-[#FFFFFF]'
                        : user.status === 'Suspended'
                        ? 'bg-[#F4E1F0] text-[#000000]'
                        : 'bg-[#F4E1F0] text-[#000000]'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#000000]">
                    {getTrainerName(user.trainerId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#D4A4C8]">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-[#A856B2] hover:text-[#D4A4C8]">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-[#D4A4C8] hover:text-[#A856B2]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-[#D4A4C8] mx-auto mb-4" />
            <p className="text-[#D4A4C8]">No members found matching your criteria.</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddUserModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};