export interface Location {
  lat: number;
  lng: number;
}

export interface MembershipPlan {
  name: string;
  price: number;
  features: string[];
}

export interface Contact {
  phone: string;
  email: string;
}

export interface Gym {
  id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  open_now: boolean;
  photo_url: string;
  equipment: string[];
  hours: string;
  description: string;
  membership_plans: MembershipPlan[];
  amenities: string[];
  contact: Contact;
}