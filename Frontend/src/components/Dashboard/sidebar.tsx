import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/UserAtom';
import {
  User, Settings, Activity,
  Award, Dumbbell, Home,
  FileBarChart, LogOut, Menu, X
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, start collapsed; on desktop, start expanded
      setIsCollapsed(mobile);
    };

    // Set initial state
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    { id: 'workouts', name: 'Add Workouts', icon: Dumbbell, path: '/workouts/add' },
    { id: 'activity', name: 'Activity', icon: Activity, path: '/activity' },
    { id: 'analytics', name: 'Analytics', icon: FileBarChart, path: '/analytic' },
    { id: 'achievements', name: 'Achievements', icon: Award, path: '/achievements' },
  ];

  const bottomTabs: Tab[] = [
    { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`fixed h-full ${isCollapsed ? 'w-16' : 'w-64'} bg-indigo-700 text-white flex flex-col z-10 transition-all duration-300 ease-in-out`}>
      <div className={`p-4 border-b border-indigo-600 flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center`}>
        {!isCollapsed && <h1 className="text-xl font-bold">FitTrack</h1>}
        <button 
          onClick={toggleCollapse} 
          className="text-white hover:text-indigo-200 focus:outline-none"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
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
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? tab.name : undefined}
            >
              <tab.icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{tab.name}</span>}
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
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? tab.name : undefined}
            >
              <tab.icon className="w-5 h-5" />
              {!isCollapsed && <span className="ml-3">{tab.name}</span>}
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center p-3 rounded-md text-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;