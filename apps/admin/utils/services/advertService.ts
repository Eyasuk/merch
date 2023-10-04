import { axiosApiInstance } from 'utils/services/axiosService';

export async function addAdvertService(
  name: string,
  alt: string,
  image: string
) {
  const response = await axiosApiInstance.post('/advert', {
    name,
    alt,
    image,
  });
  return response;
}

export async function getAdvertService(page: number, limit: number) {
  const response = await axiosApiInstance.get('/advert', {
    params: { page: page, limit: limit },
  });
  return response;
}
