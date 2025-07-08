import React, { useEffect, useState } from 'react';
import { Apple, Beef, ChefHat, Coffee, Cookie, Moon, Pizza, Salad, Scale, Sun, Wheat, Search, Activity, User, Calculator, Target, TrendingUp, Clock, Plus } from 'lucide-react';
import { Food, UserProfile } from '../types';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/UserAtom';
import consumedFoodAtom from '../atoms/consumedFoodAtom';

function Calories() {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    height: 170,
    weight: 70,
    age: 25,
    gender: 'male',
    activityLevel: 'moderate',
  });

  const [foodDatabase, setFoodDatabase] = useState<Food[]>([]);
  const [consumedFoods, setConsumedFoods] = useRecoilState(consumedFoodAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    const fetchTopFoods = async () => {
      try {
        const res = await fetch('/api/food/top30', {
          headers: {
            "Content-Type": "application/json",
          }
        }
        );
        const data = await res.json();
        console.log(data)
        setFoodDatabase(data);
      } catch (err) {
        console.error("❌ Failed to fetch top 30 foods:", err);
      }
    };
    const fetchMealFoods = async () => {
      if (!user?._id || !selectedMealType) return;
      const today = new Date().toISOString().slice(0, 10);
      try {
        const res = await fetch(
          `/api/food/get-meal/${user._id}?mealType=${selectedMealType}&date=${today}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch meal data");

        const data = await res.json();

        const transformed = data.map((food: any) => ({
          name: food.foodName,
          category: food.category,
          calories: food.calculated.calories,
          protein: food.calculated.protein,
          carbs: food.calculated.carbs,
          fats: food.calculated.fats,
          fiber: food.calculated.fiber,
          sugar: food.calculated.sugar,
          serving: food.per100g,
          quantity: food.servings,
          consumedAt: new Date(),
          mealType: selectedMealType
        }));

        setConsumedFoods(transformed);
      } catch (err) {
        console.error("❌ Error loading meal food:", err);
      }
    };
    fetchTopFoods();
    fetchMealFoods();
  }, [selectedMealType]);

  const addFood = async () => {
    if (!selectedFood || quantity <= 0) return;

    const calculated = {
      calories: Number((selectedFood.calories * quantity).toFixed(2)),
      protein: Number((selectedFood.protein * quantity).toFixed(2)),
      carbs: Number((selectedFood.carbs * quantity).toFixed(2)),
      fats: Number((selectedFood.fats * quantity).toFixed(2)),
      fiber: Number((selectedFood.fiber * quantity).toFixed(2)),
      sugar: Number((selectedFood.sugar * quantity).toFixed(2)),
    };

    const body = {
      user,
      date: new Date().toISOString().slice(0, 10),
      mealType: selectedMealType,
      food: {
        foodName: selectedFood.name,
        category: selectedFood.category,
        per100g: {
          calories: selectedFood.calories,
          protein: selectedFood.protein,
          carbs: selectedFood.carbs,
          fats: selectedFood.fats,
          fiber: selectedFood.fiber,
          sugar: selectedFood.sugar
        },
        servings: quantity,
        calculated
      }
    };

    try {
      const res = await fetch("/api/food/add-Food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) throw new Error("Failed to log food");

      const data = await res.json();

      setConsumedFoods((prev: any) => [...prev, {
        ...selectedFood,
        quantity,
        mealType: selectedMealType,
        consumedAt: new Date(),
      }]);

      setShowFoodModal(false);
      setSelectedFood(null);
      setQuantity(1);
      setSearchTerm("");
    } catch (err) {
      console.error("❌ Failed to add food:", err);
      alert("Something went wrong. Please try again.");
    }
  };


const removeFood = async (index: number) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const response = await fetch('/api/food/remove-food', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user?._id,
        date: today,
        mealType: selectedMealType,
        index,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to remove food');
    }

    // Update state after successful removal
    const newFoods = consumedFoods.filter((_, i) => i !== index);
    setConsumedFoods(newFoods);
  } catch (error) {
    console.error("Failed to remove food:", error);
    alert("Something went wrong while removing food.");
  }
};



  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim() === '') return;

      try {
        const res = await fetch(`/api/food/search?query=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setFoodDatabase(data);
      } catch (err) {
        console.error("❌ Error searching foods:", err);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const calculateBMI = () => {
    const heightInM = userProfile.height / 100;
    return userProfile.weight / (heightInM * heightInM);
  };

  const calculateDailyCalories = () => {
    const { weight, height, age, gender, activityLevel } = userProfile;

    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very-active': 1.9,
    };

    return Math.round(bmr * activityMultipliers[activityLevel]);
  };

  const calculateMealTotals = (mealType: string) => {
    const mealFoods = consumedFoods.filter((food: { mealType: string; }) => food.mealType === mealType);
    return mealFoods.reduce(
      (totals: { calories: number; protein: number; carbs: number; fats: number; fiber: number; sugar: number; }, food: { calories: number; quantity: number; protein: number; carbs: number; fats: number; fiber: number; sugar: number; }) => ({
        calories: totals.calories + food.calories * food.quantity,
        protein: totals.protein + food.protein * food.quantity,
        carbs: totals.carbs + food.carbs * food.quantity,
        fats: totals.fats + food.fats * food.quantity,
        fiber: totals.fiber + food.fiber * food.quantity,
        sugar: totals.sugar + food.sugar * food.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 }
    );
  };

  const calculateTotals = () => {
    return consumedFoods.reduce(
      (totals: { calories: number; protein: number; carbs: number; fats: number; fiber: number; sugar: number; }, food: { calories: number; quantity: number; protein: number; carbs: number; fats: number; fiber: number; sugar: number; }) => ({
        calories: totals.calories + food.calories * food.quantity,
        protein: totals.protein + food.protein * food.quantity,
        carbs: totals.carbs + food.carbs * food.quantity,
        fats: totals.fats + food.fats * food.quantity,
        fiber: totals.fiber + food.fiber * food.quantity,
        sugar: totals.sugar + food.sugar * food.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 }
    );
  };

  const totals = calculateTotals();
  const breakfastTotals = calculateMealTotals('breakfast');
  const lunchTotals = calculateMealTotals('lunch');
  const dinnerTotals = calculateMealTotals('dinner');
  const snacksTotals = calculateMealTotals('snacks');

  const filteredFoods = foodDatabase.filter((food) => {
    const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
    return matchesCategory;
  });


  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { category: 'Obese', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const bmi = calculateBMI();
  const dailyCaloriesGoal = calculateDailyCalories();
  const bmiInfo = getBMICategory(bmi);
  const calorieProgress = (totals.calories / dailyCaloriesGoal) * 100;

  const categories = [
    { id: 'all', name: 'All Foods', icon: ChefHat },
    { id: 'fruits', name: 'Fruits', icon: Apple },
    { id: 'vegetables', name: 'Vegetables', icon: Salad },
    { id: 'grains', name: 'Grains', icon: Wheat },
    { id: 'proteins', name: 'Proteins', icon: Beef },
    { id: 'dairy', name: 'Dairy', icon: Scale },
    { id: 'nuts', name: 'Nuts & Oils', icon: Scale },
    { id: 'beverages', name: 'Beverages', icon: Coffee },
    { id: 'snacks', name: 'Snacks', icon: Cookie },
    { id: 'meals', name: 'Meals', icon: Pizza },
    { id: 'fast-food', name: 'Fast Food', icon: Pizza },
  ];

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: Coffee, color: 'from-orange-400 to-yellow-500' },
    { id: 'lunch', name: 'Lunch', icon: Sun, color: 'from-green-400 to-emerald-500' },
    { id: 'dinner', name: 'Dinner', icon: Moon, color: 'from-purple-400 to-indigo-500' },
    { id: 'snacks', name: 'Snacks', icon: Cookie, color: 'from-pink-400 to-rose-500' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8 mt-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mb-4 shadow-lg">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
            NutriTracker Pro
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your complete nutrition companion with smart meal tracking, BMI analysis, and personalized calorie goals
          </p>
        </div>

        {/* User Profile & BMI Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Profile Settings</h2>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Height (cm)</label>
                <input
                  type="number"
                  value={userProfile?.height}
                  onChange={(e) => setUserProfile({ ...userProfile, height: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile({ ...userProfile, weight: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Age</label>
                <input
                  type="number"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({ ...userProfile, age: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Gender</label>
                <select
                  value={userProfile.gender}
                  onChange={(e) => setUserProfile({ ...userProfile, gender: e.target.value as 'male' | 'female' })}
                  className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Activity Level</label>
              <select
                value={userProfile.activityLevel}
                onChange={(e) => setUserProfile({ ...userProfile, activityLevel: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50"
              >
                <option value="sedentary">🛋️ Sedentary (little/no exercise)</option>
                <option value="light">🚶 Light (light exercise 1-3 days/week)</option>
                <option value="moderate">🏃 Moderate (moderate exercise 3-5 days/week)</option>
                <option value="active">💪 Active (hard exercise 6-7 days/week)</option>
                <option value="very-active">🏋️ Very Active (very hard exercise, physical job)</option>
              </select>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Health Metrics</h2>
            </div>

            <div className="space-y-6">
              <div className={`${bmiInfo.bgColor} rounded-2xl p-6 border-2 border-opacity-20`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-gray-700">Body Mass Index</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${bmiInfo.color} bg-white/80`}>
                    {bmiInfo.category}
                  </span>
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{bmi.toFixed(1)}</div>
                <div className="text-sm text-gray-600">
                  {bmi < 18.5 ? 'Consider gaining weight' :
                    bmi < 25 ? 'Healthy weight range' :
                      bmi < 30 ? 'Consider losing weight' : 'Consult healthcare provider'}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-gray-700">Daily Calorie Goal</span>
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{dailyCaloriesGoal}</div>
                <div className="text-sm text-gray-600">kcal per day</div>
              </div>
            </div>
          </div>
        </div>

        {/* Calorie Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Today's Progress</h2>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-gray-700">Calories Consumed</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-800">{totals.calories.toFixed(0)}</span>
                  <span className="text-lg text-gray-600"> / {dailyCaloriesGoal} kcal</span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gradient-to-r from-pink-100 to-rose-100 rounded-full h-6 shadow-inner">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-6 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
                    style={{ width: `${Math.min(calorieProgress, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">0</span>
                  <span className={`text-sm font-bold ${calorieProgress > 100 ? 'text-red-500' : 'text-green-600'}`}>
                    {calorieProgress.toFixed(1)}%
                  </span>
                  <span className="text-sm text-gray-500">{dailyCaloriesGoal}</span>
                </div>
              </div>
              {calorieProgress > 100 && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">
                    ⚠️ You've exceeded your daily calorie goal by {(totals.calories - dailyCaloriesGoal).toFixed(0)} kcal
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Meal Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Meal Breakdown</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mealTypes.map((meal) => {
              const mealTotals = calculateMealTotals(meal.id);
              const MealIcon = meal.icon;
              return (
                <div key={meal.id} className={`bg-gradient-to-br ${meal.color} rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200`}>
                  <div className="flex items-center justify-between mb-4">
                    <MealIcon className="w-8 h-8" />
                    <span className="text-lg font-bold">{meal.name}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">{mealTotals.calories.toFixed(0)}</div>
                    <div className="text-sm opacity-90">kcal</div>
                    <div className="text-xs opacity-75">
                      P: {mealTotals.protein.toFixed(1)}g | C: {mealTotals.carbs.toFixed(1)}g | F: {mealTotals.fats.toFixed(1)}g
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Food Search & Add */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Food</h2>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Food Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                        }`}
                    >
                      <CategoryIcon className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.slice(6).map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedCategory === category.id
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                        : 'bg-pink-50 text-gray-700 hover:bg-pink-100'
                        }`}
                    >
                      <CategoryIcon className="w-4 h-4 mr-2" />
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search from 200+ foods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50 text-lg"
              />
            </div>

            {/* Food List */}
            <div className="max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
              {filteredFoods.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No foods found. Try a different search term or category.</p>
                </div>
              ) : (
                filteredFoods.map((food) => (
                  <div
                    key={food.id}
                    onClick={() => {
                      setSelectedFood(food);
                      setShowFoodModal(true);
                    }}
                    className="p-4 border-2 border-pink-100 rounded-xl hover:border-pink-300 hover:bg-pink-50 cursor-pointer transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-lg">{food.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {food.calories} kcal • {food.protein}g protein • {food.serving}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${food.category === 'fruits' ? 'bg-red-100 text-red-700' :
                            food.category === 'vegetables' ? 'bg-green-100 text-green-700' :
                              food.category === 'grains' ? 'bg-yellow-100 text-yellow-700' :
                                food.category === 'proteins' ? 'bg-blue-100 text-blue-700' :
                                  food.category === 'dairy' ? 'bg-purple-100 text-purple-700' :
                                    food.category === 'nuts' ? 'bg-orange-100 text-orange-700' :
                                      food.category === 'beverages' ? 'bg-cyan-100 text-cyan-700' :
                                        food.category === 'snacks' ? 'bg-pink-100 text-pink-700' :
                                          food.category === 'meals' ? 'bg-indigo-100 text-indigo-700' :
                                            'bg-gray-100 text-gray-700'
                            }`}>
                            {food.category}
                          </span>
                        </div>
                      </div>
                      <Plus className="w-5 h-5 text-pink-500 ml-3 flex-shrink-0" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Foods</h2>

            {/* Meal Type Tabs */}
            <div className="flex space-x-2 mb-6 bg-pink-50 p-2 rounded-xl">
              {mealTypes.map((meal) => {
                const MealIcon = meal.icon;
                const mealFoods = consumedFoods.filter(food => food.mealType === meal.id);
                return (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMealType(meal.id as any)}
                    className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedMealType === meal.id
                      ? 'bg-white shadow-md text-gray-800'
                      : 'text-gray-600 hover:text-gray-800'
                      }`}
                  >
                    <MealIcon className="w-4 h-4 mr-2" />
                    {meal.name}
                    {mealFoods.length > 0 && (
                      <span className="ml-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {mealFoods.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Food List by Meal */}
            <div className="max-h-80 overflow-y-auto space-y-3 custom-scrollbar">
              {consumedFoods.filter((food:any) => food.mealType === selectedMealType).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {mealTypes.find(m => m.id === selectedMealType)?.icon &&
                      React.createElement(mealTypes.find(m => m.id === selectedMealType)!.icon, {
                        className: "w-8 h-8 text-pink-500"
                      })}
                  </div>
                  <p className="text-lg font-medium">No {selectedMealType} items yet</p>
                  <p className="text-sm">Add some foods to track your {selectedMealType}!</p>
                </div>
              ) : (
                consumedFoods
                  .filter((food:any) => food.mealType === selectedMealType)
                  .map((food:any, index:any) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-800 text-lg">{food.name}</div>

                          <div className="text-sm text-gray-600 mt-1">
                            Quantity: {food.quantity} ×{" "}
                            {typeof food.serving === "object"
                              ? `${food.serving.calories} kcal / 100g`
                              : food.serving}
                          </div>

                          <div className="text-sm text-gray-600 mt-1">
                            {(food.calories * food.quantity).toFixed(0)} kcal •{" "}
                            {(food.protein * food.quantity).toFixed(1)}g protein •{" "}
                            {(food.carbs * food.quantity).toFixed(1)}g carbs •{" "}
                            {(food.fats * food.quantity).toFixed(1)}g fats
                          </div>
                        </div>
                        <button
                          onClick={() => removeFood(consumedFoods.indexOf(food))}
                          className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

          </div>
        </div>

        {/* Macronutrients Analytics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-pink-100">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Nutrition Analytics</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {[
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
            })}
          </div>

          {/* Macronutrient Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totals.protein.toFixed(1)}g</div>
              <div className="text-lg font-semibold text-blue-700 mb-1">Protein</div>
              <div className="text-sm text-blue-600">
                {((totals.protein * 4 / totals.calories) * 100 || 0).toFixed(1)}% of total calories
              </div>
              <div className="text-xs text-blue-500 mt-2">
                Target: 15-25% of calories
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
              <div className="text-3xl font-bold text-green-600 mb-2">{totals.carbs.toFixed(1)}g</div>
              <div className="text-lg font-semibold text-green-700 mb-1">Carbohydrates</div>
              <div className="text-sm text-green-600">
                {((totals.carbs * 4 / totals.calories) * 100 || 0).toFixed(1)}% of total calories
              </div>
              <div className="text-xs text-green-500 mt-2">
                Target: 45-65% of calories
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <div className="text-3xl font-bold text-yellow-600 mb-2">{totals.fats.toFixed(1)}g</div>
              <div className="text-lg font-semibold text-yellow-700 mb-1">Fats</div>
              <div className="text-sm text-yellow-600">
                {((totals.fats * 9 / totals.calories) * 100 || 0).toFixed(1)}% of total calories
              </div>
              <div className="text-xs text-yellow-500 mt-2">
                Target: 20-35% of calories
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Food Modal */}
      {showFoodModal && selectedFood && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add {selectedFood.name}</h3>
              <button
                onClick={() => setShowFoodModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Meal Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Add to Meal</label>
              <div className="grid grid-cols-2 gap-3">
                {mealTypes.map((meal) => {
                  const MealIcon = meal.icon;
                  return (
                    <button
                      key={meal.id}
                      onClick={() => setSelectedMealType(meal.id as any)}
                      className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${selectedMealType === meal.id
                        ? `bg-gradient-to-r ${meal.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      <MealIcon className="w-4 h-4 mr-2" />
                      {meal.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-6 border border-pink-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <span className="font-semibold">{selectedFood.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-semibold">{selectedFood.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs:</span>
                  <span className="font-semibold">{selectedFood.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fats:</span>
                  <span className="font-semibold">{selectedFood.fats}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiber:</span>
                  <span className="font-semibold">{selectedFood.fiber}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sugar:</span>
                  <span className="font-semibold">{selectedFood.sugar}g</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-3 text-center">
                Per {selectedFood.serving}
              </div>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity (servings)
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all duration-200 bg-pink-50/50 text-lg font-semibold text-center"
              />
            </div>

            {/* Total Calculation */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 mb-6 border border-gray-200">
              <div className="text-lg font-semibold text-gray-800 mb-3">
                Total for {quantity} serving(s):
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories:</span>
                  <div className="font-bold text-rose-600">{((selectedFood.calories * quantity).toFixed(1))} kcal</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <div className="font-bold text-blue-600">{((selectedFood.protein * quantity).toFixed(1))}g</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs:</span>
                  <div className="font-bold text-green-600">{((selectedFood.carbs * quantity).toFixed(1))}g</div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fats:</span>
                  <div className="font-bold text-yellow-600">{((selectedFood.fats * quantity).toFixed(1))}g</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFoodModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addFood}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-colors shadow-lg"
              >
                Add to {mealTypes.find(m => m.id === selectedMealType)?.name}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #f43f5e);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #db2777, #e11d48);
        }
      `}</style>
    </div>
  );
}

export default Calories;