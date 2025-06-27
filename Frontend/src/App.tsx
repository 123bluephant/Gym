import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/UserAtom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/Workout/WorkoutsPage';
import NutritionPage from './pages/Workout/NutritionPage';
import TrackingPage from './pages/Workout/TrackingPage';
import WomensHealthPage from './pages/Workout/WomensHealthPage';
import ShopPage from './pages/Shopping/ShopPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/OnBoaring/LoginPage';
import SignupPage from './pages/OnBoaring/signupPage';
import HomeDashboard from './pages/Dashboard/HomeDashboard';
import OnboardingPage from './pages/OnBoaring/OnboardingPage';
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

function AppContent() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);

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
          {user && <Route path="/onboarding" element={<OnboardingPage />} />}

          {user?.gender === "female" && (
            <Route path="/womens-health" element={<WomensHealthPage />} />
          )}

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
            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Navigate to="/login" />} />
              <Route path="/workouts" element={<Navigate to="/login" />} />
              <Route path="/workouts/:id" element={<Navigate to="/login" />} />
              <Route path="/nutrition" element={<Navigate to="/login" />} />
              <Route path="/tracking" element={<Navigate to="/login" />} />
              <Route path="/shop" element={<Navigate to="/login" />} />
              <Route path="/shop/:id" element={<Navigate to="/login" />} />
              <Route path="/cart" element={<Navigate to="/login" />} /> {/* Add this route */}
              <Route path="/Calories" element={<Navigate to="/login" />} />
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