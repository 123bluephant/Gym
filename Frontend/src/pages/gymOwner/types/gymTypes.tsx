// src/types/gymTypes.ts
export interface Meal {
  id: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealSummary {
  todayCalories: number;
  todayMeals: number;
  lastMealDate?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  membershipType: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  lastCheckIn?: string;
  mealSummary?: MealSummary;
  meals?: Meal[];
}

export interface Trainer {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
  experience: number;
  rating: number;
  clients: number;
  status: string;
  specialization: string[];
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  date: string;
  fats: number;
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
  imageUrl: string;
  videoUrl: string | number | readonly string[] | undefined;
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
  createdBy: string; // trainer ID
  assignedTo: string[]; // user IDs
  createdAt: Date;
  imageUrl?: string;
  videoUrl?: string;
  exercises: Array<Exercise & {
    imageUrl?: string;
    videoUrl?: string;
  }>;
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
// src/types/gymTypes.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'supplements' | 'equipment' | 'clothing' | 'membership';
  stock: number;
  imageUrl: string;
  isFeatured: boolean;
  discount?: {
    type: 'percentage' | 'fixed';
    amount: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
export type ProductCategory = 'supplements' | 'equipment' | 'clothing' | 'membership';

export type DiscountType = 'percentage' | 'fixed';

export interface Discount {
  type: DiscountType;
  amount: number;
}