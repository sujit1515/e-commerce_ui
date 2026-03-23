// import axiosInstance from "./axiosInstance";

// // Product Types
// export interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   category: string;
//   stock: number;
//   images: string[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface ProductFilters {
//   category?: string;
//   minPrice?: number;
//   maxPrice?: number;
//   search?: string;
// }

// // Get All Products
// export const getAllProducts = async (
//   filters: ProductFilters = {}
// ): Promise<Product[] | null> => {
//   try {
//     const params = Object.fromEntries(
//       Object.entries(filters).filter(
//         ([_, value]) => value !== "" && value !== undefined && value !== null
//       )
//     );

//     const res = await axiosInstance.get("/product", { params });

//     return res.data.products;
//   } catch (error) {
//     console.error("Product API Error:", error);
//     return null;
//   }
// };

// // Get Product By ID
// export const getProductById = async (
//   id: string
// ): Promise<Product | null> => {
//   try {
//     const res = await axiosInstance.get(`/product/${id}`);
//     return res.data.product;
//   } catch (error) {
//     console.error("Get Product Error:", error);
//     return null;
//   }
// };


import axiosInstance from "./axiosInstance";

// ✅ Product Type
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: "men" | "women" | "kids";
  stock: number;
  sizes: string[];
  colors: string[];
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

// ✅ Filters Type
export interface ProductFilters {
  category?: "men" | "women" | "kids";
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// ✅ API Response Type (Pagination)
export interface ProductResponse {
  success: boolean;
  totalProducts: number;
  currentPage: number;
  totalPages: number;
  products: Product[];
}


// 🔹 GET ALL PRODUCTS
export const getAllProducts = async (
  filters: ProductFilters = {}
): Promise<ProductResponse | null> => {
  try {
    const params = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );

    const res = await axiosInstance.get<ProductResponse>("/product", {
      params,
    });

    return res.data;
  } catch (error) {
    console.error("Get All Products Error:", error);
    return null;
  }
};

// 🔹 GET PRODUCT BY ID
export const getProductById = async (
  id: string
): Promise<Product | null> => {
  try {
    const res = await axiosInstance.get<{ success: boolean; product: Product }>(
      `/product/${id}`
    );

    return res.data.product;
  } catch (error) {
    console.error("Get Product Error:", error);
    return null;
  }
};

// 🔹 ADD PRODUCT (ADMIN)

// export const addProduct = async (
//   productData: Omit<Product, "_id" | "createdAt" | "updatedAt">
// ): Promise<Product | null> => {
//   try {
//     const res = await axiosInstance.post<{
//       success: boolean;
//       product: Product;
//     }>("/product/add", productData);

//     return res.data.product;
//   } catch (error: any) {
//     console.error(
//       "Add Product Error:",
//       error.response?.data || error.message
//     );
//     return null;
//   }
// };
