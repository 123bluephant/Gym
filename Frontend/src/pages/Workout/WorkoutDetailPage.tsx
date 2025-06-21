import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock, Target, Users, Star, ChevronLeft, Heart, Share2, Download } from 'lucide-react';

const WorkoutDetailPage = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock workout data - in a real app, this would be fetched based on the ID
  const workout = {
    id: 1,
    title: 'Full Body Strength Builder',
    instructor: 'Sarah Johnson',
    level: 'Intermediate',
    duration: '45 min',
    rating: 4.9,
    reviews: 234,
    participants: 2847,
    description: 'Build lean muscle and increase strength with this comprehensive full-body workout. Perfect for intermediate fitness enthusiasts looking to challenge themselves and see real results.',
    equipment: ['Dumbbells', 'Resistance Bands', 'Exercise Mat'],
    targetMuscles: ['Full Body', 'Core', 'Arms', 'Legs'],
    calories: 350,
    thumbnail: 'https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg?auto=compress&cs=tinysrgb&w=800',
    videoUrl: 'https://example.com/workout-video.mp4',
    exercises: [
      { name: 'Warm-up', duration: '5 min', description: 'Dynamic stretching and light cardio' },
      { name: 'Squats', duration: '3 min', description: '3 sets of 12 reps with dumbbells' },
      { name: 'Push-ups', duration: '3 min', description: '3 sets of 10-15 reps' },
      { name: 'Deadlifts', duration: '4 min', description: '3 sets of 10 reps with dumbbells' },
      { name: 'Plank', duration: '2 min', description: '3 sets of 30 seconds' },
      { name: 'Lunges', duration: '4 min', description: '3 sets of 12 reps each leg' },
      { name: 'Resistance Band Rows', duration: '3 min', description: '3 sets of 15 reps' },
      { name: 'Cool-down', duration: '5 min', description: 'Static stretching and relaxation' }
    ]
  };

  const relatedWorkouts = [
    {
      id: 2,
      title: 'Upper Body Blast',
      instructor: 'Alex Rivera',
      duration: '25 min',
      level: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Core Power Session',
      instructor: 'Mike Chen',
      duration: '30 min',
      level: 'Advanced',
      thumbnail: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'Lower Body Strength',
      instructor: 'Emma Wilson',
      duration: '40 min',
      level: 'Intermediate',
      thumbnail: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/workouts" 
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Workouts</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="relative aspect-video bg-gray-900">
                <img 
                  src={workout.thumbnail} 
                  alt={workout.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors group"
                  >
                    <Play className="w-10 h-10 text-purple-600 ml-1 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Workout Info */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{workout.title}</h1>
                  <p className="text-lg text-gray-600">with {workout.instructor}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getLevelColor(workout.level)}`}>
                  {workout.level}
                </span>
              </div>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{workout.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{workout.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{workout.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">{workout.participants.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{workout.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Equipment Needed</h3>
                    <div className="flex flex-wrap gap-2">
                      {workout.equipment.map((item, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Target Muscles</h3>
                    <div className="flex flex-wrap gap-2">
                      {workout.targetMuscles.map((muscle, index) => (
                        <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Workout Breakdown */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Workout Breakdown</h3>
              <div className="space-y-4">
                {workout.exercises.map((exercise, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
                      <p className="text-sm text-gray-600">{exercise.description}</p>
                    </div>
                    <div className="text-sm font-medium text-purple-600">
                      {exercise.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Start Workout</span>
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download for Offline</span>
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Add to Favorites</span>
                </button>
              </div>
            </div>

            {/* Instructor Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Instructor</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{workout.instructor}</h4>
                  <p className="text-sm text-gray-600">Certified Personal Trainer</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9 (156 reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Sarah is a certified personal trainer with over 8 years of experience helping people achieve their fitness goals through strength training and functional movement.
              </p>
              <button className="w-full border border-purple-200 text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                View Profile
              </button>
            </div>

            {/* Related Workouts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Workouts</h3>
              <div className="space-y-4">
                {relatedWorkouts.map((relatedWorkout) => (
                  <Link 
                    key={relatedWorkout.id}
                    to={`/workouts/${relatedWorkout.id}`}
                    className="block group"
                  >
                    <div className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <img 
                        src={relatedWorkout.thumbnail} 
                        alt={relatedWorkout.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {relatedWorkout.title}
                        </h4>
                        <p className="text-sm text-gray-600">{relatedWorkout.instructor}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                          <span>{relatedWorkout.duration}</span>
                          <span>•</span>
                          <span>{relatedWorkout.level}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailPage;