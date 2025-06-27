import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  Utensils, 
  UserCheck, 
  TrendingUp,
  Settings,
  LogOut
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavigationItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavigation: NavigationItem[] = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', name: 'Members', icon: Users },
  { id: 'workouts', name: 'Workouts', icon: Dumbbell },
  { id: 'diets', name: 'Diet Plans', icon: Utensils },
  { id: 'trainers', name: 'Trainers', icon: UserCheck },
  { id: 'analytics', name: 'Analytics', icon: TrendingUp },
];

const settingsNavigation: NavigationItem[] = [
  { id: 'settings', name: 'Settings', icon: Settings },
  { id: 'logout', name: 'Logout', icon: LogOut },
];

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const handleNavigation = (id: string) => setCurrentView(id);

  const renderNavItem = (item: NavigationItem, isActive: boolean) => (
    <li key={item.id}>
      <button
        onClick={() => handleNavigation(item.id)}
        className={`
          w-full flex items-center px-4 py-3 rounded-lg transition-all 
          duration-300 ease-in-out
          ${isActive 
            ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
      >
        <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
        <span className="flex-1 text-left">{item.name}</span>
        {isActive && (
          <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
        )}
      </button>
    </li>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 w-64 min-h-screen flex flex-col border-r border-gray-200 shadow-sm">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg flex-shrink-0 shadow-md">
            <Dumbbell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">FitFlow Gym</h1>
            <p className="text-indigo-600 text-sm font-medium">Owner Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {mainNavigation.map(item => 
            renderNavItem(item, currentView === item.id)
          )}
        </ul>
      </nav>

      {/* Settings & Logout Section */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <ul className="space-y-2">
          {settingsNavigation.map(item => 
            renderNavItem(item, currentView === item.id)
          )}
        </ul>
      </div>
    </div>
  );
};