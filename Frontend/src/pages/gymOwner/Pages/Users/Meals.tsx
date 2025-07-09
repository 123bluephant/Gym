import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { mockUsers } from '../../Data/mockUsers';
import { User, Meal } from '../../types/gymTypes';
import Modal from '../../components/Ui/Modal';

const UserMeals: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      try {
        // Load user data
        const savedUsers = localStorage.getItem('gymUsers');
        const users = savedUsers ? JSON.parse(savedUsers) : mockUsers;
        const foundUser = users.find((u: User) => u.id === id);
        
        if (foundUser) {
          setUser(foundUser);
          
          // Load meal data - this would come from your backend in a real app
          const mockMeals: Meal[] = [
            {
              id: '1',
              userId: id || '',
              date: '2023-06-15',
              mealType: 'Breakfast',
              name: 'Protein Shake',
              description: 'Whey protein with almond milk and banana',
              calories: 350,
              protein: 25,
              carbs: 30,
              fats: 8,
              ingredients: ['Whey protein', 'Almond milk', 'Banana']
            },
            {
              id: '2',
              userId: id || '',
              date: '2023-06-15',
              mealType: 'Lunch',
              name: 'Grilled Chicken',
              description: 'With quinoa and steamed vegetables',
              calories: 450,
              protein: 35,
              carbs: 40,
              fats: 12,
              ingredients: ['Chicken breast', 'Quinoa', 'Broccoli', 'Carrots']
            },
            {
              id: '3',
              userId: id || '',
              date: '2023-06-15',
              mealType: 'Dinner',
              name: 'Salmon',
              description: 'With quinoa and salad',
              calories: 500,
              protein: 40,
              carbs: 35,
              fats: 25,
              ingredients: ['Salmon fillet', 'Quinoa', 'Mixed greens']
            }
          ];
          
          setMeals(mockMeals);
        } else {
          navigate('/gym/members');
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, navigate]);

  const handleEditMeal = (mealId: string) => {
    navigate(`/gym/members/meals/${id}/edit/${mealId}`);
  };

  const handleDeleteMeal = (mealId: string) => {
    setMealToDelete(mealId);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMeal = () => {
    if (mealToDelete) {
      // In a real app, you would call an API here
      const updatedMeals = meals.filter(meal => meal.id !== mealToDelete);
      setMeals(updatedMeals);
      setIsDeleteModalOpen(false);
      setMealToDelete(null);
    }
  };

  const calculateTotalMacros = () => {
    return meals.reduce((acc, meal) => {
      return {
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const totalMacros = calculateTotalMacros();

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center">User not found</div>;
  }

  return (
    <div className="p-4 md:p-6">
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this meal?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteMeal}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-1 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{user.name}'s Meals</h1>
          <p className="text-gray-600">Track and manage nutrition</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-md">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Calories</p>
            <p className="text-xl font-bold">{totalMacros.calories}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-xl font-bold">{totalMacros.protein}g</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Carbs</p>
            <p className="text-xl font-bold">{totalMacros.carbs}g</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Fats</p>
            <p className="text-xl font-bold">{totalMacros.fats}g</p>
          </div>
        </div>
        <button
          onClick={() => navigate(`/gym/members/meals/${id}/add`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FiPlus /> Add Meal
        </button>
      </div>

      {meals.length === 0 ? (
        <div className="bg-gray-50 p-8 rounded-xl text-center">
          <p className="text-gray-500">No meals recorded yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {meals.map(meal => (
            <div key={meal.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 relative group">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{meal.name} ({meal.mealType})</h3>
                  <p className="text-gray-600 mt-1">{meal.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {meal.calories} cal
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                      P: {meal.protein}g
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      C: {meal.carbs}g
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      F: {meal.fats}g
                    </span>
                  </div>
                  {meal.ingredients?.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">Ingredients: {meal.ingredients.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500">
                {new Date(meal.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              
              {/* Edit/Delete Buttons */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={() => handleEditMeal(meal.id)}
                  className="p-1 text-blue-600 hover:text-blue-800 bg-white rounded-full shadow"
                  title="Edit meal"
                >
                  <FiEdit size={14} />
                </button>
                <button
                  onClick={() => handleDeleteMeal(meal.id)}
                  className="p-1 text-red-600 hover:text-red-800 bg-white rounded-full shadow"
                  title="Delete meal"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMeals;