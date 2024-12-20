import { create } from "zustand";

const useSaleNotation = create((set) => ({
  conversations: [], // All conversations fetched
  selectedConversation: null, // Currently selected conversation
  messages: [], // Messages related to the selected conversation

  // Setter for all conversations
  setConversations: (newConversations) =>
    set({ conversations: newConversations }),

  // Setter for selected conversation
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation, messages: [] }),

  // Setter for messages of selected conversation
  setMessages: (newMessages) => set({ messages: newMessages }),

  // Reset the store
  resetSaleNotation: () =>
    set({
      conversations: [],
      selectedConversation: null,
      messages: [],
    }),
}));

export default useSaleNotation;
