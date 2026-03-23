import axiosInstance from "./axiosInstance";

// Types
export interface Address {
  _id?: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  isDefault?: boolean;
}

// ADD ADDRESS
export const addAddress = async (data: Address) => {
  const res = await axiosInstance.post("/address/add", data);
  return res.data;
};

// GET ALL ADDRESSES
export const getAddresses = async () => {
  const res = await axiosInstance.get("/address");
  return res.data;
};

// UPDATE ADDRESS
export const updateAddress = async (id: string, data: Address) => {
  const res = await axiosInstance.put(`/address/update/${id}`, data);
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