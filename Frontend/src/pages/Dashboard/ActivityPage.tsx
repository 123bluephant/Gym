import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Dashboard/sidebar';
import ResponsivePageLayout from '../../components/Dashboard/PageLayout';

interface WorkoutActivity {
    id: string;
    date: string;
    type: string;
    duration: string;
    caloriesBurned: number;
    completed: boolean;
}

const sampleActivities: WorkoutActivity[] = [
    {
        id: '1',
        date: '2023-06-15',
        type: 'Strength Training',
        duration: '45 min',
        caloriesBurned: 320,
        completed: true
    },
    {
        id: '2',
        date: '2023-06-14',
        type: 'Cardio',
        duration: '30 min',
        caloriesBurned: 280,
        completed: true
    },
    {
        id: '3',
        date: '2023-06-12',
        type: 'Yoga',
        duration: '60 min',
        caloriesBurned: 180,
        completed: true
    },
    {
        id: '4',
        date: '2023-06-10',
        type: 'HIIT',
        duration: '25 min',
        caloriesBurned: 350,
        completed: true
    },
    {
        id: '5',
        date: '2023-06-08',
        type: 'Running',
        duration: '40 min',
        caloriesBurned: 420,
        completed: true
    }
];

const ActivityPage = () => {
    const navigate = useNavigate();

    return (
        <ResponsivePageLayout>
            <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
                <main className="flex-1 pt-16 overflow-y-auto">
                    <div className="p-4 md:p-6">
                        {/* Header with back button */}
                        <div className="flex items-center mb-6 md:mb-8">
                            <button 
                                onClick={() => navigate(-1)} 
                                className="mr-2 md:mr-4 p-1 md:p-2 rounded-full hover:bg-gray-100"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Activity</h1>
                                <p className="text-sm md:text-base text-gray-600">Track your workout history and progress</p>
                            </div>
                        </div>

                        {/* Activity List */}
                        <div className="bg-white rounded-lg shadow mb-6 md:mb-8">
                            {sampleActivities.map((activity) => (
                                <div key={activity.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-base md:text-lg font-medium text-gray-900">{activity.type}</h3>
                                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                {new Date(activity.date).toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                            <div className="flex flex-col sm:flex-row sm:items-center mt-2 sm:space-x-4">
                                                <span className="text-xs md:text-sm text-gray-600 mb-1 sm:mb-0">
                                                    <span className="font-medium">Duration:</span> {activity.duration}
                                                </span>
                                                <span className="text-xs md:text-sm text-gray-600">
                                                    <span className="font-medium">Calories:</span> {activity.caloriesBurned}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:mt-0 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs md:text-sm font-medium self-start sm:self-auto">
                                            Completed
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Activity Summary */}
                        <div className="bg-white rounded-lg shadow p-4 md:p-6">
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3 md:mb-4">Activity Summary</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <p className="text-xs md:text-sm text-gray-500">Total Workouts</p>
                                    <p className="text-xl md:text-2xl font-bold mt-1">{sampleActivities.length}</p>
                                </div>
                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <p className="text-xs md:text-sm text-gray-500">Total Calories</p>
                                    <p className="text-xl md:text-2xl font-bold mt-1">
                                        {sampleActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0)}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                                    <p className="text-xs md:text-sm text-gray-500">Current Streak</p>
                                    <p className="text-xl md:text-2xl font-bold mt-1">0 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ResponsivePageLayout>
    );
};

export default ActivityPage;