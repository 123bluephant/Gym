// components/settings/MembershipSettings.tsx
import { Button } from '../ui/Button';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export const MembershipSettings = () => {
  const membershipPlans = [
    { id: '1', name: 'Basic', price: 49.99, duration: '1 month', description: 'Access to gym facilities during standard hours' },
    { id: '2', name: 'Premium', price: 89.99, duration: '1 month', description: '24/7 access + 2 free classes per month' },
    { id: '3', name: 'Annual Basic', price: 499.99, duration: '1 year', description: 'Basic membership with 15% discount' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Membership Plans</h2>
        <div className="space-y-4">
          {membershipPlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${plan.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{plan.duration}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-red-600 border border-gray-300 rounded-md hover:bg-red-50 flex items-center">
                  <FiTrash2 className="mr-1" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <button className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 flex items-center">
          <FiPlus className="mr-1" /> Add New Membership Plan
        </button>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Methods
            </label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  id="credit-card"
                  name="payment-methods"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="credit-card" className="ml-2 block text-sm text-gray-700">
                  Credit/Debit Cards
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="bank-transfer"
                  name="payment-methods"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="bank-transfer" className="ml-2 block text-sm text-gray-700">
                  Bank Transfer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="cash"
                  name="payment-methods"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  defaultChecked
                />
                <label htmlFor="cash" className="ml-2 block text-sm text-gray-700">
                  Cash
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="invoice-prefix" className="block text-sm font-medium text-gray-700">
              Invoice Prefix
            </label>
            <input
              type="text"
              id="invoice-prefix"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              defaultValue="INV"
            />
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
};