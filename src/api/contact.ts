import axiosInstance from "./axiosInstance";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const sendContactMessage = async (
  form: ContactFormData
): Promise<ContactApiResponse> => {
  try {
    const res = await axiosInstance.post<ContactApiResponse>(
      "/contact/send",
      form
    );

    return res.data;
  } catch (error: any) {
    console.error("Contact API error:", error.response || error);

    return {
      success: false,
      message: error.response?.data?.message || "Server error",
    };
  }
};