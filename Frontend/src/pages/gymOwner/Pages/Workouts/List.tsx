import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import Modal from '../../components/Ui/Modal';
import { mockWorkouts } from '../../Data/MockWorkouts';
import { WorkoutPlan } from '../../types/gymTypes';
import { motion } from 'framer-motion';

const WorkoutsList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPlan | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter workouts based on search term
    const filteredWorkouts = mockWorkouts.filter(workout =>
        workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workout.targetMuscles.some(muscle =>
            muscle.toLowerCase().includes(searchTerm.toLowerCase())
        ));

    // Handle card click
    const handleCardClick = (workout: WorkoutPlan) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true);
    };

    // Workout card component
    const WorkoutCard = ({ workout }: { workout: WorkoutPlan }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer h-full flex flex-col"
            onClick={() => handleCardClick(workout)}
            whileHover={{ y: -5 }}
        >
            {/* Workout Image */}
            {workout.imageUrl && (
                <div className="h-48 w-full overflow-hidden relative">
                    <img 
                        src={workout.imageUrl} 
                        alt={workout.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${
                        workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        workout.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        {workout.difficulty}
                    </span>
                </div>
            )}
            
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{workout.name}</h3>
                    </div>

                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">{workout.description}</p>

                    <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{workout.duration} minutes</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>{workout.exercises.length} exercises</span>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Target Muscles</h4>
                        <div className="flex flex-wrap gap-1">
                            {workout.targetMuscles.slice(0, 3).map((muscle, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                >
                                    {muscle}
                                </span>
                            ))}
                            {workout.targetMuscles.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    +{workout.targetMuscles.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                    <Link
                        to={`/gym/workouts/edit/${workout.id}`}
                        className="text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                    </Link>
                    <button
                        className="text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-300 text-sm flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                        }}
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Workout Plans</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage and track your workout routines</p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search workouts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                        />
                    </div>

                    <Link to="/gym/workouts/add" className="w-full sm:w-auto">
                        <Button size="sm" className="w-full">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            New Workout
                        </Button>
                    </Link>
                </div>
            </div>

            {filteredWorkouts.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200"
                >
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No workouts found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 'Try adjusting your search query.' : 'Create a new workout to get started.'}
                    </p>
                    <div className="mt-6">
                        <Link to="/gym/workouts/add">
                            <Button>
                                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Workout
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredWorkouts.map(workout => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                </div>
            )}

            {/* Workout Detail Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedWorkout?.name || 'Workout Details'}
                size="lg"
            >
                {selectedWorkout && (
                    <div className="space-y-6">
                        {/* Workout Media */}
                        <div className="relative rounded-xl overflow-hidden bg-gray-100">
                            {selectedWorkout.imageUrl && (
                                <img
                                    src={selectedWorkout.imageUrl}
                                    alt={selectedWorkout.name}
                                    className="w-full h-48 sm:h-64 object-cover"
                                />
                            )}
                            {selectedWorkout.videoUrl && (
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                    <button className="bg-white/90 hover:bg-white text-indigo-600 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110">
                                        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        selectedWorkout.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                        selectedWorkout.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {selectedWorkout.difficulty}
                                    </span>
                                    <span className="text-white text-xs sm:text-sm flex items-center">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {selectedWorkout.duration} min
                                    </span>
                                    <span className="text-white text-xs sm:text-sm flex items-center">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        {selectedWorkout.exercises.length} exercises
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="md:col-span-2">
                                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                <p className="mt-1 text-gray-700">{selectedWorkout.description}</p>
                            </div>
                            
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-2">Target Muscles</h3>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                    {selectedWorkout.targetMuscles.map((muscle, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                                        >
                                            {muscle}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">Exercises</h3>
                            <div className="space-y-3 sm:space-y-4">
                                {selectedWorkout.exercises.map((exercise, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                    >
                                        <div className="p-3 sm:p-4">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-medium text-base sm:text-lg text-gray-900">{exercise.name}</h4>
                                                <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500">
                                                    <span>{exercise.sets} sets</span>
                                                    <span>{exercise.reps} reps</span>
                                                    <span>{exercise.restInterval}s rest</span>
                                                </div>
                                            </div>
                                            
                                            {exercise.notes && (
                                                <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-md">
                                                    <span className="font-medium">Notes: </span>
                                                    {exercise.notes}
                                                </div>
                                            )}
                                        </div>

                                        {(exercise.imageUrl || exercise.videoUrl) && (
                                            <div className="border-t border-gray-200">
                                                {exercise.imageUrl && (
                                                    <img 
                                                        src={exercise.imageUrl} 
                                                        alt={exercise.name}
                                                        className="w-full h-40 sm:h-48 object-cover"
                                                    />
                                                )}
                                                {exercise.videoUrl && (
                                                    <div className="relative">
                                                        <div className="aspect-w-16 aspect-h-9">
                                                            {exercise.videoUrl.includes('youtube.com') || exercise.videoUrl.includes('youtu.be') ? (
                                                                <iframe
                                                                    src={`https://www.youtube.com/embed/${exercise.videoUrl.split('v=')[1]?.split('&')[0]}`}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen
                                                                    className="w-full h-40 sm:h-48"
                                                                ></iframe>
                                                            ) : (
                                                                <video 
                                                                    controls 
                                                                    className="w-full h-40 sm:h-48"
                                                                    poster={exercise.imageUrl}
                                                                >
                                                                    <source src={exercise.videoUrl} type="video/mp4" />
                                                                    Your browser does not support the video tag.
                                                                </video>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                                className="flex items-center justify-center"
                            >
                                Close
                            </Button>
                            <Link
                                to={`/gym/workouts/edit/${selectedWorkout.id}`}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Workout
                            </Link>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default WorkoutsList;