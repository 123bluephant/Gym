// components/payments/RevenueChart.tsx
import { Card } from '../ui/Card';
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

export const RevenueChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Revenue',
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Memberships',
        data: [3200, 3500, 4200, 3800, 4500, 4800, 5000],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
      },
      {
        label: 'Personal Training',
        data: [1200, 1500, 1800, 2000, 2200, 2500, 2800],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Merchandise',
        data: [500, 600, 700, 650, 800, 900, 1000],
        backgroundColor: 'rgba(129, 140, 248, 0.8)',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">$24,500</p>
            <p className="mt-1 text-sm text-green-600">+12% from last month</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Active Memberships</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">892</p>
            <p className="mt-1 text-sm text-green-600">+5% from last month</p>
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Avg. Revenue per Member</h3>
            <p className="mt-1 text-2xl font-semibold text-gray-900">$89.50</p>
            <p className="mt-1 text-sm text-green-600">+3% from last month</p>
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="p-4">
          <Bar options={options} data={data} />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue by Membership Type</h3>
            {/* Pie chart would go here */}
          </div>
        </Card>
        <Card>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Methods</h3>
            {/* Payment methods breakdown would go here */}
          </div>
        </Card>
      </div>
    </div>
  );
};