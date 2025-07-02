// src/types/gymTypes.ts
export interface User {
  [x: string]: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  membershipType: 'Basic' | 'Premium' | 'VIP';
  status: 'Active' | 'Inactive' | 'Pending';
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  specialization: string[];
  experience: number;
  clients: number;
  rating: number;
  status: 'Available' | 'Busy' | 'On Leave' | 'Booked';
}

export interface Meal {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description: string;
  ingredients: string[];
}

export interface GymStats {
  totalMembers: number;
  activeTrainers: number;
  monthlyRevenue: number;
  newSignups: number;
  memberGrowth: { date: string; count: number }[];
  revenueTrend: { month: string; revenue: number }[];
}
export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restInterval: number; // in seconds
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  targetMuscles: string[];
  exercises: Exercise[];
  createdBy: string; // trainer ID
  assignedTo: string[]; // user IDs
  createdAt: Date;
}
export interface Gym {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  rating: number;
  totalMembers: number;
  featuredFacilities: string[];
  membershipPlans: {
    name: string;
    price: number;
    features: string[];
  }[];
}