import axios from 'axios';

// Import environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

// Define types for our API responses
export interface SearchResult {
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
  _id: string;
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

export interface ToolTag {
  _id: string;
  name: string;
  displayName: string;
  toolCount: number;
}

export interface PaginatedResponse<T> {
  docs: T[];
  pages: {
    current: number;
    prev: number;
    hasPrev: boolean;
    next: number;
    hasNext: boolean;
    total: number;
  };
  items: {
    limit: number;
    begin: number;
    end: number;
    total: number;
  };
}

export const searchToolsByKeyword = async (
  keyword: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<{ tools: PaginatedResponse<SearchResult>; tag: ToolTag }> => {
  try {
    const tag = await axios.get(`${API_URL}/tag?name=${keyword}`);
    const tagId = tag.data.docs[0]._id;
    if (!tagId) {
      throw new Error(`Tag not found for keyword: ${keyword}`);
    }
    const response = await axios.get(`${API_URL}/tag/${tagId}/tools`, {
      params: { $limit: pageSize, $page: page },
    });
    return { tools: response.data, tag: tag.data.docs[0] };
  } catch (error) {
    console.error('Error fetching tools by keyword:', error);
    throw error;
  }
};

// Function to search the database
export const searchDatabase = async (
  query: string,
): Promise<SearchResult[]> => {
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

export const awesomizeQuery = async (query: string): Promise<string[]> => {
  try {
    const response = await axios.post(`${API_URL}/awesomize`, { query });
    return response.data;
  } catch (error) {
    console.error('Error expanding query:', error);
    throw error;
  }
};
