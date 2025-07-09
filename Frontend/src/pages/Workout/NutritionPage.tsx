import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Minus, 
  ChefHat, 
  Calendar, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Clock, 
  Loader2, 
  AlertCircle,
  Upload,
  X,
  Check
} from 'lucide-react';

// Mock API service (in a real app, this would be in a separate file)
const NutritionService = {
  async getMeals() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      breakfast: [
        { id: 'b1', name: 'Greek Yogurt Bowl', calories: 320, protein: 20, carbs: 35, fat: 8, time: '5 min', difficulty: 'Easy' },
        { id: 'b2', name: 'Avocado Toast', calories: 280, protein: 12, carbs: 25, fat: 18, time: '10 min', difficulty: 'Easy' },
        { id: 'b3', name: 'Protein Smoothie', calories: 240, protein: 25, carbs: 20, fat: 6, time: '5 min', difficulty: 'Easy' },
        { id: 'b4', name: 'Overnight Oats', calories: 350, protein: 15, carbs: 45, fat: 12, time: '2 min', difficulty: 'Easy' }
      ],
      lunch: [
        { id: 'l1', name: 'Grilled Chicken Salad', calories: 420, protein: 35, carbs: 15, fat: 22, time: '15 min', difficulty: 'Medium' },
        { id: 'l2', name: 'Quinoa Power Bowl', calories: 380, protein: 18, carbs: 45, fat: 12, time: '20 min', difficulty: 'Medium' },
        { id: 'l3', name: 'Turkey Wrap', calories: 350, protein: 28, carbs: 30, fat: 14, time: '10 min', difficulty: 'Easy' },
        { id: 'l4', name: 'Buddha Bowl', calories: 400, protein: 16, carbs: 50, fat: 15, time: '25 min', difficulty: 'Medium' }
      ],
      dinner: [
        { id: 'd1', name: 'Salmon & Vegetables', calories: 450, protein: 32, carbs: 20, fat: 25, time: '30 min', difficulty: 'Medium' },
        { id: 'd2', name: 'Lean Beef Stir Fry', calories: 380, protein: 30, carbs: 25, fat: 18, time: '20 min', difficulty: 'Medium' },
        { id: 'd3', name: 'Vegetarian Pasta', calories: 320, protein: 15, carbs: 55, fat: 8, time: '25 min', difficulty: 'Easy' },
        { id: 'd4', name: 'Chicken Curry', calories: 410, protein: 28, carbs: 35, fat: 20, time: '35 min', difficulty: 'Hard' }
      ]
    };
  },

  async addMealToUserDiet(mealId: any, mealType: string, day: string) {
    // Simulate API call to add meal to user's diet
    console.log('Adding meal to user diet:', { mealId, mealType, day });
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },

  async removeMealFromUserDiet(mealId, day) {
    // Simulate API call to remove meal from user's diet
    console.log('Removing meal from user diet:', { mealId, day });
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  },

  async uploadMealData(mealData) {
    // Simulate admin upload
    console.log('Uploading meal data:', mealData);
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  },

  async deleteMeal(mealId) {
    // Simulate delete operation
    console.log('Deleting meal:', mealId);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true };
  }
};

