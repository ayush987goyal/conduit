import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API
});

const token = `Bearer ${localStorage.getItem('token')}`;
instance.defaults.headers.common['Authorization'] = token;

export default instance;
