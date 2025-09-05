import create from "zustand";

const useAuthStore = create((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
  user: null,
  setUser: (value) => set({ user: value }),
}));

export default useAuthStore;
