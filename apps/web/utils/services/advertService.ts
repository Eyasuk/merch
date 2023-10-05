import { axiosApiInstance } from './axiosService';

export async function getAdvertService() {
  const response = await axiosApiInstance.get('/advert/active');
  return response;
}
