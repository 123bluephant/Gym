import React from 'react';
import { User, Settings, Calendar, BarChart2, CreditCard, LogOut } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9F5F8]">
      {/* Header (you can reuse your existing header component here) */}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="bg-[#A856B2] p-4 rounded-full mb-4">
                  <User className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-[#A856B2]">Owner Name</h2>
                <p className="text-sm text-[#D4A4C8]">Gym Owner</p>
              </div>
              
              <nav className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-[#F4E1F0] text-[#A856B2]">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F4E1F0] hover:text-[#A856B2] text-[#6B7280]">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F4E1F0] hover:text-[#A856B2] text-[#6B7280]">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F4E1F0] hover:text-[#A856B2] text-[#6B7280]">
                  <BarChart2 className="h-5 w-5" />
                  <span>Analytics</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F4E1F0] hover:text-[#A856B2] text-[#6B7280]">
                  <CreditCard className="h-5 w-5" />
                  <span>Billing</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-[#F4E1F0] hover:text-[#A856B2] text-[#6B7280]">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h1 className="text-2xl font-semibold text-[#A856B2] mb-6">Profile Information</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">First Name</label>
                  <input
                    type="text"
                    defaultValue="Owner"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Name"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue="owner@gym.com"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Gym Name</label>
                  <input
                    type="text"
                    defaultValue="Elite Fitness Center"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Gym Location</label>
                  <input
                    type="text"
                    defaultValue="123 Fitness St, City"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Gym Type</label>
                  <select className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent">
                    <option>General Fitness</option>
                    <option>CrossFit</option>
                    <option>Yoga Studio</option>
                    <option>Martial Arts</option>
                    <option>Boxing Gym</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="px-6 py-2 bg-[#A856B2] text-white rounded-lg hover:bg-[#8C4695] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#A856B2] mb-6">Change Password</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B7280] mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button className="px-6 py-2 bg-[#A856B2] text-white rounded-lg hover:bg-[#8C4695] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};