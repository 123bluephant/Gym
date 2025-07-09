import { useState } from 'react';
import { motion } from 'framer-motion';
import ResponsivePageLayout from '../../components/Dashboard/PageLayout';

// Mock workout data types
type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  rest: number; // in seconds
};

type Workout = {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  exercises: Exercise[];
  date: string;
  caloriesBurned: number;
};

// Mock existing workouts data
const mockWorkouts: Workout[] = [
  {
    id: '1',
    title: 'Full Body Blast',
    description: 'Intense full body workout targeting all major muscle groups',
    duration: 45,
    difficulty: 'Intermediate',
    date: '2023-05-15',
    caloriesBurned: 320,
    exercises: [
      { id: '1', name: 'Squats', sets: 4, reps: 12, weight: 135, rest: 60 },
      { id: '2', name: 'Bench Press', sets: 4, reps: 10, weight: 155, rest: 60 },
      { id: '3', name: 'Deadlifts', sets: 3, reps: 8, weight: 225, rest: 90 },
      { id: '4', name: 'Pull-ups', sets: 3, reps: 8, weight: 0, rest: 60 },
    ],
  },
  {
    id: '2',
    title: 'Upper Body Power',
    description: 'Focus on building strength in upper body muscles',
    duration: 35,
    difficulty: 'Advanced',
    date: '2023-05-12',
    caloriesBurned: 280,
    exercises: [
      { id: '1', name: 'Overhead Press', sets: 5, reps: 5, weight: 95, rest: 90 },
      { id: '2', name: 'Barbell Rows', sets: 4, reps: 8, weight: 135, rest: 60 },
      { id: '3', name: 'Dips', sets: 3, reps: 10, weight: 0, rest: 45 },
      { id: '4', name: 'Bicep Curls', sets: 3, reps: 12, weight: 30, rest: 45 },
    ],
  },
];

