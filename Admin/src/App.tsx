import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/Dashbaord';
import GymLocations from './pages/gym/GymLocations';
import Members from './pages/Members';
import Staff from './pages/Staff';
import Classes from './pages/Classes';
import {Equipment} from './pages/Equipment';
import Payments from './pages/Payments';
import Reports from './pages/Reports';
import Website from './pages/Website';
import Settings from './pages/Settings';
import AddGymLocation from './pages/gym/AddGymLocation';
import EditGymLocation from './pages/gym/EditGymLocation';
import { MaintenanceSchedule } from './components/equipment/MaintenanceSchedule';
import { AddEquipmentForm } from './components/equipment/AddEquipmentForm';
import { EditEquipmentForm } from './components/equipment/EditEquipmentForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* Gym Management Routes */}
              <Route path="/gym-locations" element={<GymLocations />} />
              <Route path="/gym-locations" element={<GymLocations />} />
              <Route path="/gym-locations/add" element={<AddGymLocation />} />
              <Route path="/gym-locations/edit/:id" element={<EditGymLocation />} />
              {/* Members Routes */}
              <Route path="/members" element={<Members />} />
              <Route path="/members/add" element={<Members />} />
              <Route path="/members/all" element={<Members />} />
              <Route path="/members/active" element={<Members />} />
              <Route path="/members/inactive" element={<Members />} />

              {/* Staff Routes */}
              <Route path="/staff" element={<Staff />} />
              <Route path="/staff/add" element={<Staff />} />
              <Route path="/staff/all" element={<Staff />} />
              <Route path="/staff/schedule" element={<Staff />} />
              <Route path="/staff/payroll" element={<Staff />} />

              {/* Classes Routes */}
              <Route path="/classes" element={<Classes />} />
              <Route path="/classes/schedule" element={<Classes />} />
              <Route path="/classes/all" element={<Classes />} />
              <Route path="/classes/today" element={<Classes />} />
              <Route path="/classes/bookings" element={<Classes />} />

              {/* Equipment Routes */}
              <Route path="/equipment" element={<Equipment />} />
              <Route path="/equipment/all" element={<Equipment />} />
              <Route path="/equipment/maintenance" element={<MaintenanceSchedule />} />
              <Route path="/equipment/add" element={<AddEquipmentForm />} />
<Route path="/equipment/edit/:id" element={<EditEquipmentForm />} />
              <Route path="/equipment/status" element={<Equipment />} />
              <Route path="/equipment/service" element={<Equipment />} />

              {/* Payments Routes */}
              <Route path="/payments" element={<Payments />} />
              <Route path="/payments/revenue" element={<Payments />} />
              <Route path="/payments/invoices" element={<Payments />} />
              <Route path="/payments/methods" element={<Payments />} />
              <Route path="/payments/due" element={<Payments />} />

              {/* Reports Routes */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/revenue" element={<Reports />} />
              <Route path="/reports/members" element={<Reports />} />
              <Route path="/reports/classes" element={<Reports />} />
              <Route path="/reports/equipment" element={<Reports />} />

              {/* Website Routes */}
              <Route path="/website" element={<Website />} />
              <Route path="/website/builder" element={<Website />} />
              <Route path="/website/app" element={<Website />} />
              <Route path="/website/seo" element={<Website />} />
              <Route path="/website/content" element={<Website />} />

              {/* Settings Routes */}
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/general" element={<Settings />} />
              <Route path="/settings/permissions" element={<Settings />} />
              <Route path="/settings/integration" element={<Settings />} />
              <Route path="/settings/backup" element={<Settings />} />

              {/* 404 Page */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;