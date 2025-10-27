import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://sales-tracker-ul4y.onrender.com/api',
});

export default API;
