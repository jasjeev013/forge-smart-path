import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v0'
});

// Add request interceptor for auth tokens if needed
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // const expiresAt = localStorage.getItem('expiresAt');
  // const isTokenExpired = expiresAt ? new Date().getTime() > new Date(expiresAt).getTime() : true;
  // if (token && isTokenExpired) {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('expiresAt');
  //   localStorage.removeItem('isAuthenticated');
  //   window.location.href = '/';
  // }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;