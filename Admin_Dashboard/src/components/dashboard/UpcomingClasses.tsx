// components/dashboard/UpcomingClasses.tsx
import { Card } from '../ui/Card';
import { FiClock, FiUser } from 'react-icons/fi';

export const UpcomingClasses = () => {
  const upcomingClasses = [
    { 
      id: 1, 
      name: 'Morning Yoga', 
      instructor: 'Sarah Johnson', 
      time: 'Today, 9:00 AM', 
      booked: 12, 
      capacity: 15 
    },
    { 
      id: 2, 
      name: 'HIIT Workout', 
      instructor: 'Mike Smith', 
      time: 'Today, 5:30 PM', 
      booked: 10, 
      capacity: 12 
    },
    { 
      id: 3, 
      name: 'Zumba', 
      instructor: 'Emily Wilson', 
      time: 'Tomorrow, 7:00 AM', 
      booked: 8, 
      capacity: 15 
    },
  ];

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">Upcoming Classes</h2>
        <div className="mt-4 space-y-4">
          {upcomingClasses.map((cls) => (
            <div key={cls.id} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {cls.name.charAt(0)}
                </span>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{cls.name}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <FiClock className="mr-1" /> {cls.time}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{cls.instructor}</p>
                <div className="mt-1 flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(cls.booked / cls.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-500">
                    {cls.booked}/{cls.capacity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/classes" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View Full Schedule
          </a>
        </div>
      </div>
    </Card>
  );
};