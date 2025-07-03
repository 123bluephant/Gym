export interface Gym {
  membership_plans: any;
  amenities: any;
  contact: any;
  id: string;
  name: string;
  address: string;
  distance?: number;
  rating: number;
  open_now: boolean;
  photo_url?: string;
  description?: string;
  equipment: string[];
  hours?: string;
}

export interface Location {
  lat: number;
  lng: number;
}