import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockMeals } from '../../Data/mockMeals';
import { FiEdit2, FiTrash2, FiPlus, FiFilter, FiX, FiClock, FiList, FiSearch } from 'react-icons/fi';
import { Meal } from '../../types/gymTypes';
import Modal from '../../components/Ui/Modal';
import { motion, AnimatePresence } from 'framer-motion';

const MealsList: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredMeals = meals.filter(meal => {
    const matchesFilter = filter === 'all' || meal.category.toLowerCase() === filter;
    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         meal.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         meal.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const categories = ['all', ...new Set(meals.map(meal => meal.category.toLowerCase()))];

  const handleCardClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Meal Plans</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your nutrition and meal schedules</p>
        </motion.div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          <div className="relative flex-1 min-w-[160px]">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FiFilter className="text-gray-400" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/gym/meals/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
          >
            <FiPlus /> Add Meal
          </motion.button>
        </div>
      </div>

      {filteredMeals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200"
        >
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No meals found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'Create your first meal plan to get started.'}
          </p>
          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/gym/meals/add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors duration-200 shadow-sm"
            >
              <FiPlus /> Create New Meal
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredMeals.map(meal => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <div 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col group"
                  onClick={() => handleCardClick(meal)}
                >
                  {meal.imageUrl && (
                    <div className="h-40 w-full relative overflow-hidden">
                      <img 
                        src={meal.imageUrl}
                        alt={meal.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{meal.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                        meal.category === 'Breakfast' ? 'bg-yellow-100 text-yellow-800' :
                        meal.category === 'Lunch' ? 'bg-green-100 text-green-800' :
                        meal.category === 'Dinner' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {meal.category}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 my-3">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Calories</p>
                        <p className="font-medium text-blue-600">{meal.calories}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Protein</p>
                        <p className="font-medium text-green-600">{meal.protein}g</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-500">Carbs</p>
                        <p className="font-medium text-orange-600">{meal.carbs}g</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200">
                        View Details
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/gym/meals/edit/${meal.id}`);
                          }}
                          className="text-gray-500 hover:text-blue-600 p-1 transition-colors duration-200"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(meal.id);
                          }}
                          className="text-gray-500 hover:text-red-600 p-1 transition-colors duration-200"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
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

            {selectedMeal.imageUrl && (
              <div className="rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={selectedMeal.imageUrl}
                  alt={selectedMeal.name}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-200">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Calories</p>
                <p className="font-medium text-lg text-blue-600">{selectedMeal.calories}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Protein</p>
                <p className="font-medium text-lg text-green-600">{selectedMeal.protein}g</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Carbs</p>
                <p className="font-medium text-lg text-orange-600">{selectedMeal.carbs}g</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Fat</p>
                <p className="font-medium text-lg text-purple-600">{selectedMeal.fat}g</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {selectedMeal.description || 'No description available'}
              </p>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiList className="mr-2" /> Ingredients
              </h3>
              <ul className="bg-gray-50 rounded-lg p-4 space-y-2">
                {selectedMeal.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedMeal.instructions && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Instructions</h3>
                <ol className="bg-gray-50 rounded-lg p-4 space-y-3 list-decimal list-inside">
                  {selectedMeal.instructions.split('\n').map((step: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
                    <li key={index} className="text-gray-700">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsModalOpen(false);
                  navigate(`/gym/meals/edit/${selectedMeal.id}`);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <FiEdit2 size={16} /> Edit Meal
              </motion.button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center justify-center gap-2 transition-colors duration-200"
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