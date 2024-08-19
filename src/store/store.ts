import create from 'zustand';
import { persist } from 'zustand/middleware';
import { ToolDetails } from '../api/search';

interface SearchResult {
  id: string;
  name: string;
  url: string;
  logo?: string;
  score: number;
  analysis: string;
  summary: string;
}

interface AppState {
  query: string;
  setQuery: (query: string) => void;
  searchResults: SearchResult[];
  setSearchResults: (results: SearchResult[]) => void;
  selectedTool: ToolDetails | null;
  setSelectedTool: (tool: ToolDetails | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useStore = create<AppState>()(
  persist(
    (set) => ({
      query: '',
      setQuery: (query) => {
        const consent = localStorage.getItem('privacyConsent');
        if (consent === 'true') {
          set({ query });
        }
      },
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),
      selectedTool: null,
      setSelectedTool: (tool) => set({ selectedTool: tool }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'awesearch-storage',
      getStorage: () => ({
        getItem: (name) => {
          const consent = localStorage.getItem('privacyConsent');
          return consent === 'true' ? localStorage.getItem(name) : null;
        },
        setItem: (name, value) => {
          const consent = localStorage.getItem('privacyConsent');
          if (consent === 'true') {
            localStorage.setItem(name, value);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      }),
    },
  ),
);

export { useStore };
