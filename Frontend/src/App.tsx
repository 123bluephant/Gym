import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import NutritionPage from './pages/NutritionPage';
import TrackingPage from './pages/TrackingPage';
import WomensHealthPage from './pages/WomensHealthPage';
import ShopPage from './pages/ShopPage';
import AccountPage from './pages/AccountPage';
import WorkoutDetailPage from './pages/WorkoutDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/OnBoaring/LoginPage';
import SignupPage from './pages/OnBoaring/signupPage';
import HomeDashboard from './pages/HomeDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<HomeDashboard onShowFeed={function (): void {
              throw new Error('Function not implemented.');
            } } />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
            <Route path="/nutrition" element={<NutritionPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/womens-health" element={<WomensHealthPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:id" element={<ProductDetailPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;