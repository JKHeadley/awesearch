import axios from 'axios';

// Import environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5601';

// Define types for our API responses
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

interface ToolDetails extends SearchResult {
  purpose: string;
  description: string;
  intended_use: string;
  intended_audience: string;
  keywords: string[];
  category: string;
  sub_category: string;
  group: string;
  class: string;
  open_source: boolean;
  free: boolean;
}

// Function to search the database
export const searchDatabase = async (query: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching database:', error);
    throw error;
  }
};

// Function to get details of a specific tool
export const getToolDetails = async (id: string): Promise<ToolDetails> => {
  try {
    const response = await axios.get(`${API_URL}/tool/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tool details:', error);
    throw error;
  }
};

// Function to check if search is enabled
export const checkSearchEnabled = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/search-status`);
    return response.data.enabled;
  } catch (error) {
    console.error('Error checking search status:', error);
    return false;
  }
};

// Function to enable search with a password
export const enableSearch = async (password: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/enable-search`, { password });
    return response.data.success;
  } catch (error) {
    console.error('Error enabling search:', error);
    return false;
  }
};

// Function to disable search
export const disableSearch = async (): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/disable-search`);
    return response.data.success;
  } catch (error) {
    console.error('Error disabling search:', error);
    return false;
  }
};