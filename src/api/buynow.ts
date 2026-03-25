import axiosInstance from "./axiosInstance";

// 🛒 BUY NOW API
export const buyNowApi = async (data: {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  addressId: string;
}) => {
  try {
    const res = await axiosInstance.post("/orders/buy-now", data);

    return res.data;
  } catch (error: any) {
    console.error("Buy Now Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};