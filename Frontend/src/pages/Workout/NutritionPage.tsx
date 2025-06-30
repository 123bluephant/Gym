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
  Users, 
  Loader2, 
  AlertCircle,
  Upload,
  X
} from 'lucide-react';

// Mock API service (in a real app, this would be in a separate file)
const NutritionService = {
  async getDietPlans() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: 'mediterranean',
        name: 'Mediterranean',
        description: 'Heart-healthy, rich in omega-3s and antioxidants',
        color: 'from-blue-500 to-green-500',
        meals: 125,
        followers: '2.3k',
        benefits: ['Heart Health', 'Brain Function', 'Anti-inflammatory']
      },
      {
        id: 'plant-based',
        name: 'Plant-Based',
        description: 'Nutrient-dense, eco-friendly whole foods',
        color: 'from-green-500 to-emerald-500',
        meals: 98,
        followers: '1.8k',
        benefits: ['Weight Loss', 'Digestive Health', 'Environmental']
      },
      {
        id: 'high-protein',
        name: 'High Protein',
        description: 'Muscle building, strength focused nutrition',
        color: 'from-purple-500 to-pink-500',
        meals: 156,
        followers: '3.1k',
        benefits: ['Muscle Growth', 'Satiety', 'Recovery']
      },
      {
        id: 'keto',
        name: 'Keto Friendly',
        description: 'Low carb, high fat ketogenic approach',
        color: 'from-orange-500 to-red-500',
        meals: 87,
        followers: '1.5k',
        benefits: ['Fat Loss', 'Mental Clarity', 'Energy']
      }
    ];
  },

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

  async updateMealPlan(planData) {
    // Simulate API call to update meal plan
    console.log('Updating meal plan:', planData);
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
  const [dietPlans, setDietPlans] = useState([]);
  const [meals, setMeals] = useState({ breakfast: [], lunch: [], dinner: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  // User selections
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [calories, setCalories] = useState(1847);
  const [selectedPlan, setSelectedPlan] = useState('mediterranean');
  
  // Admin state
  const [isAdmin, setIsAdmin] = useState(false); // Would come from auth in real app
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

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [plans, mealData] = await Promise.all([
          NutritionService.getDietPlans(),
          NutritionService.getMeals()
        ]);
        setDietPlans(plans);
        setMeals(mealData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle meal plan selection
  const handlePlanSelect = async (planId: React.SetStateAction<string>) => {
    try {
      setSelectedPlan(planId);
      // In a real app, you might update user preferences in the backend
      await NutritionService.updateMealPlan({ planId });
    } catch (err) {
      console.error('Failed to update meal plan:', err);
    }
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
  const handleDeleteMeal = async (mealId: any, mealType: string) => {
    try {
      const response = await NutritionService.deleteMeal(mealId);
      if (response.success) {
        // Optimistically update UI
        setMeals(prev => ({
          ...prev,
          [mealType]: prev[mealType].filter((meal: { id: any; }) => meal.id !== mealId)
        }));
      }
    } catch (err) {
      console.error('Failed to delete meal:', err);
    }
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
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Nutrition & Meal Planning</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Fuel your fitness journey with personalized meal plans, flexible diet options, 
              and smart nutrition tracking designed for your lifestyle.
            </p>
          </div>
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

      {/* Diet Plans */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Diet Plan</h2>
            <p className="text-xl text-gray-600">Find the perfect eating style that fits your goals and preferences</p>
          </div>

          {dietPlans.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {dietPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all border-2 cursor-pointer ${
                    selectedPlan === plan.id ? 'border-purple-200 bg-purple-50' : 'border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center`}>
                        <ChefHat className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                        <p className="text-gray-600">{plan.description}</p>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      selectedPlan === plan.id ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                    }`}>
                      {selectedPlan === plan.id && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{plan.meals}</div>
                      <div className="text-sm text-gray-600">Recipes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{plan.followers}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Key Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.benefits.map((benefit, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No diet plans available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Meal Planner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Nutrition Goals */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Daily Nutrition Goals</h3>
              
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Daily Calories</span>
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setCalories(Math.max(1200, calories - 50))}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="font-bold text-xl w-20 text-center">{calories}</span>
                      <button 
                        onClick={() => setCalories(Math.min(3000, calories + 50))}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-white rounded-xl p-4">
                      <div className="text-2xl font-bold text-purple-600">40%</div>
                      <div className="text-sm text-gray-600">Carbs</div>
                      <div className="text-xs text-gray-500">{Math.round(calories * 0.4 / 4)}g</div>
                    </div>
                    <div className="text-center bg-white rounded-xl p-4">
                      <div className="text-2xl font-bold text-blue-600">30%</div>
                      <div className="text-sm text-gray-600">Protein</div>
                      <div className="text-xs text-gray-500">{Math.round(calories * 0.3 / 4)}g</div>
                    </div>
                    <div className="text-center bg-white rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600">30%</div>
                      <div className="text-sm text-gray-600">Fat</div>
                      <div className="text-xs text-gray-500">{Math.round(calories * 0.3 / 9)}g</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Target className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold text-gray-900">Today's Progress</span>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-bold">1,247 / {calories} cal</span>
                  </div>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min(100, (1247 / calories) * 100)}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {calories - 1247} calories remaining
                </div>
              </div>
            </div>

            {/* Meal Planner */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Today's Meal Plan</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {['breakfast', 'lunch', 'dinner'].map((meal) => (
                    <button
                      key={meal}
                      onClick={() => setSelectedMeal(meal)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                        selectedMeal === meal
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {meal}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {meals[selectedMeal]?.length > 0 ? (
                  <div className="space-y-4">
                    {meals[selectedMeal].map((item) => (
                      <div key={item.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors relative">
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteMeal(item.id, selectedMeal)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete meal"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <button className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                            Add
                          </button>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="font-medium">{item.calories} cal</span>
                          <span>P: {item.protein}g</span>
                          <span>C: {item.carbs}g</span>
                          <span>F: {item.fat}g</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{item.time}</span>
                          </div>
                          <span className={`px-2 py-1 rounded ${
                            item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            item.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {item.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No meals available for {selectedMeal}.
                  </div>
                )}
              </div>
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
      {/* <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-4 py-2 rounded-lg font-medium ${
            isAdmin ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {isAdmin ? 'Admin Mode: ON' : 'Admin Mode: OFF'}
        </button>
      </div> */}
    </div>
  );
};

export default NutritionPage;