import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Centralized API client so the UI can reuse prediction and health checks easily.
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictCustomer = async (data) => {
  const response = await api.post('/predict', data);
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};
