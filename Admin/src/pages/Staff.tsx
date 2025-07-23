import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Mail, Phone, Calendar, Clock, DollarSign } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  schedule: string;
}

const Staff: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [staff, setStaff] = useState<StaffMember[]>([
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex.johnson@fitflow.com',
      phone: '+1 (555) 111-2222',
      role: 'Personal Trainer',
      department: 'Training',
      hireDate: '2023-06-15',
      salary: 45000,
      status: 'active',
      schedule: 'Mon-Fri 9AM-5PM'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@fitflow.com',
      phone: '+1 (555) 222-3333',
      role: 'Fitness Instructor',
      department: 'Classes',
      hireDate: '2023-08-01',
      salary: 38000,
      status: 'active',
      schedule: 'Tue-Sat 6AM-2PM'
    },
    {
      id: '3',
      name: 'David Chen',
      email: 'david.chen@fitflow.com',
      phone: '+1 (555) 333-4444',
      role: 'Gym Manager',
      department: 'Management',
      hireDate: '2022-03-10',
      salary: 65000,
      status: 'active',
      schedule: 'Mon-Fri 8AM-6PM'
    },
    {
      id: '4',
      name: 'Lisa Thompson',
      email: 'lisa.thompson@fitflow.com',
      phone: '+1 (555) 444-5555',
      role: 'Nutritionist',
      department: 'Wellness',
      hireDate: '2023-09-20',
      salary: 52000,
      status: 'on-leave',
      schedule: 'Mon-Wed-Fri 10AM-6PM'
    }
  ]);

  const handleAddStaff = () => {
    const newStaff: StaffMember = {
      id: String(staff.length + 1),
      name: 'New Staff Member',
      email: 'new.staff@fitflow.com',
      phone: '+1 (555) 000-0000',
      role: 'Staff',
      department: 'General',
      hireDate: new Date().toISOString().split('T')[0],
      salary: 35000,
      status: 'active',
      schedule: 'Mon-Fri 9AM-5PM'
    };
    setStaff([...staff, newStaff]);
    alert('New staff member added successfully!');
  };

  const handleEditStaff = (staffId: string) => {
    alert(`Edit staff functionality for ID: ${staffId}`);
  };

  const handleDeleteStaff = (staffId: string) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      setStaff(staff.filter(member => member.id !== staffId));
      alert('Staff member removed successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Gym Manager': return 'bg-purple-100 text-purple-800';
      case 'Personal Trainer': return 'bg-blue-100 text-blue-800';
      case 'Fitness Instructor': return 'bg-green-100 text-green-800';
      case 'Nutritionist': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredStaff = staff.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage your gym staff and their schedules</p>
        </div>
        <button 
          onClick={handleAddStaff}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search staff members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-lg">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                    {member.role}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEditStaff(member.id)}
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteStaff(member.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Hired: {new Date(member.hireDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{member.schedule}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>${member.salary.toLocaleString()}/year</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Department</span>
              <span className="text-sm text-gray-600">{member.department}</span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                {member.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staff;