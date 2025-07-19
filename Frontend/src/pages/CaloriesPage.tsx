import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar, Users, Award } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  type FoodItem = {
    id: string;
    name: string;
    category: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
    serving: string;
  };

  const [foodDatabase, setFoodDatabase] = useState<FoodItem[]>([]);
  const [consumedFoods, setConsumedFoods] = useRecoilState(consumedFoodAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snacks'>('breakfast');
  const user = useRecoilValue(userAtom);
  const [mealStats, setMealStats] = useState<any>(null);
  const [mealCalories, setMealCalories] = useState<any>(null);
  const [mealTotals, setMealTotals] = useState({
    breakfast: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 },
    lunch: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 },
    dinner: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 },
    snacks: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0, sugar: 0 },
  });
  const [allmeals, setAllMeals] = useState<any>(null);
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
      console.log("Meal data:", data);
      const {
        meal,
        allmeals,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats,
        totalFiber,
        totalSugar,
        totalGoalCalories,
        bmi,
        breakfastCalories,
        lunchCalories,
        dinnerCalories,
        snacksCalories
      } = data;

      // Transform meal for display
      const transformed = meal.map((food: any) => ({
        name: food.name,
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
      setAllMeals(allmeals);
      // Update UI state
      setConsumedFoods(transformed);

      // Optional: store other stats
      setMealStats({
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats,
        totalFiber,
        totalSugar,
        totalGoalCalories,
        bmi
      });

      setMealCalories({
        breakfastCalories,
        lunchCalories,
        dinnerCalories,
        snacksCalories
      });

    } catch (err) {
      console.error("❌ Error loading meal food:", err);
    }
  };
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
        name: selectedFood.name,
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

      setConsumedFoods((prev: any) => [...prev, {
        ...selectedFood,
        quantity,
        mealType: selectedMealType,
        consumedAt: new Date(),
      }]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      value: 'support@fitlife.com',
      action: 'Send Email',
      available: '24/7 Response within 2 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      value: '+1 (555) 123-4567',
      action: 'Call Now',
      available: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Instant messaging support',
      value: 'Chat with us',
      action: 'Start Chat',
      available: 'Available 24/7'
    },
    {
      icon: Calendar,
      title: 'Schedule a Call',
      description: 'Book a consultation',
      value: 'Book appointment',
      action: 'Schedule',
      available: 'Free 30-min sessions'
    }
  ];


  const officeInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      address: '123 Fitness Avenue, Health District, NY 10001'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      address: 'Monday - Friday: 9:00 AM - 6:00 PM EST\nSaturday: 10:00 AM - 4:00 PM EST'
    }
  ];

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help you succeed. Whether you're a gym owner or a fitness enthusiast, 
              our team is ready to support your journey.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Contact Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="bg-pink-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <p className="font-medium text-gray-900 mb-2">{method.value}</p>
                <p className="text-xs text-gray-500 mb-4">{method.available}</p>
                <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium">
                  {method.action}
                </button>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
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
                    ⚠️ You've exceeded your daily calorie goal by {(mealStats?.totalCalories - dailyCaloriesGoal).toFixed(0)} kcal
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
            {/* Breakfast */}
            <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <Coffee className="w-8 h-8" />
                <span className="text-lg font-bold">Breakfast</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {(mealCalories?.breakfastCalories || 0).toFixed(0)}
                </div>
                <div className="text-sm opacity-90">kcal</div>
                <div className="text-xs opacity-75">
                  P: {mealTotals.breakfast.protein}g | C: {mealTotals.breakfast.calories}g | F: {mealTotals.breakfast.fats}g
                </div>
              </div>
            </div>
            {/* Lunch */}
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <Sun className="w-8 h-8" />
                <span className="text-lg font-bold">Lunch</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {(mealCalories?.lunchCalories || 0).toFixed(0)}
                </div>
                <div className="text-sm opacity-90">kcal</div>
                <div className="text-xs opacity-75">
                  P: {mealTotals.lunch.protein}g | C: {mealTotals.lunch.calories}g | F: {mealTotals.lunch.fats}g
                </div>
              </div>
            </div>
            {/* Dinner */}
            <div className="bg-gradient-to-br from-purple-400 to-indigo-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <Moon className="w-8 h-8" />
                <span className="text-lg font-bold">Dinner</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {(mealCalories?.dinnerCalories || 0).toFixed(0)}
                </div>
                <div className="text-sm opacity-90">kcal</div>
                <div className="text-xs opacity-75">
                  P: {mealTotals.dinner.protein}g | C: {mealTotals.dinner.calories}g | F: {mealTotals.dinner.fats}g
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl p-6 text-white shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <Cookie className="w-8 h-8" />
                <span className="text-lg font-bold">Snacks</span>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">
                  {(mealCalories?.snacksCalories || 0).toFixed(0)}
                </div>
                <div className="text-sm opacity-90">kcal</div>
                <div className="text-xs opacity-75">
                  P: {mealTotals.snacks.protein}g | C: {mealTotals.snacks.calories}g | F: {mealTotals.snacks.fats}g
                </div>
              </div>
            </div>
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
                placeholder="Search from 500+ foods..."
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

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Send Another Message
                  </button>

                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                        placeholder="Brief subject line"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="gym-owner">Gym Owner Support</option>
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Office Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Office Information</h3>
              <div className="space-y-4">
                {officeInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-gray-900">{info.title}</h4>
                        <p className="text-gray-600 text-sm whitespace-pre-line">{info.address}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Members */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4"></h3>
              <div className="space-y-4">
                
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Quick Response Guarantee</h3>
              <p className="text-pink-100 text-sm">
                We typically respond to all inquiries within 2 hours during business hours, 
                and within 24 hours on weekends.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
