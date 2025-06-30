import React, { useState } from 'react';
import { Activity, Award, Calendar, TrendingUp, Zap, Heart, BarChart3, Target, Clock, Flame } from 'lucide-react';

const TrackingPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');

  const fitnessTypes = [
    {
      name: 'Strength Training',
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      sessions: 24,
      totalTime: '18h 30m',
      progress: 85,
      thisWeek: 3,
      avgDuration: 46
    },
    {
      name: 'Yoga',
      icon: Heart,
      color: 'from-green-500 to-green-600', 
      sessions: 16,
      totalTime: '12h 45m',
      progress: 72,
      thisWeek: 2,
      avgDuration: 48
    },
    {
      name: 'HIIT',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      sessions: 18,
      totalTime: '9h 15m',
      progress: 90,
      thisWeek: 4,
      avgDuration: 31
    },
    {
      name: 'Cardio',
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      sessions: 32,
      totalTime: '24h 20m',
      progress: 95,
      thisWeek: 5,
      avgDuration: 46
    }
  ];

  const weeklyData = [
    { day: 'Mon', strength: 45, yoga: 30, hiit: 0, cardio: 25, date: '11' },
    { day: 'Tue', strength: 0, yoga: 45, hiit: 20, cardio: 0, date: '12' },
    { day: 'Wed', strength: 60, yoga: 0, hiit: 0, cardio: 30, date: '13' },
    { day: 'Thu', strength: 0, yoga: 60, hiit: 25, cardio: 0, date: '14' },
    { day: 'Fri', strength: 50, yoga: 0, hiit: 30, cardio: 0, date: '15' },
    { day: 'Sat', strength: 0, yoga: 30, hiit: 0, cardio: 45, date: '16' },
    { day: 'Sun', strength: 0, yoga: 75, hiit: 0, cardio: 20, date: '17' }
  ];

  const achievements = [
    { 
      title: '30-Day Streak', 
      description: 'Consistent daily workouts', 
      unlocked: true, 
      date: '2024-03-01',
      rarity: 'Common'
    },
    { 
      title: 'Strength Master', 
      description: 'Complete 50 strength sessions', 
      unlocked: true, 
      date: '2024-02-15',
      rarity: 'Rare'
    },
    { 
      title: 'Flexibility Pro', 
      description: '100 hours of yoga', 
      unlocked: false, 
      progress: 76,
      rarity: 'Epic'
    },
    { 
      title: 'Cardio Champion', 
      description: 'Burn 10,000 calories', 
      unlocked: true, 
      date: '2024-01-20',
      rarity: 'Legendary'
    },
    { 
      title: 'Early Bird', 
      description: '20 morning workouts', 
      unlocked: false, 
      progress: 15,
      rarity: 'Common'
    },
    { 
      title: 'HIIT Hero', 
      description: '50 HIIT sessions completed', 
      unlocked: false, 
      progress: 36,
      rarity: 'Rare'
    }
  ];

  const monthlyStats = [
    { label: 'Total Workouts', value: 28, change: '+12%', icon: Activity },
    { label: 'Hours Trained', value: 42.5, change: '+8%', icon: Clock },
    { label: 'Calories Burned', value: 8450, change: '+15%', icon: Flame },
    { label: 'Current Streak', value: 12, change: '+4 days', icon: Target }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Fitness Tracking Dashboard</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Monitor your progress across all fitness disciplines. Track workouts, analyze performance, 
              and celebrate your achievements with comprehensive fitness analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthlyStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {typeof stat.value === 'number' && stat.value > 1000 
                      ? stat.value.toLocaleString() 
                      : stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1 rounded-xl">
              {['overview', 'weekly', 'achievements', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {fitnessTypes.map((type, index) => {
                const IconComponent = type.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{type.sessions}</div>
                        <div className="text-sm text-gray-600">Total Sessions</div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{type.name}</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Time</span>
                        <span className="font-medium">{type.totalTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">This Week</span>
                        <span className="font-medium">{type.thisWeek} sessions</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg Duration</span>
                        <span className="font-medium">{type.avgDuration} min</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Monthly Goal</span>
                        <span className="font-semibold">{type.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${type.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${type.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Weekly Tab */}
          {activeTab === 'weekly' && (
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">Weekly Activity Overview</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span>March 11-17, 2024</span>
                    </div>
                    <select 
                      value={selectedTimeframe}
                      onChange={(e) => setSelectedTimeframe(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-4 mb-8">
                  {weeklyData.map((day, index) => {
                    const total = day.strength + day.yoga + day.hiit + day.cardio;
                    const maxHeight = 120;
                    return (
                      <div key={index} className="text-center">
                        <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                        <div className="text-xs text-gray-500 mb-2">Mar {day.date}</div>
                        <div className={`relative bg-gray-100 rounded-lg flex flex-col justify-end overflow-hidden`} style={{ height: `${maxHeight}px` }}>
                          {day.cardio > 0 && (
                            <div 
                              className="bg-blue-500 w-full transition-all duration-300"
                              style={{ height: `${(day.cardio / 100) * maxHeight}px` }}
                              title={`Cardio: ${day.cardio}min`}
                            ></div>
                          )}
                          {day.hiit > 0 && (
                            <div 
                              className="bg-orange-500 w-full transition-all duration-300"
                              style={{ height: `${(day.hiit / 100) * maxHeight}px` }}
                              title={`HIIT: ${day.hiit}min`}
                            ></div>
                          )}
                          {day.yoga > 0 && (
                            <div 
                              className="bg-green-500 w-full transition-all duration-300"
                              style={{ height: `${(day.yoga / 100) * maxHeight}px` }}
                              title={`Yoga: ${day.yoga}min`}
                            ></div>
                          )}
                          {day.strength > 0 && (
                            <div 
                              className="bg-purple-500 w-full transition-all duration-300"
                              style={{ height: `${(day.strength / 100) * maxHeight}px` }}
                              title={`Strength: ${day.strength}min`}
                            ></div>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mt-2 font-medium">{total}min</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Strength</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Yoga</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">HIIT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Cardio</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Achievements</h2>
                <p className="text-gray-600">Unlock badges and celebrate your fitness milestones</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-6 rounded-2xl border-2 transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                          : 'bg-gray-300'
                      }`}>
                        <Award className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRarityColor(achievement.rarity)}`}>
                        {achievement.rarity}
                      </span>
                    </div>
                    
                    <h4 className={`text-lg font-semibold mb-2 ${
                      achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm mb-4 ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.unlocked ? (
                      <div className="flex items-center space-x-2 text-purple-600">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">Unlocked {achievement.date}</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Analytics</h2>
                <p className="text-gray-600">Deep insights into your fitness journey and performance trends</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Average Session Duration</span>
                      <span className="font-semibold">42 minutes</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Most Active Day</span>
                      <span className="font-semibold">Friday</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Preferred Workout Time</span>
                      <span className="font-semibold">6:00 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Weekly Consistency</span>
                      <span className="font-semibold">85%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Goal Progress</h3>
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Monthly Workout Goal</span>
                        <span className="font-semibold">28/30 sessions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '93%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Strength Training Goal</span>
                        <span className="font-semibold">24/25 sessions</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Cardio Minutes Goal</span>
                        <span className="font-semibold">1,460/1,500 min</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Summary Stats */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Your Fitness Journey</h2>
            <p className="text-purple-100">Amazing progress across all your fitness goals</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">90</div>
              <div className="text-purple-100">Total Sessions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">64h 50m</div>
              <div className="text-purple-100">Time Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8,450</div>
              <div className="text-purple-100">Calories Burned</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">28</div>
              <div className="text-purple-100">Day Streak</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackingPage;