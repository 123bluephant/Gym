import React, { createContext, useContext, ReactNode } from 'react';
import { User, Workout, Diet, Trainer, DashboardStats } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  users: User[];
  workouts: Workout[];
  diets: Diet[];
  trainers: Trainer[];
  dashboardStats: DashboardStats;
  currentView: string;
  setCurrentView: (view: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  addDiet: (diet: Omit<Diet, 'id'>) => void;
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  assignTrainer: (userId: string, trainerId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    joinDate: '2024-01-15',
    membershipType: 'Premium',
    status: 'Active',
    trainerId: '1',
    goals: ['Weight Loss', 'Muscle Building'],
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1234567891',
    joinDate: '2024-02-20',
    membershipType: 'Basic',
    status: 'Active',
    goals: ['Cardio', 'Flexibility'],
  },
];

const mockTrainers: Trainer[] = [
  {
    id: '1',
    name: 'Mike Wilson',
    email: 'mike@gym.com',
    phone: '+1234567892',
    specializations: ['Weight Training', 'Nutrition'],
    experience: 5,
    rating: 4.8,
    bio: 'Certified personal trainer with 5 years of experience.',
    clients: ['1'],
  },
  {
    id: '2',
    name: 'Lisa Chen',
    email: 'lisa@gym.com',
    phone: '+1234567893',
    specializations: ['Yoga', 'Pilates', 'Flexibility'],
    experience: 3,
    rating: 4.9,
    bio: 'Yoga instructor and flexibility specialist.',
    clients: [],
  },
];

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Full Body Beginner',
    description: 'A comprehensive full-body workout for beginners',
    duration: 45,
    difficulty: 'Beginner',
    targetMuscles: ['Full Body'],
    exercises: [
      {
        id: '1',
        name: 'Push-ups',
        sets: 3,
        reps: '8-12',
        restTime: 60,
        instructions: 'Keep your body straight and lower yourself slowly.',
        muscleGroup: 'Chest',
      },
    ],
    createdBy: 'Admin',
    createdAt: '2024-01-01',
  },
];

const mockDiets: Diet[] = [
  {
    id: '1',
    name: 'Weight Loss Plan',
    description: 'A balanced diet plan for healthy weight loss',
    calories: 1800,
    protein: 120,
    carbs: 180,
    fats: 60,
    meals: [],
    dietType: 'Weight Loss',
    createdBy: 'Admin',
    createdAt: '2024-01-01',
  },
];

const mockStats: DashboardStats = {
  totalUsers: 2,
  activeUsers: 2,
  totalTrainers: 2,
  monthlyRevenue: 5200,
  newMembersThisMonth: 12,
  totalWorkouts: 1,
  totalDietPlans: 1,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('gym-users', mockUsers);
  const [workouts, setWorkouts] = useLocalStorage<Workout[]>('gym-workouts', mockWorkouts);
  const [diets, setDiets] = useLocalStorage<Diet[]>('gym-diets', mockDiets);
  const [trainers, setTrainers] = useLocalStorage<Trainer[]>('gym-trainers', mockTrainers);
  const [currentView, setCurrentView] = useLocalStorage<string>('current-view', 'dashboard');

  const dashboardStats: DashboardStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    totalTrainers: trainers.length,
    monthlyRevenue: users.length * 50, // Mock calculation
    newMembersThisMonth: Math.floor(users.length * 0.3),
    totalWorkouts: workouts.length,
    totalDietPlans: diets.length,
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    setUsers([...users, newUser]);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(users.map(user => user.id === id ? { ...user, ...updates } : user));
  };

  const addWorkout = (workoutData: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workoutData,
      id: Date.now().toString(),
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const addDiet = (dietData: Omit<Diet, 'id'>) => {
    const newDiet: Diet = {
      ...dietData,
      id: Date.now().toString(),
    };
    setDiets([...diets, newDiet]);
  };

  const addTrainer = (trainerData: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = {
      ...trainerData,
      id: Date.now().toString(),
    };
    setTrainers([...trainers, newTrainer]);
  };

  const assignTrainer = (userId: string, trainerId: string) => {
    updateUser(userId, { trainerId });
    setTrainers(trainers.map(trainer => 
      trainer.id === trainerId 
        ? { ...trainer, clients: [...trainer.clients, userId] }
        : trainer
    ));
  };

  return (
    <AppContext.Provider value={{
      users,
      workouts,
      diets,
      trainers,
      dashboardStats,
      currentView,
      setCurrentView,
      addUser,
      updateUser,
      addWorkout,
      addDiet,
      addTrainer,
      assignTrainer,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};