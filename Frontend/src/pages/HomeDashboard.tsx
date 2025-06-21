import React, { useState } from "react";
import ActionButton from "../components/modal/ActionButton";
import MetricsCard from "../components/modal/MetricsCard";
import FitnessCalendar from "../components/modal/FitnessCalendar";
import TrackProgressModal from "../components/modal/TrackProgressModal";
import AskCoachModal from "../components/modal/AskCoachModal";
import { Link } from "react-router-dom";

export default function HomeDashboard({ onShowFeed }: { onShowFeed: () => void }) {
  const [showTrackProgress, setShowTrackProgress] = useState(false);
  const [showAskCoach, setShowAskCoach] = useState(false);
  const [showTrainToday, setShowTrainToday] = useState(false);
  const [showEatToday, setShowEatToday] = useState(false);

  // Enhanced data with progress indicators
  const metrics = [
    { label: "Steps", value: "7,500", progress: 75, target: "10,000" },
    { label: "Calories", value: "1,850", progress: 62, target: "3,000" },
    { label: "Active Minutes", value: "42", progress: 84, target: "50" }
  ];

  const calendarEvents = [
    { 
      date: new Date().toISOString(), 
      type: "Workout", 
      details: "Full Body HIIT", 
      time: "9:00 AM", 
      completed: true 
    },
    { 
      date: new Date().toISOString(), 
      type: "Meal", 
      details: "High-Protein Breakfast", 
      time: "8:00 AM", 
      completed: true 
    },
    { 
      date: new Date().toISOString(), 
      type: "Period Sync", 
      details: "Phase: Follicular", 
      time: "12:00 PM", 
      completed: false 
    },
    { 
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      type: "Workout", 
      details: "Yoga & Stretching", 
      time: "7:00 AM", 
      completed: false 
    }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8 mt-16">
      {/* Header with greeting and date */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alex!</h1>
        <p className="text-gray-600 mt-2">
          Here's your personalized dashboard for {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Metrics Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Progress</h2>
        <MetricsCard metrics={metrics} />
      </div>

      {/* Calendar Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <FitnessCalendar events={calendarEvents} />
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-4">
       
          <ActionButton 
            label="Train Today" 
            icon="💪" 
            color="#00b894" 
            onClick={() => setShowTrainToday(true)}
          />
        
        
          <ActionButton 
            label="Eat Today" 
            icon="🍽️" 
            color="#fdcb6e" 
            onClick={() => setShowEatToday(true)}
          />
        
        <ActionButton 
          label="Ask Coach" 
          icon="🤖" 
          color="#0984e3" 
          onClick={() => setShowAskCoach(true)}
        />
        <ActionButton 
          label="Track Progress" 
          icon="📈" 
          color="#6c5ce7" 
          onClick={() => setShowTrackProgress(true)}
        />
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-medium text-gray-800 mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600">Workouts</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">12,500</p>
            <p className="text-sm text-gray-600">Avg. Steps</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">82%</p>
            <p className="text-sm text-gray-600">Goals Met</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TrackProgressModal 
        open={showTrackProgress} 
        onClose={() => setShowTrackProgress(false)} 
      />
      <AskCoachModal 
        open={showAskCoach} 
        onClose={() => setShowAskCoach(false)} 
      />
      
      {/* New Modals for Train and Eat */}
      {showTrainToday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Today's Workout Plan</h2>
            <p>Your scheduled workout: Full Body HIIT</p>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowTrainToday(false)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Close
              </button>
              <Link 
                to="/workout-session" 
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
              >
                Start Workout
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {showEatToday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Today's Meal Plan</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Breakfast:</span>
                <span className="font-medium">High-Protein Oatmeal</span>
              </div>
              <div className="flex justify-between">
                <span>Lunch:</span>
                <span className="font-medium">Grilled Chicken Salad</span>
              </div>
              <div className="flex justify-between">
                <span>Dinner:</span>
                <span className="font-medium">Salmon with Vegetables</span>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowEatToday(false)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Close
              </button>
              <Link 
                to="/meal-plan" 
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white"
              >
                View Full Plan
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}