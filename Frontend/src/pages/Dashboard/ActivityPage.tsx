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
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          <main className="flex-1 pt-16 overflow-y-auto">
                <div className="p-6">
                    {/* Updated header with back button */}
                    <div className="flex items-center mb-8">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="mr-4 p-2 rounded-full hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Your Activity</h1>
                            <p className="text-gray-600">Track your workout history and progress</p>
                        </div>
                    </div>

                    {/* Activity List */}
                    <div className="bg-white rounded-lg shadow mb-8">
                        {sampleActivities.map((activity) => (
                            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{activity.type}</h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {new Date(activity.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                        <div className="flex items-center mt-2 space-x-4">
                                            <span className="text-sm text-gray-600">
                                                <span className="font-medium">Duration:</span> {activity.duration}
                                            </span>
                                            <span className="text-sm text-gray-600">
                                                <span className="font-medium">Calories:</span> {activity.caloriesBurned}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Completed
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Activity Summary */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Total Workouts</p>
                                <p className="text-2xl font-bold mt-1">{sampleActivities.length}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Total Calories</p>
                                <p className="text-2xl font-bold mt-1">
                                    {sampleActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0)}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Current Streak</p>
                                <p className="text-2xl font-bold mt-1">0 days</p>
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