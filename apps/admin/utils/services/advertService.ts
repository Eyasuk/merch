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
