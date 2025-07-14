// atoms/userAtom.ts
import { atom } from "recoil";

 interface User {
  [x: string]: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  gender: string;
  phone: string;
  gymName: string;
  location: string;
  height: number;
  weight: number;
  dob: string;
  location: string;
  fitnessGoals: string[];
  acceptTerms: boolean;
  role: string
}

const userAtom = atom<User | null>({
  key: 'user',  
  default: (() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  })()
});

export default userAtom;