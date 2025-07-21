import React from 'react';
import { UserPlus, Calendar, Send } from 'lucide-react';

const QuickActions: React.FC = () => {
  const handleAddMember = () => {
    alert('Add New Member functionality would open a modal or navigate to member creation form');
  };

  const handleScheduleClass = () => {
    alert('Schedule Class functionality would open class scheduling interface');
  };

  const handleSendNotification = () => {
    alert('Send Notification functionality would open notification composer');
  };

  const actions = [
    {
      icon: UserPlus,
      label: 'Add New Member',
      color: 'bg-purple-600 hover:bg-purple-700',
      onClick: handleAddMember
    },
    {
      icon: Calendar,
      label: 'Schedule Class',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
      onClick: handleScheduleClass
    },
    {
      icon: Send,
      label: 'Send Notification',
      color: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
      onClick: handleSendNotification
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${action.color} ${
              index === 0 ? 'text-white' : ''
            }`}
          >
            <action.icon className="w-5 h-5" />
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;