const NutritionPage = () => {
  // State for dynamic data
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // User diet state
  const [userDiet, setUserDiet] = useState({
    monday: { breakfast: [], lunch: [], dinner: [] },
    tuesday: { breakfast: [], lunch: [], dinner: [] },
    wednesday: { breakfast: [], lunch: [], dinner: [] },
    thursday: { breakfast: [], lunch: [], dinner: [] },
    friday: { breakfast: [], lunch: [], dinner: [] },
    saturday: { breakfast: [], lunch: [], dinner: [] },
    sunday: { breakfast: [], lunch: [], dinner: [] }
  });
  
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({
    mealType: 'breakfast',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    time: '',
    difficulty: 'Easy'
  });

  // Days of the week
  const daysOfWeek = [
    { key: 'monday', label: 'Monday', short: 'Mon' },
    { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
    { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
    { key: 'thursday', label: 'Thursday', short: 'Thu' },
    { key: 'friday', label: 'Friday', short: 'Fri' },
    { key: 'saturday', label: 'Saturday', short: 'Sat' },
    { key: 'sunday', label: 'Sunday', short: 'Sun' }
  ];

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mealData = await NutritionService.getMeals();
        setMeals(mealData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle adding meal to user diet
  const handleAddMealToUserDiet = async (meal: { id: any; }, mealType: string, day: string) => {
    try {
      const response = await NutritionService.addMealToUserDiet(meal.id, mealType, day);
      if (response.success) {
        setUserDiet(prev => ({
          ...prev,
          [day]: {
            ...prev[day],
            [mealType]: [...prev[day][mealType], meal]
          }
        }));
      }
    } catch (err) {
      console.error('Failed to add meal to user diet:', err);
    }
  };

  // Handle removing meal from user diet
  const handleRemoveMealFromUserDiet = async (mealId, mealType, day) => {
    try {
      const response = await NutritionService.removeMealFromUserDiet(mealId, day);
      if (response.success) {
        setUserDiet(prev => ({
          ...prev,
          [day]: {
            ...prev[day],
            [mealType]: prev[day][mealType].filter(meal => meal.id !== mealId)
          }
        }));
      }
    } catch (err) {
      console.error('Failed to remove meal from user diet:', err);
    }
  };

  // Check if meal is in user diet for specific day
  const isMealInUserDiet = (mealId, mealType, day) => {
    return userDiet[day][mealType].some(meal => meal.id === mealId);
  };

  // Handle admin upload
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const response = await NutritionService.uploadMealData(uploadData);
      if (response.success) {
        // Refresh meals data
        const updatedMeals = await NutritionService.getMeals();
        setMeals(updatedMeals);
        setShowUploadForm(false);
        setUploadData({
          mealType: 'breakfast',
          name: '',
          calories: '',
          protein: '',
          carbs: '',
          fat: '',
          time: '',
          difficulty: 'Easy'
        });
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  // Handle meal deletion
  const handleDeleteMeal = async (mealId, mealType) => {
    try {
      const response = await NutritionService.deleteMeal(mealId);
      if (response.success) {
        // Optimistically update UI
        setMeals(prev => ({
          ...prev,
          [mealType]: prev[mealType].filter(meal => meal.id !== mealId)
        }));
      }
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
  };

  // Calculate daily totals for a specific day
  const calculateDayTotals = (day) => {
    const dayMeals = userDiet[day];
    const allMeals = [...dayMeals.breakfast, ...dayMeals.lunch, ...dayMeals.dinner];
    
    return allMeals.reduce((totals, meal) => ({
      calories: totals.calories + meal.calories,
      protein: totals.protein + meal.protein,
      carbs: totals.carbs + meal.carbs,
      fat: totals.fat + meal.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const mealPlanFeatures = [
    {
      title: 'Smart Meal Planning',
      description: 'AI-powered recommendations based on your goals and preferences',
      icon: Target
    },
    {
      title: 'Recipe Library',
      description: 'Over 1000 healthy recipes with step-by-step instructions',
      icon: BookOpen
    },
    {
      title: 'Grocery Lists',
      description: 'Automatically generated shopping lists for your meal plans',
      icon: ChefHat
    },
    {
      title: 'Nutrition Tracking',
      description: 'Track macros, calories, and micronutrients effortlessly',
      icon: TrendingUp
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Admin Controls */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={() => setShowUploadForm(!showUploadForm)}
            className={`p-4 rounded-full shadow-lg transition-colors flex items-center justify-center ${
              showUploadForm ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            {showUploadForm ? <X className="w-6 h-6" /> : <Upload className="w-6 h-6" />}
          </button>
          
          {showUploadForm && (
            <div className="absolute bottom-16 right-0 w-96 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
              <h3 className="font-bold text-lg mb-4">Add New Meal</h3>
              <form onSubmit={handleUploadSubmit}>
                <div className="space-y-3 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                    <select
                      value={uploadData.mealType}
                      onChange={(e) => setUploadData({...uploadData, mealType: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                    <input
                      type="text"
                      value={uploadData.name}
                      onChange={(e) => setUploadData({...uploadData, name: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                      <input
                        type="number"
                        value={uploadData.calories}
                        onChange={(e) => setUploadData({...uploadData, calories: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                      <input
                        type="number"
                        value={uploadData.protein}
                        onChange={(e) => setUploadData({...uploadData, protein: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                      <input
                        type="number"
                        value={uploadData.carbs}
                        onChange={(e) => setUploadData({...uploadData, carbs: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)</label>
                      <input
                        type="number"
                        value={uploadData.fat}
                        onChange={(e) => setUploadData({...uploadData, fat: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
                      <input
                        type="text"
                        value={uploadData.time}
                        onChange={(e) => setUploadData({...uploadData, time: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                        placeholder="e.g. 15 min"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                      <select
                        value={uploadData.difficulty}
                        onChange={(e) => setUploadData({...uploadData, difficulty: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    disabled={uploading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center justify-center min-w-20"
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      'Upload'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 text-white py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            <ChefHat className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            <Target className="w-6 h-6 text-white/30" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            <BookOpen className="w-7 h-7 text-white/30" />
          </div>
          <div className="absolute top-1/2 right-1/3 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
            <TrendingUp className="w-6 h-6 text-white/30" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="inline-block mb-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent animate-pulse">
                Nutrition & Meal Planning
              </h1>
              <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent mt-4 animate-pulse"></div>
            </div>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Fuel your fitness journey with personalized meal plans, flexible diet options, 
              and smart nutrition tracking designed for your lifestyle.
            </p>
            
            {/* Animated CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  Start Your Journey
                  <div className="ml-2 transform group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </span>
              </button>
              <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  <BookOpen className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Explore Recipes
                </span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg className="relative block w-full h-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor" className="text-white">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; -100 0; 0 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor" className="text-white">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 100 0; 0 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor" className="text-white">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; -50 0; 0 0"
                dur="6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Healthy Eating</h2>
            <p className="text-xl text-gray-600">Comprehensive nutrition tools to support your fitness goals</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mealPlanFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Meal Planner Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Weekly Meal Planner</h2>
            <p className="text-xl text-gray-600">Plan your meals for the entire week and track your nutrition goals</p>
          </div>

          {/* Weekly Meal Table */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-40 bg-white border-r border-gray-200">
                      <div className="flex items-center">
                        <ChefHat className="w-5 h-5 mr-2 text-purple-600" />
                        Meal Type
                      </div>
                    </th>
                    {daysOfWeek.map((day) => (
                      <th key={day.key} className="px-3 py-4 text-center text-sm font-semibold text-gray-900 min-w-44 border-r border-gray-200 last:border-r-0">
                        <div className="flex flex-col items-center space-y-1">
                          <span className="hidden sm:inline font-bold">{day.label}</span>
                          <span className="sm:hidden font-bold">{day.short}</span>
                          <div className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                            {calculateDayTotals(day.key).calories} cal
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                    <tr key={mealType} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-8 text-sm font-medium text-gray-900 capitalize bg-gradient-to-r from-gray-50 to-gray-100 border-r border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            mealType === 'breakfast' ? 'bg-yellow-400' :
                            mealType === 'lunch' ? 'bg-orange-400' : 'bg-blue-400'
                          }`}></div>
                          {mealType}
                        </div>
                      </td>
                      {daysOfWeek.map((day) => (
                        <td key={`${mealType}-${day.key}`} className="px-3 py-8 text-sm border-r border-gray-200 last:border-r-0 align-top">
                          <div className="space-y-2 min-h-28">
                            {userDiet[day.key][mealType].length > 0 ? (
                              userDiet[day.key][mealType].map((meal) => (
                                <div key={meal.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 relative group hover:shadow-sm transition-all">
                                  <button
                                    onClick={() => handleRemoveMealFromUserDiet(meal.id, mealType, day.key)}
                                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-lg"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                  <div className="font-semibold text-gray-900 text-xs mb-1 pr-4">{meal.name}</div>
                                  <div className="text-xs text-gray-600 font-medium">
                                    <span className="text-green-700">{meal.calories} cal</span>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center text-gray-400 text-xs py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                                <div className="flex flex-col items-center space-y-1">
                                  <Plus className="w-4 h-4 text-gray-300" />
                                  <span>No meal planned</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Available Meals Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Available Meals</h3>
              <p className="text-sm text-gray-600 mt-1">Click "Add to Day" to add meals to your weekly plan</p>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-8">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                  <div key={mealType} className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 capitalize flex items-center">
                      <ChefHat className="w-5 h-5 mr-2 text-blue-600" />
                      {mealType}
                    </h4>
                    
                    {meals[mealType]?.length > 0 ? (
                      <div className="space-y-3">
                        {meals[mealType].map((meal) => (
                          <div key={meal.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors relative">
                            {isAdmin && (
                              <button
                                onClick={() => handleDeleteMeal(meal.id, mealType)}
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                title="Delete meal"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                            <div className="mb-3">
                              <h5 className="font-medium text-gray-900 mb-1">{meal.name}</h5>
                              <div className="text-sm text-gray-600">
                                {meal.calories} cal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{meal.time}</span>
                                </div>
                                <span className={`px-2 py-1 rounded ${
                                  meal.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                  meal.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {meal.difficulty}
                                </span>
                              </div>
                            </div>
                            
                            {/* Add to Day Buttons */}
                            <div className="space-y-1">
                              <div className="text-xs font-medium text-gray-700 mb-2">Add to:</div>
                              <div className="grid grid-cols-4 gap-1">
                                {daysOfWeek.slice(0, 4).map((day) => (
                                  <button
                                    key={day.key}
                                    onClick={() => handleAddMealToUserDiet(meal, mealType, day.key)}
                                    disabled={isMealInUserDiet(meal.id, mealType, day.key)}
                                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                      isMealInUserDiet(meal.id, mealType, day.key)
                                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                        : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}
                                  >
                                    {isMealInUserDiet(meal.id, mealType, day.key) ? (
                                      <Check className="w-3 h-3 mx-auto" />
                                    ) : (
                                      day.short
                                    )}
                                  </button>
                                ))}
                              </div>
                              <div className="grid grid-cols-3 gap-1 mt-1">
                                {daysOfWeek.slice(4).map((day) => (
                                  <button
                                    key={day.key}
                                    onClick={() => handleAddMealToUserDiet(meal, mealType, day.key)}
                                    disabled={isMealInUserDiet(meal.id, mealType, day.key)}
                                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                      isMealInUserDiet(meal.id, mealType, day.key)
                                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                        : 'bg-purple-600 text-white hover:bg-purple-700'
                                    }`}
                                  >
                                    {isMealInUserDiet(meal.id, mealType, day.key) ? (
                                      <Check className="w-3 h-3 mx-auto" />
                                    ) : (
                                      day.short
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        No meals available for {mealType}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Analytics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Nutrition Analytics</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              {(() => {
                // Calculate totals from all selected meals across all days
                const totals = Object.values(userDiet).reduce((acc, dayMeals) => {
                  const allDayMeals = [...dayMeals.breakfast, ...dayMeals.lunch, ...dayMeals.dinner];
                  return allDayMeals.reduce((dayAcc, meal) => ({
                    calories: dayAcc.calories + meal.calories,
                    protein: dayAcc.protein + meal.protein,
                    carbs: dayAcc.carbs + meal.carbs,
                    fats: dayAcc.fats + meal.fat,
                    fiber: dayAcc.fiber + (meal.fiber || Math.round(meal.carbs * 0.1)), // Estimated fiber
                    sugar: dayAcc.sugar + (meal.sugar || Math.round(meal.carbs * 0.3)) // Estimated sugar
                  }), acc);
                }, { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 });

                const dailyCaloriesGoal = 2000; // This could be dynamic based on user settings

                return [
                  { name: 'Calories', value: totals.calories, unit: 'kcal', color: 'from-rose-400 to-pink-500', target: dailyCaloriesGoal },
                  { name: 'Protein', value: totals.protein, unit: 'g', color: 'from-blue-400 to-indigo-500', target: dailyCaloriesGoal * 0.15 / 4 },
                  { name: 'Carbs', value: totals.carbs, unit: 'g', color: 'from-green-400 to-emerald-500', target: dailyCaloriesGoal * 0.55 / 4 },
                  { name: 'Fats', value: totals.fats, unit: 'g', color: 'from-yellow-400 to-orange-500', target: dailyCaloriesGoal * 0.30 / 9 },
                  { name: 'Fiber', value: totals.fiber, unit: 'g', color: 'from-purple-400 to-violet-500', target: 25 },
                  { name: 'Sugar', value: totals.sugar, unit: 'g', color: 'from-pink-400 to-rose-500', target: 50 }
                ].map((macro) => {
                  const percentage = (macro.value / macro.target) * 100;
                  return (
                    <div key={macro.name} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                      <div className={`w-4 h-4 bg-gradient-to-r ${macro.color} rounded-full mb-3`}></div>
                      <div className="text-2xl font-bold text-gray-800 mb-1">{macro.value.toFixed(1)}</div>
                      <div className="text-sm font-medium text-gray-600 mb-1">{macro.name}</div>
                      <div className="text-xs text-gray-500 mb-2">{macro.unit}</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r ${macro.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {percentage.toFixed(0)}% of target
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Nutrition?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands who've achieved their goals with our personalized meal planning system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
              View Sample Meal Plans
            </button>
          </div>
        </div>
      </section>

      {/* Admin Toggle (for demo purposes) */}
      
    </div>
  );
};

export default NutritionPage;