import { create } from "zustand";

const useSaleNotationConversation = create((set) => ({
  selectedNotationConversation: null,
  setSelectNotationConversation: (selectedNotationConversation) =>
    set({ selectedNotationConversation }),
  notationMessage: [],
  setNotationMessage: (notationMessage) => set({ notationMessage }),
}));

export default useSaleNotationConversation;
