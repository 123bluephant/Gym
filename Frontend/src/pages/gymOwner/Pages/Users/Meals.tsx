// src/pages/Users/List.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../../Data/mockUsers';
import { FiEdit2, FiTrash2, FiPlus, FiUser, FiCoffee } from 'react-icons/fi';
import { User, Meal } from '../../types/gymTypes';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  // Calculate meal summary for a user
  const calculateMealSummary = (userMeals: Meal[] = []) => {
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = userMeals.filter(meal => meal.date === today);
    
    return {
      todayCalories: todayMeals.reduce((sum, meal) => sum + (meal.calories || 0), 0),
      todayMeals: todayMeals.length,
      lastMealDate: userMeals.length > 0 
        ? new Date(Math.max(...userMeals.map(m => new Date(m.date).getTime())))
          .toLocaleDateString() 
        : undefined
    };
  };

  // Load users with meal summaries
  useEffect(() => {
    const loadUsers = () => {
      try {
        const savedUsers = localStorage.getItem('gymUsers');
        
        if (savedUsers && JSON.parse(savedUsers).length > 0) {
          const usersWithMeals: User[] = JSON.parse(savedUsers);
          const usersWithSummaries = usersWithMeals.map(user => ({
            ...user,
            mealSummary: calculateMealSummary(user.meals)
          }));
          setUsers(usersWithSummaries);
        } else {
          const mockUsersWithSummaries = mockUsers.map(user => ({
            ...user,
            mealSummary: calculateMealSummary(user.meals)
          }));
          setUsers(mockUsersWithSummaries);
          localStorage.setItem('gymUsers', JSON.stringify(mockUsersWithSummaries));
        }
      } catch (error) {
        console.error('Error loading users:', error);
        const mockUsersWithSummaries = mockUsers.map(user => ({
          ...user,
          mealSummary: calculateMealSummary(user.meals)
        }));
        setUsers(mockUsersWithSummaries);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem('gymUsers', JSON.stringify(updatedUsers));
    }
  };

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.membershipType.toLowerCase() === filter);

  const membershipTypes = ['all', ...new Set(users.map(user => user.membershipType.toLowerCase()))];

  if (loading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">User Management</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 w-full"
            >
              {membershipTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All Memberships' : type}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => navigate('/gym/members/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FiPlus /> Add User
          </button>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <p className="text-gray-500 mb-4">No users found</p>
          <button
            onClick={() => {
              const mockUsersWithSummaries = mockUsers.map(user => ({
                ...user,
                mealSummary: calculateMealSummary(user.meals)
              }));
              setUsers(mockUsersWithSummaries);
              localStorage.setItem('gymUsers', JSON.stringify(mockUsersWithSummaries));
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <FiPlus /> Load Mock Data
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredUsers.map(user => (
            <div 
              key={user.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <FiUser className="text-gray-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold truncate">{user.name}</h3>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
                
                {/* Meal Summary Card */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <FiCoffee size={14} /> Meals Today
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      user.mealSummary?.todayMeals 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.mealSummary?.todayMeals || 0}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-gray-500">Calories</p>
                      <p className="font-medium">
                        {user.mealSummary?.todayCalories || 0} kcal
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Meal</p>
                      <p className="font-medium truncate">
                        {user.mealSummary?.lastMealDate || 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* User Details */}
                <div className="grid grid-cols-2 gap-2 my-3 text-sm">
                  <div>
                    <p className="text-gray-500">Membership</p>
                    <p className="font-medium">{user.membershipType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Status</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Active</p>
                    <p className="font-medium">
                      {user.lastCheckIn ? new Date(user.lastCheckIn).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/gym/members/view/${user.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/members/meals/${user.id}`);
                      }}
                      className={`p-1 ${
                        user.mealSummary?.todayMeals 
                          ? 'text-green-600 hover:text-green-800' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      title="Manage Meals"
                    >
                      <FiCoffee size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/members/edit/${user.id}`);
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
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