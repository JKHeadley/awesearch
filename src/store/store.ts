import { create } from 'zustand';
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

interface ShownTips {
  first: string[];
  main: string[];
  additional: string[];
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
  privacyConsent: string | null;
  setPrivacyConsent: (consent: string | null) => void;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  shownTips: ShownTips;
  setShownTips: (tips: ShownTips) => void;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      query: '',
      setQuery: (query) => set({ query }),
      searchResults: [],
      setSearchResults: (results) => set({ searchResults: results }),
      selectedTool: null,
      setSelectedTool: (tool) => set({ selectedTool: tool }),
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      privacyConsent: null,
      setPrivacyConsent: (consent) => set({ privacyConsent: consent }),
      searchHistory: [],
      addToSearchHistory: (query) => {
        const { privacyConsent, searchHistory } = get();
        if (privacyConsent === 'true') {
          const updatedHistory = [
            query,
            ...searchHistory.filter((q) => q !== query),
          ].slice(0, 10);
          set({ searchHistory: updatedHistory });
        }
      },
      clearSearchHistory: () => set({ searchHistory: [] }),
      shownTips: {
        first: [],
        main: [],
        additional: [],
      },
      setShownTips: (tips) => set({ shownTips: tips }),
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
