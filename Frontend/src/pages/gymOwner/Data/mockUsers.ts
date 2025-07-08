// src/Data/mockUsers.ts
import { User } from '../types/gymTypes';

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    membershipType: "Premium",
    status: "Active",
    joinDate: "2023-01-15",
    lastCheckIn: "2023-06-20",
    meals: [
      {
        id: "101",
        date: new Date().toISOString().split('T')[0], // Today's date
        mealType: "Breakfast",
        description: "Oatmeal with fruits",
        calories: 350,
        protein: 12,
        carbs: 60,
        fats: 8,
        name: '',
        category: 'Breakfast',
        fat: 0,
        ingredients: []
      },
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    joinDate: '2023-02-10',
    membershipType: 'VIP',
    status: 'Active',
    lastCheckIn: '2023-06-21'
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: '2023-03-05',
    membershipType: 'Basic',
    status: 'Pending',
    lastCheckIn: '2023-06-15'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    joinDate: '2023-04-12',
    membershipType: 'Premium',
    status: 'Active',
    lastCheckIn: '2023-06-18'
  },
  {
    id: '5',
    name: 'Mike Brown',
    email: 'mike@example.com',
    joinDate: '2023-05-20',
    membershipType: 'VIP',
    status: 'Inactive',
    lastCheckIn: '2023-05-28'
  }
];