
import axiosInstance from "./axiosInstance";

// ── Types
export interface CartItem {
  _id: string;
  productId: string | { _id: string; name: string; price: number; images: string[] };
  quantity: number;
  size?: string;
  color?: string;
}

export interface AddCartPayload {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface AddCartResponse {
  success: boolean;
  message: string;
  cart: CartItem;
}

export interface UpdateCartPayload {
  quantity: number;
}


//   Get the user's cart

export const getCart = async (): Promise<CartItem[] | null> => {
  try {
    const res = await axiosInstance.get("/cart");
    return res.data.cart; // backend should return { cart: [...] }
  } catch (error) {
    console.error("Get Cart Error:", error);
    return null;
  }
};


//   Add an item to cart

export const addToCart = async (
  data: AddCartPayload
): Promise<AddCartResponse | null> => {
  try {
    const res = await axiosInstance.post<AddCartResponse>("/cart/add", data);
    return res.data;
  } catch (error: any) {
    console.error("Add Cart Error:", error.response?.data || error.message);
    throw error;
  }
};


//   Update cart item quantity

export const updateCartQuantity = async (id: string, data: UpdateCartPayload): Promise<CartItem | null> => {
  try {
    const res = await axiosInstance.put(`/cart/update/${id}`, data);
    return res.data.cartItem;
  } catch (error: any) {
    console.error("Update Cart Error:", error.response?.data || error.message);
    return null;
  }
};

//  Remove an item from cart

export const removeCartItem = async (id: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/cart/remove/${id}`);
    return true;
  } catch (error: any) {
    console.error("Remove Cart Error:", error.response?.data || error.message);
    return false;
  }
};

//  Clear entire cart
export const clearCart = async (): Promise<boolean> => {
  try {
    await axiosInstance.delete("/cart/clear");
    return true;
  } catch (error: any) {
    console.error("Clear Cart Error:", error.response?.data || error.message);
    return false;
  }
};