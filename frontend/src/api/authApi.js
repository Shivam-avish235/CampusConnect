import api from "./axios";

export const loginUser = async (email, password) => {
  // Update this to "/auth/login" so it matches "/api/auth/login" on the backend
  const response = await api.post("/auth/login", { email, password });

  return response.data;
};
