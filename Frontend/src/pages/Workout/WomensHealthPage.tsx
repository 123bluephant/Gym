import React, { useState, useEffect } from 'react';
import {
  Calendar, TrendingUp, Moon, Sun, Droplets, Activity,
  Target, Clock, Zap, Plus, ArrowRight, ChevronLeft, ChevronRight,
  X
} from 'lucide-react';

// Mock API service (replace with actual API calls)
const mockApiService = {
  getCycleData: async (p0: string) => {
    // In a real app, this would fetch from your backend
    return {
      currentPhase: 'follicular',
      cycleLength: 28,
      lastPeriodStart: '2024-03-01',
      trackedMetrics: [
        { date: '2024-03-15', energy: 7, mood: 8, sleep: 6, strength: 8, motivation: 9, recovery: 7 }
      ],
      customWorkouts: []
    };
  },
  logDailyMetrics: async (userId: string, metrics: any) => {
    console.log('Logging metrics:', metrics);
    // Would send to backend in real app
    return { success: true };
  }
};

const WomensHealthPage = () => {
  const [loading, setLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState('follicular');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [cycleData, setCycleData] = useState<any>(null);
  const [dailyMetrics, setDailyMetrics] = useState({
    energy: 5,
    mood: 5,
    sleep: 5,
    strength: 5,
    motivation: 5,
    recovery: 5,
    notes: ''
  });
  const [showMetricForm, setShowMetricForm] = useState(false);

  // Fetch cycle data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await mockApiService.getCycleData('user123');
        setCycleData(data);
        setCurrentPhase(data.currentPhase);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cycle data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const handleMetricChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDailyMetrics(prev => ({
      ...prev,
      [name]: name === 'notes' ? value : parseInt(value)
    }));
  };

  const submitDailyMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mockApiService.logDailyMetrics('user123', {
        date: selectedDate.toISOString().split('T')[0],
        ...dailyMetrics
      });
      setShowMetricForm(false);
      // In a real app, you'd refresh the data here
    } catch (error) {
      console.error('Error logging metrics:', error);
    }
  };

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

  // Calculate phase based on selected date (simplified for demo)
  const calculatePhaseFromDate = (date: Date) => {
    if (!cycleData?.lastPeriodStart) return 'follicular';

    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const dayInCycle = Math.floor((date.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    if (dayInCycle <= 5) return 'menstrual';
    if (dayInCycle <= 14) return 'follicular';
    if (dayInCycle <= 17) return 'ovulatory';
    if (dayInCycle <= 28) return 'luteal';
    return 'follicular'; // Default if cycle restarts
  };

  useEffect(() => {
    if (cycleData) {
      const phase = calculatePhaseFromDate(selectedDate);
      setCurrentPhase(phase);
    }
  }, [selectedDate, cycleData]);

  const trackingMetrics = [
    { label: 'Energy Level', key: 'energy', value: dailyMetrics.energy, max: 10, color: 'bg-green-500' },
    { label: 'Mood', key: 'mood', value: dailyMetrics.mood, max: 10, color: 'bg-blue-500' },
    { label: 'Sleep Quality', key: 'sleep', value: dailyMetrics.sleep, max: 10, color: 'bg-purple-500' },
    { label: 'Strength', key: 'strength', value: dailyMetrics.strength, max: 10, color: 'bg-orange-500' },
    { label: 'Motivation', key: 'motivation', value: dailyMetrics.motivation, max: 10, color: 'bg-pink-500' },
    { label: 'Recovery', key: 'recovery', value: dailyMetrics.recovery, max: 10, color: 'bg-indigo-500' }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

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
                <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
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
                        className={`p-3 rounded-lg text-left transition-all ${currentPhase === key
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
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900">Recommended Workouts for {currentPhaseData.name}</h4>
                  <button className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {currentWorkouts.map((workout, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">{workout.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded-full ${workout.intensity === 'Low' ? 'bg-green-100 text-green-700' :
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
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-semibold text-gray-900">Daily Wellness Check</h4>
                  <button
                    onClick={() => setShowMetricForm(true)}
                    className="flex items-center text-sm bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Today's Data
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {trackingMetrics.map((metric, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{metric.label}</span>
                        <span className="font-semibold text-gray-900">{metric.value}/{metric.max}</span>
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
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleDateChange(-30)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span className="text-sm">
                        {selectedDate.toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDateChange(30)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
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
                    const date = new Date(selectedDate);
                    date.setDate(day);
                    const phase = calculatePhaseFromDate(date);

                    let bgColor = 'bg-gray-50 hover:bg-gray-100';
                    let textColor = 'text-gray-700';

                    if (phase === 'menstrual') {
                      bgColor = 'bg-red-100 hover:bg-red-200';
                      textColor = 'text-red-700';
                    } else if (phase === 'follicular') {
                      bgColor = 'bg-green-100 hover:bg-green-200';
                      textColor = 'text-green-700';
                    } else if (phase === 'ovulatory') {
                      bgColor = 'bg-yellow-100 hover:bg-yellow-200';
                      textColor = 'text-yellow-700';
                    } else {
                      bgColor = 'bg-purple-100 hover:bg-purple-200';
                      textColor = 'text-purple-700';
                    }

                    const isSelected = selectedDate.getDate() === day &&
                      selectedDate.getMonth() === new Date().getMonth();

                    if (isSelected) {
                      bgColor += ' ring-2 ring-purple-500';
                    }

                    return (
                      <button
                        key={day}
                        onClick={() => {
                          const newDate = new Date(selectedDate);
                          newDate.setDate(day);
                          setSelectedDate(newDate);
                        }}
                        className={`p-2 text-sm ${bgColor} ${textColor} rounded transition-colors cursor-pointer`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-xs">
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

      {/* Daily Metrics Form Modal */}
      {showMetricForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h2 className="text-xl font-bold text-gray-800">
                Log Daily Metrics - {selectedDate.toLocaleDateString()}
              </h2>
              <button
                onClick={() => setShowMetricForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={submitDailyMetrics} className="p-6 space-y-4">
              {trackingMetrics.map((metric) => (
                <div key={metric.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {metric.label}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      name={metric.key}
                      min="1"
                      max="10"
                      value={dailyMetrics[metric.key as keyof typeof dailyMetrics]}
                      onChange={handleMetricChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 w-8">
                      {dailyMetrics[metric.key as keyof typeof dailyMetrics]}
                    </span>
                  </div>
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={dailyMetrics.notes}
                  onChange={handleMetricChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Any additional notes about your day..."
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowMetricForm(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                >
                  Save Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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