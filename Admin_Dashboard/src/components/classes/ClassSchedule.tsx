import { FiCalendar, FiClock, FiUser, FiPlus } from 'react-icons/fi';
import { Card } from '../ui/Card';

export const ClassSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const schedule = {
    Monday: [
      { time: '6:00 AM', name: 'Morning Yoga', instructor: 'Sarah', capacity: 15, booked: 12 },
      { time: '5:30 PM', name: 'HIIT', instructor: 'Mike', capacity: 12, booked: 10 }
    ],
    Tuesday: [
      { time: '6:30 AM', name: 'Pilates', instructor: 'Emily', capacity: 10, booked: 8 },
      { time: '6:00 PM', name: 'Boxing', instructor: 'David', capacity: 8, booked: 8 }
    ],
    Wednesday: [
      { time: '6:00 AM', name: 'Morning Yoga', instructor: 'Sarah', capacity: 15, booked: 14 },
      { time: '5:30 PM', name: 'Strength Training', instructor: 'Mike', capacity: 10, booked: 7 }
    ],
    Thursday: [
      { time: '6:30 AM', name: 'Spin Class', instructor: 'Emily', capacity: 12, booked: 12 },
      { time: '6:00 PM', name: 'Zumba', instructor: 'Lisa', capacity: 20, booked: 18 }
    ],
    Friday: [
      { time: '6:00 AM', name: 'Yoga', instructor: 'Sarah', capacity: 15, booked: 10 },
      { time: '5:30 PM', name: 'CrossFit', instructor: 'Mike', capacity: 10, booked: 9 }
    ],
    Saturday: [
      { time: '8:00 AM', name: 'Family Yoga', instructor: 'Emily', capacity: 20, booked: 15 },
      { time: '10:00 AM', name: 'Zumba', instructor: 'Lisa', capacity: 20, booked: 20 }
    ],
    Sunday: [
      { time: '9:00 AM', name: 'Yoga', instructor: 'Sarah', capacity: 15, booked: 8 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Weekly Class Schedule</h2>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700 flex items-center">
            <FiPlus className="mr-1" /> Add Class
          </button>
          <button className="px-3 py-1 rounded-md text-sm border border-gray-300 hover:bg-gray-50">
            This Week
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {days.map(day => (
          <Card key={day}>
            <div className="p-3 border-b border-gray-200">
              <h3 className="font-medium text-gray-900">{day}</h3>
            </div>
            <div className="p-2 space-y-2">
              {schedule[day as keyof typeof schedule]?.length > 0 ? (
                schedule[day as keyof typeof schedule].map((cls, index) => (
                  <div key={index} className="p-2 border border-gray-200 rounded-md hover:bg-gray-50">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="mr-1" /> {cls.time}
                    </div>
                    <h4 className="font-medium text-gray-900 mt-1">{cls.name}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-500">{cls.instructor}</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <FiUser className="mr-1" /> {cls.booked}/{cls.capacity}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No classes scheduled
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};