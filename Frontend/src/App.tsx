import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/Workout/WorkoutsPage';
import NutritionPage from './pages/Workout/NutritionPage';
import TrackingPage from './pages/Workout/TrackingPage';
import WomensHealthPage from './pages/Workout/WomensHealthPage';
import ShopPage from './pages/ShopPage';
import AccountPage from './pages/AccountPage';
import WorkoutDetailPage from './pages/Workout/WorkoutDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/OnBoaring/LoginPage';
import SignupPage from './pages/OnBoaring/signupPage';
import HomeDashboard from './pages/HomeDashboard';
import OnboardingPage from './pages/OnBoaring/OnboardingPage';
import Calories from './pages/CaloriesPage';
import ProfilePage from './pages/OnBoaring/Profilepage1';
import Community from './pages/Community';
import PrivacyPolicy from './pages/Privacypolicy';
import TermsOfService from './pages/termsandconditions';
import HelpCenter from './pages/Helpcenter';
import ContactUs from './pages/Contactus';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/UserAtom';

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />

            {!user && <Route path="/login" element={<LoginPage />} />}
            {!user && <Route path="/signup" element={<SignupPage />} />}
            {user && <Route path="/onboarding" element={<OnboardingPage />} />}
            {user && user.gender === "female"  ? (
              <Route path="/womens-health" element={<WomensHealthPage />} />
            ) : (
              <Route path="/womens-health" element={<Navigate to="/" />} />
            )}
            {user ? (
              <>
                <Route path="/dashboard" element={<HomeDashboard onShowFeed={() => { }} />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
                <Route path="/nutrition" element={<NutritionPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/Calories" element={<Calories />} />
                <Route path="/shop/:id" element={<ProductDetailPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/community" element={<Community />} />
              </>
            ) : (
              // 🔁 Fallback redirect for any protected route
              <>
                <Route path="/dashboard" element={<Navigate to="/login" />} />
                <Route path="/workouts" element={<Navigate to="/login" />} />
                <Route path="/workouts/:id" element={<Navigate to="/login" />} />
                <Route path="/nutrition" element={<Navigate to="/login" />} />
                <Route path="/tracking" element={<Navigate to="/login" />} />
                <Route path="/shop" element={<Navigate to="/login" />} />
                <Route path="/Calories" element={<Navigate to="/login" />} />
                <Route path="/shop/:id" element={<Navigate to="/login" />} />
                <Route path="/account" element={<Navigate to="/login" />} />
                <Route path="/profile" element={<Navigate to="/login" />} />
                <Route path="/community" element={<Navigate to="/login" />} />
              </>
            )}

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/term" element={<TermsOfService />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
