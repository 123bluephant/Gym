// src/pages/Meals/List.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMeals } from '../../Data/mockMeals';
import { FiEdit2, FiTrash2, FiPlus, FiFilter, FiX, FiClock, FiList } from 'react-icons/fi';
import { Meal } from '../../types/gymTypes';
import Modal from '../../components/Ui/Modal';

const MealsList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCardClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

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
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleCardClick(meal)}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg truncate">{meal.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    meal.category === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                    meal.category === 'Lunch' ? 'bg-green-100 text-green-800' :
                    meal.category === 'Dinner' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
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
                  <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </span>
                  
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

      {/* Meal Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedMeal?.name || 'Meal Details'}
        size="lg"
      >
        {selectedMeal && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-sm px-3 py-1 rounded-full ${
                selectedMeal.category === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                selectedMeal.category === 'Lunch' ? 'bg-green-100 text-green-800' :
                selectedMeal.category === 'Dinner' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {selectedMeal.category}
              </span>
              
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="mr-1" />
                <span>Prep time: {selectedMeal.prepTime || 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 py-4 border-y border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-medium text-lg">{selectedMeal.calories}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="font-medium text-lg">{selectedMeal.protein}g</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Carbs</p>
                <p className="font-medium text-lg">{selectedMeal.carbs}g</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Fat</p>
                <p className="font-medium text-lg">{selectedMeal.fat}g</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{selectedMeal.description || 'No description available'}</p>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiList className="mr-1" /> Ingredients
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {selectedMeal.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  navigate(`/gym/meals/edit/${selectedMeal.id}`);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm flex items-center gap-2"
              >
                <FiEdit2 size={16} /> Edit Meal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm flex items-center gap-2"
              >
                <FiX size={16} /> Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MealsList;