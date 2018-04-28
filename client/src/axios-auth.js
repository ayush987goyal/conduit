import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API
});

instance.interceptors.request.use(response => {
  const token = `Bearer ${localStorage.getItem('token')}`;
  response.headers.Authorization = token;
  return response;
});

export default instance;
