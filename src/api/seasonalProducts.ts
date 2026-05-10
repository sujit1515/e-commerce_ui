import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  sizes: string[];
  colors: string[];
  images: string[];
  season?: string; 
  createdAt: string;
  updatedAt: string;
}

export interface SeasonalProductResponse {
  success: boolean;
  products: Product[];
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  season?: string;
}

// Fetch products by season
export const getProductsBySeason = async (
  season: string,
  page: number = 1,
  limit: number = 4
): Promise<SeasonalProductResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}product/season/${season}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching seasonal products:', error);
    throw error;
  }
};

// Get all products with filters
export const getAllProductsAPI = async (
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    season?: string;
  },
  page: number = 1,
  limit: number = 9
): Promise<SeasonalProductResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}product`, {
      params: { ...filters, page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};