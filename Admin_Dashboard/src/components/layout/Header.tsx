// components/layout/Header.tsx
import { FiBell, FiSearch, FiMenu, FiLogOut } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import gymLogo from '../../assests/gym-logo.png'; // Add your logo

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const AdminHeader = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'New member registration', time: '10 min ago' },
    { id: 2, text: 'Class booking confirmed', time: '1 hour ago' },
    { id: 3, text: 'Payment received', time: '2 hours ago' },
  ];

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            className="text-gray-500 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu className="h-6 w-6" />
          </button>
          <img src={gymLogo} alt="Gym Logo" className="h-8 ml-4" />
          <div className="relative mx-4 lg:mx-0">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <FiSearch className="h-5 w-5 text-gray-500" />
            </span>
            <input
              className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
              type="text"
              placeholder="Search members, classes..."
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button 
              className="p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <FiBell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-20">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 text-gray-700 font-medium">
                    Notifications
                  </div>
                  {notifications.map(notification => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm text-gray-700">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center text-sm text-indigo-600 font-medium">
                    View All
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <span className="font-medium">A</span>
              </div>
              <span className="hidden md:inline-block font-medium">Admin</span>
              <FaChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${profileOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                  <div className="border-t border-gray-100"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <FiLogOut className="mr-2" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};