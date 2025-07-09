import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit, FiArrowLeft, FiCalendar, FiMail, FiPhone, FiUser, FiActivity, FiCoffee, FiTrash2 } from 'react-icons/fi';
import { User, Meal, MealSummary } from '../../types/gymTypes';
import Modal from '../../components/Ui/Modal';
import Button from '../../components/Ui/Button';

const ViewUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mealSummary, setMealSummary] = useState<MealSummary | null>(null);
  const [recentMeals, setRecentMeals] = useState<Meal[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mealToDelete, setMealToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          const savedUsers = localStorage.getItem('gymUsers');
          if (savedUsers) {
            const users: User[] = JSON.parse(savedUsers);
            const foundUser = users.find(u => u.id === id);
            
            if (foundUser) {
              setUser(foundUser);
              
              // Simulate fetching meal data
              const mockMeals: Meal[] = [
                {
                  id: '1',
                  userId: id!,
                  date: new Date().toISOString(),
                  mealType: 'Breakfast',
                  name: 'Protein Shake',
                  description: 'Whey protein with almond milk and banana',
                  calories: 320,
                  protein: 25,
                  carbs: 30,
                  fats: 8,
                  ingredients: ['Whey protein', 'Almond milk', 'Banana']
                },
                {
                  id: '2',
                  userId: id!,
                  date: new Date().toISOString(),
                  mealType: 'Lunch',
                  name: 'Grilled Chicken',
                  description: 'With quinoa and steamed vegetables',
                  calories: 450,
                  protein: 35,
                  carbs: 40,
                  fats: 12,
                  ingredients: ['Chicken breast', 'Quinoa', 'Broccoli', 'Carrots']
                }
              ];
              
              setRecentMeals(mockMeals);
              setMealSummary({
                todayCalories: 770,
                todayMeals: 2,
                lastMealDate: new Date().toISOString(),
                macros: {
                  protein: 60,
                  carbs: 70,
                  fats: 20
                }
              });
            }
          }
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading user:', error);
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'Active':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Expired':
      case 'Cancelled':
      case 'Inactive':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const handleAddMeal = () => {
    navigate(`/gym/members/meals/${id}/add`);
  };

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
      const updatedMeals = recentMeals.filter(meal => meal.id !== mealToDelete);
      setRecentMeals(updatedMeals);
      
      // Update meal summary
      const deletedMeal = recentMeals.find(meal => meal.id === mealToDelete);
      if (deletedMeal && mealSummary) {
        setMealSummary({
          ...mealSummary,
          todayCalories: mealSummary.todayCalories - deletedMeal.calories,
          todayMeals: mealSummary.todayMeals - 1,
          macros: {
            protein: (mealSummary.macros?.protein || 0) - deletedMeal.protein,
            carbs: (mealSummary.macros?.carbs || 0) - deletedMeal.carbs,
            fats: (mealSummary.macros?.fats || 0) - deletedMeal.fats
          }
        });
      }
    }
    setIsDeleteModalOpen(false);
    setMealToDelete(null);
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 w-full bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <h3 className="text-xl font-medium text-gray-800 mb-4">User not found</h3>
          <p className="text-gray-600 mb-6">The requested user could not be found in our records.</p>
          <button
            onClick={() => navigate('/gym/members')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2"
          >
            <FiArrowLeft /> Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p>Are you sure you want to delete this meal?</p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={confirmDeleteMeal}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">User Details</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/gym/members')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <FiArrowLeft /> Back
          </button>
          <button
            onClick={() => navigate(`/gym/members/edit/${user.id}`)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FiEdit /> Edit
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* User Profile Section */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FiUser className="text-gray-600 text-5xl" />
              </div>
              <h2 className="text-xl font-bold text-center">{user.name}</h2>
              <span className={getStatusBadge(user.status)}>{user.status}</span>
              
              <div className="mt-6 w-full space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <FiMail className="text-gray-400" />
                  <span>{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-gray-600">
                    <FiPhone className="text-gray-400" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-600">
                  <FiCalendar className="text-gray-400" />
                  <span>Joined {formatDate(user.joinDate)}</span>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Membership Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <FiActivity className="text-blue-500" /> Membership Details
                  </h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Membership Type</dt>
                      <dd className="font-medium">{user.membershipType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Status</dt>
                      <dd>
                        <span className={getStatusBadge(user.status)}>
                          {user.status}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Member Since</dt>
                      <dd className="font-medium">{formatDate(user.joinDate)}</dd>
                    </div>
                  </dl>
                </div>

                {/* Activity */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-700 mb-3">Activity</h3>
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm text-gray-500">Last Check-In</dt>
                      <dd className="font-medium">
                        {user.lastCheckIn ? formatDate(user.lastCheckIn) : 'Never'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Total Visits</dt>
                      <dd className="font-medium">
                        {user.visits ? user.visits.length : '0'} sessions
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Nutrition Summary */}
                <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700 flex items-center gap-2">
                      <FiCoffee className="text-green-500" /> Nutrition Summary
                    </h3>
                    <button
                      onClick={handleAddMeal}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Add Meal
                    </button>
                  </div>
                  
                  {mealSummary ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-500">Today's Calories</p>
                        <p className="text-xl font-bold">{mealSummary.todayCalories}</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-500">Protein</p>
                        <p className="text-xl font-bold">{mealSummary.macros?.protein}g</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <p className="text-sm text-gray-500">Carbs/Fats</p>
                        <p className="text-xl font-bold">
                          {mealSummary.macros?.carbs}g/{mealSummary.macros?.fats}g
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No nutrition data available</p>
                  )}

                  {recentMeals.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Meals</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {recentMeals.map(meal => (
                          <div key={meal.id} className="bg-white p-3 rounded border border-gray-200 relative group">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{meal.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                              </div>
                              <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                {meal.calories} cal
                              </span>
                            </div>
                            <div className="mt-2 flex justify-between text-xs text-gray-500">
                              <span>{meal.mealType}</span>
                              <span>{formatDate(meal.date)}</span>
                            </div>
                            <div className="mt-2 flex gap-2 text-xs">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                P: {meal.protein}g
                              </span>
                              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">
                                C: {meal.carbs}g
                              </span>
                              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                F: {meal.fats}g
                              </span>
                            </div>
                            {/* Edit/Delete Buttons */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
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
                    </div>
                  ) : (
                    <p className="text-gray-400 italic">No meals recorded yet</p>
                  )}
                </div>

                {/* Notes Section */}
                {user.notes && (
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-3">Notes</h3>
                    <p className="text-gray-700">{user.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between">
          <button
            onClick={() => navigate(`/gym/members/meals/${user.id}`)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <FiCoffee /> View Full Meal History
          </button>
          <button
            onClick={() => navigate(`/gym/members/edit/${user.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiEdit /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;