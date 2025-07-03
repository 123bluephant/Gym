// src/hooks/useWorkouts.ts
import { useState, useEffect } from 'react';
import { WorkoutSession } from '../types/types';

const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<WorkoutSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 900));
        
        // Dummy data for last 6 months
        const dummyWorkouts: WorkoutSession[] = [
          // Current month (June)
          {
              id: 'w1',
              memberId: '1',
              trainerId: 't1',
              type: 'Strength',
              date: '2023-06-05T09:00:00',
              duration: 60,
              caloriesBurned: 450,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          {
              id: 'w2',
              memberId: '2',
              trainerId: 't2',
              type: 'Yoga',
              date: '2023-06-07T17:30:00',
              duration: 45,
              caloriesBurned: 250,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          // Add more workouts...
          {
              id: 'w3',
              memberId: '3',
              type: 'Cardio',
              date: '2023-06-10T07:15:00',
              duration: 30,
              caloriesBurned: 300,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          {
              id: 'w4',
              memberId: '1',
              trainerId: 't1',
              type: 'Strength',
              date: '2023-06-12T09:00:00',
              duration: 60,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          // Historical data for charts
          // May
          {
              id: 'w5',
              memberId: '1',
              type: 'Strength',
              date: '2023-05-03T09:00:00',
              duration: 60,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          {
              id: 'w6',
              memberId: '2',
              type: 'Yoga',
              date: '2023-05-05T17:30:00',
              duration: 45,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          // April
          {
              id: 'w7',
              memberId: '1',
              type: 'Cardio',
              date: '2023-04-10T07:15:00',
              duration: 30,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          {
              id: 'w8',
              memberId: '3',
              type: 'Strength',
              date: '2023-04-15T18:00:00',
              duration: 45,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          // March
          {
              id: 'w9',
              memberId: '2',
              type: 'Yoga',
              date: '2023-03-08T17:30:00',
              duration: 45,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          // February
          {
              id: 'w10',
              memberId: '1',
              type: 'Strength',
              date: '2023-02-14T09:00:00',
              duration: 60,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          },
          // January
          {
              id: 'w11',
              memberId: '3',
              type: 'Cardio',
              date: '2023-01-20T07:15:00',
              duration: 30,
              status: 'Completed',
              intensity: 'High',
              createdAt: ''
          }
        ];

        setWorkouts(dummyWorkouts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load workouts');
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return { workouts, loading, error };
};

export default useWorkouts;