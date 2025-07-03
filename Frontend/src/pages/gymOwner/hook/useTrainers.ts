// src/hooks/useTrainers.ts
import { useState, useEffect } from 'react';
import { Trainer } from '../types/types';

const useTrainers = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Dummy data
        const dummyTrainers: Trainer[] = [
          {
            id: 't1',
            name: 'Alex Rodriguez',
            email: 'alex@example.com',
            phone: '555-1111',
            joinDate: '2022-01-10',
            status: 'Available',
            specialization: ["Strength" , "Cardio" ],
            certification: 'NASM Certified',
            yearsOfExperience: 8,
            hourlyRate: 70,
            availableDays: ['Monday', 'Wednesday', 'Friday'],
            bio: 'Specialized in strength training and bodybuilding programs'
          },
          {
            id: 't2',
            name: 'Emily Chen',
            email: 'emily@example.com',
            phone: '555-2222',
            joinDate: '2022-03-15',
            status: 'Active',
            specialization: ['Yoga', 'Pilates'],
            certification: 'RYT 500',
            yearsOfExperience: 5,
            hourlyRate: 60,
            availableDays: ['Tuesday', 'Thursday', 'Saturday'],
            bio: 'Yoga and mindfulness expert'
          },
          {
            id: 't3',
            name: 'Marcus Johnson',
            email: 'marcus@example.com',
            joinDate: '2023-01-05',
            status: 'OnLeave',
            specialization: ['CrossFit'],
            yearsOfExperience: 4,
            hourlyRate: 65,
            availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
            bio: 'CrossFit Level 2 Trainer'
          }
        ];

        setTrainers(dummyTrainers);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trainers');
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return { trainers, loading, error };
};

export default useTrainers;