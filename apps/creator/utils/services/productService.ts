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

export async function getUnsavedProductService() {
  const response = await axiosApiInstance.get('/product/unsaved', {});
  return response;
}

export async function editProductService(detail: object) {
  const response = await axiosApiInstance.put('/product', { ...detail });
  return response;
}

export async function addProductImageService(productId: string, image: any) {
  const response = await axiosApiInstance.putForm('/product/images', {
    productId,
    image,
  });
  return response;
}
