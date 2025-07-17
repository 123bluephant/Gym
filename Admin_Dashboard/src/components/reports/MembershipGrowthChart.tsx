// components/reports/MembershipGrowthChart.tsx
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MembershipGrowthChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Membership Growth',
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const data = {
    labels,
    datasets: [
      {
        label: 'New Members',
        data: [12, 19, 15, 22, 18, 25, 30],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
      {
        label: 'Total Active Members',
        data: [800, 820, 835, 850, 865, 890, 920],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Membership Growth</h2>
        <div className="flex space-x-2">
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:border-indigo-500 focus:outline-none">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>Custom Range</option>
          </select>
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:border-indigo-500 focus:outline-none">
            <option>All Membership Types</option>
            <option>Premium</option>
            <option>Basic</option>
          </select>
        </div>
      </div>
      
      <Line options={options} data={data} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Members</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">920</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">New This Month</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">30</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Retention Rate</h3>
          <p className="mt-1 text-2xl font-semibold text-gray-900">87%</p>
        </div>
      </div>
    </div>
  );
};