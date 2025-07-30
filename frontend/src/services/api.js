import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const makeRequest = async ({ method, url, headers, body }) => {
  const response = await api.post('/proxy', { method, url, headers, body });
  return response.data;
};

export const getHistory = async (page = 1, limit = 10) => {
  const response = await api.get('/history', { params: { page, limit } });
  return response.data;
};