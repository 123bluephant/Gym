// src/types/gymTypes.ts

import { ReactNode } from "react";

// Core User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipType: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Expired' | 'Cancelled';
  joinDate: string;
  lastCheckIn?: string;
  notes?: string;
  visits?: string[];
  mealSummary?: MealSummary;
  meals?: Meal[];
  trainerId?: string; // Reference to assigned trainer
}

export interface Trainer {
  specialization: any;
  id: string;
  name: string;
  email: string;
  phone?: string;
  imageUrl?: string;
  experience: number; // in years
  rating: number; // 1-5
  clients: number;
  status: 'Active' | 'On Leave' | 'Inactive'|'Available';
  specializations: string[];
  bio?: string;
  certifications?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Nutrition Types
export interface Meal {
  category: any;
  prepTime: string;
  fat: ReactNode;
  instructions: any;
  id: string;
  userId: string; // Reference to user
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  imageUrl?: string;
  notes?: string;
}

export interface MealSummary {
  todayCalories: number;
  todayMeals: number;
  lastMealDate?: string;
  macros?: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

// Workout Types
export interface Exercise {
  sets: string | number | readonly string[] | undefined;
  reps: string | number | readonly string[] | undefined;
  restInterval: string | number | readonly string[] | undefined;
  notes: string;
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  equipment?: string;
  imageUrl?: string;
  videoUrl?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface WorkoutExercise extends Exercise {
  sets: number;
  reps: number | string; // Could be "8-12" for range
  restInterval: number; // in seconds
  notes?: string;
  completed?: boolean;
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
  updatedAt: Date;
  imageUrl?: string;
  videoUrl?: string;
  exercises: WorkoutExercise[];
}

// Gym Management Types
export interface Gym {
  id: string;
  name: string;
  location: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  imageUrl: string;
  rating: number;
  totalMembers: number;
  facilities: string[];
  operatingHours: {
    day: string;
    open: string;
    close: string;
  }[];
  membershipPlans: MembershipPlan[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
  isFeatured?: boolean;
  discount?: Discount;
}

// Product Types
export type ProductCategory = 'supplements' | 'equipment' | 'clothing' | 'membership' | 'other';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  imageUrl: string;
  isFeatured: boolean;
  discount?: Discount;
  createdAt: Date;
  updatedAt: Date;
  specifications?: Record<string, string>;
}

export type DiscountType = 'percentage' | 'fixed';

export interface Discount {
  type: DiscountType;
  amount: number;
  validUntil?: Date;
  code?: string;
}

// Analytics Types
export interface GymStats {
  totalMembers: number;
  activeMembers: number;
  activeTrainers: number;
  monthlyRevenue: number;
  newSignups: number;
  memberGrowth: { date: string; count: number }[];
  revenueTrend: { month: string; revenue: number }[];
  attendanceTrend: { date: string; count: number }[];
  popularClasses?: { name: string; attendance: number }[];
}

// Event/Class Types
export interface GymClass {
  id: string;
  name: string;
  description: string;
  trainerId: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    recurring: boolean;
  };
  maxParticipants: number;
  currentParticipants: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Yoga' | 'HIIT' | 'Strength' | 'Cardio' | 'Other';
  imageUrl?: string;
  price?: number;
}

// Payment Types
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  date: Date;
  type: 'membership' | 'product' | 'class' | 'other';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  invoiceUrl?: string;
  paymentMethod: string;
}