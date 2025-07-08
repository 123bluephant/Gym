// components/payments/PaymentsTable.tsx
import { FiEdit, FiEye, FiPrinter } from 'react-icons/fi';

type Payment = {
  id: string;
  member: string;
  type: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  invoice: string;
};

export const PaymentsTable = () => {
  const payments: Payment[] = [
    {
      id: '1',
      member: 'John Doe',
      type: 'Membership',
      amount: 89.99,
      date: '2023-06-15',
      status: 'completed',
      invoice: 'INV-2023-001'
    },
    {
      id: '2',
      member: 'Jane Smith',
      type: 'Personal Training',
      amount: 120.00,
      date: '2023-06-14',
      status: 'pending',
      invoice: 'INV-2023-002'
    },
    {
      id: '3',
      member: 'Mike Johnson',
      type: 'Membership',
      amount: 89.99,
      date: '2023-06-10',
      status: 'completed',
      invoice: 'INV-2023-003'
    },
    {
      id: '4',
      member: 'Sarah Williams',
      type: 'Late Fee',
      amount: 15.00,
      date: '2023-06-05',
      status: 'failed',
      invoice: 'INV-2023-004'
    },
  ];

  const statusColors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {payment.member}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${payment.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[payment.status]}`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {payment.invoice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                  <FiEye />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <FiPrinter />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};