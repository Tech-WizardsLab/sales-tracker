import axios from 'axios';

const API = axios.create({
  baseURL: 'https://sales-tracker-ul4y.onrender.com/api',
});

export default API;
