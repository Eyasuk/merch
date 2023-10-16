import { axiosApiInstance } from './axiosService';

export async function addProductService(
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string,
  colors?: string[]
) {
  const response = await axiosApiInstance.post('/product', {
    name,
    description,
    price,
    stock,
    category,
    colors,
  });
  return response;
}
