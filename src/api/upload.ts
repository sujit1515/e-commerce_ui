import axiosInstance from "./axiosInstance";

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosInstance.post(
      "/api/v1/upload",   
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.url;
  } catch (error: any) {
    console.error("Upload error:", error.response?.data || error.message);
    throw error;
  }
};