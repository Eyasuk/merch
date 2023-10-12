import axios, { AxiosRequestConfig } from 'axios';

export const axiosApiInstance = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 50000,
  //headers: { Cookie: sessionCookie },
  withCredentials: true,
});
