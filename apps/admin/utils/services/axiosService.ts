import axios, { AxiosRequestConfig } from 'axios';

//const sessionCookie = localStorage.getItems('sessionCookie');

export const axiosApiInstance = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  timeout: 5000,
  //headers: { Cookie: sessionCookie },
  withCredentials: true,
});
