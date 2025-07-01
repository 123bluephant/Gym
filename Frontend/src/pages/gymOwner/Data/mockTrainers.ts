// src/Data/mockTrainers.ts
import { Trainer } from '../types/gymTypes';

export const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    specialization: ['Weight Loss', 'Yoga'],
    experience: 5,
    clients: 12,
    rating: 4.8,
    status: 'Available'
  },
  {
    id: '2',
    name: 'Mike Thompson',
    email: 'mike@example.com',
    specialization: ['Strength Training', 'Bodybuilding'],
    experience: 8,
    clients: 18,
    rating: 4.9,
    status: 'Available'
  },
  {
    id: '3',
    name: 'Emily Chen',
    email: 'emily@example.com',
    specialization: ['Pilates', 'Posture Correction'],
    experience: 6,
    clients: 15,
    rating: 4.7,
    status: 'On Leave'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@example.com',
    specialization: ['CrossFit', 'Functional Training'],
    experience: 7,
    clients: 20,
    rating: 4.8,
    status: 'Busy'
  },
  {
    id: '5',
    name: 'Jessica Martinez',
    email: 'jessica@example.com',
    specialization: ['HIIT', 'Cardio'],
    experience: 4,
    clients: 10,
    rating: 4.6,
    status: 'Available'
  }
];