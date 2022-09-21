import axios from 'axios';
import { BASE_URL } from './constants';

/**
 * api инстанс
 */
export const apiInstance = axios.create({
  baseURL: BASE_URL,
});
