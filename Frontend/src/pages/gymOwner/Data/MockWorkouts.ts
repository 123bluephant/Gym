// src/data/mockWorkouts.ts
import { WorkoutPlan } from '../types/gymTypes';

export const mockWorkouts: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Beginner Full Body',
    description: 'A full body workout for beginners',
    difficulty: 'Beginner',
    duration: 45,
    targetMuscles: ['Full Body'],
    exercises: [
      { name: 'Bodyweight Squats', sets: 3, reps: 12, restInterval: 60 },
      { name: 'Push-ups', sets: 3, reps: 10, restInterval: 60 },
      { name: 'Bent-over Rows', sets: 3, reps: 10, restInterval: 60 },
      { name: 'Plank', sets: 3, reps: 30, restInterval: 45 }
    ],
    createdBy: '1',
    assignedTo: ['1', '2'],
    createdAt: new Date('2023-05-15')
  },
  {
    id: '2',
    name: 'Advanced Chest & Triceps',
    description: 'Intense chest and triceps workout',
    difficulty: 'Advanced',
    duration: 60,
    targetMuscles: ['Chest', 'Triceps'],
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 8, restInterval: 90 },
      { name: 'Incline Dumbbell Press', sets: 3, reps: 10, restInterval: 75 },
      { name: 'Dips', sets: 3, reps: 12, restInterval: 60 },
      { name: 'Skull Crushers', sets: 3, reps: 12, restInterval: 60 },
      { name: 'Cable Flys', sets: 3, reps: 15, restInterval: 45 }
    ],
    createdBy: '2',
    assignedTo: ['3', '4'],
    createdAt: new Date('2023-06-20')
  }
];