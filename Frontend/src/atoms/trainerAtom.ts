import { atom } from "recoil";

export interface TrainerType {
  _id: string;
  image: string;
  fullName: string;
  email: string;
  experience: number;
  currentClients: number;
  rating: number;
  status: "Available" | "Unavailable";
  specializations: string[];
  bio: string;
  gymOwner: string;
  createdAt: string;
  updatedAt: string;
}

export const trainerAtom = atom<TrainerType>({
  key: "trainerAtom",
  default: {
    _id: "",
    image: "",
    fullName: "",
    email: "",
    experience: 0,
    currentClients: 0,
    rating: 0,
    status: "Available",
    specializations: [],
    bio: "",
    gymOwner: "",
    createdAt: "",
    updatedAt: "",
  },
});

export const trainerListAtom = atom<TrainerType[]>({
  key: "trainerListAtom",
  default: [],
});
