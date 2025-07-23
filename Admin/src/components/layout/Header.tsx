import React from 'react';
import { ShoppingCart, User, LogOut, Bell } from 'lucide-react';
import logo from '../../assests/gym-logo.png'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            {/* Replace with your actual image path */}
            <img
              src={logo}
              alt="FitFlow Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-gray-900">FitFlow</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">2</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;