import axiosInstance from "../../method/axiosInstance";

export async function signupSeller(payload) {
  const response = await axiosInstance.post("/auth/seller/signup", payload);
  return response.data;
}

export async function loginSeller(payload) {
  const response = await axiosInstance.post("/auth/seller/login", payload);
  return response.data;
}
