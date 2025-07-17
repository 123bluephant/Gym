import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminSidebar } from './components/layout/Sidebar';
import { AdminHeader } from './components/layout/Header';
import { Classes } from './Pages/Classes';
import { Dashboard } from './Pages/Dashboard';
import { Equipment } from './Pages/Equipment';
import { AdminMembers } from './Pages/Members';
import { Payments } from './Pages/Payments';
import { Reports } from './Pages/Reports';
import { Staff } from './Pages/Staff';
import { Website } from './Pages/Website';
import { Settings } from './Pages/Settings';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <Routes>
              <Route path="/" element={<Navigate to="/admin" replace />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/members" element={<AdminMembers />} />
              <Route path="/admin/classes" element={<Classes />} />
              <Route path="/admin/equipment" element={<Equipment />} />
              <Route path="/admin/payments" element={<Payments />} />
              <Route path="/admin/reports" element={<Reports />} />
              <Route path="/admin/website" element={<Website />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/staff" element={<Staff />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App