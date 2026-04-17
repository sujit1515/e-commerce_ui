
// import axiosInstance from "./axiosInstance";

// // ── Types
// export interface CartItem {
//   _id: string;
//   productId: string | { _id: string; name: string; price: number; images: string[] };
//   quantity: number;
//   size?: string;
//   color?: string;
// }

// export interface AddCartPayload {
//   productId: string;
//   quantity: number;
//   size?: string;
//   color?: string;
// }

// export interface AddCartResponse {
//   success: boolean;
//   message: string;
//   cart: CartItem;
// }

// export interface UpdateCartPayload {
//   quantity: number;
// }


// //   Get the user's cart

// export interface CartResponse {
//   cart: {
//     items: CartItem[];
//   };
// }

// export const getCart = async (): Promise<CartResponse | CartItem[] | null> => {
//   try {
//     const res = await axiosInstance.get("/cart");
//     return res.data; // return the full response, not just res.data.cart
//   } catch (error) {
//     console.error("Get Cart Error:", error);
//     return null;
//   }
// };


// //   Add an item to cart

// export const addToCart = async (
//   data: AddCartPayload
// ): Promise<AddCartResponse | null> => {
//   try {
//     const res = await axiosInstance.post<AddCartResponse>("/cart/add", data);
//     return res.data;
//   } catch (error: any) {
//     console.error("Add Cart Error:", error.response?.data || error.message);
//     throw error;
//   }
// };


// //   Update cart item quantity

// export const updateCartQuantity = async (id: string, data: UpdateCartPayload): Promise<CartItem | null> => {
//   try {
//     const res = await axiosInstance.put(`/cart/update/${id}`, data);
//     return res.data.cartItem;
//   } catch (error: any) {
//     console.error("Update Cart Error:", error.response?.data || error.message);
//     return null;
//   }
// };

// //  Remove an item from cart

// export const removeCartItem = async (id: string): Promise<boolean> => {
//   try {
//     await axiosInstance.delete(`/cart/remove/${id}`);
//     return true;
//   } catch (error: any) {
//     console.error("Remove Cart Error:", error.response?.data || error.message);
//     return false;
//   }
// };

// //  Clear entire cart
// export const clearCart = async (): Promise<boolean> => {
//   try {
//     await axiosInstance.delete("/cart/clear");
//     return true;
//   } catch (error: any) {
//     console.error("Clear Cart Error:", error.response?.data || error.message);
//     return false;
//   }
// };

import axiosInstance from "./axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface CartItem {
  _id: string;
  product:
    | string
    | {
        _id: string;
        name: string;
        price: number;
        images: (string | { url: string })[];
        category?: string;
        stock?: number;
        badge?: string;
      };
  quantity: number;
  size?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
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

// FIX: backend returns { success: true, cart: CartItem[] }
// cart is a flat array, NOT { items: [] }
export interface CartResponse {
  success: boolean;
  cart: CartItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function resolveProductImage(
  images: (string | { url: string })[] | undefined
): string {
  if (!images || images.length === 0) {
    return "https://via.placeholder.com/600x800?text=No+Image";
  }
  const first = images[0];
  if (typeof first === "string") return first;
  if (typeof first === "object" && "url" in first) return first.url;
  return "https://via.placeholder.com/600x800?text=No+Image";
}

export function normaliseCartItem(
  item: CartItem,
  index: number
): {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
  size: string;
  color: string;
  colorHex: string;
  qty: number;
  maxQty: number;
  badge?: string;
} {
  const p =
    typeof item.product === "object" && item.product !== null
      ? item.product
      : null;

  return {
    id:       item._id || `temp-${index}`,
    name:     p?.name     ?? "Product",
    category: p?.category ?? "Uncategorized",
    price:    p?.price    ?? 0,
    img:      p ? resolveProductImage(p.images) : "https://via.placeholder.com/600x800?text=No+Image",
    size:     item.size   ?? "M",
    color:    item.color  ?? "Black",
    colorHex: getColorHex(item.color ?? "Black"),
    qty:      item.quantity ?? 1,
    maxQty:   p?.stock    ?? 10,
    badge:    p?.badge,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// API calls
// ─────────────────────────────────────────────────────────────────────────────

/** Fetch the user's cart. Backend returns { success, cart: CartItem[] } */
export const getCart = async (): Promise<CartResponse | null> => {
  try {
    const res = await axiosInstance.get("/cart");
    return res.data;
  } catch (error) {
    console.error("Get Cart Error:", error);
    return null;
  }
};

/** Add an item to the cart. */
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

/** Update quantity of a specific cart item by its cart-item _id. */
export const updateCartQuantity = async (
  cartItemId: string,
  data: UpdateCartPayload
): Promise<CartItem | null> => {
  try {
    const res = await axiosInstance.put(`/cart/update/${cartItemId}`, data);
    return res.data.cartItem ?? res.data;
  } catch (error: any) {
    console.error("Update Cart Error:", error.response?.data || error.message);
    return null;
  }
};

/** Remove a single item from the cart. */
export const removeCartItem = async (cartItemId: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`/cart/remove/${cartItemId}`);
    return true;
  } catch (error: any) {
    console.error("Remove Cart Error:", error.response?.data || error.message);
    return false;
  }
};

/** Clear the entire cart. */
export const clearCart = async (): Promise<boolean> => {
  try {
    await axiosInstance.delete("/cart/clear");
    return true;
  } catch (error: any) {
    console.error("Clear Cart Error:", error.response?.data || error.message);
    return false;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// Color helper
// ─────────────────────────────────────────────────────────────────────────────
export function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    black:    "#111111",
    white:    "#FFFFFF",
    red:      "#FF0000",
    blue:     "#0000FF",
    green:    "#00FF00",
    yellow:   "#FFFF00",
    purple:   "#800080",
    orange:   "#FFA500",
    brown:    "#A52A2A",
    pink:     "#FFC0CB",
    gray:     "#808080",
    grey:     "#808080",
    navy:     "#000080",
    beige:    "#F5F5DC",
    camel:    "#C19A6B",
    olive:    "#6B7C45",
    maroon:   "#800000",
    teal:     "#008080",
    lavender: "#E6E6FA",
    coral:    "#FF7F50",
    peach:    "#FFE5B4",
    mint:     "#98FB98",
    gold:     "#FFD700",
    silver:   "#C0C0C0",
    bronze:   "#CD7F32",
  };
  return colorMap[colorName.toLowerCase()] ?? "#CCCCCC";
}