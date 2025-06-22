import React, { useState } from 'react';
import { Users, MessageCircle, Trophy, Heart, Share2, ChevronUp, Clock, Siren as Fire, Star, Plus, Search, Filter } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const communityStats = [
    { label: 'Active Members', value: '25,847', icon: Users, color: 'text-blue-600' },
    { label: 'Daily Discussions', value: '342', icon: MessageCircle, color: 'text-green-600' },
    { label: 'Success Stories', value: '1,289', icon: Trophy, color: 'text-yellow-600' },
    { label: 'Support Given', value: '12,456', icon: Heart, color: 'text-pink-600' }
  ];

  const trendingTopics = [
    { title: 'Postpartum Fitness Journey', replies: 89, likes: 234, category: 'Women\'s Health' },
    { title: 'Small Gym Equipment Recommendations', replies: 67, likes: 189, category: 'Gym Owners' },
    { title: 'Nutrition During Menstrual Cycle', replies: 145, likes: 567, category: 'Nutrition' },
    { title: 'Building Client Retention Strategies', replies: 78, likes: 156, category: 'Business' },
    { title: 'Home Workout Modifications for Pregnancy', replies: 123, likes: 389, category: 'Pregnancy' }
  ];

  const featuredChallenges = [
    {
      title: '30-Day Strength Challenge',
      description: 'Build strength with progressive workouts designed for all fitness levels',
      participants: 2847,
      daysLeft: 12,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Mindful Movement March',
      description: 'Focus on mind-body connection with yoga and meditation practices',
      participants: 1923,
      daysLeft: 18,
      image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Nutrition Knowledge Quest',
      description: 'Learn about balanced nutrition and healthy eating habits',
      participants: 3156,
      daysLeft: 8,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const successStories = [
    {
      name: 'Jessica M.',
      role: 'New Mom',
      story: 'Lost 35 lbs postpartum with cycle-synced workouts and community support!',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Weight Loss Champion',
      timeframe: '6 months'
    },
    {
      name: 'Mike C.',
      role: 'Gym Owner',
      story: 'Increased member retention by 40% using FitLife\'s client management tools',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Business Growth',
      timeframe: '1 year'
    },
    {
      name: 'Sarah L.',
      role: 'Fitness Enthusiast',
      story: 'Completed my first marathon after following personalized training plans',
      image: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievement: 'Marathon Finisher',
      timeframe: '8 months'
    }
  ];

  const recentDiscussions = [
    {
      title: 'Best exercises during first trimester?',
      author: 'Emma R.',
      category: 'Pregnancy',
      replies: 23,
      likes: 45,
      timeAgo: '2 hours ago',
      isHot: true
    },
    {
      title: 'How to motivate clients who plateau?',
      author: 'TrainerMike',
      category: 'Gym Owners',
      replies: 18,
      likes: 32,
      timeAgo: '4 hours ago',
      isHot: false
    },
    {
      title: 'Cycle syncing workouts - does it really work?',
      author: 'FitMom_Jane',
      category: 'Women\'s Health',
      replies: 67,
      likes: 123,
      timeAgo: '6 hours ago',
      isHot: true
    }
  ];

  const categories = ['all', 'Women\'s Health', 'Gym Owners', 'Nutrition', 'Pregnancy', 'Business', 'Success Stories'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">FitLife Community</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect, share, and grow together. Join thousands of gym owners, trainers, and fitness enthusiasts 
              supporting each other's journey to health and success.
            </p>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {communityStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 overflow-x-auto">
          {[
            { id: 'discussions', label: 'Discussions', icon: MessageCircle },
            { id: 'challenges', label: 'Challenges', icon: Trophy },
            { id: 'success', label: 'Success Stories', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-pink-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'discussions' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Discussion Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filter */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                  <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>New Post</span>
                  </button>
                </div>
              </div>

              {/* Discussion List */}
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isHot && (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <Fire className="w-3 h-3 mr-1" />
                              Hot
                            </span>
                          )}
                          <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-medium">
                            {discussion.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-pink-600 cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>by {discussion.author}</span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {discussion.timeAgo}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {discussion.replies}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {discussion.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
                <div className="space-y-4">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                      <h4 className="font-medium text-gray-900 hover:text-pink-600 cursor-pointer mb-1">
                        {topic.title}
                      </h4>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{topic.category}</span>
                        <div className="flex items-center space-x-3">
                          <span>{topic.replies} replies</span>
                          <span>{topic.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredChallenges.map((challenge, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={challenge.image}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                  <p className="text-gray-600 mb-4">{challenge.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{challenge.participants.toLocaleString()} joined</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{challenge.daysLeft} days left</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all font-medium">
                    Join Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'success' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{story.name}</h3>
                    <p className="text-gray-600 text-sm">{story.role}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs text-yellow-600">{story.achievement}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{story.story}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Journey: {story.timeframe}</span>
                  <div className="flex items-center space-x-2">
                    <button className="text-pink-600 hover:text-pink-700">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Amazing Community?</h2>
          <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
            Connect with like-minded individuals, share your journey, get support, and celebrate victories together. 
            Your fitness family is waiting for you!
          </p>
          <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Join the Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;