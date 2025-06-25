import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/UserAtom';
import Header from './components/Header';
import Sidebar from './components/sidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/Workout/WorkoutsPage';
import NutritionPage from './pages/Workout/NutritionPage';
import TrackingPage from './pages/Workout/TrackingPage';
import WomensHealthPage from './pages/Workout/WomensHealthPage';
import ShopPage from './pages/ShopPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/OnBoaring/LoginPage';
import SignupPage from './pages/OnBoaring/signupPage';
import HomeDashboard from './Dashboard/HomeDashboard';
import OnboardingPage from './pages/OnBoaring/OnboardingPage';
import Calories from './pages/CaloriesPage';
import ProfilePage from './pages/OnBoaring/Profilepage1';
import Community from './pages/Community';
import PrivacyPolicy from './pages/Privacypolicy';
import TermsOfService from './pages/termsandconditions';
import HelpCenter from './pages/Helpcenter';
import ContactUs from './pages/Contactus';
import { useState } from 'react';
import SignupGymPage from './pages/OnBoaring/SignupGymPage';

function AppContent() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isDashboard = location.pathname === '/dashboard';
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="relative flex h-screen w-full bg-white">
      {/* Fixed Sidebar */}
      {user && !isAuthPage && (
        <div className={`fixed inset-y-0 left-0 h-screen z-10 transition-all duration-300 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
          <Sidebar onToggle={toggleSidebar} isCollapsed={isSidebarCollapsed} />
        </div>
      )}

      {/* Main Content Area */}
      <div className={`flex flex-col flex-1 min-h-full transition-all duration-300 ${user && !isAuthPage ? (isSidebarCollapsed ? 'ml-20' : 'ml-64') : ''
        }`}>
        {/* Header */}
        {!user && !isDashboard && <Header />}


        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {!user && <Route path="/login" element={<LoginPage />} />}
            {!user && <Route path="/signup" element={<SignupPage />} />}
            {!user && <Route path="/signup/gymowner" element={<SignupGymPage />} />}
            {user && <Route path="/onboarding" element={<OnboardingPage />} />}

            {user?.gender === "female" && (
              <Route path="/womens-health" element={<WomensHealthPage />} />
            )}

            {user ? (
              <>
                <Route path="/dashboard" element={<HomeDashboard />} />
                <Route path="/workouts" element={<WorkoutsPage isLoggedIn={true} />} />
                <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/tracking" element={<TrackingPage isLoggedIn={true} />} />
                <Route path="/shop" element={<ShopPage isLoggedIn={true} />} />
                <Route path="/Calories" element={<Calories />} />
                <Route path="/shop/:id" element={<ProductDetailPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/community" element={<Community />} />
              </>
            ) : (
              <>
                <Route path="/dashboard" element={<Navigate to="/login" />} />
                <Route path="/workouts" element={<Navigate to="/login" />} />
                <Route path="/workouts/:id" element={<Navigate to="/login" />} />
                <Route path="/nutrition" element={<Navigate to="/login" />} />
                <Route path="/tracking" element={<Navigate to="/login" />} />
                <Route path="/shop" element={<Navigate to="/login" />} />
                <Route path="/Calories" element={<Navigate to="/login" />} />
                <Route path="/shop/:id" element={<Navigate to="/login" />} />
                <Route path="/profile" element={<Navigate to="/login" />} />
                <Route path="/community" element={<Navigate to="/login" />} />
                <Route path="/womens-health" element={<Navigate to="/login" />} />
              </>
            )}

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/term" element={<TermsOfService />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>

          {/* Footer - appears at end of content */}
          {!isDashboard && !isAuthPage && (
            <div className="mt-auto">
              <Footer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;


