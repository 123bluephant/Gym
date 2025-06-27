import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Link } from 'react-router-dom'; // or your preferred routing solution

export const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-[#D4A4C8] px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#A856B2]">Welcome back, Owner!</h2>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] h-5 w-5" />
            <input
              type="text"
              placeholder="Search members, classes..."
              className="pl-10 pr-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent w-64 text-[#6B7280] focus:outline-none"
            />
          </div>

          <button className="relative p-2 text-[#6B7280] hover:text-[#A856B2] hover:bg-[#F4E1F0] rounded-lg transition-colors">
            <Bell className="h-6 w-6" />
            <span className="absolute top-2 right-2 block h-2 w-2 bg-[#A856B2] rounded-full"></span>
          </button>

          <Link to="/profile" className="flex items-center space-x-3 group">
            <div className="bg-[#A856B2] p-2 rounded-full group-hover:bg-[#8C4695] transition-colors">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-[#111827]">Admin User</p>
              <p className="text-xs text-[#6B7280]">Gym Owner</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};