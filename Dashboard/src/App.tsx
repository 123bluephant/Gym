import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { ProfilePage } from './components/layout/profile';
import { Header } from './components/layout/Header';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { UserManagement } from './components/users/UserManagement';
import { WorkoutManagement } from './components/workouts/WorkoutManagement';
import { TrainerManagement } from './components/trainers/TrainerManagement';

const AppContent: React.FC = () => {
  const appContext = useApp();
  
  // Provide default value if context is not available
  const currentView = appContext?.currentView || 'dashboard';

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'users' && <UserManagement />}
          {currentView === 'workouts' && <WorkoutManagement />}
          {currentView === 'trainers' && <TrainerManagement />}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/profile" element={
            <div className="flex h-screen bg-gray-100">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <ProfilePage />
              </div>
            </div>
          } />
          {/* Add other routes as needed */}
        </Routes>
      </AppProvider>
    </Router>
  );
};

export default App;