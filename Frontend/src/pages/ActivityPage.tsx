import Sidebar from '../components/Dashboard/sidebar';

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
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 pt-16 pl-64 overflow-y-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Your Activity</h2>
                    <div className="bg-white rounded-lg shadow p-6">
                        {sampleActivities.map((activity) => (
                            <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
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

                    <div className="p-6 border-t border-gray-200 bg-gray-50">
                        <h3 className="font-medium text-gray-900">Activity Summary</h3>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500">Total Workouts</p>
                                <p className="text-2xl font-bold mt-1">{sampleActivities.length}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500">Total Calories</p>
                                <p className="text-2xl font-bold mt-1">
                                    {sampleActivities.reduce((sum, activity) => sum + activity.caloriesBurned, 0)}
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                <p className="text-sm text-gray-500">Current Streak</p>
                                <p className="text-2xl font-bold mt-1">0 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ActivityPage;