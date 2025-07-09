import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { Meal } from '../../types/gymTypes';

const EditMeal: React.FC = () => {
  const { userId, mealId } = useParams<{ userId: string; mealId: string }>();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<Meal>({
    id: '',
    userId: userId || '',
    date: new Date().toISOString().split('T')[0],
    mealType: 'Breakfast',
    name: '',
    description: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
    ingredients: [],
  });
  const [loading, setLoading] = useState(true);
  const [newIngredient, setNewIngredient] = useState('');

  useEffect(() => {
    const fetchMeal = () => {
      setTimeout(() => {
        // Mock data - replace with actual API call
        const mockMeal: Meal = {
          id: mealId || 'new',
          userId: userId || '',
          date: '2023-06-15',
          mealType: 'Breakfast',
          name: 'Protein Shake',
          description: 'Whey protein with almond milk and banana',
          calories: 350,
          protein: 25,
          carbs: 30,
          fats: 8,
          ingredients: ['Whey protein', 'Almond milk', 'Banana']
        };
        setMeal(mockMeal);
        setLoading(false);
      }, 500);
    };

    if (mealId !== 'new') {
      fetchMeal();
    } else {
      setLoading(false);
    }
  }, [mealId, userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' || name === 'fats' 
        ? parseInt(value) || 0 
        : value,
    }));
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setMeal(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, newIngredient.trim()]
      }));
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setMeal(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would save the meal to your backend
    console.log('Meal saved:', meal);
    navigate(`/gym/members/meals/${userId}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      // Here you would delete the meal from your backend
      console.log('Meal deleted:', meal.id);
      navigate(`/gym/members/meals/${userId}`);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse flex flex-col space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          {mealId === 'new' ? 'Add New Meal' : 'Edit Meal'}
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft /> Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
              <input
                type="text"
                name="name"
                value={meal.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
              <select
                name="mealType"
                value={meal.mealType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={meal.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                <input
                  type="number"
                  name="calories"
                  value={meal.calories}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                <input
                  type="number"
                  name="protein"
                  value={meal.protein}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)</label>
                <input
                  type="number"
                  name="carbs"
                  value={meal.carbs}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fats (g)</label>
                <input
                  type="number"
                  name="fats"
                  value={meal.fats}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={meal.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add ingredient"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Add
                </button>
              </div>
              {meal.ingredients.length > 0 && (
                <ul className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                  {meal.ingredients.map((ingredient, index) => (
                    <li key={index} className="px-4 py-2 flex justify-between items-center">
                      <span>{ingredient}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveIngredient(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-gray-200">
            {mealId !== 'new' && (
              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800"
              >
                <FiTrash2 /> Delete Meal
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
              >
                <FiSave /> {mealId === 'new' ? 'Create Meal' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMeal;