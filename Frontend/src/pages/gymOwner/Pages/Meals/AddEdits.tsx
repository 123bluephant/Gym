import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import { Meal } from '../../types/gymTypes';
import { FiX, FiPlus } from 'react-icons/fi';

const AddEditMeal: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode] = useState(!!id);
  const [meal, setMeal] = useState<Omit<Meal, 'id'> & { id?: string }>({
    name: '',
    category: 'Breakfast',
    calories: 0,
    protein: 0,
    description: '',
    carbs: 0,
    fat: 0,
    ingredients: []
  });
  const [tempIngredient, setTempIngredient] = useState('');

  useEffect(() => {
    if (id) {
      const savedMeals = localStorage.getItem('gymMeals');
      if (savedMeals) {
        const meals = JSON.parse(savedMeals) as Meal[];
        const existingMeal = meals.find(m => m.id === id);
        if (existingMeal) {
          setMeal(existingMeal);
        }
      }
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeal(prev => ({
      ...prev,
      [name]: name === 'calories' || name === 'protein' || name === 'carbs' || name === 'fat'
        ? Number(value)
        : value
    }));
  };

  const handleAddIngredient = () => {
    if (tempIngredient && !meal.ingredients.includes(tempIngredient)) {
      setMeal(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, tempIngredient]
      }));
      setTempIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredient: string) => {
    setMeal(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(i => i !== ingredient)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedMeals = localStorage.getItem('gymMeals');
    let meals = savedMeals ? JSON.parse(savedMeals) : [];

    if (isEditMode && meal.id) {
      // Update existing meal
      meals = meals.map((m: Meal) => m.id === meal.id ? meal : m);
    } else {
      // Add new meal
      const newMeal: Meal = {
        ...meal,
        id: Date.now().toString()
      };
      meals.push(newMeal);
    }

    // Save to localStorage
    localStorage.setItem('gymMeals', JSON.stringify(meals));

    // Navigate back to list
    navigate('/gym/meals');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {isEditMode ? 'Edit Meal' : 'Add New Meal'}
        </h1>
        <Button
          variant="outline"
          onClick={() => navigate('/gym/meals')}
          icon={<FiX className="mr-1" />}
        >
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name*</label>
          <input
            type="text"
            name="name"
            value={meal.name}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
          <select
            name="category"
            value={meal.category}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Calories*</label>
            <input
              type="number"
              name="calories"
              min="0"
              value={meal.calories}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)*</label>
            <input
              type="number"
              name="protein"
              min="0"
              step="0.1"
              value={meal.protein}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Carbs (g)*</label>
            <input
              type="number"
              name="carbs"
              min="0"
              step="0.1"
              value={meal.carbs}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fat (g)*</label>
            <input
              type="number"
              name="fat"
              min="0"
              step="0.1"
              value={meal.fat}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
          <div className="flex">
            <input
              type="text"
              value={tempIngredient}
              onChange={(e) => setTempIngredient(e.target.value)}
              placeholder="Add ingredient"
              className="flex-1 border border-gray-300 rounded-l-md p-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddIngredient}
              className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FiPlus />
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {meal.ingredients.map(ingredient => (
              <span
                key={ingredient}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {ingredient}
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(ingredient)}
                  className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700 focus:outline-none"
                >
                  <FiX size={14} />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <Button type="submit" className="w-full">
            {isEditMode ? 'Update Meal' : 'Add Meal'}
          </Button>
        </div>
      </form>
    </div>


  );
};

export default AddEditMeal;