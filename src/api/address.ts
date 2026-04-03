import axiosInstance from "./axiosInstance";

// Types
export interface Address {
  _id?: string;
  label: "Home" | "Office" | "Other";
  fullName: string;
  phone: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

// ADD ADDRESS
export const addAddress = async (data: Address) => {
  const res = await axiosInstance.post("/address/add", {
    ...data,
    postalCode: data.zip, // ✅ FIX HERE
  });
  return res.data;
};

// GET ALL ADDRESSES
export const getAddresses = async () => {
  const res = await axiosInstance.get("/address");
  return res.data;
};

// UPDATE ADDRESS
export const updateAddress = async (id: string, data: Address) => {
  const res = await axiosInstance.put(`/address/update/${id}`, {
    ...data,
    postalCode: data.zip, // ✅ FIX HERE
  });
  return res.data;
};

// DELETE ADDRESS
export const deleteAddress = async (id: string) => {
  const res = await axiosInstance.delete(`/address/delete/${id}`);
  return res.data;
};

// SET DEFAULT ADDRESS
export const setDefaultAddress = async (id: string) => {
  const res = await axiosInstance.put(`/address/default/${id}`);
  return res.data;
};

// SELECT ADDRESS (for checkout)
export const selectAddress = async (id: string) => {
  const res = await axiosInstance.get(`/address/select/${id}`);
  return res.data;
};