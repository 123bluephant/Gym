import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash2, User } from 'lucide-react';

interface GymClass {
  id: string;
  name: string;
  instructor: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  date: string;
  type: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

const Classes: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [classes, setClasses] = useState<GymClass[]>([
    {
      id: '1',
      name: 'Morning Yoga',
      instructor: 'Maria Garcia',
      time: '07:00',
      duration: 60,
      capacity: 20,
      enrolled: 15,
      date: '2024-01-21',
      type: 'Yoga',
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'HIIT Training',
      instructor: 'Alex Johnson',
      time: '09:00',
      duration: 45,
      capacity: 15,
      enrolled: 12,
      date: '2024-01-21',
      type: 'HIIT',
      status: 'scheduled'
    },
    {
      id: '3',
      name: 'Pilates',
      instructor: 'Sarah Wilson',
      time: '11:00',
      duration: 50,
      capacity: 18,
      enrolled: 18,
      date: '2024-01-21',
      type: 'Pilates',
      status: 'ongoing'
    },
    {
      id: '4',
      name: 'Strength Training',
      instructor: 'Mike Davis',
      time: '14:00',
      duration: 60,
      capacity: 12,
      enrolled: 8,
      date: '2024-01-21',
      type: 'Strength',
      status: 'scheduled'
    },
    {
      id: '5',
      name: 'Evening Zumba',
      instructor: 'Lisa Rodriguez',
      time: '18:00',
      duration: 45,
      capacity: 25,
      enrolled: 22,
      date: '2024-01-21',
      type: 'Dance',
      status: 'scheduled'
    }
  ]);

  const handleScheduleClass = () => {
    const newClass: GymClass = {
      id: String(classes.length + 1),
      name: 'New Class',
      instructor: 'TBD',
      time: '12:00',
      duration: 60,
      capacity: 20,
      enrolled: 0,
      date: selectedDate,
      type: 'General',
      status: 'scheduled'
    };
    setClasses([...classes, newClass]);
    alert('New class scheduled successfully!');
  };

  const handleEditClass = (classId: string) => {
    alert(`Edit class functionality for ID: ${classId}`);
  };

  const handleDeleteClass = (classId: string) => {
    if (window.confirm('Are you sure you want to cancel this class?')) {
      setClasses(classes.filter(cls => cls.id !== classId));
      alert('Class cancelled successfully!');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Yoga': return 'bg-purple-100 text-purple-800';
      case 'HIIT': return 'bg-red-100 text-red-800';
      case 'Pilates': return 'bg-pink-100 text-pink-800';
      case 'Strength': return 'bg-orange-100 text-orange-800';
      case 'Dance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityPercentage = (enrolled: number, capacity: number) => {
    return Math.round((enrolled / capacity) * 100);
  };

  const filteredClasses = classes.filter(cls => cls.date === selectedDate);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
          <p className="text-gray-600 mt-1">Manage gym classes and schedules</p>
        </div>
        <button 
          onClick={handleScheduleClass}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Class</span>
        </button>
      </div>

      {/* Date Selector */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <span className="text-sm text-gray-600">
            {filteredClasses.length} classes scheduled
          </span>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">{cls.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(cls.type)}`}>
                    {cls.type}
                  </span>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cls.status)}`}>
                    {cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEditClass(cls.id)}
                  className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteClass(cls.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{cls.instructor}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{cls.time} ({cls.duration} min)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{cls.enrolled}/{cls.capacity} enrolled</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Capacity</span>
                <span className="text-sm text-gray-600">
                  {getCapacityPercentage(cls.enrolled, cls.capacity)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    getCapacityPercentage(cls.enrolled, cls.capacity) === 100 
                      ? 'bg-red-500' 
                      : getCapacityPercentage(cls.enrolled, cls.capacity) > 80 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                  }`}
                  style={{ width: `${getCapacityPercentage(cls.enrolled, cls.capacity)}%` }}
                ></div>
              </div>
              {cls.enrolled === cls.capacity && (
                <p className="text-xs text-red-600 mt-1">Class is full</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No classes scheduled</h3>
          <p className="text-gray-600">No classes are scheduled for the selected date.</p>
        </div>
      )}
    </div>
  );
};

export default Classes;