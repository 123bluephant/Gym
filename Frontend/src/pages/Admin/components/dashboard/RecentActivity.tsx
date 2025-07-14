import { Card } from '../ui/Card';

export const RecentActivity = () => {
  const activities = [
    { id: 1, member: 'John Doe', action: 'Renewed membership', time: '2 hours ago' },
    { id: 2, member: 'Sarah Smith', action: 'Checked in for Yoga class', time: '3 hours ago' },
    { id: 3, member: 'Mike Johnson', action: 'Purchased protein shakes', time: '5 hours ago' },
    { id: 4, member: 'Emily Wilson', action: 'Signed up for personal training', time: '1 day ago' },
    { id: 5, member: 'David Brown', action: 'Updated payment method', time: '1 day ago' },
  ];

  return (
    <Card>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {activity.member.charAt(0)}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{activity.member}</p>
                <p className="text-sm text-gray-500">{activity.action}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};