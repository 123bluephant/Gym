import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/UserAtom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/Workout/WorkoutsPage';
import NutritionPage from './pages/Workout/NutritionPage';
import TrackingPage from './pages/Workout/TrackingPage';
import ShopPage from './pages/Shopping/ShopPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/OnBoaring/LoginPage';
import SignupPage from './pages/OnBoaring/signupPage';
import HomeDashboard from './pages/Dashboard/HomeDashboard';
import Calories from './pages/CaloriesPage';
import ProfilePage from './pages/OnBoaring/Profilepage1';
import Community from './pages/Community';
import PrivacyPolicy from './pages/Privacypolicy';
import TermsOfService from './pages/termsandconditions';
import HelpCenter from './pages/Helpcenter';
import ContactUs from './pages/Contactus';
import CartPage from './pages/Shopping/CartPage';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import SignupGymPage from './pages/OnBoaring/SignupGymPage';
import ActivityPage from './pages/ActivityPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const isDashboard  = ['/dashboard', '/activity', '/achievements', '/settings', '/profile'].includes(location.pathname);
  const isAuthPage = ['/login', '/signup', '/signupgym', '/onboarding'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar at the top */}
      {user && !isAuthPage && <Header />}

      {/* Header for non-authenticated users */}
      {!user && !isDashboard && <Header />}

      {/* Main Content Area */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!user && <Route path="/login" element={<LoginPage />} />}
          {!user && <Route path="/signup" element={<SignupPage />} />}
          {!user && <Route path="/signupgym" element={<SignupGymPage />} />}
          {user ? (
            <>
              <Route path="/dashboard" element={<HomeDashboard />} />
              <Route path="/workouts" element={<WorkoutsPage />} />
              <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/Calories" element={<Calories />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/community" element={<Community />} />
              <Route path="/activity" element={<ActivityPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<TermsOfService />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </main>
      {/* Footer */}
      {!isDashboard && !isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}
export default App;