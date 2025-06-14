import apiClient from "./api";

export const register = async ({username, email, password}) => {
  try {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async ({email, password}) => {
  try {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
