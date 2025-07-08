// pages/Settings.tsx
import { Card } from '../components/ui/Card';
import { FiSettings, FiCreditCard, FiUser, FiLock } from 'react-icons/fi';
import { GeneralSettings } from '../components/settings/GeneralSettings';
import { MembershipSettings } from '../components/settings/MembershipSettings';
import { useState } from 'react';

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('general')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'general' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiSettings className="inline mr-2" />
            General
          </button>
          <button
            onClick={() => setActiveTab('memberships')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'memberships' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiCreditCard className="inline mr-2" />
            Memberships
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'staff' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiUser className="inline mr-2" />
            Staff Permissions
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'security' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          >
            <FiLock className="inline mr-2" />
            Security
          </button>
        </nav>
      </div>

      <Card>
        <div className="p-4">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'memberships' && <MembershipSettings />}
          {activeTab === 'staff' && <div>Staff permissions settings</div>}
          {activeTab === 'security' && <div>Security settings</div>}
        </div>
      </Card>
    </div>
  );
};