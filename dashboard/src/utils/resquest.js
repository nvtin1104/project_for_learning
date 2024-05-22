import axios from 'axios';
// import { getAccessToken } from './auth'; // Import the getAccessToken function from a separate file
const getAccessToken = () =>  localStorage.getItem('token')
const baseURL = import.meta.env.VITE_API_ROOT;

const request = axios.create({
    baseURL,
    headers: {
        'auth-token': getAccessToken(),
        'Content-Type': 'application/json',
    },
});

request.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;
    return config;
});

const sendRequest = async (method, path, options = {}) => {
    const response = await request[method](path, options);
    return response.data;
};

export default sendRequest;
