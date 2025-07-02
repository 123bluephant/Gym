// atoms/consumedFoodAtom.ts
import { atom } from "recoil";

const consumedFoodAtom = atom<any>({
  key: 'consumedFood',  
  default: []
});

export default consumedFoodAtom;