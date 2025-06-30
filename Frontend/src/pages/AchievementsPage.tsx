import React from 'react';
import Sidebar from '../components/Dashboard/sidebar';
import { Award, Trophy, Medal, Star, CheckCircle } from 'lucide-react';

interface Achievement {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    unlocked: boolean;
    date?: string; // Optional date field
}

const AchievementsPage = () => {
    const achievements: Achievement[] = [
        {
            id: 1,
            title: "First Workout",
            description: "Completed your first workout session",
            icon: <Trophy className="w-6 h-6 text-yellow-500" />,
            unlocked: true,
            date: "2023-05-15"
        },
        {
            id: 2,
            title: "5-Day Streak",
            description: "Worked out for 5 consecutive days",
            icon: <Medal className="w-6 h-6 text-blue-500" />,
            unlocked: true,
            date: "2023-06-02"
        },
        {
            id: 3,
            title: "Marathon Runner",
            description: "Ran a total of 26.2 miles",
            icon: <Award className="w-6 h-6 text-purple-500" />,
            unlocked: false
        },
        {
            id: 4,
            title: "Early Bird",
            description: "Completed 5 morning workouts before 8AM",
            icon: <Star className="w-6 h-6 text-orange-500" />,
            unlocked: true,
            date: "2023-06-10"
        },
        {
            id: 5,
            title: "Weight Master",
            description: "Reached your target weight goal",
            icon: <CheckCircle className="w-6 h-6 text-green-500" />,
            unlocked: false
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 pt-16 pl-64 overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Your Achievements</h2>
                        <div className="text-sm text-gray-500">
                            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement) => (
                            <div
                                key={achievement.id}
                                className={`bg-white rounded-lg shadow p-6 border-l-4 ${achievement.unlocked
                                        ? 'border-indigo-500'
                                        : 'border-gray-200 opacity-70'
                                    }`}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`p-3 rounded-full ${achievement.unlocked
                                            ? 'bg-indigo-100 text-indigo-600'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}>
                                        {achievement.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1">{achievement.description}</p>
                                        {achievement.unlocked && achievement.date ? (
                                            <p className="text-xs text-indigo-500 mt-2">
                                                Unlocked on {new Date(achievement.date).toLocaleDateString()}
                                            </p>
                                        ) : (
                                            <p className="text-xs text-gray-500 mt-2">Locked</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Section */}
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