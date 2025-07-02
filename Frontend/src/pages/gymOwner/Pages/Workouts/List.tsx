// src/pages/Workouts/List.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Ui/Button';
import DataTable from '../../components/Ui/DataTable';
import Modal from '../../components/Ui/Modal';
import { mockWorkouts } from '../../Data/MockWorkouts';
import { WorkoutPlan } from '../../types/gymTypes';

const WorkoutsList: React.FC = () => {
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards');
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

    // Table columns configuration
    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Difficulty', accessor: 'difficulty' },
        { header: 'Duration', accessor: 'duration' },
        { header: 'Exercises', accessor: 'exerciseCount' },
        { header: 'Actions', accessor: 'actions' }
    ];

    // Prepare table data
    const tableData = filteredWorkouts.map(workout => ({
        ...workout,
        duration: `${workout.duration} min`,
        exerciseCount: workout.exercises.length,
        actions: (
            <div className="flex space-x-2">
                <Link
                    to={`/gym/workouts/edit/${workout.id}`}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                    Edit
                </Link>
                <button className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Delete
                </button>
            </div>
        )
    }));

    // Handle card click
    const handleCardClick = (workout: WorkoutPlan) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true);
    };

    // Workout card component
    const WorkoutCard = ({ workout }: { workout: WorkoutPlan }) => (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 cursor-pointer"
            onClick={() => handleCardClick(workout)}
        >
            <div className="p-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-gray-900">{workout.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${workout.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            workout.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                        }`}>
                        {workout.difficulty}
                    </span>
                </div>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{workout.description}</p>

                <div className="mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{workout.duration} minutes</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>{workout.exercises.length} exercises</span>
                    </div>
                </div>

                <div className="mt-3">
                    <h4 className="text-sm font-medium text-gray-900">Target Muscles</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {workout.targetMuscles.slice(0, 3).map((muscle, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800"
                            >
                                {muscle}
                            </span>
                        ))}
                        {workout.targetMuscles.length > 3 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                +{workout.targetMuscles.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex space-x-2">
                    <Link
                        to={`/gym/workouts/edit/${workout.id}`}
                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 text-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        Edit
                    </Link>
                    <button
                        className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300 text-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle delete
                        }}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold">Workout Plans</h1>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <input
                            type="text"
                            placeholder="Search workouts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <svg
                            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            variant={viewMode === 'table' ? 'primary' : 'outline'}
                            onClick={() => setViewMode('table')}
                            size="sm"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Table
                        </Button>
                        <Button
                            variant={viewMode === 'cards' ? 'primary' : 'outline'}
                            onClick={() => setViewMode('cards')}
                            size="sm"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            Cards
                        </Button>
                        <Link to="/gym/workouts/add" className="ml-2">
                            <Button size="sm">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                New Workout
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {filteredWorkouts.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
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
                </div>
            ) : viewMode === 'table' ? (
                <DataTable
                    columns={columns}
                    data={tableData}
                    className="border border-gray-200"
                    rowClassName="hover:bg-gray-50"
                    headerClassName="bg-gray-100"
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                size="xl"
            >
                {selectedWorkout && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                                <p className="mt-1 text-sm text-gray-900">{selectedWorkout.description}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Difficulty</h3>
                                    <p className="mt-1 text-sm text-gray-900">{selectedWorkout.difficulty}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                                    <p className="mt-1 text-sm text-gray-900">{selectedWorkout.duration} minutes</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Exercises</h3>
                                    <p className="mt-1 text-sm text-gray-900">{selectedWorkout.exercises.length}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Target Muscles</h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {selectedWorkout.targetMuscles.map((muscle, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                                    >
                                        {muscle}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Exercises</h3>
                            <div className="mt-2 space-y-4">
                                {selectedWorkout.exercises.map((exercise, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                                        <h4 className="font-medium">{exercise.name}</h4>
                                        <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                                            <div>Sets: {exercise.sets}</div>
                                            <div>Reps: {exercise.reps}</div>
                                            <div>Rest: {exercise.restInterval}s</div>
                                        </div>
                                        {exercise.notes && (
                                            <div className="mt-2 text-sm text-gray-600">
                                                <span className="font-medium">Notes: </span>
                                                {exercise.notes}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <Link
                                to={`/gym/workouts/edit/${selectedWorkout.id}`}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                            >
                                Edit Workout
                            </Link>
                            <Button
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default WorkoutsList;