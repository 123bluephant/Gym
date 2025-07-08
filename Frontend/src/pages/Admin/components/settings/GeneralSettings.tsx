// components/settings/GeneralSettings.tsx
import { Button } from '../ui/Button';

export const GeneralSettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Gym Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="gym-name" className="block text-sm font-medium text-gray-700">
                Gym Name
              </label>
              <input
                type="text"
                id="gym-name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue="Elite Fitness Center"
              />
            </div>
            <div>
              <label htmlFor="gym-address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="gym-address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue="123 Fitness St, Health City"
              />
            </div>
            <div>
              <label htmlFor="gym-phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="gym-phone"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                defaultValue="(555) 123-4567"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h2>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center">
                <div className="w-24">
                  <label className="block text-sm font-medium text-gray-700">
                    {day}
                  </label>
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="time"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={day === 'Sunday' ? '' : '06:00'}
                  />
                  <span className="flex items-center">to</span>
                  <input
                    type="time"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    defaultValue={day === 'Sunday' ? '' : '22:00'}
                  />
                  {day === 'Sunday' && (
                    <span className="flex items-center text-sm text-gray-500 ml-2">
                      Closed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
};