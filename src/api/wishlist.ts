import axiosInstance from "./axiosInstance";

// GET USER WISHLIST
export const getWishlist = async () => {
  try {
    const res = await axiosInstance.get("/wishlist");
    return res.data;
  } catch (error) {
    console.error("Wishlist fetch error:", error);
  }
};

// ADD TO WISHLIST
export const addToWishlist = async (productId: string) => {
  try {
    const res = await axiosInstance.post("/wishlist/add", { productId });
    return res.data;
  } catch (error) {
    console.error("Add wishlist error:", error);
  }
};

// REMOVE FROM WISHLIST
export const removeFromWishlist = async (productId: string) => {
  try {
    const res = await axiosInstance.delete("/wishlist/remove", {
      data: { productId }
    });

    return res.data;
  } catch (error) {
    console.error("Remove wishlist error:", error);
  }
};

// MOVE WISHLIST TO CART
export const moveWishlistToCart = async (productId: string) => {
  try {
    const res = await axiosInstance.post("/wishlist/move-to-cart", {
      productId
    });

    return res.data;
  } catch (error) {
    console.error("Move to cart error:", error);
  }
};

// TOGGLE WISHLIST
export const toggleWishlist = async (productId: string) => {
  try {
    const res = await axiosInstance.post("/wishlist/toggle", { productId });
    return res.data;
  } catch (error: any) {
    console.error("Wishlist toggle API error:", error.response || error);

    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};