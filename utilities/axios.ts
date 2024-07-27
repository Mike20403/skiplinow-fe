import { BASE_URL } from '@/constants/environment.constant';
import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});
