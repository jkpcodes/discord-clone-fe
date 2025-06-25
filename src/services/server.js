import apiClient from './api';

export const createServer = async (data) => {
  try {
    const response = await apiClient.post('/server/create', data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};

export const getServers = async () => {
  try {
    const response = await apiClient.get('/server/list');
    return response.data;
  } catch (error) {
    console.error(error);
    throw error.response.data;
  }
};