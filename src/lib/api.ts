// src/lib/api.ts
import axios from 'axios';
import { getToken } from './auth';

// ✅ gunakan environment variable untuk fleksibilitas
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
});

// ✅ tambahkan token di setiap request jika tersedia
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    (config.headers ??= {}).Authorization = `Bearer ${token}`;
  }
  return config;
});