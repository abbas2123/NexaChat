import api from "../api/axios";

type dataType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export const registerUser = async (data: dataType) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const loginUser = async (data: Partial<dataType>) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};

export const googleLoginUser = async (accessToken: string) => {
  const response = await api.post("/auth/google", {
    accessToken,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};