const AddWorkoutPage = () => {
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);
  const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'id'>>({
    title: '',
    description: '',
    duration: 30,
    difficulty: 'Intermediate',
    exercises: [],
    date: new Date().toISOString().split('T')[0],
    caloriesBurned: 0,
  });
  const [currentExercise, setCurrentExercise] = useState<Omit<Exercise, 'id'>>({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
    rest: 60,
  });
  const [activeTab, setActiveTab] = useState<'form' | 'workouts'>('form');

  const handleAddExercise = () => {
    if (!currentExercise.name) return;

    const exerciseWithId = {
      ...currentExercise,
      id: Date.now().toString(),
    };

    setNewWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, exerciseWithId],
    }));

    // Reset exercise form
    setCurrentExercise({
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      rest: 60,
    });
  };

  const handleRemoveExercise = (id: string) => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id),
    }));
  };

  const handleSubmitWorkout = () => {
    if (!newWorkout.title || newWorkout.exercises.length === 0) return;

    const workoutWithId = {
      ...newWorkout,
      id: Date.now().toString(),
    };

    setWorkouts(prev => [...prev, workoutWithId]);
    
    // Reset form
    setNewWorkout({
      title: '',
      description: '',
      duration: 30,
      difficulty: 'Intermediate',
      exercises: [],
      date: new Date().toISOString().split('T')[0],
      caloriesBurned: 0,
    });

    setActiveTab('workouts');
  };

  const calculateCalories = (duration: number, difficulty: string) => {
    // Very simplified calculation
    const base = duration * 5;
    switch (difficulty) {
      case 'Beginner': return Math.round(base * 0.8);
      case 'Intermediate': return Math.round(base * 1);
      case 'Advanced': return Math.round(base * 1.2);
      default: return Math.round(base * 1);
    }
  };

  return (
    <ResponsivePageLayout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Workout Dashboard</h1>
          <p className="text-lg text-gray-600">Track and manage your fitness routines</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex rounded-lg bg-white shadow-sm p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'form' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Add New Workout
            </button>
            <button
              onClick={() => setActiveTab('workouts')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'workouts' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Workouts
            </button>
          </div>
        </div>

        {activeTab === 'form' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Workout</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Workout Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={newWorkout.title}
                  onChange={(e) => setNewWorkout({ ...newWorkout, title: e.target.value })}
                  placeholder="Morning Routine, Leg Day, etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={newWorkout.date}
                  onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={newWorkout.duration}
                  onChange={(e) => {
                    const duration = parseInt(e.target.value) || 0;
                    setNewWorkout({ 
                      ...newWorkout, 
                      duration,
                      caloriesBurned: calculateCalories(duration, newWorkout.difficulty)
                    });
                  }}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  value={newWorkout.difficulty}
                  onChange={(e) => {
                    const difficulty = e.target.value as 'Beginner' | 'Intermediate' | 'Advanced';
                    setNewWorkout({ 
                      ...newWorkout, 
                      difficulty,
                      caloriesBurned: calculateCalories(newWorkout.duration, difficulty)
                    });
                  }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                  value={newWorkout.description}
                  onChange={(e) => setNewWorkout({ ...newWorkout, description: e.target.value })}
                  placeholder="Describe your workout routine..."
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Exercises</h3>
              
              {newWorkout.exercises.length > 0 ? (
                <div className="mb-6 space-y-4">
                  {newWorkout.exercises.map((exercise) => (
                    <div key={exercise.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                        <p className="text-sm text-gray-600">
                          {exercise.sets} sets × {exercise.reps} reps {exercise.weight > 0 ? `@ ${exercise.weight}lbs` : ''} • {exercise.rest}s rest
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveExercise(exercise.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center text-gray-500 mb-6">
                  No exercises added yet
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Exercise Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={currentExercise.name}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, name: e.target.value })}
                    placeholder="Squats, Push-ups, etc."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Sets</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={currentExercise.sets}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, sets: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Reps</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={currentExercise.reps}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, reps: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    min="0"
                    max="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={currentExercise.weight}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, weight: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rest Between Sets (seconds)</label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={currentExercise.rest}
                    onChange={(e) => setCurrentExercise({ ...currentExercise, rest: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div className="flex items-end">
                  <button
                    onClick={handleAddExercise}
                    disabled={!currentExercise.name}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium text-white ${
                      currentExercise.name 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Add Exercise
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 pt-6">
              <div>
                <p className="text-sm text-gray-600">
                  Estimated Calories: <span className="font-medium text-indigo-600">{newWorkout.caloriesBurned}</span>
                </p>
              </div>
              <button
                onClick={handleSubmitWorkout}
                disabled={!newWorkout.title || newWorkout.exercises.length === 0}
                className={`px-6 py-3 rounded-lg font-medium text-white ${
                  newWorkout.title && newWorkout.exercises.length > 0
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Save Workout
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Workouts</h2>
              
              {workouts.length > 0 ? (
                <div className="space-y-6">
                  {workouts.map((workout) => (
                    <div key={workout.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="font-bold text-lg text-gray-800">{workout.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            workout.difficulty === 'Beginner' 
                              ? 'bg-green-100 text-green-800' 
                              : workout.difficulty === 'Intermediate' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {workout.difficulty}
                          </span>
                          <span className="text-sm text-gray-600">{workout.date}</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-gray-600">{workout.description}</p>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">{workout.duration} minutes</p>
                            <p className="text-sm font-medium text-indigo-600">{workout.caloriesBurned} calories</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {workout.exercises.map((exercise, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                              <div>
                                <h4 className="font-medium text-gray-800">{exercise.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {exercise.sets} sets × {exercise.reps} reps {exercise.weight > 0 ? `@ ${exercise.weight}lbs` : ''}
                                </p>
                              </div>
                              <span className="text-sm text-gray-500">{exercise.rest}s rest</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No workouts yet</h3>
                  <p className="mt-1 text-gray-600">
                    Get started by adding your first workout routine.
                  </p>
                  <button
                    onClick={() => setActiveTab('form')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Workout
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </ResponsivePageLayout>
  );
};

export default AddWorkoutPage;