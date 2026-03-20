import { create } from 'zustand';

// Define the shape of our global state
interface AppState {
  user: any | null;
  setUser: (user: any) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeLayer: string; // e.g. 'events', 'arcs', 'heatmaps'
  setActiveLayer: (layer: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  activeLayer: 'events',
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query })
}));

export default useAppStore;
