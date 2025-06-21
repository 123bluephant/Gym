// src/types/auth.ts

// Base user interface
export interface User {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
  location?: string;
  fitnessGoals?: string[];
  membershipPlan?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Login form data
export interface AuthFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// Signup form data
export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  location: string;
  fitnessGoals: string[]; // Changed to required array
  membershipPlan: string;
  acceptTerms: boolean; // Changed to required
}

// API response structure
export interface AuthResponse {
  user: User;
  token: string;
  expiresIn?: number;
}

// Error response structure
export interface AuthError {
  message: string;
  code?: string;
  field?: string;
}

// Password reset types
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Social login providers
export type AuthProvider = 'google' | 'facebook' | 'apple';

// User session data
export interface UserSession {
  user: User;
  expires: Date;
}

// Form steps for multi-step forms
export type SignupStep = 'account' | 'preferences' | 'membership';

// Fitness goal options
export const FITNESS_GOALS = [
  'Weight Loss',
  'Muscle Building',
  'General Fitness',
  'Athletic Training',
  'Rehabilitation'
] as const;

export type FitnessGoal = typeof FITNESS_GOALS[number];

// Membership plan options
export const MEMBERSHIP_PLANS = [
  'basic',
  'standard',
  'premium'
] as const;

export type MembershipPlan = typeof MEMBERSHIP_PLANS[number];