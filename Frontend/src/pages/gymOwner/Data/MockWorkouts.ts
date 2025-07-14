// src/data/mockWorkouts.ts
import { WorkoutPlan } from '../types/gymTypes';

export const mockWorkouts: WorkoutPlan[] = [
  {
    id: '1',
    name: 'Beginner Full Body',
    description: 'A full body workout for beginners focusing on fundamental movements to build strength and endurance.',
    difficulty: 'Beginner',
    duration: 45,
    targetMuscles: ['Full Body', 'Core', 'Legs', 'Arms'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
    exercises: [
      { 
        name: 'Bodyweight Squats', 
        sets: 3, 
        reps: 12, 
        restInterval: 60,
        imageUrl: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=YaXPRqUwItQ',
        notes: 'Keep your back straight and knees behind toes'
      },
      { 
        name: 'Push-ups', 
        sets: 3, 
        reps: 10, 
        restInterval: 60,
        imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
        notes: 'Maintain a straight line from head to heels'
      },
      { 
        name: 'Bent-over Rows', 
        sets: 3, 
        reps: 10, 
        restInterval: 60,
        imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        notes: 'Use dumbbells or resistance bands'
      },
      { 
        name: 'Plank', 
        sets: 3, 
        reps: 30, 
        restInterval: 45,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=B296mZDhrP4',
        notes: 'Hold for 30 seconds each set'
      }
    ],
    createdBy: '1',
    assignedTo: ['1', '2'],
    createdAt: new Date('2023-05-15')
  },
  {
    id: '2',
    name: 'Advanced Chest & Triceps',
    description: 'Intense chest and triceps workout using heavy weights and advanced techniques for muscle growth.',
    difficulty: 'Advanced',
    duration: 60,
    targetMuscles: ['Chest', 'Triceps', 'Shoulders'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=IPSWdwQq8GU',
    exercises: [
      { 
        name: 'Bench Press', 
        sets: 4, 
        reps: 8, 
        restInterval: 90,
        imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=vcBig73ojpE',
        notes: 'Use spotter for heavy sets'
      },
      { 
        name: 'Incline Dumbbell Press', 
        sets: 3, 
        reps: 10, 
        restInterval: 75,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        notes: '45 degree bench angle'
      },
      { 
        name: 'Dips', 
        sets: 3, 
        reps: 12, 
        restInterval: 60,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
        notes: 'Add weight belt for progression'
      },
      { 
        name: 'Skull Crushers', 
        sets: 3, 
        reps: 12, 
        restInterval: 60,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        notes: 'Control the weight carefully'
      },
      { 
        name: 'Cable Flys', 
        sets: 3, 
        reps: 15, 
        restInterval: 45,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o',
        notes: 'Focus on the squeeze at peak contraction'
      }
    ],
    createdBy: '2',
    assignedTo: ['3', '4'],
    createdAt: new Date('2023-06-20')
  },
  {
    id: '3',
    name: 'Leg Day Blast',
    description: 'Intense lower body workout targeting all major leg muscles for strength and hypertrophy.',
    difficulty: 'Intermediate',
    duration: 55,
    targetMuscles: ['Quadriceps', 'Hamstrings', 'Glutes', 'Calves'],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=GvRgijoJ2xY',
    exercises: [
      { 
        name: 'Barbell Squats', 
        sets: 4, 
        reps: 8, 
        restInterval: 90,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=Dy28eq2PjcM',
        notes: 'Go deep but maintain form'
      },
      { 
        name: 'Romanian Deadlifts', 
        sets: 3, 
        reps: 10, 
        restInterval: 75,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        notes: 'Keep back straight, hinge at hips'
      },
      { 
        name: 'Bulgarian Split Squats', 
        sets: 3, 
        reps: 10, 
        restInterval: 60,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
        notes: 'Each leg'
      },
      { 
        name: 'Calf Raises', 
        sets: 4, 
        reps: 15, 
        restInterval: 45,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        notes: 'Full range of motion'
      }
    ],
    createdBy: '3',
    assignedTo: ['5', '6'],
    createdAt: new Date('2023-07-10')
  }
];