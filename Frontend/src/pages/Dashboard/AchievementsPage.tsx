// src/pages/AchievementsPage.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/sidebar';
import { achievements, getRarityColor } from '../../components/Data/achievementData';

const AchievementsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 pt-16 pl-64 overflow-y-auto">
        <div className="p-6">
          {/* Header with back button - matching the AnalyticsPage style */}
          <div className="flex items-center mb-8">
            <button 
              onClick={() => navigate(-1)} 
              className="mr-4 p-2 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Achievements</h1>
              <p className="text-gray-600">Track your fitness accomplishments and milestones</p>
            </div>
          </div>

          {/* Stats summary moved below header */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-gray-500">
              {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                  achievement.unlocked
                    ? 'border-indigo-500'
                    : 'border-gray-200 opacity-70'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-full ${
                    achievement.unlocked
                      ? 'bg-indigo-100 text-indigo-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{achievement.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                    {achievement.rarity && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium mt-2 inline-block ${
                        getRarityColor(achievement.rarity)
                      }`}>
                        {achievement.rarity}
                      </span>
                    )}
                    {achievement.unlocked && achievement.date ? (
                      <p className="text-xs text-indigo-500 mt-2">
                        Unlocked on {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    ) : (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Locked</p>
                        {achievement.progress && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className="bg-indigo-600 h-1.5 rounded-full" 
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-lg mb-4">Achievement Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{
                  width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{achievements.filter(a => a.unlocked).length} unlocked</span>
              <span>{achievements.length} total</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AchievementsPage;