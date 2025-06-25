import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#FFFFFF] border-b border-[#D4A4C8] px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-[#A856B2]">"Welcome back, Owner!</h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#000000] h-4 w-5" />
            <input
              type="text"
              placeholder="Search members, type-a..."
              className="pl-10 pr-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent w-64"
            />
          </div>

          <button className="relative p-2 text-[#000000] hover:text-[#A856B2] hover:bg-[#F4E1F0] rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 bg-[#A856B2] rounded-full"></span>
          </button>

          <div className="flex items-center space-x-3">
            <div className="bg-[#A856B2] p-2 rounded-full">
              <User className="h-5 w-5 text-[#FFFFFF]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#000000]">"Admin Text</p>
              <p className="text-xs text-[#D4A4C8]">"Gym Type Class</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};