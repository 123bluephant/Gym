import { Trainer } from '../types/gymTypes';

export const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    experience: 5,
    rating: 4.8,
    clients: 32,
    status: 'Available',
    specialization: ['Strength Training', 'Weight Loss', 'Nutrition'],
    bio: 'Certified personal trainer with 5 years of experience helping clients achieve their fitness goals. Specializes in strength training and weight management.',
    createdAt: new Date('2022-01-15'),
  },
  {
    id: '2',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    experience: 8,
    rating: 4.9,
    clients: 45,
    status: 'Busy',
    specialization: ['Yoga', 'Pilates', 'Rehabilitation'],
    bio: 'Experienced yoga and pilates instructor with a focus on rehabilitation and mobility. Helps clients recover from injuries and improve flexibility.',
    createdAt: new Date('2021-05-20'),
  },
  // Add more trainers as needed
];