import { NewNote } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftState = {
  draft: NewNote;
  setDraft: (newData: NewNote) => void;
  clearDraft: () => void;
};
export const useNoteDraft = create<NoteDraftState>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (newData) => set(() => ({ draft: newData })),
        clearDraft: () => set(() => ({ draft: initialDraft })),
      };
    },
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
