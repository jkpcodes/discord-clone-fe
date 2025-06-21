import apiClient from './api';

export const getDirectMessages = async (data) => {
  try {
    const response = await apiClient.get(`/message/direct/${data.friendId}`, {
      params: {
        skip: data.skip,
        take: data.take,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const sendDirectMessage = async (data) => {
  try {
    const response = await apiClient.post(`/message/direct/${data.friendId}`, data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};
