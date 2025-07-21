import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Calendar, 
  Dumbbell, 
  CreditCard, 
  FileText, 
  Globe, 
  Settings,
  ChevronDown,
  ChevronRight,
  UserPlus,
  UserMinus,
  CalendarPlus,
  CalendarCheck,
  Wrench,
  Zap,
  DollarSign,
  Receipt,
  BarChart3,
  PieChart,
  Monitor,
  Smartphone,
  Cog,
  Building2,
  MapPin,
  Clock,
  Shield,
  Camera,
  Plus
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  path?: string;
  subItems?: { icon: React.ElementType; label: string; path: string }[];
  action?: { icon: React.ElementType; label: string; path: string };
}

const Sidebar: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    'Gym Management', 'Members', 'Staff', 'Classes', 'Equipment', 'Payments', 'Reports', 'Website', 'Settings'
  ]);

  const sidebarItems: SidebarItem[] = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Building2,
      label: 'Gym Management',
      subItems: [
        { icon: MapPin, label: 'All Locations', path: '/gym-locations' },
        { icon: Clock, label: 'Operating Hours', path: '/gym-management/hours' },
        { icon: Shield, label: 'Access Control', path: '/gym-management/access' },
        { icon: Camera, label: 'Security System', path: '/gym-management/security' }
      ],
      action: { icon: Plus, label: 'Add Location', path: '/gym-locations/add' }
    },
    {
      icon: Users,
      label: 'Members',
      subItems: [
        { icon: UserPlus, label: 'Add Member', path: '/members/add' },
        { icon: Users, label: 'All Members', path: '/members/all' },
        { icon: UserCheck, label: 'Active Members', path: '/members/active' },
        { icon: UserMinus, label: 'Inactive Members', path: '/members/inactive' }
      ]
    },
    {
      icon: UserCheck,
      label: 'Staff',
      subItems: [
        { icon: UserPlus, label: 'Add Staff', path: '/staff/add' },
        { icon: Users, label: 'All Staff', path: '/staff/all' },
        { icon: Calendar, label: 'Staff Schedule', path: '/staff/schedule' },
        { icon: DollarSign, label: 'Payroll', path: '/staff/payroll' }
      ]
    },
    {
      icon: Calendar,
      label: 'Classes',
      subItems: [
        { icon: CalendarPlus, label: 'Schedule Class', path: '/classes/schedule' },
        { icon: Calendar, label: 'All Classes', path: '/classes/all' },
        { icon: CalendarCheck, label: 'Today\'s Classes', path: '/classes/today' },
        { icon: Users, label: 'Class Bookings', path: '/classes/bookings' }
      ]
    },
    {
      icon: Dumbbell,
      label: 'Equipment',
      subItems: [
        { icon: Dumbbell, label: 'All Equipment', path: '/equipment/all' },
        { icon: Wrench, label: 'Maintenance', path: '/equipment/maintenance' },
        { icon: Zap, label: 'Status Monitor', path: '/equipment/status' },
        { icon: Calendar, label: 'Service Schedule', path: '/equipment/service' }
      ]
    },
    {
      icon: CreditCard,
      label: 'Payments',
      subItems: [
        { icon: DollarSign, label: 'Revenue', path: '/payments/revenue' },
        { icon: Receipt, label: 'Invoices', path: '/payments/invoices' },
        { icon: CreditCard, label: 'Payment Methods', path: '/payments/methods' },
        { icon: Calendar, label: 'Due Payments', path: '/payments/due' }
      ]
    },
    {
      icon: FileText,
      label: 'Reports',
      subItems: [
        { icon: BarChart3, label: 'Revenue Reports', path: '/reports/revenue' },
        { icon: PieChart, label: 'Member Analytics', path: '/reports/members' },
        { icon: Calendar, label: 'Class Reports', path: '/reports/classes' },
        { icon: Dumbbell, label: 'Equipment Usage', path: '/reports/equipment' }
      ]
    },
    {
      icon: Globe,
      label: 'Website',
      subItems: [
        { icon: Monitor, label: 'Website Builder', path: '/website/builder' },
        { icon: Smartphone, label: 'Mobile App', path: '/website/app' },
        { icon: Settings, label: 'SEO Settings', path: '/website/seo' },
        { icon: FileText, label: 'Content Management', path: '/website/content' }
      ]
    },
    {
      icon: Settings,
      label: 'Settings',
      subItems: [
        { icon: Cog, label: 'General Settings', path: '/settings/general' },
        { icon: Users, label: 'User Permissions', path: '/settings/permissions' },
        { icon: Globe, label: 'Integration', path: '/settings/integration' },
        { icon: FileText, label: 'Backup & Restore', path: '/settings/backup' }
      ]
    }
  ];

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 h-screen overflow-y-auto sticky top-0">
      <div className="p-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.label}>
              {item.path ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      expandedItems.includes(item.label) 
                        ? 'text-gray-900 bg-gray-50' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.subItems && (
                      expandedItems.includes(item.label) 
                        ? <ChevronDown className="w-4 h-4" />
                        : <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  
                  {item.subItems && expandedItems.includes(item.label) && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) => 
                            `w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive ? 'bg-purple-50 text-purple-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`
                          }
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </NavLink>
                      ))}
                      {item.action && (
                        <NavLink
                          to={item.action.path}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors text-purple-600 hover:bg-purple-50"
                        >
                          <item.action.icon className="w-4 h-4" />
                          <span>{item.action.label}</span>
                        </NavLink>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;