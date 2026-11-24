import { create } from "zustand";

const INITIAL_STAR_COUNT = 2400;

interface UserStarState {
  starCount: number;
  setStarCount: (starCount: number) => void;
  addStars: (amount: number) => void;
  spendStars: (amount: number) => boolean;
}

export const useUserStarStore = create<UserStarState>((set, get) => ({
  starCount: INITIAL_STAR_COUNT,
  setStarCount: (starCount) => set({ starCount }),
  addStars: (amount) => set({ starCount: get().starCount + amount }),
  spendStars: (amount) => {
    const { starCount } = get();

    if (starCount < amount) return false;

    set({ starCount: starCount - amount });
    return true;
  },
}));
