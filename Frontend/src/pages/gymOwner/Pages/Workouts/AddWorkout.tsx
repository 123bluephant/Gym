// src/pages/Workouts/AddWorkout.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Ui/Modal';
import Button from '../../components/Ui/Button';
import { Exercise, WorkoutPlan } from '../../types/gymTypes';

const AddWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [workouts, setWorkouts] = useState<WorkoutPlan[]>([]);
  const [newWorkout, setNewWorkout] = useState<Omit<WorkoutPlan, 'id' | 'createdAt' | 'assignedTo'>>({
    name: '',
    description: '',
    difficulty: 'Intermediate',
    duration: 30,
    targetMuscles: [],
    exercises: [],
    createdBy: 'current-trainer-id',
    imageUrl: '',
      videoUrl: ''
  });
  const [tempMuscle, setTempMuscle] = useState('');
  const [currentExercise, setCurrentExercise] = useState<Exercise>({
    name: '',
    sets: 3,
    reps: 10,
    restInterval: 60,
    notes: '',
    imageUrl: '',
    videoUrl: ''
  });
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [exercisePreviewImage, setExercisePreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exerciseFileInputRef = useRef<HTMLInputElement>(null);

  // Muscle group suggestions
  const muscleGroups = [
    'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps',
    'Legs', 'Quadriceps', 'Hamstrings', 'Glutes', 'Calves',
    'Abs', 'Core', 'Full Body', 'Cardio'
  ];

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({
      ...prev,
      [name]: name === 'duration' ? Number(value) : value
    }));
  };

  const handleAddMuscleGroup = () => {
    if (tempMuscle && !newWorkout.targetMuscles.includes(tempMuscle)) {
      setNewWorkout(prev => ({
        ...prev,
        targetMuscles: [...prev.targetMuscles, tempMuscle]
      }));
      setTempMuscle('');
    }
  };

  const handleRemoveMuscleGroup = (muscle: string) => {
    setNewWorkout(prev => ({
      ...prev,
      targetMuscles: prev.targetMuscles.filter(m => m !== muscle)
    }));
  };

  const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExercise(prev => ({
      ...prev,
      [name]: name === 'sets' || name === 'reps' || name === 'restInterval' 
        ? Number(value) 
        : value
    }));
  };

  const handleAddExercise = () => {
    if (currentExercise.name) {
      setNewWorkout(prev => ({
        ...prev,
        exercises: [...prev.exercises, currentExercise]
      }));
      setCurrentExercise({
        name: '',
        sets: 3,
        reps: 10,
        restInterval: 60,
        notes: '',
        imageUrl: '',
        videoUrl: ''
      });
      setExercisePreviewImage(null);
      setShowExerciseModal(false);
    }
  };

  const handleRemoveExercise = (index: number) => {
    setNewWorkout(prev => ({
      ...prev,
      exercises: prev.exercises.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setNewWorkout(prev => ({
          ...prev,
          imageUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExerciseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setExercisePreviewImage(result);
        setCurrentExercise(prev => ({
          ...prev,
          imageUrl: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWorkout(prev => ({
      ...prev,
      videoUrl: e.target.value
    }));
  };

  const handleExerciseVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExercise(prev => ({
      ...prev,
      videoUrl: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workoutToAdd: WorkoutPlan = {
      ...newWorkout,
      id: Date.now().toString(),
      createdAt: new Date(),
      assignedTo: []
    };
    setWorkouts(prev => [...prev, workoutToAdd]);
    setNewWorkout({
      name: '',
      description: '',
      difficulty: 'Intermediate',
      duration: 30,
      targetMuscles: [],
      exercises: [],
      createdBy: 'current-trainer-id',
      imageUrl: '',
      videoUrl: ''
    });
    setPreviewImage(null);
  };

  const handleSaveWorkouts = () => {
    // In a real app, this would save to the backend
    alert(`${workouts.length} workout(s) saved successfully!`);
    navigate('/gym/workouts');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create Workout Plans</h1>
        <Button onClick={handleSaveWorkouts} disabled={workouts.length === 0}>
          Save All Workouts
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Workout Name</label>
              <input
                type="text"
                name="name"
                value={newWorkout.name}
                onChange={handleWorkoutChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
              <select
                name="difficulty"
                value={newWorkout.difficulty}
                onChange={handleWorkoutChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={newWorkout.description}
              onChange={handleWorkoutChange}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              min="5"
              max="180"
              value={newWorkout.duration}
              onChange={handleWorkoutChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Workout Media Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Workout Image</label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Upload Image
                </button>
                {previewImage && (
                  <div className="ml-4 relative">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(null);
                        setNewWorkout(prev => ({ ...prev, imageUrl: '' }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Workout Video URL</label>
              <input
                type="text"
                name="videoUrl"
                value={newWorkout.videoUrl}
                onChange={handleVideoUrlChange}
                placeholder="https://example.com/video.mp4 or YouTube URL"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Target Muscle Groups</label>
            <div className="mt-1 flex">
              <input
                type="text"
                value={tempMuscle}
                onChange={(e) => setTempMuscle(e.target.value)}
                list="muscleGroups"
                placeholder="Add muscle group"
                className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <datalist id="muscleGroups">
                {muscleGroups.map(muscle => (
                  <option key={muscle} value={muscle} />
                ))}
              </datalist>
              <button
                type="button"
                onClick={handleAddMuscleGroup}
                className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-r-md"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {newWorkout.targetMuscles.map(muscle => (
                <span 
                  key={muscle} 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {muscle}
                  <button
                    type="button"
                    onClick={() => handleRemoveMuscleGroup(muscle)}
                    className="ml-1.5 inline-flex text-purple-400 hover:text-purple-600 focus:outline-none"
                  >
                    <span className="sr-only">Remove</span>
                    <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Exercises</label>
              <Button 
                type="button" 
                size="sm"
                onClick={() => setShowExerciseModal(true)}
              >
                Add Exercise
              </Button>
            </div>
            
            {newWorkout.exercises.length > 0 ? (
              <div className="mt-4 space-y-4">
                {newWorkout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveExercise(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    {exercise.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={exercise.imageUrl} 
                          alt={exercise.name}
                          className="h-24 w-full object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                      <div>Sets: {exercise.sets}</div>
                      <div>Reps: {exercise.reps}</div>
                      <div>Rest: {exercise.restInterval}s</div>
                    </div>
                    {exercise.notes && (
                      <div className="mt-2 text-sm text-gray-600">
                        Notes: {exercise.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-2 text-sm text-gray-500">
                No exercises added yet.
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={newWorkout.exercises.length === 0}>
              Add Workout to List
            </Button>
          </div>
        </form>
      </div>

      {workouts.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-medium">Workouts Ready to Save ({workouts.length})</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {workouts.map((workout, index) => (
              <div key={index} className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium text-lg">{workout.name}</h4>
                    <p className="text-sm text-gray-500">{workout.difficulty} • {workout.duration} min</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWorkouts(prev => prev.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                {workout.imageUrl && (
                  <div className="mt-2">
                    <img 
                      src={workout.imageUrl} 
                      alt={workout.name}
                      className="h-32 w-full object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="mt-2">
                  <span className="text-sm font-medium">Targets: </span>
                  <span className="text-sm text-gray-600">
                    {workout.targetMuscles.join(', ')}
                  </span>
                </div>
                <div className="mt-3">
                  <h5 className="text-sm font-medium">Exercises:</h5>
                  <ul className="mt-1 space-y-1 text-sm text-gray-600">
                    {workout.exercises.map((exercise, exIndex) => (
                      <li key={exIndex}>
                        • {exercise.name} ({exercise.sets}x{exercise.reps})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Exercise Modal */}
      <Modal 
        isOpen={showExerciseModal} 
        onClose={() => setShowExerciseModal(false)}
        title="Add Exercise"
        size="lg"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
            <input
              type="text"
              name="name"
              value={currentExercise.name}
              onChange={handleExerciseChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sets</label>
              <input
                type="number"
                name="sets"
                min="1"
                max="10"
                value={currentExercise.sets}
                onChange={handleExerciseChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reps</label>
              <input
                type="number"
                name="reps"
                min="1"
                max="50"
                value={currentExercise.reps}
                onChange={handleExerciseChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rest (sec)</label>
              <input
                type="number"
                name="restInterval"
                min="0"
                max="300"
                value={currentExercise.restInterval}
                onChange={handleExerciseChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exercise Image</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                ref={exerciseFileInputRef}
                onChange={handleExerciseImageUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => exerciseFileInputRef.current?.click()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Upload Image
              </button>
              {exercisePreviewImage && (
                <div className="ml-4 relative">
                  <img
                    src={exercisePreviewImage}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setExercisePreviewImage(null);
                      setCurrentExercise(prev => ({ ...prev, imageUrl: '' }));
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Exercise Video URL</label>
            <input
              type="text"
              name="videoUrl"
              value={currentExercise.videoUrl}
              onChange={handleExerciseVideoUrlChange}
              placeholder="https://example.com/video.mp4 or YouTube URL"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
            <textarea
              name="notes"
              value={currentExercise.notes}
              onChange={handleExerciseChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={handleAddExercise}
              disabled={!currentExercise.name}
            >
              Add Exercise
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddWorkout;