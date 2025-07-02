// src/pages/Meals/List.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMeals } from '../../Data/mockMeals';
import { FiEdit2, FiTrash2, FiPlus, FiFilter } from 'react-icons/fi';
import { Meal } from '../../types/gymTypes';

const MealsList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const loadMeals = () => {
      try {
        const savedMeals = localStorage.getItem('gymMeals');
        if (savedMeals) {
          setMeals(JSON.parse(savedMeals));
        } else {
          setMeals(mockMeals);
          localStorage.setItem('gymMeals', JSON.stringify(mockMeals));
        }
      } catch (error) {
        console.error('Error loading meals:', error);
        setMeals(mockMeals);
      } finally {
        setLoading(false);
      }
    };
    loadMeals();
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      const updatedMeals = meals.filter(meal => meal.id !== id);
      setMeals(updatedMeals);
      localStorage.setItem('gymMeals', JSON.stringify(updatedMeals));
    }
  };

  const filteredMeals = filter === 'all' 
    ? meals 
    : meals.filter(meal => meal.category.toLowerCase() === filter);

  const categories = ['all', ...new Set(meals.map(meal => meal.category.toLowerCase()))];

  if (loading) {
    return <div className="p-6 text-center">Loading meals...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Meal Plans</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 w-full"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <FiFilter className="absolute right-3 top-3 text-gray-400" />
          </div>
          
          <button
            onClick={() => navigate('/gym/meals/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
          >
            <FiPlus /> Add Meal
          </button>
        </div>
      </div>

      {filteredMeals.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <p className="text-gray-500 mb-4">No meals found</p>
          <button
            onClick={() => navigate('/gym/meals/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <FiPlus /> Create Your First Meal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMeals.map(meal => (
            <div 
              key={meal.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate">{meal.name}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {meal.category}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 my-3">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Calories</p>
                    <p className="font-medium">{meal.calories}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Protein</p>
                    <p className="font-medium">{meal.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Carbs</p>
                    <p className="font-medium">{meal.carbs}g</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => navigate(`/gym/meals/view/${meal.id}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/gym/meals/edit/${meal.id}`);
                      }}
                      className="text-gray-500 hover:text-gray-700 p-1"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(meal.id);
                      }}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealsList;