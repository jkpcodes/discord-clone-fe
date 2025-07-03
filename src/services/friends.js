import apiClient from "./api";

export const sendFriendInvitation = async (data) => {
  try {
    const response = await apiClient.post("/friend/invite", data);
    return response.data;
  } catch (error) {
    console.error("Friend invitation error:", error);
    throw error.response.data;
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    const response = await apiClient.post("/friend/accept", data);
    return response.data;
  } catch (error) {
    console.error("Friend invitation error:", error);
    throw error.response.data;
  }
};

export const rejectFriendInvitation = async (data) => {
  try {
    const response = await apiClient.post("/friend/reject", data);
    return response.data;
  } catch (error) {
    console.error("Friend invitation error:", error);
    throw error.response.data;
  }
};

export const getDirectMessages = async () => {
  try {
    const response = await apiClient.get("/friend/direct-messages");
    return response.data;
  } catch (error) {
    console.error("Direct messages error:", error);
    throw error.response.data;
  }
};