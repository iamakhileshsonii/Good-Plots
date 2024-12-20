// src/store/useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null, // Store the authenticated user object
  token: null, // Store the authentication token
  isAuthenticated: false, // Flag to check if the user is authenticated

  // Action to set the user
  setUser: (user) => set(() => ({ user, isAuthenticated: true })),

  // Action to log out
  logout: () =>
    set(() => ({ user: null, token: null, isAuthenticated: false })),

  // Action to set the token
  setToken: (token) => set(() => ({ token, isAuthenticated: true })),

  // Action to check if the user is authenticated
  checkAuth: () => set((state) => state.isAuthenticated),
}));

export default useAuthStore;
