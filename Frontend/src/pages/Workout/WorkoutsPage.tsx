import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, Target, Users, ChevronRight, Filter, Search, Star } from 'lucide-react';
interface WorkoutsPageProps {
  isLoggedIn?: boolean; // Add this prop to determine login status
}

const WorkoutsPage: React.FC<WorkoutsPageProps> = ({ isLoggedIn = false }) => {
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
     <div className={`${isLoggedIn ? '' : 'pt-16'} min-h-screen bg-gray-50`}>
      {/* Hero Section */}
      <section className={`bg-gradient-to-br from-purple-600 to-pink-600 text-white ${isLoggedIn ? 'py-12' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`${isLoggedIn ? 'text-4xl' : 'text-5xl'} font-bold mb-6`}>Workout Library</h1>
            <p className={`${isLoggedIn ? 'text-lg' : 'text-xl'} text-purple-100 max-w-3xl mx-auto`}>
              Discover thousands of expert-led workout videos for every fitness level and goal. 
              From beginner-friendly sessions to advanced challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search workouts or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span>More Filters</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Workout Type</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Difficulty Level</h3>
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeLevel === level.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workouts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredWorkouts.length} Workouts Found
            </h2>
            <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Sort by Popularity</option>
              <option>Sort by Duration</option>
              <option>Sort by Rating</option>
              <option>Sort by Newest</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWorkouts.map((workout) => (
              <div key={workout.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative">
                  <img 
                    src={workout.thumbnail} 
                    alt={workout.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <Link 
                    to={`/workouts/${workout.id}`}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 hover:bg-white transition-colors">
                      <Play className="w-8 h-8 text-purple-600" />
                    </div>
                  </Link>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-medium capitalize ${getLevelColor(workout.level)}`}>
                    {workout.level}
                  </div>
                  <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    {workout.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {workout.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">with {workout.instructor}</p>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{workout.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{workout.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{workout.rating}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Equipment needed:</p>
                    <div className="flex flex-wrap gap-1">
                      {workout.equipment.map((item, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/workouts/${workout.id}`}
                    className="w-full bg-gray-50 text-gray-700 py-2 rounded-lg font-medium hover:bg-purple-50 hover:text-purple-600 transition-all group flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>Start Workout</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No workouts found matching your criteria.</p>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setActiveLevel('all');
                  setSearchTerm('');
                }}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkoutsPage;