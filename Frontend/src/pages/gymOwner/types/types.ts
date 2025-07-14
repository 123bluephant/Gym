// src/types.ts

// ====================== BASE TYPES ======================
interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

interface BaseUser extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended' | 'OnLeave';
}

// ====================== MEMBER TYPES ======================
type MembershipTier = 'Basic' | 'Premium' | 'VIP' | 'Elite';
type FitnessGoal = 'Weight Loss' | 'Muscle Gain' | 'Endurance' | 'Flexibility' | 'Rehabilitation' | 'General Fitness';

export interface Member extends BaseUser {
  joinDate: string | number | Date;
  membership: {
    tier: MembershipTier;
    startDate: string;
    endDate?: string;
    autoRenew: boolean;
  };
  demographics?: {
    birthDate?: string;
    gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  };
  metrics?: {
    height?: number; // cm
    weight?: number; // kg
    bodyFatPercentage?: number;
    lastMeasurementDate?: string;
    lastWeightLossDate?: string;
  };
  fitnessGoals?: FitnessGoal[];

  preferences?: {
    preferredWorkoutTypes?: WorkoutType[];
    preferredTime?: 'Morning' | 'Afternoon' | 'Evening';
  };
  assignedTrainerId?: string;
  lastActivity?: {
    date: string;
    type: WorkoutType;
    duration?: number; // minutes
  };
  notes?: string;
}

// ====================== TRAINER TYPES ======================
type Certification = 'NASM' | 'ACE' | 'ISSA' | 'ACSM' | 'NSCA' | 'Other';

export interface Trainer extends BaseUser {
  specialization: WorkoutType[];
  certifications?: {
    type: Certification;
    name: string;
    dateObtained: string;
  }[];
  yearsOfExperience: number;
  experience?: {
    years: number;
    previousEmployment?: string[];
  };
  availability: {
    days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday')[];
    hours: {
      start: string;
      end: string;
    };
  };
  rate: {
    hourly: number;
    session?: number;
  };
  bio?: string;
  languagesSpoken?: string[];
  membersAssigned?: string[]; // member IDs
}

// ====================== WORKOUT TYPES ======================
type WorkoutType = 'Strength' | 'Cardio' | 'Yoga' | 'Pilates' | 'CrossFit' | 'HIIT' | 'Cycling' | 'Boxing' | 'Swimming';
type WorkoutIntensity = 'Low' | 'Moderate' | 'High' | 'Extreme';

export interface WorkoutSession extends BaseEntity {
  memberId: string;
  trainerId?: string;
  type: WorkoutType;
  date: string;
  duration: number; // minutes
  intensity: WorkoutIntensity;
  caloriesBurned?: number;
  notes?: string;
  equipmentUsed?: string[];
  status: 'Completed' | 'Cancelled' | 'No-show' | 'Scheduled' | 'In Progress';
  location?: 'Main Gym' | 'Yoga Studio' | 'Pool' | 'Outdoor';
}

// ====================== PAYMENT TYPES ======================
export type PaymentMethod = 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'PayPal' | 'Crypto';
export type PaymentStatus = 'Pending' | 'Completed' | 'Failed' | 'Refunded' | 'Partially Refunded';

export interface Payment extends BaseEntity {
  date: string | number | Date;
  memberId: string;
  amount: number;
  currency?: string; // ISO currency code
  method: PaymentMethod;
  status: PaymentStatus;
  paymentMethod: 'Credit Card' | 'Debit Card' | 'Cash' | 'Bank Transfer' | 'PayPal' | 'Crypto';
  invoiceNumber?: string;
  description?: string;
  relatedService?: {
    type: 'Membership' | 'Personal Training' | 'Merchandise' | 'Other';
    id?: string;
  };
  billingDetails?: {
    name?: string;
    address?: string;
    taxId?: string;
  };
}

// ====================== DASHBOARD TYPES ======================
export interface StatCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo';
  format?: 'number' | 'currency' | 'percentage';
}

export interface TimeSeriesData {
  date: string; // ISO date or month abbreviation
  value: number;
}

export interface ComparisonData {
  current: number;
  previous: number;
  change: number;
}

export interface MemberGrowthData extends TimeSeriesData {
  newMembers: number;
  churnedMembers: number;
}

export interface RevenueData extends TimeSeriesData {
  subscriptions: number;
  services: number;
  products: number;
}

export interface WorkoutTrendData {
  period: string;
  types: Record<WorkoutType, number>;
}

export interface RecentActivity {
  id: string;
  memberName: string;
  memberId: string;
  activityType: string;
  timestamp: string;
  details?: Record<string, unknown>;
}

// ====================== API RESPONSE TYPES ======================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ====================== FILTER TYPES ======================
export interface MemberFilterParams extends PaginationParams {
  status?: Member['status'][];
  membershipTier?: MembershipTier[];
  joinDateRange?: {
    from?: string;
    to?: string;
  };
  searchQuery?: string;
}

export interface PaymentFilterParams extends PaginationParams {
  status?: PaymentStatus[];
  method?: PaymentMethod[];
  amountRange?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    from?: string;
    to?: string;
  };
}

export interface WorkoutFilterParams extends PaginationParams {
  type?: WorkoutType[];
  intensity?: WorkoutIntensity[];
  dateRange?: {
    from?: string;
    to?: string;
  };
  memberId?: string;
  trainerId?: string;
}

// ====================== FORM TYPES ======================
export interface MemberFormValues {
  name: string;
  email: string;
  phone?: string;
  membershipTier: MembershipTier;
  status: Member['status'];
  fitnessGoals?: FitnessGoal[];
  assignedTrainerId?: string;
  notes?: string;
}

export interface TrainerFormValues {
  name: string;
  email: string;
  phone?: string;
  specialization: WorkoutType[];
  certifications?: Trainer['certifications'];
  availability: Trainer['availability'];
  rate: Trainer['rate'];
  status: 'Available' | 'Unavailable' | 'OnLeave';
  bio?: string;
}

// ====================== CHART TYPES ======================
export interface ChartDataSet {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor?: string;
}

export interface PieChartData {
  id: string;
  label: string;
  value: number;
  color: string;
}

// ====================== AUTH TYPES ======================
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Trainer' | 'Member';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

// ====================== NOTIFICATION TYPES ======================
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}