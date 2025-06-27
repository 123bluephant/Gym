// atoms/userAtom.ts
import { atom } from "recoil";

 interface User {
  [x: string]: string | number;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullName: string;
  gender: string;
  dob: string;
  location: string;
  height: number;
  weight: number;
  role: string;
  fitnessGoals: string[];
  acceptTerms: boolean;
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