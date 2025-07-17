import { Card } from '../ui/Card';

export const StatsCards = () => {
  const stats = [
    { title: 'Total Members', value: '1,254', change: '+12%', trend: 'up' },
    { title: 'Active Members', value: '892', change: '+5%', trend: 'up' },
    { title: 'Monthly Revenue', value: '$24,500', change: '+8%', trend: 'up' },
    { title: 'Classes Today', value: '14', change: '-2', trend: 'down' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className={`mt-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change} from last month
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};