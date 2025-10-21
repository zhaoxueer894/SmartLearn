import axios from 'axios';

const apiBase = import.meta.env.VITE_API_BASE || '';

const api = axios.create({
  baseURL: apiBase,
  headers: { 'Content-Type': 'application/json' }
});

export default api;
