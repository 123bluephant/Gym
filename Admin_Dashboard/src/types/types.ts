export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: string;
  joinDate: string;
  status: 'active' | 'expired' | 'pending';
}

export interface Class {
  id: string;
  name: string;
  instructor: string;
  time: string;
  capacity: number;
  booked: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}