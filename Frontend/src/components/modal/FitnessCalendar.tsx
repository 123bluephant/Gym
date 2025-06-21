import { useState } from "react";
import { format, addDays, isToday, isSameDay, parseISO } from "date-fns";

interface CalendarEvent {
  date: string;
  type: string;
  details: string;
  time?: string;
  completed?: boolean;
}

export default function FitnessCalendar({ events }: { events: CalendarEvent[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate 7 days starting from current date
  const days = Array.from({ length: 7 }, (_, i) => addDays(currentDate, i));

  // Filter events for the selected date
  const selectedDateEvents = events.filter(event => 
    isSameDay(parseISO(event.date), selectedDate)
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">Fitness Calendar</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentDate(addDays(currentDate, -7))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button 
              onClick={() => setCurrentDate(addDays(currentDate, 7))}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {days.map(day => (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`py-2 text-center rounded-lg transition-colors ${
                isSameDay(day, selectedDate)
                  ? 'bg-blue-100 text-blue-600 font-medium'
                  : isToday(day)
                    ? 'bg-gray-100 text-gray-800'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <div className="text-xs">{format(day, 'EEE')}</div>
              <div className="text-sm">{format(day, 'd')}</div>
            </button>
          ))}
        </div>

        {/* Events for selected day */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-700 mb-3">
            {format(selectedDate, 'EEEE, MMMM d')}
          </h4>

          {selectedDateEvents.length > 0 ? (
            <ul className="space-y-3">
              {selectedDateEvents.map((event, idx) => (
                <li key={idx} className="flex items-start">
                  <div className={`flex-shrink-0 mt-1 w-3 h-3 rounded-full ${
                    event.completed ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className={`font-medium ${
                        event.completed ? 'text-gray-500 line-through' : 'text-gray-800'
                      }`}>
                        {event.type}
                      </span>
                      {event.time && (
                        <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          {event.time}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{event.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2">No activities scheduled</p>
            </div>
          )}
        </div>

        {/* Add Event Button */}
        <button className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Activity
        </button>
      </div>
    </div>
  );
}