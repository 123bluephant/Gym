// src/pages/Users/List.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../Data/mockUsers';
import { FiEdit2, FiTrash2, FiPlus, FiUser, FiShoppingBag, FiSearch, FiChevronDown } from 'react-icons/fi';
import { User } from '../../types/gymTypes';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = () => {
      try {
        const savedUsers = localStorage.getItem('gymUsers');
        if (savedUsers && JSON.parse(savedUsers).length > 0) {
          setUsers(JSON.parse(savedUsers));
        } else {
          setUsers(mockUsers);
          localStorage.setItem('gymUsers', JSON.stringify(mockUsers));
        }
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers(mockUsers);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.membershipType.toLowerCase() === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const membershipTypes = ['all', ...new Set(users.map(user => user.membershipType.toLowerCase()))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filteredUsers.length} {filteredUsers.length === 1 ? 'member' : 'members'} found
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search members..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative flex-1 min-w-[180px]">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {membershipTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Memberships' : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <FiChevronDown className="text-gray-400" />
            </div>
          </div>

          <button
            onClick={() => navigate('/gym/members/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <FiPlus className="text-lg" /> Add Member
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center border border-gray-200">
          <div className="max-w-md mx-auto">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery ? 'Try adjusting your search or filter' : 'Get started by adding a new member'}
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setUsers(mockUsers);
                  localStorage.setItem('gymUsers', JSON.stringify(mockUsers));
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiPlus className="mr-2" /> Load Sample Data
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              onClick={() => navigate(`/gym/members/view/${user.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group transform hover:-translate-y-1"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-blue-600 text-xl" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Membership</p>
                    <p className="font-medium text-gray-800 mt-1">{user.membershipType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Status</p>
                    <span className={`mt-1 px-2.5 py-0.5 inline-flex text-xs leading-4 font-medium rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Joined</p>
                    <p className="font-medium text-gray-800 mt-1">{new Date(user.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider">Last Active</p>
                    <p className="font-medium text-gray-800 mt-1">
                      {user.lastCheckIn ? new Date(user.lastCheckIn).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/members/meals/${user.id}`);
                      }}
                      className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors"
                      title="Manage Meals"
                    >
                      <FiShoppingBag size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/members/edit/${user.id}`);
                      }}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-50 transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(user.id, e)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersList;