import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor 추가
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      alert('Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


// import axiosInstance from '../path/to/axiosInstance';

// const makeReservation = async (reservationData) => {
//   try {
//     const response = await axiosInstance.post('/reservations', reservationData);
//     return response.data;
//   } catch (error) {
//     console.error('Error making reservation:', error);
//     throw error;
//   }
// };
