import axiosInstance from "./axiosInstance";

// ── TYPES
export interface Profile {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  address?: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
  gender?: string;
  address?: string;
  password?: string;
  image?: File; // for upload
}

export interface ProfileResponse {
  success: boolean;
  message?: string;
  user?: Profile;
}

// 📌 CREATE PROFILE (POST)
export const createProfile = async (
  data: ProfilePayload
): Promise<ProfileResponse> => {
  try {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.address) formData.append("address", data.address);
    if (data.gender) formData.append("gender", data.gender);
    if (data.password) formData.append("password", data.password);

    // ✅ FILE MUST MATCH BACKEND FIELD NAME
    if (data.image) {
      formData.append("avatar", data.image); // 🔥 VERY IMPORTANT
    }

    const response = await axiosInstance.post("/profile/create", formData);

    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Create profile failed" };
  }
};

// // 📌 GET PROFILE (GET)
// export const getProfile = async (): Promise<ProfileResponse> => {
//   try {
//     const response = await axiosInstance.get("/profile");
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || { message: "Fetch profile failed" };
//   }
// };

// // 📌 UPDATE PROFILE (PUT)
// export const updateProfile = async (
//   data: ProfilePayload
// ): Promise<ProfileResponse> => {
//   try {
//     const formData = new FormData();

//     Object.entries(data).forEach(([key, value]) => {
//       if (value) formData.append(key, value as string | Blob);
//     });

//     const response = await axiosInstance.put("/profile/update", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || { message: "Update profile failed" };
//   }
// };

// // 📌 DELETE PROFILE (DELETE)
// export const deleteProfile = async (): Promise<ProfileResponse> => {
//   try {
//     const response = await axiosInstance.delete("/profile/delete");
//     return response.data;
//   } catch (error: any) {
//     throw error.response?.data || { message: "Delete profile failed" };
//   }
// };