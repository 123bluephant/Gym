// atoms/userAtom.ts
import { atom } from "recoil";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
}

const userAtom = atom<User | null>({
  key: 'user',  // This key must be unique across your entire application
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