import React from 'react';

interface Activity {
  id: string;
  user: string;
  action: string;
  time: string;
  avatar: string;
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Renewed membership',
      time: '2 hours ago',
      avatar: 'J'
    },
    {
      id: '2',
      user: 'Sarah Smith',
      action: 'Checked in for Yoga class',
      time: '3 hours ago',
      avatar: 'S'
    },
    {
      id: '3',
      user: 'Mike Johnson',
      action: 'Purchased protein shakes',
      time: '5 hours ago',
      avatar: 'M'
    },
    {
      id: '4',
      user: 'Emily Wilson',
      action: 'Signed up for personal training',
      time: '1 day ago',
      avatar: 'E'
    },
    {
      id: '5',
      user: 'David Brown',
      action: 'Updated payment method',
      time: '1 day ago',
      avatar: 'D'
    }
  ];

  const getAvatarColor = (avatar: string) => {
    const colors = {
      'J': 'bg-blue-500',
      'S': 'bg-green-500',
      'M': 'bg-purple-500',
      'E': 'bg-pink-500',
      'D': 'bg-orange-500'
    };
    return colors[avatar as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${getAvatarColor(activity.avatar)} flex items-center justify-center text-white font-medium`}>
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.user}</p>
              <p className="text-sm text-gray-500">{activity.action}</p>
            </div>
            <div className="text-xs text-gray-400">
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;