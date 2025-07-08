import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import { Meal, User } from '../../types/gymTypes';

const MealForm: React.FC = () => {
  const { userId, mealId } = useParams<{ userId: string; mealId?: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Omit<Meal, 'id'> & { id?: string }>({
      date: new Date().toISOString().split('T')[0],
      mealType: 'Breakfast',
      description: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      name: '',
      category: 'Lunch',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mealId) {
      // Editing existing meal - load the data
      const savedUsers = localStorage.getItem('gymUsers');
      if (savedUsers) {
        const users: User[] = JSON.parse(savedUsers);
        const user = users.find(u => u.id === userId);
        if (user?.meals) {
          const existingMeal = user.meals.find(m => m.id === mealId);
          if (existingMeal) {
            setMeal(existingMeal);
          }
        }
      }
    }
    setLoading(false);
  }, [userId, mealId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const savedUsers = localStorage.getItem('gymUsers');
    if (savedUsers) {
      const users: User[] = JSON.parse(savedUsers);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex] };
        const meals = updatedUser.meals || [];
        
        if (mealId) {
          // Update existing meal
          const mealIndex = meals.findIndex(m => m.id === mealId);
          if (mealIndex !== -1) {
            meals[mealIndex] = meal as Meal;
          }
        } else {
          // Add new meal
          const newMeal = {
            ...meal,
            id: Date.now().toString()
          } as Meal;
          meals.push(newMeal);
        }
        
        updatedUser.meals = meals;
        users[userIndex] = updatedUser;
        localStorage.setItem('gymUsers', JSON.stringify(users));
        navigate(`/gym/members/meals/${userId}`);
      }
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 mb-4"
      >
        <FiArrowLeft /> Back to Meals
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {mealId ? 'Edit Meal' : 'Add New Meal'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={meal.date}
              onChange={(e) => setMeal({...meal, date: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Meal Type</label>
            <select
              value={meal.mealType}
              onChange={(e) => setMeal({...meal, mealType: e.target.value as any})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={meal.description}
              onChange={(e) => setMeal({...meal, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={3}
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Calories (kcal)</label>
            <input
              type="number"
              value={meal.calories}
              onChange={(e) => setMeal({...meal, calories: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Protein (g)</label>
            <input
              type="number"
              value={meal.protein}
              onChange={(e) => setMeal({...meal, protein: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Carbs (g)</label>
            <input
              type="number"
              value={meal.carbs}
              onChange={(e) => setMeal({...meal, carbs: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Fats (g)</label>
            <input
              type="number"
              value={meal.fats}
              onChange={(e) => setMeal({...meal, fats: parseInt(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              min="0"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <FiSave /> Save Meal
        </button>
      </form>
    </div>
  );
};

export default MealForm;