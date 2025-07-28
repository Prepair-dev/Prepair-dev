import axios from 'axios';
import  store  from '../redux/store';
import { logout } from '../redux/authSlice';
import { toast } from 'sonner';
// import { backend_url } from '@/constants';

const axiosInstance = axios.create({
//   baseURL: backend_url,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 500) {

        store.dispatch(logout());
        localStorage.removeItem('token');
        delete axiosInstance.defaults.headers.common['Authorization'];
        
        const errorMsg = error.response.status === 401 
          ? 'Session expired. Please login again.' 
          : 'Internal server error. Please try again.';
        
        toast.error(errorMsg);
        
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;