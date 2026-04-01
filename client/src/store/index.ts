import { create } from 'zustand'

interface AppState {
  selectedCategory: string | null
  setSelectedCategory: (slug: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (slug) => set({ selectedCategory: slug }),
}))
