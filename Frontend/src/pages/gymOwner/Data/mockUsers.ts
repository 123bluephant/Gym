// src/Data/mockUsers.ts
import { User } from '../types/gymTypes';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0101',
    joinDate: '2023-01-15',
    membershipType: 'Premium',
    status: 'Active',
    lastCheckIn: '2023-06-20'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '555-0102',
    joinDate: '2023-02-10',
    membershipType: 'VIP',
    status: 'Active',
    lastCheckIn: '2023-06-21'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    phone: '555-0103',
    joinDate: '2023-03-05',
    membershipType: 'Basic',
    status: 'Pending',
    lastCheckIn: '2023-06-15'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '555-0104',
    joinDate: '2023-04-12',
    membershipType: 'Premium',
    status: 'Active',
    lastCheckIn: '2023-06-18'
  },
  {
    id: '5',
    name: 'Mike Brown',
    email: 'mike@example.com',
    phone: '555-0105',
    joinDate: '2023-05-20',
    membershipType: 'VIP',
    status: 'Inactive',
    lastCheckIn: '2023-05-28'
  }
];