import axiosInstance from "./axiosInstance";

// 🟢 1. BUY NOW → CREATE ORDER
export const createOrderApi = async (data: {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}) => {
  try {
    const res = await axiosInstance.post("/order/buy-now", data);
    return res.data; // { orderId }
  } catch (error: any) {
    console.error("Buy Now Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};



// 🟢 2. ADD ADDRESS TO ORDER
export const addAddressToOrderApi = async (
  orderId: string,
  addressId: string
) => {
  try {
    const res = await axiosInstance.put(
      `/order/${orderId}/address`,
      { addressId }
    );
    return res.data;
  } catch (error: any) {
    console.error("Add Address Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};



// 🟢 3. PLACE ORDER (COD)
export const placeOrderApi = async (orderId: string) => {
  try {
    const res = await axiosInstance.put(`/order/${orderId}/pay`);
    return res.data;
  } catch (error: any) {
    console.error("Place Order Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};



// 🟢 4. GET ORDER BY ID (Payment / Success Page)
export const getOrderByIdApi = async (orderId: string) => {
  try {
    const res = await axiosInstance.get(`/order/${orderId}`);
    return res.data;
  } catch (error: any) {
    console.error("Get Order Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};



// 🟢 5. GET MY ORDERS (Order History)
export const getMyOrdersApi = async () => {
  try {
    const res = await axiosInstance.get("/order/my-orders");
    return res.data;
  } catch (error: any) {
    console.error("Get My Orders Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};