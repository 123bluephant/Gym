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
      path: 'admin/payments',
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