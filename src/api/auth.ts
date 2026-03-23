import axiosInstance from "./axiosInstance";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// SIGNUP
interface SignupData {
  name: string;
  email: string;
  password: string;
}

export const signupApi = async (data: SignupData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
  return response.data;
};

// LOGIN
interface LoginData {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/login", data);
  return response.data;
};

// FORGOT PASSWORD
export const forgotPasswordApi = async (email: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/forgot-password",
    { email }
  );
  return response.data;
};

// RESET PASSWORD
interface ResetPasswordData {
  email: string;
  otp: string;
  password: string;
}

export const resetPasswordApi = async (
  data: ResetPasswordData
): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>(
    "/auth/reset-password",
    data
  );
  return response.data;
};

// LOGOUT
export const logoutApi = async (): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/logout");
  return response.data;
};