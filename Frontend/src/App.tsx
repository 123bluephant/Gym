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
import ActivityPage from './pages/Dashboard/ActivityPage';
import AchievementsPage from './pages/Dashboard/AchievementsPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import WomensHealthPage from './pages/Workout/WomensHealthPage';
import AnalyticsPage from './pages/gymOwner/Pages/Analytics';
import SettingsPagegym from './pages/gymOwner/Pages/Settings';
import Dashboardgym from './pages/gymOwner/Pages/Dashboard';
import Meals from './pages/gymOwner/Pages/Meals/List';
import Trainers from './pages/gymOwner/Pages/Trainers/List';
import Members from './pages/gymOwner/Pages/Users/List';
import Sidebar from './pages/gymOwner/components/Layout/Sidebar';
import Navbar from './pages/gymOwner/components/Layout/Navbar';
import GymOwnerProfile from './pages/gymOwner/Pages/ProfilePage';
import AddEditMeal from './pages/gymOwner/Pages/Meals/AddEdits';
import AddEditTrainer from './pages/gymOwner/Pages/Trainers/AddEdit';
import AddList from './pages/gymOwner/Pages/Users/AddList';
import WorkoutsList from './pages/gymOwner/Pages/Workouts/List';
import AddWorkout from './pages/gymOwner/Pages/Workouts/AddWorkout';
import EditWorkout from './pages/gymOwner/Pages/Workouts/EditWorkout';
import GymListing from './pages/gymOwner/components/Gym/GymListing';

function AppContent() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const isDashboard = ['/dashboard', '/activity', '/achievements', '/settings', '/profile', '/analytics'].includes(location.pathname);
  const isAuthPage = ['/login', '/signup', '/signupgym', '/onboarding'].includes(location.pathname);
  const isGymRoute = location.pathname.startsWith('/gym');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Regular Header (for non-gym routes) */}
      {user && !isAuthPage && !isGymRoute && <Header />}
      {!user && !isDashboard && !isGymRoute && <Header />}

      {/* Gym Owner Layout (with Sidebar and Navbar) */}
      {isGymRoute ? (
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
              <Routes>
                <Route path="/gym/settings" element={<SettingsPagegym />} />
                <Route path="/gym/analytics" element={<AnalyticsPage />} />
                <Route path="/gym/profile" element={<GymOwnerProfile />} />
                <Route path="/gym" element={<Dashboardgym />} />
                <Route path="/gym/meals" element={<Meals />} />
                <Route path="/gym/meals/add" element={<AddEditMeal />} />
                <Route path="/gym/meals/edit/:id" element={<AddEditMeal />} />
                {/* <Route path="/gym/meals/view/:id" element={<MealDetail />} /> You would create this component
                <Route path="/gym/meals/import" element={<BulkImport />} /> You would create this component */}
                <Route path="/gym/trainers" element={<Trainers />} />
                <Route path="/gym/trainers/add" element={<AddEditTrainer />} />
                <Route path="/gym/trainers/edit/:id" element={<AddEditTrainer />} />
                <Route path="/gym/members" element={<Members />} />
                <Route path="/gym/members/add" element={<AddList />} />
                <Route path="/gym/members/edit/:id" element={<AddList />} />
                <Route path="/gyms" element={<GymListing />} />
                <Route path="/gym/workouts" element={<WorkoutsList />} />
                <Route path="/gym/workouts/add" element={<AddWorkout />} />
                <Route path="/workouts/edit/:id" element={<EditWorkout />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        /* Regular Content Layout */
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {!user && <Route path="/login" element={<LoginPage />} />}
            {!user && <Route path="/signup" element={<SignupPage />} />}
            {!user && <Route path="/signupgym" element={<SignupGymPage />} />}
            {user ? (
              <>
                <Route path="/dashboard" element={<HomeDashboard />} />
                <Route path="/workouts" element={<WorkoutsPage />} />
                <Route path="/women-health" element={<WomensHealthPage />} />
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
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/term" element={<TermsOfService />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      )}

      {/* Footer (for non-gym routes) */}
      {!isDashboard && !isAuthPage && !isGymRoute && <Footer />}
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