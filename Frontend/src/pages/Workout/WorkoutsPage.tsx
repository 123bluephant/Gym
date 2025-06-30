import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Target, Users, ChevronRight, Filter, Search, Star } from 'lucide-react';

const WorkoutsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel, setActiveLevel] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Workouts' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'hiit', name: 'HIIT' },
    { id: 'pilates', name: 'Pilates' },
    { id: 'dance', name: 'Dance' },
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' },
  ];

  const workouts = [
    {
      id: 1,
      title: 'Full Body Strength Builder',
      category: 'strength',
      level: 'intermediate',
      duration: '45 min',
      instructor: 'Sarah Johnson',
      thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 2847,
      rating: 4.9,
      description: 'Build lean muscle and increase strength with this comprehensive full-body workout.',
      equipment: ['Dumbbells', 'Resistance Bands']
    },
     {
      id: 2,
      title: 'HIIT Fat Burn Express',
      category: 'hiit',
      level: 'advanced',
      duration: '20 min',
      instructor: 'Mike Chen',
      thumbnail: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 3251,
      rating: 4.8,
      description: 'High-intensity interval training to maximize calorie burn in minimal time.',
      equipment: ['No Equipment']
    },
    {
      id: 3,
      title: 'Gentle Morning Yoga Flow',
      category: 'yoga',
      level: 'beginner',
      duration: '30 min',
      instructor: 'Emma Wilson',
      thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 1456,
      rating: 4.9,
      description: 'Start your day with gentle stretches and mindful movement.',
      equipment: ['Yoga Mat']
    },
    {
      id: 4,
      title: 'Cardio Dance Party',
      category: 'dance',
      level: 'beginner',
      duration: '35 min',
      instructor: 'Jessica Lee',
      thumbnail: 'https://images.pexels.com/photos/3775593/pexels-photo-3775593.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 4123,
      rating: 4.7,
      description: 'Fun, energetic dance workout that will get your heart pumping.',
      equipment: ['No Equipment']
    },
    {
      id: 5,
      title: 'Power Yoga Challenge',
      category: 'yoga',
      level: 'advanced',
      duration: '50 min',
      instructor: 'David Kim',
      thumbnail: 'https://images.pexels.com/photos/3822935/pexels-photo-3822935.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 987,
      rating: 4.8,
      description: 'Advanced yoga sequences to build strength, flexibility, and focus.',
      equipment: ['Yoga Mat', 'Yoga Blocks']
    },
    {
      id: 6,
      title: 'Upper Body Blast',
      category: 'strength',
      level: 'intermediate',
      duration: '25 min',
      instructor: 'Alex Rivera',
      thumbnail: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 2156,
      rating: 4.9,
      description: 'Target your arms, shoulders, and back with this focused strength session.',
      equipment: ['Dumbbells']
    },
    {
      id: 7,
      title: 'Core Pilates Fusion',
      category: 'pilates',
      level: 'intermediate',
      duration: '40 min',
      instructor: 'Maria Santos',
      thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 1789,
      rating: 4.8,
      description: 'Strengthen your core and improve posture with Pilates-inspired movements.',
      equipment: ['Mat', 'Pilates Ball']
    },
    {
      id: 8,
      title: 'Beginner Cardio Kickstart',
      category: 'cardio',
      level: 'beginner',
      duration: '30 min',
      instructor: 'Tom Wilson',
      thumbnail: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400',
      participants: 3456,
      rating: 4.6,
      description: 'Perfect introduction to cardio training with low-impact movements.',
      equipment: ['No Equipment']
    }
    // ... (keep all other workout objects the same)
  ];

  const filteredWorkouts = workouts.filter(workout => {
    const matchesCategory = activeCategory === 'all' || workout.category === activeCategory;
    const matchesLevel = activeLevel === 'all' || workout.level === activeLevel;
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Enhanced Hero Section with subtle animation */}
      <section className="relative bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000')] bg-cover bg-center mix-blend-overlay"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-down">Workout Library</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto animate-fade-in-up delay-100">
              Discover thousands of expert-led workout videos for every fitness level and goal. 
              From beginner-friendly sessions to advanced challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Filters Section with glass morphism effect */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200 relative z-10 -mt-2 rounded-t-3xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Enhanced Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Search workouts or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/70 focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md focus:shadow-lg"
              />
            </div>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl bg-white/70 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">More Filters</span>
            </button>
          </div>

          {/* Enhanced Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Workout Type</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
                  } transform hover:scale-105 active:scale-95`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeLevel === level.id
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm'
                  } transform hover:scale-105 active:scale-95`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Workouts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredWorkouts.length} {filteredWorkouts.length === 1 ? 'Workout' : 'Workouts'} Found
            </h2>
            <div className="relative">
              <select className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm hover:shadow-md transition-all">
                <option>Sort by Popularity</option>
                <option>Sort by Duration</option>
                <option>Sort by Rating</option>
                <option>Sort by Newest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkouts.map((workout) => (
              <div 
                key={workout.id} 
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-100 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={workout.thumbnail} 
                    alt={workout.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <Link 
                    to={`/workouts/${workout.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-all transform hover:scale-110">
                      <Play className="w-8 h-8 text-purple-600 fill-current" />
                    </div>
                  </Link>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold capitalize ${getLevelColor(workout.level)} shadow-sm`}>
                    {workout.level}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {workout.duration}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {workout.title}
                    </h3>
                  </div>
                  <p className="text-sm text-purple-600 font-medium mb-3">with {workout.instructor}</p>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{workout.description}</p>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>{workout.participants.toLocaleString()} joined</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-800 font-medium">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Equipment needed:</p>
                    <div className="flex flex-wrap gap-1">
                      {workout.equipment.map((item, index) => (
                        <span 
                          key={index} 
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center"
                        >
                          <Target className="w-3 h-3 mr-1 text-gray-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/workouts/${workout.id}`}
                    className="w-full bg-gradient-to-r from-purple-50 to-pink-50 text-gray-700 py-3 rounded-lg font-medium hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 transition-all group flex items-center justify-center space-x-2 text-sm border border-gray-100 hover:border-purple-200"
                  >
                    <span>Start Workout</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-purple-500" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No workouts found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveLevel('all');
                    setSearchTerm('');
                  }}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkoutsPage;