// components/reports/ClassAttendanceChart.tsx
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ClassAttendanceChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Class Attendance',
      },
    },
  };

  const labels = ['Yoga', 'HIIT', 'Zumba', 'Spin', 'Pilates', 'Boxing'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Average Attendance',
        data: [25, 20, 30, 22, 18, 15],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
      },
      {
        label: 'Capacity',
        data: [30, 25, 35, 25, 20, 20],
        backgroundColor: 'rgba(209, 213, 219, 0.8)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Class Attendance</h2>
        <div className="flex space-x-2">
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:border-indigo-500 focus:outline-none">
            <option>Last Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
          </select>
          <select className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:border-indigo-500 focus:outline-none">
            <option>All Instructors</option>
            <option>Sarah Johnson</option>
            <option>Mike Smith</option>
          </select>
        </div>
      </div>
      
      <Bar options={options} data={data} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Most Popular Class</h3>
          <p className="mt-1 text-xl font-semibold text-gray-900">Zumba</p>
          <p className="mt-1 text-sm text-gray-500">86% average attendance</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Total Classes</h3>
          <p className="mt-1 text-xl font-semibold text-gray-900">124</p>
          <p className="mt-1 text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500">Avg. Attendance Rate</h3>
          <p className="mt-1 text-xl font-semibold text-gray-900">78%</p>
          <p className="mt-1 text-sm text-gray-500">+5% from last month</p>
        </div>
      </div>
    </div>
  );
};