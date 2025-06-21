import React, { useState } from 'react';
import { Heart, Calendar, TrendingUp, Moon, Sun, Droplets, Activity, Target, Clock, Zap } from 'lucide-react';

const WomensHealthPage = () => {
  const [currentPhase, setCurrentPhase] = useState('follicular');
  const [selectedDate, setSelectedDate] = useState(15);

  const cyclePhases = {
    menstrual: {
      name: 'Menstrual Phase',
      icon: Droplets,
      color: 'from-red-400 to-red-500',
      days: '1-5',
      description: 'Focus on gentle movement and recovery',
      workouts: ['Restorative Yoga', 'Light Walking', 'Stretching', 'Meditation'],
      energy: 'Low',
      mood: 'Reflective',
      tips: [
        'Listen to your body and rest when needed',
        'Stay hydrated and eat iron-rich foods',
        'Gentle stretching can help with cramps',
        'Practice self-care and mindfulness'
      ]
    },
    follicular: {
      name: 'Follicular Phase',
      icon: Sun,
      color: 'from-green-400 to-green-500',
      days: '6-14',
      description: 'Energy building - perfect for trying new workouts',
      workouts: ['Strength Training', 'HIIT', 'Dance Cardio', 'Rock Climbing'],
      energy: 'Rising',
      mood: 'Optimistic',
      tips: [
        'Great time to start new fitness challenges',
        'Focus on building strength and endurance',
        'Try new workout classes or activities',
        'Increase training intensity gradually'
      ]
    },
    ovulatory: {
      name: 'Ovulatory Phase',
      icon: TrendingUp,
      color: 'from-yellow-400 to-orange-500',
      days: '15-17',
      description: 'Peak energy and strength - go for personal bests',
      workouts: ['Heavy Lifting', 'Intense HIIT', 'Competitive Sports', 'CrossFit'],
      energy: 'Peak',
      mood: 'Confident',
      tips: [
        'Perfect time for personal records',
        'Push your limits safely',
        'Focus on high-intensity workouts',
        'Great for competition or challenges'
      ]
    },
    luteal: {
      name: 'Luteal Phase',
      icon: Moon,
      color: 'from-purple-400 to-purple-500',
      days: '18-28',
      description: 'Steady workouts with focus on stability',
      workouts: ['Pilates', 'Moderate Cardio', 'Strength Endurance', 'Barre'],
      energy: 'Declining',
      mood: 'Focused',
      tips: [
        'Maintain consistent, moderate intensity',
        'Focus on form and technique',
        'Include stress-reducing activities',
        'Prepare for upcoming menstrual phase'
      ]
    }
  };

  const currentPhaseData = cyclePhases[currentPhase as keyof typeof cyclePhases];
  const IconComponent = currentPhaseData.icon;

  const trackingMetrics = [
    { label: 'Energy Level', value: 7, max: 10, color: 'bg-green-500', trend: '+1' },
    { label: 'Mood', value: 8, max: 10, color: 'bg-blue-500', trend: '+2' },
    { label: 'Sleep Quality', value: 6, max: 10, color: 'bg-purple-500', trend: '-1' },
    { label: 'Strength', value: 8, max: 10, color: 'bg-orange-500', trend: '+3' },
    { label: 'Motivation', value: 9, max: 10, color: 'bg-pink-500', trend: '+2' },
    { label: 'Recovery', value: 7, max: 10, color: 'bg-indigo-500', trend: '0' }
  ];

  const cycleInsights = [
    {
      title: 'Workout Optimization',
      description: 'Sync your training intensity with your natural hormone fluctuations for better results and recovery.',
      icon: Activity
    },
    {
      title: 'Nutrition Timing',
      description: 'Adjust your nutrition based on your cycle phase to support energy levels and reduce cravings.',
      icon: Target
    },
    {
      title: 'Recovery Planning',
      description: 'Plan rest days and recovery activities around your cycle for optimal performance.',
      icon: Clock
    },
    {
      title: 'Energy Management',
      description: 'Understand your natural energy patterns to schedule workouts when you feel strongest.',
      icon: Zap
    }
  ];

  const workoutRecommendations = [
    {
      phase: 'menstrual',
      workouts: [
        { name: 'Gentle Yoga Flow', duration: '30 min', intensity: 'Low', calories: 120 },
        { name: 'Walking Meditation', duration: '20 min', intensity: 'Low', calories: 80 },
        { name: 'Restorative Stretching', duration: '25 min', intensity: 'Low', calories: 60 }
      ]
    },
    {
      phase: 'follicular',
      workouts: [
        { name: 'Full Body Strength', duration: '45 min', intensity: 'Medium', calories: 280 },
        { name: 'HIIT Cardio', duration: '30 min', intensity: 'High', calories: 320 },
        { name: 'Dance Fitness', duration: '40 min', intensity: 'Medium', calories: 250 }
      ]
    },
    {
      phase: 'ovulatory',
      workouts: [
        { name: 'Heavy Lifting', duration: '50 min', intensity: 'High', calories: 350 },
        { name: 'Sprint Intervals', duration: '25 min', intensity: 'High', calories: 300 },
        { name: 'CrossFit WOD', duration: '35 min', intensity: 'High', calories: 380 }
      ]
    },
    {
      phase: 'luteal',
      workouts: [
        { name: 'Pilates Core', duration: '40 min', intensity: 'Medium', calories: 200 },
        { name: 'Steady State Cardio', duration: '35 min', intensity: 'Medium', calories: 220 },
        { name: 'Barre Class', duration: '45 min', intensity: 'Medium', calories: 240 }
      ]
    }
  ];

  const currentWorkouts = workoutRecommendations.find(w => w.phase === currentPhase)?.workouts || [];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Women's Health & Cycle Sync</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Optimize your fitness journey by syncing workouts with your menstrual cycle. 
              Track wellness metrics and achieve better results with science-backed insights.
            </p>
          </div>
        </div>
      </section>

      {/* Cycle Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Cycle Syncing Works</h2>
            <p className="text-xl text-gray-600">Understanding your body's natural rhythms for optimal performance</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cycleInsights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current Phase */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
                <div className="text-center mb-8">
                  <div className={`w-24 h-24 bg-gradient-to-r ${currentPhaseData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentPhaseData.name}</h3>
                  <p className="text-gray-600 mb-2">Day {currentPhaseData.days} of cycle</p>
                  <p className="text-gray-700">{currentPhaseData.description}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Energy Level</span>
                    <span className="font-semibold text-gray-900">{currentPhaseData.energy}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Mood</span>
                    <span className="font-semibold text-gray-900">{currentPhaseData.mood}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Phase Tips:</h4>
                  {currentPhaseData.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-600">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phase Selector */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Cycle Phases</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(cyclePhases).map(([key, phase]) => {
                    const PhaseIcon = phase.icon;
                    return (
                      <button
                        key={key}
                        onClick={() => setCurrentPhase(key)}
                        className={`p-3 rounded-lg text-left transition-all ${
                          currentPhase === key
                            ? 'bg-purple-50 border-2 border-purple-200'
                            : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <PhaseIcon className={`w-4 h-4 ${currentPhase === key ? 'text-purple-600' : 'text-gray-500'}`} />
                          <span className={`text-sm font-medium ${currentPhase === key ? 'text-purple-600' : 'text-gray-700'}`}>
                            {phase.name.split(' ')[0]}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Days {phase.days}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Recommended Workouts & Tracking */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recommended Workouts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Recommended Workouts for {currentPhaseData.name}</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentWorkouts.map((workout, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">{workout.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          workout.intensity === 'Low' ? 'bg-green-100 text-green-700' :
                          workout.intensity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {workout.intensity}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{workout.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="w-4 h-4" />
                          <span>{workout.calories} cal</span>
                        </div>
                      </div>
                      <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                        Start Workout
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Wellness Tracking */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">Today's Wellness Check</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  {trackingMetrics.map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{metric.label}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{metric.value}/{metric.max}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            metric.trend.startsWith('+') ? 'bg-green-100 text-green-700' :
                            metric.trend.startsWith('-') ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {metric.trend !== '0' ? metric.trend : '→'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${metric.color} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${(metric.value / metric.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cycle Calendar */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-semibold text-gray-900">Cycle Calendar</h4>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">March 2024</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="p-2 text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    let bgColor = 'bg-gray-50 hover:bg-gray-100';
                    let textColor = 'text-gray-700';
                    
                    if (day <= 5) {
                      bgColor = 'bg-red-100 hover:bg-red-200';
                      textColor = 'text-red-700';
                    } else if (day <= 14) {
                      bgColor = 'bg-green-100 hover:bg-green-200';
                      textColor = 'text-green-700';
                    } else if (day <= 17) {
                      bgColor = 'bg-yellow-100 hover:bg-yellow-200';
                      textColor = 'text-yellow-700';
                    } else {
                      bgColor = 'bg-purple-100 hover:bg-purple-200';
                      textColor = 'text-purple-700';
                    }
                    
                    if (day === selectedDate) {
                      bgColor += ' ring-2 ring-purple-500';
                    }
                    
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(day)}
                        className={`p-2 text-sm ${bgColor} ${textColor} rounded transition-colors cursor-pointer`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-center space-x-6 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-100 rounded"></div>
                    <span>Menstrual</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-100 rounded"></div>
                    <span>Follicular</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-100 rounded"></div>
                    <span>Ovulatory</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-purple-100 rounded"></div>
                    <span>Luteal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Unlock Your Full Potential</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of women who've optimized their fitness by syncing with their natural cycles. 
            Experience better results with less effort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Start Cycle Sync Program
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomensHealthPage;