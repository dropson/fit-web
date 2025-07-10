import axios from 'axios';
import { useAuthState } from '~/stores/authStore';

const axiosInstance = axios.create({
    baseURL: 'http://fit-api.test/api',
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthState.getState().token;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default axiosInstance;
