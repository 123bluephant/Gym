// src/components/AnalyticsSection.tsx
import React from 'react';
import { BarChart3, Target } from 'lucide-react';

interface AnalyticsSectionProps {
  monthlyStats: {
    label: string;
    value: number | string;
    change: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ monthlyStats }) => {
  return (
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
  );
};