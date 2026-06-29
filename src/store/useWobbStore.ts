import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary, Platform } from "@/types";

interface ListProfile extends UserProfileSummary {
  platform: Platform;
}

interface WobbStore {
  selectedList: ListProfile[];
  addToList: (profile: UserProfileSummary, platform: Platform) => void;
  removeFromList: (username: string) => void;
}

const useWobbStore = create<WobbStore>()(
  persist(
    (set) => ({
      selectedList: [],
      addToList: (profile, platform) =>
        set((state) => ({
          selectedList: state.selectedList.find(
            (p) => p.username === profile.username
          )
            ? state.selectedList
            : [...state.selectedList, { ...profile, platform }],
        })),
      removeFromList: (username) =>
        set((state) => ({
          selectedList: state.selectedList.filter(
            (p) => p.username !== username
          ),
        })),
    }),
    { name: "wobb-list" }
  )
);

export default useWobbStore;