import axios from 'axios';

// Import environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

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

export interface ToolDetails extends SearchResult {
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
    tags: any[];
}

// Function to search the database
export const searchDatabase = async (query: string): Promise<SearchResult[]> => {
    try {
        const response = await axios.post(`${API_URL}/search`, {
            query,
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
        const response = await axios.get(`${API_URL}/tool/${id}?$embed=tags`);
        return response.data;
    } catch (error) {
        console.error('Error fetching tool details:', error);
        throw error;
    }
};