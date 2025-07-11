// src/components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../../../atoms/UserAtom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-30 w-64 h-full bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out
          ${isOpen ? 'left-0' : '-left-64 lg:left-0'}`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h1 className="text-2xl font-bold">Gym Dashboard</h1>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-white hover:bg-gray-700 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="hidden lg:block p-4">
          <h1 className="text-2xl font-bold">Gym Dashboard</h1>
        </div>
        
        <nav className="mt-6 flex-1">
          {[
            { to: "/gym", label: "Dashboard" },
            { to: "/gym/members", label: "Users" },
            { to: "/gym/trainers", label: "Trainers" },
            { to: "/gym/workouts", label: "Workouts" },
            { to: "/gym/meals", label: "Meals" },
            { to: "/gym/shop/manage", label: "ManageProduct" },
            { to: "/gym/settings", label: "Settings" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;