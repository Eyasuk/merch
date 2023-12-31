import { axiosApiInstance } from 'utils/services/axiosService';

export async function addAdvertService(
  name: string,
  alt: string,
  image: string,
  color: string
) {
  const response = await axiosApiInstance.post('/advert', {
    name,
    alt,
    image,
    color,
  });
  return response;
}

export async function getAdvertService(page: number, limit: number) {
  const response = await axiosApiInstance.get('/advert', {
    params: { page: page, limit: limit },
  });
  return response;
}

export async function deleteAdvertService(id: string) {
  const response = await axiosApiInstance.delete('/advert', { data: { id } });
  return response;
}

export async function editAdvertService(id: string) {
  const response = await axiosApiInstance.put('/advert', { id });
  return response;
}
