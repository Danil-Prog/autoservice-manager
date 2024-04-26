import axios, { AxiosResponse, AxiosError } from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env['REACT_APP_BASE_URL']!
});

$api.interceptors.request.use((config) => {
  try {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    console.log(`---> ${config.url}`, config.headers);
    return config;
  } catch (e) {
    console.log('ERROR', e);
    return Promise.reject(e);
  }
});

$api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`<--- ${response.config.url}`, response);
    console.log(`<--- response.data`, response.data);
    return response;
  },
  async (error: AxiosError) => {
    console.error(`<--- ${error.config?.url}`, error);
    if (error.response?.status === 401 && error.config) {
      // toast.error(`${error.response?.message}`);
      localStorage.removeItem('token');
    } else {
      // toast.success(`${error.response?.message}`);
    }
    throw error;
  }
);

export default $api;
