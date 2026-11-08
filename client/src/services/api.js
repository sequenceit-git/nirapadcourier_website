import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nirapad_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const trackParcelApi = (code) => api.get(`/parcels/track/${code}`);
export const getRateApi = (zone, weight, cod) => api.get(`/parcels/rate?zone=${zone}&weight=${weight}&cod=${cod}`);
export const registerMerchantApi = (userData) => api.post('/auth/register', userData);
export const loginMerchantApi = (credentials) => api.post('/auth/login', credentials);
export const getMyParcelsApi = () => api.get('/parcels/my-parcels');
export const createParcelApi = (parcelData) => api.post('/parcels', parcelData);

export default api;

