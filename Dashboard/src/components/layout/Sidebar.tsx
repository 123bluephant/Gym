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

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', name: 'Members', icon: Users },
  { id: 'workouts', name: 'Workouts', icon: Dumbbell },
  { id: 'diets', name: 'Diet Plans', icon: Utensils },
  { id: 'trainers', name: 'Trainers', icon: UserCheck },
  { id: 'analytics', name: 'Analytics', icon: TrendingUp },
];

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  return (
    <div className="bg-[#000000] text-[#FFFFFF] w-64 min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#D4A4C8]">
        <div className="flex items-center space-x-3">
          <div className="bg-[#A856B2] p-2 rounded-lg">
            <Dumbbell className="h-6 w-6 text-[#FFFFFF]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#FFFFFF]">Fitflow Gym</h1>
            <p className="text-[#D4A4C8] text-sm">Owner Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-[#A856B2] text-[#FFFFFF] shadow-lg'
                  : 'text-[#D4A4C8] hover:bg-[#F4E1F0] hover:text-[#000000]'
              }`}
            >
              <Icon className={`h-5 w-5 mr-3 ${
                isActive ? 'text-[#FFFFFF]' : 'text-[#D4A4C8] group-hover:text-[#000000]'
              }`} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#D4A4C8] space-y-2">
        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg text-[#D4A4C8] hover:bg-[#F4E1F0] hover:text-[#000000] transition-all duration-200">
          <Settings className="h-5 w-5 mr-3 text-[#D4A4C8]" />
          <span className="font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center px-4 py-3 text-left rounded-lg text-[#D4A4C8] hover:bg-[#F4E1F0] hover:text-[#000000] transition-all duration-200">
          <LogOut className="h-5 w-5 mr-3 text-[#D4A4C8]" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};