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
import SignupGymPage from './pages/OnBoaring/SignupGymPage';


function AppContent() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const isAuthPage = ['/login', '/signup', '/signupgym'].includes(location.pathname); // Added signupgym

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header logic remains the same */}
      {user && !isAuthPage && <Header />}
      {!user && !isDashboard && <Header />}

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/term" element={<TermsOfService />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/contact" element={<ContactUs />} />
          
          {/* Authentication routes */}
          {!user && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signupgym" element={<SignupGymPage />} />
            </>
          )}

          {/* Protected routes */}
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
              <Route path="/onboarding" element={<OnboardingPage />} />
            </>
          ) : (
            <>
              {/* Redirect to login for protected routes when unauthenticated */}
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
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