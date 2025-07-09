// src/components/Layout/Sidebar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../../../atoms/UserAtom';

const Sidebar: React.FC = () => {
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
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full">
      <div>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Gym Dashboard</h1>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/gym"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/gym/members"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/gym/trainers"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Trainers
          </NavLink>
          <NavLink
            to="/gym/workouts"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Workouts
          </NavLink>
          <NavLink
            to="/gym/meals"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Meals
          </NavLink>
          
          <NavLink
            to="/gym/shop/manage"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            ManageProduct
          </NavLink>
          <NavLink
            to="/gym/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
            }
          >
            Settings
          </NavLink>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;