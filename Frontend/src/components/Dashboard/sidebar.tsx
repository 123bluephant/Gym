import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/UserAtom';
import {
  User, Settings, Activity,
  Award, Dumbbell, Home,
  Utensils, LogOut,
  AlignVerticalJustifyStartIcon,
  FileBarChart
} from 'lucide-react';

interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();
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

  const mainTabs: Tab[] = [
    { id: 'profile', name: 'Profile', icon: User, path: '/profile' },
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'activity', name: 'Activity', icon: Activity, path: '/activity' },
    { id: 'analytics', name: 'Analytics', icon: FileBarChart, path: '/analytics' },
    { id: 'achievements', name: 'Achievements', icon: Award, path: '/achievements' },
  ];

  const bottomTabs: Tab[] = [
    { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="fixed h-full w-64 bg-indigo-700 text-white flex flex-col z-10">
      <div className="p-4 border-b border-indigo-600">
        <h1 className="text-xl font-bold">FitTrack</h1>
      </div>
      
      <nav className="flex-1 flex flex-col p-2 overflow-y-auto">
        <div className="flex-1">
          {mainTabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex items-center p-3 rounded-md transition-colors ${
                location.pathname === tab.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="ml-3">{tab.name}</span>
            </Link>
          ))}
        </div>

        <div className="mt-auto">
          {bottomTabs.map((tab) => (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex items-center p-3 rounded-md transition-colors ${
                location.pathname === tab.path
                  ? 'bg-indigo-600 text-white'
                  : 'text-indigo-200 hover:bg-indigo-600 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="ml-3">{tab.name}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-md text-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;