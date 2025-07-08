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
  FiServer
} from 'react-icons/fi';

type SidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
};

export const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const navItems = [
    { name: 'Dashboard', icon: FiHome, path: '/' },
    { 
      name: 'Members', 
      icon: FiUsers, 
      path: '/members',
      subItems: [
        { name: 'All Members', path: '/members' },
        { name: 'New Members', path: '/members/new' },
        { name: 'Attendance', path: '/members/attendance' },
        { name: 'Progress', path: '/members/progress' },
      ]
    },
    { 
      name: 'Staff', 
      icon: FiUserPlus, 
      path: '/staff',
      subItems: [
        { name: 'Directory', path: '/staff' },
        { name: 'Roles', path: '/staff/roles' },
        { name: 'Schedules', path: '/staff/schedules' },
        { name: 'Payroll', path: '/staff/payroll' },
      ]
    },
    { 
      name: 'Classes', 
      icon: FiCalendar, 
      path: '/classes',
      subItems: [
        { name: 'Schedule', path: '/classes' },
        { name: 'Bookings', path: '/classes/bookings' },
        { name: 'Waitlist', path: '/classes/waitlist' },
      ]
    },
    { 
      name: 'Equipment', 
      icon: FiTool, 
      path: '/equipment',
      subItems: [
        { name: 'Inventory', path: '/equipment' },
        { name: 'Maintenance', path: '/equipment/maintenance' },
      ]
    },
    { 
      name: 'Payments', 
      icon: FiDollarSign, 
      path: '/payments',
      subItems: [
        { name: 'Transactions', path: '/payments' },
        { name: 'Invoices', path: '/payments/invoices' },
        { name: 'Revenue', path: '/payments/revenue' },
      ]
    },
    { 
      name: 'Reports', 
      icon: FiPieChart, 
      path: '/reports' 
    },
    { 
      name: 'Website', 
      icon: FiFileText, 
      path: '/website',
      subItems: [
        { name: 'Content', path: '/website/content' },
        { name: 'Blog', path: '/website/blog' },
        { name: 'Media', path: '/website/media' },
      ]
    },
    { 
      name: 'Settings', 
      icon: FiSettings, 
      path: '/settings',
      subItems: [
        { name: 'General', path: '/settings' },
        { name: 'Memberships', path: '/settings/memberships' },
        { name: 'System', path: '/settings/system' },
      ]
    },
  ];

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
            <a
              href={item.path}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <item.icon className="h-5 w-5" />
              <span className="mx-3">{item.name}</span>
            </a>
            
            {item.subItems && (
              <div className="pl-14">
                {item.subItems.map((subItem) => (
                  <a
                    key={subItem.name}
                    href={subItem.path}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};