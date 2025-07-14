export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: 'Basic' | 'Premium' | 'VIP';
  status: 'Active' | 'Inactive' | 'Suspended';
  trainerId?: string;
  profileImage?: string;
  goals: string[];
  medicalNotes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscles: string[];
  exercises: Exercise[];
  createdBy: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // "8-12" or "30 seconds"
  weight?: string;
  restTime: number; // in seconds
  instructions: string;
  muscleGroup: string;
}

export interface Diet {
  id: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  meals: Meal[];
  dietType: 'Weight Loss' | 'Muscle Gain' | 'Maintenance' | 'Cutting';
  createdBy: string;
  createdAt: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
}

export interface Food {
  id: string;
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  phone: string;
  specializations: string[];
  experience: number; // in years
  rating: number;
  profileImage?: string;
  bio: string;
  clients: string[]; // user IDs
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTrainers: number;
  monthlyRevenue: number;
  newMembersThisMonth: number;
  totalWorkouts: number;
  totalDietPlans: number;
}

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}