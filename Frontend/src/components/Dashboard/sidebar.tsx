import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from '../../atoms/UserAtom';
import {
  User, Settings, Activity,
  Award, Dumbbell, Home,
  Utensils, LogOut, Menu, X,
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
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Auto-close sidebar when resizing to mobile if it was open
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // Initialize based on current screen size
    handleResize();
    
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
    { id: 'workouts', name: 'Workouts', icon: Dumbbell, path: '/workouts' },
    { id: 'activity', name: 'Activity', icon: Activity, path: '/activity' },
    { id: 'analytics', name: 'Analytics', icon: FileBarChart, path: '/analytics' },
    { id: 'achievements', name: 'Achievements', icon: Award, path: '/achievements' },
  ];

  const bottomTabs: Tab[] = [
    { id: 'settings', name: 'Settings', icon: Settings, path: '/settings' },
  ];

  // Close sidebar when a link is clicked on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-indigo-700 text-white"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed h-full w-64 bg-indigo-700 text-white flex flex-col z-40 transition-all duration-300 ease-in-out
          ${isMobile ? (isOpen ? 'left-0' : '-left-64') : 'left-0'}`}
      >
        <div className="p-4 border-b border-indigo-600">
          <h1 className="text-xl font-bold">FitTrack</h1>
        </div>
        
        <nav className="flex-1 flex flex-col p-2 overflow-y-auto">
          <div className="flex-1">
            {mainTabs.map((tab) => (
              <Link
                key={tab.id}
                to={tab.path}
                onClick={handleLinkClick}
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
                onClick={handleLinkClick}
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
              onClick={() => {
                handleLogout();
                handleLinkClick();
              }}
              className="w-full flex items-center p-3 rounded-md text-indigo-200 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;