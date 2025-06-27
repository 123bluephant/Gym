import React, { useState } from 'react';
import { Plus, Search, Dumbbell, Clock, Target } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const WorkoutManagement: React.FC = () => {
  const { workouts } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workout.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-[#D4A4C8] text-[#FFFFFF]';
      case 'Intermediate': return 'bg-[#F4E1F0] text-[#000000]';
      case 'Advanced': return 'bg-[#A856B2] text-[#FFFFFF]';
      default: return 'bg-[#F4E1F0] text-[#000000]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#000000]">Workout Management</h2>
          <p className="text-[#D4A4C8]">Create and manage workout plans for your members</p>
        </div>
        <button className="bg-[#A856B2] hover:bg-[#D4A4C8] text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Create Workout</span>
        </button>
      </div>

      <div className="bg-[#FFFFFF] rounded-xl shadow-sm border border-[#D4A4C8]">
        <div className="p-6 border-b border-[#D4A4C8]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#000000] h-4 w-4" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[#D4A4C8] rounded-lg focus:ring-2 focus:ring-[#A856B2] focus:border-transparent w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-[#F4E1F0] rounded-lg p-6 hover:bg-[#D4A4C8] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-[#D4A4C8] p-2 rounded-lg">
                  <Dumbbell className="h-5 w-5 text-[#FFFFFF]" />
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(workout.difficulty)}`}>
                  {workout.difficulty}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#000000] mb-2">{workout.name}</h3>
              <p className="text-[#D4A4C8] text-sm mb-4 line-clamp-2">{workout.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-[#000000]">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{workout.duration} minutes</span>
                </div>
                <div className="flex items-center text-sm text-[#000000]">
                  <Target className="h-4 w-4 mr-2" />
                  <span>{workout.targetMuscles.join(', ')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#D4A4C8]">
                  {workout.exercises.length} exercises
                </span>
                <button className="text-[#A856B2] hover:text-[#D4A4C8] text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="text-center py-12">
            <Dumbbell className="h-12 w-12 text-[#D4A4C8] mx-auto mb-4" />
            <p className="text-[#D4A4C8]">No workouts found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};