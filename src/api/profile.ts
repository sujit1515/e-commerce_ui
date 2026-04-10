import axiosInstance from "./axiosInstance";

export interface ProfileResponse {
  success: boolean;
  user?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
    gender?: string;
  };
  message?: string;
}

// ✅ GET profile (requires auth token)
export const getProfile = async (): Promise<ProfileResponse | null> => {
  try {
    const res = await axiosInstance.get("/profile/");
    return res.data;
  } catch (error: any) {
    console.error("Get Profile Error:", error.response?.data || error.message);
    return null;
  }
};

// ✅ UPDATE profile (requires auth token)
// Sends multipart/form-data so the image File goes through multer → Cloudinary
export const updateProfile = async (data: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  image?: File;
}): Promise<ProfileResponse | null> => {
  try {
    const formData = new FormData();

    if (data.name)    formData.append("name", data.name);
    if (data.email)   formData.append("email", data.email);
    if (data.phone)   formData.append("phone", data.phone);
    if (data.address) formData.append("address", data.address);
    if (data.image)   formData.append("image", data.image); // ✅ key must match upload.single("image")

    // ✅ Do NOT set Content-Type manually — axios sets it with the correct boundary automatically
    const res = await axiosInstance.put("/profile/update", formData);

    return res.data;
  } catch (error: any) {
    console.error("Update Profile Error:", error.response?.data || error.message);
    return null;
  }
};