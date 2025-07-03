// src/pages/Analytics.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import MembersChart from '../components/Dashboard/MembersChart';
import RevenueChart from '../components/Dashboard/RevenueChart';
import SalesChart from '../components/Dashboard/SalesChart';
import { mockUsers } from '../Data/mockUsers';
import { mockTrainers } from '../Data/mockTrainers';
import { mockProducts, mockProductSales } from '../Data/mockProducts';
import { mockMeals } from '../Data/mockMeals';
import { mockWorkouts } from '../Data/MockWorkouts';
import { FiUser } from 'react-icons/fi';

const AnalyticsPage: React.FC = () => {
  // Existing mock data
  const memberData = [
    { month: 'Jan', count: 120 },
    { month: 'Feb', count: 145 },
    { month: 'Mar', count: 180 },
    { month: 'Apr', count: 210 },
    { month: 'May', count: 240 },
    { month: 'Jun', count: 275 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 8500 },
    { month: 'Feb', revenue: 9200 },
    { month: 'Mar', revenue: 10500 },
    { month: 'Apr', revenue: 11500 },
    { month: 'May', revenue: 12200 },
    { month: 'Jun', revenue: 12500 },
  ];

  const productSalesData = [
    { month: 'Jan', sales: 45 },
    { month: 'Feb', sales: 62 },
    { month: 'Mar', sales: 78 },
    { month: 'Apr', sales: 92 },
    { month: 'May', sales: 110 },
    { month: 'Jun', sales: 128 },
  ];

  // New analytics data for connected pages
  const activeUsers = mockUsers.filter(u => u.status === 'Active').length;
  const busyTrainers = mockTrainers.filter(t => t.status === 'Busy').length;
  const totalMeals = mockMeals.length;
  const beginnerWorkouts = mockWorkouts.filter(w => w.difficulty === 'Beginner').length;

  const membershipDistribution = [
    { type: 'Basic', count: mockUsers.filter(u => u.membershipType === 'Basic').length },
    { type: 'Premium', count: mockUsers.filter(u => u.membershipType === 'Premium').length },
    { type: 'VIP', count: mockUsers.filter(u => u.membershipType === 'VIP').length },
  ];

  const topSellingProducts = mockProducts
    .map(product => ({
      ...product,
      sales: mockProductSales.filter(sale => sale.productId === product.id).length
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/gym/members" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            View Members
          </Link>
          <Link 
            to="/gym/trainers" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            View Trainers
          </Link>
          <Link 
            to="/shop/manage-products" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            Manage Products
          </Link>
          <Link 
            to="/gym/meals" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            View Meals
          </Link>
          <Link 
            to="/gym/workouts" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
          >
            View Workouts
          </Link>
        </div>
      </div>
      
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <p className="text-2xl font-bold">{activeUsers}</p>
            </div>
            <Link 
              to="/gym/members" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Busy Trainers</p>
              <p className="text-2xl font-bold">{busyTrainers}</p>
            </div>
            <Link 
              to="/gym/trainers" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Meals</p>
              <p className="text-2xl font-bold">{totalMeals}</p>
            </div>
            <Link 
              to="/gym/meals" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Beginner Workouts</p>
              <p className="text-2xl font-bold">{beginnerWorkouts}</p>
            </div>
            <Link 
              to="/gym/workouts" 
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Membership Growth</h2>
          <MembersChart data={memberData.map(item => ({ ...item, type: 'Member' }))} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
          <RevenueChart data={revenueData} />
        </div>
      </div>
      
      {/* Secondary Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Top Selling Products</h2>
          <div className="space-y-3">
            {topSellingProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{index + 1}.</span>
                  <span>{product.name}</span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                  {product.sales} sales
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Membership Distribution</h2>
          <div className="space-y-2">
            {membershipDistribution.map(item => (
              <div key={item.type} className="flex justify-between">
                <span>{item.type}</span>
                <span>{item.count} ({Math.round((item.count / mockUsers.length) * 100)}%)</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Trainer Stats</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Trainers</span>
              <span>{mockTrainers.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Rating</span>
              <span>{(mockTrainers.reduce((sum, t) => sum + t.rating, 0) / mockTrainers.length).toFixed(1)}/5</span>
            </div>
            <div className="flex justify-between">
              <span>Average Clients</span>
              <span>{(mockTrainers.reduce((sum, t) => sum + t.clients, 0) / mockTrainers.length).toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Link to="/gym/members" className="text-blue-500 hover:text-blue-700 text-sm">
            View All Activity
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Example recent members */}
              {mockUsers.slice(0, 3).map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Member</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <FiUser className="text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.membershipType}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Example recent workouts */}
              {mockWorkouts.slice(0, 2).map(workout => (
                <tr key={workout.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Workout</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{workout.name}</div>
                    <div className="text-sm text-gray-500">{workout.difficulty}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Added recently
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;