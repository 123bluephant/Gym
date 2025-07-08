// components/layout/Sidebar.tsx
import { 
  FiHome, 
  FiUsers, 
  FiUserPlus, 
  FiCalendar, 
  FiDollarSign, 
  FiSettings, 
  FiPieChart,
  FiTool,
  FiFileText,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

type NavItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  subItems?: {
    name: string;
    path: string;
  }[];
};

export const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    // You can set some items to be expanded by default if needed
    // '/admin/members': true
  });

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: FiHome, path: '/admin' },
    { 
      name: 'Members', 
      icon: FiUsers, 
      path: '/admin/members',
      subItems: [
        { name: 'All Members', path: '/admin/members' },
        { name: 'New Members', path: '/admin/members/new' },
        { name: 'Attendance', path: '/admin/members/attendance' },
        { name: 'Progress', path: '/admin/members/progress' },
      ]
    },
    { 
      name: 'Staff', 
      icon: FiUserPlus, 
      path: '/admin/staff',
      subItems: [
        { name: 'Directory', path: '/admin/staff' },
        { name: 'Roles', path: '/admin/staff/roles' },
        { name: 'Schedules', path: '/admin/staff/schedules' },
        { name: 'Payroll', path: '/admin/staff/payroll' },
      ]
    },
    { 
      name: 'Classes', 
      icon: FiCalendar, 
      path: '/admin/classes',
      subItems: [
        { name: 'Schedule', path: '/admin/classes' },
        { name: 'Bookings', path: '/admin/classes/bookings' },
        { name: 'Waitlist', path: '/admin/classes/waitlist' },
      ]
    },
    { 
      name: 'Equipment', 
      icon: FiTool, 
      path: '/admin/equipment',
      subItems: [
        { name: 'Inventory', path: '/admin/equipment' },
        { name: 'Maintenance', path: '/admin/equipment/maintenance' },
      ]
    },
    { 
      name: 'Payments', 
      icon: FiDollarSign, 
      path: '/admin/payments',
      subItems: [
        { name: 'Transactions', path: '/admin/payments' },
        { name: 'Invoices', path: '/admin/payments/invoices' },
        { name: 'Revenue', path: '/admin/payments/revenue' },
      ]
    },
    { 
      name: 'Reports', 
      icon: FiPieChart, 
      path: '/admin/reports',
      subItems: [
        { name: 'Member Activity', path: '/admin/reports/member-activity' },
        { name: 'Class Attendance', path: '/admin/reports/class-attendance' },
        { name: 'Staff Performance', path: '/admin/reports/staff-performance' },
        { name: 'Financial Reports', path: '/admin/reports/financial' },
      ]
    },
    { 
      name: 'Website', 
      icon: FiFileText, 
      path: '/admin/website',
      subItems: [
        { name: 'Content', path: '/admin/website/content' },
        { name: 'Blog', path: '/admin/website/blog' },
        { name: 'Media', path: '/admin/website/media' },
      ]
    },
    { 
      name: 'Settings', 
      icon: FiSettings, 
      path: '/admin/settings',
      subItems: [
        { name: 'General', path: '/admin/settings/general' },
        { name: 'Memberships', path: '/admin/settings/memberships' },
        { name: 'System', path: '/admin/settings/system' },
      ]
    },
  ];

  const toggleItem = (path: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev[path]
    }));
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white shadow-lg transition duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-center h-16 px-4 bg-indigo-600">
        <h1 className="text-white font-bold text-xl">GYM ADMIN</h1>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => (
          <div key={item.name}>
            <div className="flex items-center justify-between">
              <Link
                to={item.path}
                className="flex items-center flex-1 px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                    toggleItem(item.path);
                  }
                }}
              >
                <item.icon className="h-5 w-5" />
                <span className="mx-3">{item.name}</span>
              </Link>
              
              {item.subItems && (
                <button
                  onClick={() => toggleItem(item.path)}
                  className="px-2 py-3 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {expandedItems[item.path] ? (
                    <FiChevronDown className="h-4 w-4" />
                  ) : (
                    <FiChevronRight className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
            
            {item.subItems && expandedItems[item.path] && (
              <div className="pl-14">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    to={subItem.path}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};