// src/hooks/usePayments.ts
import { useState, useEffect } from 'react';
import { Payment, PaymentMethod, PaymentStatus } from '../types/types';


const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Dummy data for last 6 months
        const dummyPayments: Payment[] = [
          {
              id: 'p1',
              memberId: '1',
              amount: 120,
              date: '2023-06-01',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              invoiceNumber: 'INV-2023-06-001',
              description: 'Monthly membership fee',
              method: 'Credit Card',
              createdAt: ''
          },
          {
              id: 'p2',
              memberId: '2',
              amount: 150,
              date: '2023-06-01',
              paymentMethod: 'Bank Transfer',
              status: 'Completed',
              invoiceNumber: 'INV-2023-06-002',
              description: 'VIP membership fee',
              method: 'Credit Card',
              createdAt: ''
          },
          // Add more payments...
          {
              id: 'p3',
              memberId: '3',
              amount: 80,
              date: '2023-06-05',
              paymentMethod: 'Debit Card',
              status: 'Completed',
              description: 'Basic membership fee',
              method: 'Credit Card',
              createdAt: ''
          },
          {
              id: 'p4',
              memberId: '1',
              amount: 70,
              date: '2023-05-01',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              description: 'Personal training session',
              method: 'Credit Card',
              createdAt: ''
          },
          {
              id: 'p5',
              memberId: '4',
              amount: 120,
              date: '2023-05-01',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              description: 'Monthly membership fee',
              method: 'Credit Card',
              createdAt: ''
          },
          // Historical data for charts
          {
              id: 'p6',
              memberId: '1',
              amount: 120,
              date: '2023-01-01',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              method: 'Credit Card',
              createdAt: ''
          },
          {
              id: 'p7',
              memberId: '2',
              amount: 150,
              date: '2023-02-01',
              paymentMethod: 'Bank Transfer',
              status: 'Completed',
              method: 'Credit Card',
              createdAt: ''
          },
          {
              id: 'p8',
              memberId: '3',
              amount: 80,
              date: '2023-03-05',
              paymentMethod: 'Debit Card',
              status: 'Completed',
              method: 'Credit Card',
              createdAt: ''
          },
          {
              id: 'p9',
              memberId: '1',
              amount: 70,
              date: '2023-04-01',
              paymentMethod: 'Credit Card',
              status: 'Completed',
              method: 'Credit Card',
              createdAt: ''
          }
        ];

        setPayments(dummyPayments);
        setLoading(false);
      } catch (err) {
        setError('Failed to load payments');
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return { payments, loading, error };
};

export default usePayments;