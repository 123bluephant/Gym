// src/components/Layout/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userAtom from '../../../../atoms/UserAtom';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user] = useRecoilState(userAtom);

  return (
    <header className="bg-white shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Sidebar toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h2 className="ml-2 text-lg font-medium text-gray-900">
              Welcome back, {user?.username}
            </h2>
          </div>

          {/* Right section - User controls */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none">
              <BellIcon className="h-6 w-6" />
            </button>
            
            <div className="relative">
              <button
                onClick={() => navigate('/gym/profile')}
                className="flex items-center space-x-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">
                    {user?.username?.[0]?.toUpperCase()}
                  </span>
                </div>
                <span className="hidden md:inline text-gray-700 group-hover:text-gray-900">
                  {user?.username}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;