import create from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchResult {
  id: string;
  name: string;
  url: string;
  logo?: string;
  score: number;
  analysis: string;
  summary: string;
  // Add other fields as needed
}

interface AppState {
  query: string;
  setQuery: (query: string) => void;
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  selectedTool: SearchResult | null;
  setSelectedTool: (tool: SearchResult | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      query: '',
      setQuery: (query) => set({ query }),
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),
      selectedTool: null,
      setSelectedTool: (tool) => set({ selectedTool: tool }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'awesearch-storage',
      getStorage: () => localStorage,
    }
  )
);