import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);
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
  X,
  Check,
} from "lucide-react";
import { useRecoilValue } from "recoil";
import userAtom from "../../atoms/UserAtom";

type WeekDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

type MealType = "Breakfast" | "Lunch" | "Dinner";
type FoodPlanPayload = {
  user: string;
  weekStartDate: string;
  day: string;
  meals: {
    Breakfast?: Meal[];
    Lunch?: Meal[];
    Dinner?: Meal[];
  };
};
const NutritionService = {
  async getMeals() {
    const getFood = await fetch("/api/food/top15");
    if (!getFood.ok) {
      throw new Error(`Failed to fetch meals: ${getFood.statusText}`);
    }
    const data = await getFood.json();
    return {
      Breakfast: data.slice(0, 5),
      Lunch: data.slice(0, 5),
      Dinner: data.slice(0, 5),
    };
  },
  async getFoodPlan(userId: string, weekStartDate: string): Promise<UserDiet> {
    const res = await fetch(
      `/api/food/food-plan?userId=${userId}&weekStartDate=${weekStartDate}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch food plan: ${res.statusText}`);
    }

    const data = await res.json();
    return data.dailyPlans.plan; // Assuming backend returns { plan: { monday: {...}, ... } }
  },
  async addFoodPlan(payload: FoodPlanPayload): Promise<{ success: boolean }> {
    const res = await fetch("/api/food/addFoodPlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`Failed to add food plan: ${res.statusText}`);
    }

    return res.json();
  },

  async removeMealFromUserDiet({
    userId,
    weekStartDate,
    day,
    mealType,
    foodId,
  }: {
    userId: string;
    weekStartDate: string;
    day: string;
    mealType: "Breakfast" | "Lunch" | "Dinner";
    foodId: string | number;
  }): Promise<{
    plan(plan: any): unknown; success: boolean 
}> {
    const res = await fetch("/api/food/removeFoodPlanItem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userId,
        weekStartDate,
        day,
        mealType,
        foodId,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to remove meal: ${res.statusText}`);
    }
    const data = await res.json();
    return data.dailyPlan;
  },
};
type UserDiet = Record<WeekDay, Record<MealType, Meal[]>>;
type Meal = {
  calculated: any;
  fiber: number;
  sugar: number;
  _id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
};
const NutritionPage = () => {
  const [meals, setMeals] = useState({ Breakfast: [], Lunch: [], Dinner: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useRecoilValue(userAtom);

  const [userDiet, setUserDiet] = useState<
    Record<WeekDay, Record<MealType, Meal[]>>
  >({
    Monday: { Breakfast: [], Lunch: [], Dinner: [] },
    Tuesday: { Breakfast: [], Lunch: [], Dinner: [] },
    Wednesday: { Breakfast: [], Lunch: [], Dinner: [] },
    Thursday: { Breakfast: [], Lunch: [], Dinner: [] },
    Friday: { Breakfast: [], Lunch: [], Dinner: [] },
    Saturday: { Breakfast: [], Lunch: [], Dinner: [] },
    Sunday: { Breakfast: [], Lunch: [], Dinner: [] },
  });

  const daysOfWeek = [
    {
      key: "Sunday",
      label: "Sunday",
      short: "Sun",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      textColor: "text-pink-700",
    },
    {
      key: "Monday",
      label: "Monday",
      short: "Mon",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      textColor: "text-red-700",
    },
    {
      key: "Tuesday",
      label: "Tuesday",
      short: "Tue",
      color: "from-orange-500 to-yellow-500",
      bgColor: "from-orange-50 to-yellow-50",
      textColor: "text-orange-700",
    },
    {
      key: "Wednesday",
      label: "Wednesday",
      short: "Wed",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      textColor: "text-green-700",
    },
    {
      key: "Thursday",
      label: "Thursday",
      short: "Thu",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      textColor: "text-blue-700",
    },
    {
      key: "Friday",
      label: "Friday",
      short: "Fri",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
      textColor: "text-purple-700",
    },
    {
      key: "Saturday",
      label: "Saturday",
      short: "Sat",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50",
      textColor: "text-indigo-700",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const mealData = await NutritionService.getMeals();
        setMeals(mealData);

        const userId = user?._id;
        const weekStartDate = dayjs().startOf("week").format("YYYY-MM-DD");

        if (userId) {
          const existingPlan = await NutritionService.getFoodPlan(
            userId,
            weekStartDate
          );
          setUserDiet(existingPlan);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleAddMealToUserDiet = async (
    meal: Meal,
    mealType: MealType,
    day: WeekDay
  ) => {
    try {
      const userId = user?._id;
      if (!userId) return;
      setUserDiet((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          [mealType]: [...prev[day][mealType], meal],
        },
      }));

      const weekStart = dayjs().startOf("isoWeek");
      const dayIndex = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].indexOf(day);
      const date = weekStart.add(dayIndex, "day").format("YYYY-MM-DD");

      // Prepare meals for the day
      const mealsForDay = {
        Breakfast: mealType === "Breakfast" ? [meal] : [],
        Lunch: mealType === "Lunch" ? [meal] : [],
        Dinner: mealType === "Dinner" ? [meal] : [],
      };
      await NutritionService.addFoodPlan({
        user: userId,
        weekStartDate: date,
        day,
        meals: mealsForDay,
      });
    } catch (err) {
      console.error("Failed to add meal to user diet:", err);
    }
  };

  // Handle removing meal from user diet
  const handleRemoveMealFromUserDiet = async (
    mealId: any,
    mealType: any,
    day: any
  ) => {
    try {
      const payload = {
        userId: user._id,
        weekStartDate: dayjs().startOf("week").format("YYYY-MM-DD"),
        day,
        mealType,
        foodId: mealId,
      };
      const response = await NutritionService.removeMealFromUserDiet(payload);
      setUserDiet(response.plan);
    } catch (err) {
      console.error("Failed to remove meal from user diet:", err);
    }
  };

  // Check if meal is in user diet for specific day
  const isMealInUserDiet = (mealId, mealType, day) => {
    return userDiet[day][mealType].some((meal) => meal._id === mealId);
  };

  // Calculate daily totals for a specific day
  const calculateDayTotals = (day) => {
    const formattedDay =
      day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

    const dayMeals = userDiet[formattedDay];
    const allMeals = [
      ...dayMeals.Breakfast,
      ...dayMeals.Lunch,
      ...dayMeals.Dinner,
    ];

    return allMeals.reduce(
      (totals, meal) => ({
        calories: totals.calories + meal.calories,
        protein: totals.protein + meal.protein,
        carbs: totals.carbs + meal.carbs,
        fat: totals.fat + meal.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
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
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Data
          </h2>
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
      title: "Smart Meal Planning",
      description:
        "AI-powered recommendations based on your goals and preferences",
      icon: Target,
    },
    {
      title: "Recipe Library",
      description: "Over 1000 healthy recipes with step-by-step instructions",
      icon: BookOpen,
    },
    {
      title: "Grocery Lists",
      description: "Automatically generated shopping lists for your meal plans",
      icon: ChefHat,
    },
    {
      title: "Nutrition Tracking",
      description: "Track macros, calories, and micronutrients effortlessly",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 text-white py-24 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/15 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
          <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-300/25 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-88 h-88 bg-pink-300/25 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>

          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full filter blur-lg animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-green-500/30 rounded-full filter blur-lg animate-pulse animation-delay-3000"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 animate-float-slow"
            style={{ animationDelay: "0s" }}
          >
            <ChefHat className="w-12 h-12 text-white/40 drop-shadow-lg" />
          </div>
          <div
            className="absolute top-1/3 right-1/4 animate-float-slow"
            style={{ animationDelay: "1s" }}
          >
            <Target className="w-10 h-10 text-white/40 drop-shadow-lg" />
          </div>
          <div
            className="absolute bottom-1/4 left-1/3 animate-float-slow"
            style={{ animationDelay: "2s" }}
          >
            <BookOpen className="w-11 h-11 text-white/40 drop-shadow-lg" />
          </div>
          <div
            className="absolute top-1/2 right-1/3 animate-float-slow"
            style={{ animationDelay: "0.5s" }}
          >
            <TrendingUp className="w-9 h-9 text-white/40 drop-shadow-lg" />
          </div>
          <div
            className="absolute top-3/4 right-1/2 animate-float-slow"
            style={{ animationDelay: "3s" }}
          >
            <Calendar className="w-8 h-8 text-white/40 drop-shadow-lg" />
          </div>
          <div
            className="absolute bottom-1/3 right-1/4 animate-float-slow"
            style={{ animationDelay: "4s" }}
          >
            <Clock className="w-7 h-7 text-white/40 drop-shadow-lg" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            {/* Animated Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in-up">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-sm font-semibold text-green-100 tracking-wide">
                TRANSFORM YOUR NUTRITION TODAY
              </span>
            </div>

            <div className="inline-block mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-green-100 to-blue-100 bg-clip-text text-transparent animate-fade-in-up animation-delay-500 leading-tight">
                Nutrition & Meal Planning
              </h1>
              <div className="h-1.5 bg-gradient-to-r from-transparent via-white to-transparent mt-6 animate-scale-in animation-delay-1000 rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-green-100 max-w-4xl mx-auto leading-relaxed mb-4 animate-fade-in-up animation-delay-1500 font-light">
              Fuel your fitness journey with personalized meal plans, flexible
              diet options, and smart nutrition tracking designed for your
              lifestyle.
            </p>

            {/* Stats Counter Animation */}
            <div className="flex justify-center space-x-8 mb-12 animate-fade-in-up animation-delay-2000">
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-count-up">
                  1000+
                </div>
                <div className="text-sm text-green-200 font-medium">
                  Healthy Recipes
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-count-up animation-delay-500">
                  50K+
                </div>
                <div className="text-sm text-green-200 font-medium">
                  Happy Users
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white animate-count-up animation-delay-1000">
                  24/7
                </div>
                <div className="text-sm text-green-200 font-medium">
                  Support
                </div>
              </div>
            </div>

            {/* Animated CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-2500">
              <button className="group relative bg-white text-green-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-green-50 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <span className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                  Start Your Journey
                  <div className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">→</span>
                    </div>
                  </div>
                </span>
              </button>
              <button className="group relative border-2 border-white/50 backdrop-blur-sm text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="flex items-center justify-center">
                  <BookOpen className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Explore Recipes</span>
                </span>
              </button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animation-delay-3000">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-indicator"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden z-20">
          <svg
            className="relative block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
              className="text-white"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; -100 0; 0 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".6"
              fill="currentColor"
              className="text-white"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 100 0; 0 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
              className="text-white"
            >
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need on My Website
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive nutrition tools to support your fitness goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mealPlanFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
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
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Weekly Meal Planner
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Plan your meals for the entire week and track your nutrition goals
              with our intuitive drag-and-drop interface
            </p>
          </div>

          {/* Weekly Meal Table */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-12 backdrop-blur-sm bg-white/95">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-b-2 border-purple-100">
                  <tr>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-900 w-48 bg-gradient-to-br from-white to-purple-50 border-r-2 border-purple-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <ChefHat className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg">Meal Type</span>
                      </div>
                    </th>
                    {daysOfWeek.map((day) => (
                      <th
                        key={day.key}
                        className="px-4 py-6 text-center text-sm font-bold text-gray-900 min-w-48 border-r-2 border-purple-100 last:border-r-0"
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <span className="hidden sm:inline font-bold text-lg text-gray-800">
                            {day.label}
                          </span>
                          <span className="sm:hidden font-bold text-lg text-gray-800">
                            {day.short}
                          </span>
                          <div
                            className={`text-sm font-bold text-white bg-gradient-to-r ${day.color} px-3 py-1.5 rounded-full shadow-sm`}
                          >
                            {calculateDayTotals(day.key).calories} cal
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-purple-50">
                  {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                    <tr
                      key={mealType}
                      className="hover:bg-gradient-to-r hover:from-purple-25 hover:to-pink-25 transition-all duration-300 group"
                    >
                      <td className="px-8 py-10 text-sm font-bold text-gray-900 capitalize bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-r-2 border-purple-100">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full shadow-sm ${
                              mealType === "Breakfast"
                                ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                                : mealType === "Lunch"
                                ? "bg-gradient-to-r from-orange-400 to-red-400"
                                : "bg-gradient-to-r from-blue-400 to-purple-400"
                            }`}
                          ></div>
                          <span className="text-lg font-bold text-gray-800">
                            {mealType}
                          </span>
                        </div>
                      </td>
                      {daysOfWeek.map((day) => (
                        <td
                          key={`${mealType}-${day.key}`}
                          className="px-4 py-10 text-sm border-r-2 border-purple-100 last:border-r-0 align-top"
                        >
                          <div className="space-y-3 min-h-32">
                            {userDiet[day.key][mealType].length > 0 ? (
                              userDiet[day.key][mealType].map((meal) => (
                                <div
                                  key={meal._id}
                                  className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-xl p-4 relative group hover:shadow-lg hover:scale-105 transition-all duration-300 hover:border-green-300"
                                >
                                  <button
                                    onClick={() =>
                                      handleRemoveMealFromUserDiet(
                                        meal._id,
                                        mealType,
                                        day.key
                                      )
                                    }
                                    className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:from-red-600 hover:to-pink-600 shadow-lg transform hover:scale-110"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                  <div className="font-bold text-gray-900 text-sm mb-2 pr-6 leading-tight">
                                    {meal.name}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                                      {meal.calories} cal
                                    </span>
                                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                                      <Clock className="w-3 h-3" />
                                      <span>{meal.time}</span>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="text-center text-gray-400 text-sm py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 group">
                                <div className="flex flex-col items-center space-y-2">
                                  <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                                    <Plus className="w-5 h-5 text-white" />
                                  </div>
                                  <span className="font-medium">
                                    No meal planned
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    Add meals below
                                  </span>
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
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm bg-white/95">
            <div className="p-8 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-b-2 border-purple-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Available Meals
                  </h3>
                  <p className="text-gray-700 mt-1 font-medium">
                    Click the colorful day buttons to add meals to your weekly
                    plan
                  </p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-3 gap-10">
                {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                  <div
                    key={mealType}
                    className="space-y-6 bg-gradient-to-br from-gray-50/50 to-white p-6 rounded-2xl border border-gray-100"
                  >
                    <h4 className="text-xl font-bold text-gray-900 capitalize flex items-center space-x-3 pb-4 border-b-2 border-gray-100">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          mealType === "Breakfast"
                            ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                            : mealType === "Lunch"
                            ? "bg-gradient-to-r from-orange-400 to-red-400"
                            : "bg-gradient-to-r from-blue-400 to-purple-400"
                        }`}
                      >
                        <ChefHat className="w-4 h-4 text-white" />
                      </div>
                      <span>{mealType}</span>
                    </h4>

                    {meals[mealType]?.length > 0 ? (
                      <div className="space-y-4">
                        {meals[mealType].map((meal) => (
                          <div
                            key={meal._id}
                            className="p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl hover:shadow-xl transition-all duration-300 relative border-2 border-gray-200 hover:border-purple-300 group hover:scale-[1.02] hover:bg-gradient-to-br hover:from-purple-50/30 hover:to-pink-50/30"
                          >
                            <div className="mb-5">
                              <h5 className="font-bold text-gray-900 mb-3 text-lg leading-tight group-hover:text-purple-800 transition-colors">
                                {meal.name}
                              </h5>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                                  {meal.calories} cal
                                </span>
                                <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                                  P: {meal.protein}g
                                </span>
                                <span className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                                  C: {meal.carbs}g
                                </span>
                                <span className="bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm">
                                  F: {meal.fats}g
                                </span>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-700">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                                    <Clock className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="font-bold">{meal.time}</span>
                                </div>
                                <span
                                  className={`px-3 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                                    meal.difficulty === "Easy"
                                      ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                                      : meal.difficulty === "Medium"
                                      ? "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800"
                                      : "bg-gradient-to-r from-red-100 to-red-200 text-red-800"
                                  }`}
                                >
                                  {meal.difficulty}
                                </span>
                              </div>
                            </div>

                            {/* Add to Day Buttons */}
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                                <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-2">
                                  <Plus className="w-3 h-3 text-white" />
                                </div>
                                Add to day:
                              </div>
                              <div className="grid grid-cols-4 gap-2.5">
                                {daysOfWeek.slice(0, 4).map((day) => (
                                  <button
                                    key={day.key}
                                    onClick={() =>
                                      handleAddMealToUserDiet(
                                        meal,
                                        mealType,
                                        day.key
                                      )
                                    }
                                    disabled={isMealInUserDiet(
                                      meal._id,
                                      mealType,
                                      day.key
                                    )}
                                    className={`px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm ${
                                      isMealInUserDiet(
                                        meal._id,
                                        mealType,
                                        day.key
                                      )
                                        ? `bg-gradient-to-r from-green-400 to-emerald-400 text-white cursor-not-allowed shadow-md`
                                        : `bg-gradient-to-r ${day.color} text-white hover:shadow-lg transform hover:scale-105 hover:brightness-110`
                                    }`}
                                  >
                                    {isMealInUserDiet(
                                      meal._id,
                                      mealType,
                                      day.key
                                    ) ? (
                                      <div className="flex items-center justify-center">
                                        <Check className="w-4 h-4" />
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <span className="font-bold">
                                          {day.short}
                                        </span>
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                              <div className="grid grid-cols-3 gap-2.5">
                                {daysOfWeek.slice(4).map((day) => (
                                  <button
                                    key={day.key}
                                    onClick={() =>
                                      handleAddMealToUserDiet(
                                        meal,
                                        mealType,
                                        day.key
                                      )
                                    }
                                    disabled={isMealInUserDiet(
                                      meal._id,
                                      mealType,
                                      day.key
                                    )}
                                    className={`px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-sm ${
                                      isMealInUserDiet(
                                        meal._id,
                                        mealType,
                                        day.key
                                      )
                                        ? `bg-gradient-to-r from-green-400 to-emerald-400 text-white cursor-not-allowed shadow-md`
                                        : `bg-gradient-to-r ${day.color} text-white hover:shadow-lg transform hover:scale-105 hover:brightness-110`
                                    }`}
                                  >
                                    {isMealInUserDiet(
                                      meal._id,
                                      mealType,
                                      day.key
                                    ) ? (
                                      <div className="flex items-center justify-center">
                                        <Check className="w-4 h-4" />
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center">
                                        <span className="font-bold">
                                          {day.short}
                                        </span>
                                      </div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <ChefHat className="w-6 h-6 text-white" />
                          </div>
                          <span className="font-medium">
                            No meals available for {mealType}
                          </span>
                        </div>
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
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border-2 border-gradient-to-r from-blue-200/50 to-purple-200/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                      Nutrition Analytics
                    </h2>
                    <p className="text-gray-600 mt-1 font-medium">
                      Track your daily nutrition goals and progress
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full border border-green-200">
                    <span className="text-sm font-bold text-green-700">
                      Weekly Overview
                    </span>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full border border-blue-200">
                    <span className="text-sm font-bold text-blue-700">
                      Real-time Tracking
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Nutrition Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                {(() => {
                  // Calculate totals from all selected meals across all days
                  const totals = Object.values(userDiet).reduce(
                    (acc, dayMeals) => {
                      const allDayMeals = [
                        ...dayMeals.Breakfast,
                        ...dayMeals.Lunch,
                        ...dayMeals.Dinner,
                      ];
                      console.log(JSON.stringify(allDayMeals), "sadho");
                      return allDayMeals.reduce(
                        (dayAcc, meal) => ({
                          calories:
                            dayAcc.calories + (meal.calculated?.calories || 0),
                          protein:
                            dayAcc.protein + (meal.calculated?.protein || 0),
                          carbs: dayAcc.carbs + (meal.calculated?.carbs || 0),
                          fats: dayAcc.fats + (meal.calculated?.fats || 0),
                          fiber:
                            dayAcc.fiber +
                            (meal.calculated?.fiber ||
                              Math.round((meal.calculated?.carbs || 0) * 0.1)),
                          sugar:
                            dayAcc.sugar +
                            (meal.calculated?.sugar ||
                              Math.round((meal.calculated?.carbs || 0) * 0.3)),
                        }),
                        acc
                      );
                    },
                    {
                      calories: 0,
                      protein: 0,
                      carbs: 0,
                      fats: 0,
                      fiber: 0,
                      sugar: 0,
                    }
                  );

                  const dailyCaloriesGoal = 2000;
                  const weeklyTotals = {
                    calories: totals.calories,
                    protein: totals.protein,
                    carbs: totals.carbs,
                    fats: totals.fats,
                  };

                  const mainMacros = [
                    {
                      name: "Total Calories",
                      value: weeklyTotals.calories,
                      unit: "kcal",
                      color: "from-rose-500 via-pink-500 to-red-500",
                      bgColor: "from-rose-50 to-pink-50",
                      target: dailyCaloriesGoal * 7,
                      icon: Target,
                      description: "Weekly calorie intake",
                    },
                    {
                      name: "Protein",
                      value: weeklyTotals.protein,
                      unit: "g",
                      color: "from-blue-500 via-indigo-500 to-purple-500",
                      bgColor: "from-blue-50 to-indigo-50",
                      target: ((dailyCaloriesGoal * 0.15) / 4) * 7,
                      icon: TrendingUp,
                      description: "Muscle building fuel",
                    },
                    {
                      name: "Carbohydrates",
                      value: weeklyTotals.carbs,
                      unit: "g",
                      color: "from-green-500 via-emerald-500 to-teal-500",
                      bgColor: "from-green-50 to-emerald-50",
                      target: ((dailyCaloriesGoal * 0.55) / 4) * 7,
                      icon: TrendingUp,
                      description: "Primary energy source",
                    },
                  ];

                  return mainMacros.map((macro) => {
                    const percentage = (macro.value / macro.target) * 100;
                    const IconComponent = macro.icon;
                    return (
                      <div key={macro.name} className="group relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${macro.color} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500`}
                        ></div>
                        <div
                          className={`relative bg-gradient-to-br ${macro.bgColor} rounded-3xl p-8 border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 backdrop-blur-sm`}
                        >
                          <div className="flex items-start justify-between mb-6">
                            <div
                              className={`w-14 h-14 bg-gradient-to-br ${macro.color} rounded-2xl flex items-center justify-center shadow-lg`}
                            >
                              <IconComponent className="w-7 h-7 text-white" />
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-gray-800 mb-1">
                                {macro.value.toFixed(0)}
                              </div>
                              <div className="text-sm font-medium text-gray-600">
                                {macro.unit}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              {macro.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {macro.description}
                            </p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">
                                Progress
                              </span>
                              <span className="text-sm font-bold text-gray-800">
                                {percentage.toFixed(0)}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200/80 rounded-full h-3 overflow-hidden">
                              <div
                                className={`bg-gradient-to-r ${macro.color} h-3 rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                style={{
                                  width: `${Math.min(percentage, 100)}%`,
                                }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                              <span>0</span>
                              <span className="font-medium">
                                Target: {macro.target.toFixed(0)} {macro.unit}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              {/* Detailed Micronutrients */}
              <div className="bg-gradient-to-br from-white/80 to-gray-50/80 rounded-2xl p-8 border border-gray-200/50 shadow-lg backdrop-blur-sm">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mr-4">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Detailed Breakdown
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {(() => {
                    const totals = Object.values(userDiet).reduce(
                      (acc, dayMeals) => {
                        const allDayMeals = [
                          ...dayMeals.Breakfast,
                          ...dayMeals.Lunch,
                          ...dayMeals.Dinner,
                        ];
                        {
                          console.log(allDayMeals);
                        }
                        return allDayMeals.reduce(
                          (dayAcc, meal) => ({
                            calories: dayAcc.calories + meal.calories,
                            protein: dayAcc.protein + meal.protein,
                            carbs: dayAcc.carbs + meal.carbs,
                            fats: dayAcc.fats + meal.fat,
                            fiber:
                              dayAcc.fiber +
                              (meal.fiber || Math.round(meal.carbs * 0.1)),
                            sugar:
                              dayAcc.sugar +
                              (meal.sugar || Math.round(meal.carbs * 0.3)),
                          }),
                          acc
                        );
                      },
                      {
                        calories: 0,
                        protein: 0,
                        carbs: 0,
                        fats: 0,
                        fiber: 0,
                        sugar: 0,
                      }
                    );

                    const dailyCaloriesGoal = 2000;

                    return [
                      {
                        name: "Calories",
                        value: totals.calories,
                        unit: "kcal",
                        color: "from-rose-400 to-pink-500",
                        target: dailyCaloriesGoal * 7,
                      },
                      {
                        name: "Protein",
                        value: totals.protein,
                        unit: "g",
                        color: "from-blue-400 to-indigo-500",
                        target: ((dailyCaloriesGoal * 0.15) / 4) * 7,
                      },
                      {
                        name: "Carbs",
                        value: totals.carbs,
                        unit: "g",
                        color: "from-green-400 to-emerald-500",
                        target: ((dailyCaloriesGoal * 0.55) / 4) * 7,
                      },
                      {
                        name: "Fats",
                        value: totals.fats,
                        unit: "g",
                        color: "from-yellow-400 to-orange-500",
                        target: ((dailyCaloriesGoal * 0.3) / 9) * 7,
                      },
                      {
                        name: "Fiber",
                        value: totals.fiber,
                        unit: "g",
                        color: "from-purple-400 to-violet-500",
                        target: 25 * 7,
                      },
                      {
                        name: "Sugar",
                        value: totals.sugar,
                        unit: "g",
                        color: "from-pink-400 to-rose-500",
                        target: 50 * 7,
                      },
                    ].map((macro) => {
                      const percentage = (macro.value / macro.target) * 100;
                      return (
                        <div
                          key={macro.name}
                          className="bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`w-5 h-5 bg-gradient-to-r ${macro.color} rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300`}
                            ></div>
                            <div
                              className={`text-xs font-bold px-2 py-1 rounded-full ${
                                percentage >= 100
                                  ? "bg-green-100 text-green-700"
                                  : percentage >= 75
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {percentage.toFixed(0)}%
                            </div>
                          </div>

                          <div className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
                            {macro.value.toFixed(1)}
                          </div>
                          <div className="text-sm font-medium text-gray-600 mb-1">
                            {macro.name}
                          </div>
                          <div className="text-xs text-gray-500 mb-3">
                            {macro.unit}
                          </div>

                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${macro.color} h-2.5 rounded-full transition-all duration-700 ease-out shadow-sm`}
                              style={{ width: `${Math.min(percentage, 100)}%` }}
                            ></div>
                          </div>

                          <div className="text-xs text-gray-500 mt-2 text-center">
                            Target: {macro.target.toFixed(0)}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Weekly Summary Stats */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-3">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-green-800">Meals Planned</h4>
                  </div>
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {Object.values(userDiet).reduce(
                      (total, day) =>
                        total +
                        day.Breakfast.length +
                        day.Lunch.length +
                        day.Dinner.length,
                      0
                    )}
                  </div>
                  <p className="text-sm text-green-600">
                    Total meals this week
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200/50 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-800">Days Planned</h4>
                  </div>
                  <div className="text-3xl font-bold text-blue-700 mb-1">
                    {
                      Object.values(userDiet).filter(
                        (day) =>
                          day.Breakfast.length > 0 ||
                          day.Lunch.length > 0 ||
                          day.Dinner.length > 0
                      ).length
                    }
                  </div>
                  <p className="text-sm text-blue-600">Out of 7 days</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200/50 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center mr-3">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-purple-800">
                      Avg Daily Calories
                    </h4>
                  </div>
                  <div className="text-3xl font-bold text-purple-700 mb-1">
                    {(() => {
                      const totalCalories = Object.values(userDiet).reduce(
                        (total, day) => {
                          const dayMeals = [
                            ...day.Breakfast,
                            ...day.Lunch,
                            ...day.Dinner,
                          ];
                          return (
                            total +
                            dayMeals.reduce(
                              (dayTotal, meal) => dayTotal + meal.calories,
                              0
                            )
                          );
                        },
                        0
                      );
                      const plannedDays = Object.values(userDiet).filter(
                        (day) =>
                          day.Breakfast.length > 0 ||
                          day.Lunch.length > 0 ||
                          day.Dinner.length > 0
                      ).length;
                      return plannedDays > 0
                        ? Math.round(totalCalories / plannedDays)
                        : 0;
                    })()}
                  </div>
                  <p className="text-sm text-purple-600">Per planned day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-10 left-40 w-72 h-72 bg-pink-300/20 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
          <div className="absolute top-10 right-1/3 w-64 h-64 bg-purple-300/15 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-1000"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/6 animate-float animation-delay-500">
            <Target className="w-8 h-8 text-white/20" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-slow animation-delay-1500">
            <TrendingUp className="w-10 h-10 text-white/25" />
          </div>
          <div className="absolute bottom-1/4 left-1/4 animate-float animation-delay-2500">
            <ChefHat className="w-9 h-9 text-white/20" />
          </div>
          <div className="absolute top-1/2 right-1/6 animate-float-slow animation-delay-3000">
            <BookOpen className="w-7 h-7 text-white/25" />
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-float animation-delay-1000">
            <Calendar className="w-8 h-8 text-white/20" />
          </div>
        </div>

        {/* Geometric Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-16 left-16 w-32 h-32 border-2 border-white rotate-45 animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute bottom-16 right-16 w-24 h-24 border-2 border-white rotate-12 animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          ></div>
          <div className="absolute top-1/2 left-8 w-16 h-16 border border-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-8 w-20 h-20 border border-white rounded-full animate-pulse animation-delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main Heading with Animation */}
          <div className="mb-8">
            <div className="inline-block mb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white/80 rounded-full animate-pulse animation-delay-500"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse animation-delay-1000"></div>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-emerald-100 to-blue-100 bg-clip-text text-transparent mb-4 animate-fade-in-up">
                Ready to Transform Your Nutrition?
              </h2>
              <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent animate-scale-in"></div>
            </div>

            <p className="text-xl md:text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed mb-4 animate-fade-in-up animation-delay-500">
              Join{" "}
              <span className="font-bold text-white bg-white/20 px-3 py-1 rounded-full">
                12,000+
              </span>{" "}
              people who've achieved their health goals with our personalized
              meal planning system.
            </p>

            {/* Success Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12 animate-fade-in-up animation-delay-1000">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 animate-count-up animation-delay-1500">
                  95%
                </div>
                <div className="text-sm text-emerald-200 font-medium">
                  Success Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 animate-count-up animation-delay-2000">
                  30 Days
                </div>
                <div className="text-sm text-emerald-200 font-medium">
                  Average Results
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1 animate-count-up animation-delay-2500">
                  1000+
                </div>
                <div className="text-sm text-emerald-200 font-medium">
                  Healthy Recipes
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fade-in-up animation-delay-1500">
            <button className="group relative bg-white text-emerald-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              {/* Button Content */}
              <span className="relative flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
                  <Target className="w-3 h-3 text-white" />
                </div>
                Start Your Free Journey
                <div className="ml-3 transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </div>
              </span>

              {/* Shine Effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
            </button>

            <button className="group relative border-3 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
              {/* Button Background Animation */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Button Content */}
              <span className="relative flex items-center justify-center">
                <BookOpen className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                Explore Sample Plans
                <div className="ml-3 w-2 h-2 bg-current rounded-full animate-pulse group-hover:animate-bounce"></div>
              </span>

              {/* Border Animation */}
              <div className="absolute inset-0 border-2 border-white/50 rounded-2xl animate-pulse"></div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-in-up animation-delay-2000">
            <p className="text-emerald-200 text-sm mb-6 font-medium">
              ✨ No credit card required • 🔒 100% secure • 📱 Works on all
              devices
            </p>

            {/* Social Proof Avatars */}
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm animate-bounce`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="ml-4 text-emerald-100 text-sm">
                <span className="font-bold">Sarah, Mike, Alex</span> and{" "}
                <span className="font-bold">11,997 others</span> joined this
                week
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up animation-delay-3000">
            <div className="flex flex-col items-center text-white/60">
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-scroll-indicator"></div>
              </div>
              <span className="text-xs mt-2 font-medium">
                Scroll to explore
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block w-full h-24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
              className="text-gray-50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; -100 0; 0 0"
                dur="12s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
              className="text-gray-50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; 100 0; 0 0"
                dur="10s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
              className="text-gray-50"
            >
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="translate"
                values="0 0; -50 0; 0 0"
                dur="8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default NutritionPage;
