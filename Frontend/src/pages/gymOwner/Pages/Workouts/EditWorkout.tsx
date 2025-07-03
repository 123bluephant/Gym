import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../components/Ui/Modal';
import Button from '../../components/Ui/Button';
import { Exercise, WorkoutPlan } from '../../types/gymTypes';
import { mockWorkouts } from '../../Data/MockWorkouts';

const EditWorkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<WorkoutPlan | null>(null);
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
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
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

  useEffect(() => {
    const foundWorkout = mockWorkouts.find(w => w.id === id);
    if (foundWorkout) {
      setWorkout(foundWorkout);
      setPreviewImage(foundWorkout.imageUrl || null);
    } else {
      navigate('/workouts', { replace: true });
    }
  }, [id, navigate]);

  const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setWorkout(prev => prev ? {
      ...prev,
      [name]: name === 'duration' ? Number(value) : value
    } : null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setWorkout(prev => prev ? {
          ...prev,
          imageUrl: result
        } : null);
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
    setWorkout(prev => prev ? {
      ...prev,
      videoUrl: e.target.value
    } : null);
  };

  const handleExerciseVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExercise(prev => ({
      ...prev,
      videoUrl: e.target.value
    }));
  };

  const handleAddMuscleGroup = () => {
    if (tempMuscle && workout && !workout.targetMuscles.includes(tempMuscle)) {
      setWorkout(prev => prev ? {
        ...prev,
        targetMuscles: [...prev.targetMuscles, tempMuscle]
      } : null);
      setTempMuscle('');
    }
  };

  const handleRemoveMuscleGroup = (muscle: string) => {
    setWorkout(prev => prev ? {
      ...prev,
      targetMuscles: prev.targetMuscles.filter(m => m !== muscle)
    } : null);
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

  const handleAddEditExercise = () => {
    if (currentExercise.name && workout) {
      const newExercises = [...workout.exercises];
      
      if (editingExerciseIndex !== null) {
        newExercises[editingExerciseIndex] = { 
          ...currentExercise, 
          imageUrl: currentExercise.imageUrl?.toString() || '', 
          videoUrl: currentExercise.videoUrl?.toString() || '' 
        };
      } else {
        newExercises.push({ 
          ...currentExercise, 
          imageUrl: currentExercise.imageUrl?.toString() || '', 
          videoUrl: currentExercise.videoUrl?.toString() || '' 
        });
      }

      setWorkout(prev => prev ? {
        ...prev,
        exercises: newExercises
      } : null);
      
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
      setEditingExerciseIndex(null);
      setShowExerciseModal(false);
    }
  };

  const handleEditExercise = (index: number) => {
    if (workout) {
      setCurrentExercise(workout.exercises[index]);
      setExercisePreviewImage(workout.exercises[index].imageUrl || null);
      setEditingExerciseIndex(index);
      setShowExerciseModal(true);
    }
  };

  const handleRemoveExercise = (index: number) => {
    if (workout) {
      setWorkout(prev => prev ? {
        ...prev,
        exercises: prev.exercises.filter((_, i) => i !== index)
      } : null);
    }
  };

  const handleSaveWorkout = async () => {
    if (!workout) return;
    
    setIsSaving(true);
    
    try {
      console.log('Saving workout:', workout);
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/gym/workouts', { state: { message: 'Workout updated successfully!' } });
    } catch (error) {
      console.error('Failed to save workout:', error);
      setIsSaving(false);
    }
  };

  if (!workout) {
    return <div className="p-6">Loading workout...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Workout Plan</h1>
        <div className="flex space-x-4">
          <Button 
            onClick={handleSaveWorkout}
            isLoading={isSaving}
          >
            Save Changes
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/gym/workouts')}
          >
            Cancel
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Workout Name</label>
              <input
                type="text"
                name="name"
                value={workout.name}
                onChange={handleWorkoutChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty Level</label>
              <select
                name="difficulty"
                value={workout.difficulty}
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
                value={workout.description}
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
              value={workout.duration}
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
                        setWorkout(prev => prev ? { ...prev, imageUrl: '' } : null);
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
                value={workout.videoUrl || ''}
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
              {workout.targetMuscles.map(muscle => (
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
                onClick={() => {
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
                  setEditingExerciseIndex(null);
                  setShowExerciseModal(true);
                }}
              >
                Add Exercise
              </Button>
            </div>
            
            {workout.exercises.length > 0 ? (
              <div className="mt-4 space-y-4">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditExercise(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveExercise(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    {exercise.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={exercise.imageUrl} 
                          alt={exercise.name}
                          className="h-32 w-full object-cover rounded-md"
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
        </form>
      </div>

      {/* Add/Edit Exercise Modal */}
      <Modal 
        isOpen={showExerciseModal} 
        onClose={() => setShowExerciseModal(false)}
        title={editingExerciseIndex !== null ? "Edit Exercise" : "Add Exercise"}
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
              value={currentExercise.videoUrl || ''}
              onChange={handleExerciseVideoUrlChange}
              placeholder="https://example.com/video.mp4 or YouTube URL"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
            <textarea
              name="notes"
              value={currentExercise.notes || ''}
              onChange={handleExerciseChange}
              rows={2}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end">
            <Button 
              type="button" 
              onClick={handleAddEditExercise}
              disabled={!currentExercise.name}
            >
              {editingExerciseIndex !== null ? 'Update Exercise' : 'Add Exercise'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditWorkout;