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
  reorderList: (activeId: string, overId: string) => void;
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
      reorderList: (activeId, overId) =>
        set((state) => {
          const oldIndex = state.selectedList.findIndex((p) => p.username === activeId);
          const newIndex = state.selectedList.findIndex((p) => p.username === overId);
          if (oldIndex === -1 || newIndex === -1) return state;
          
          const newList = [...state.selectedList];
          const [movedItem] = newList.splice(oldIndex, 1);
          newList.splice(newIndex, 0, movedItem);
          return { selectedList: newList };
        }),
    }),
    { name: "wobb-list" }
  )
);

export default useWobbStore;